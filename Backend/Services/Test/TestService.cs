using AutoMapper;
using AutoMapper.Configuration.Conventions;
using Backend.DB.Models;
using Backend.DTO.Course;
using Backend.DTO.Lesson;
using Backend.DTO.Members;
using Backend.DTO.Student;
using Backend.DTO.Test;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.ExamRepository;
using Backend.Repository.LessonRepository;
using Backend.Repository.StudentRepository;
using Backend.Repository.TestRepository;
using Backend.Services.Class;
using Backend.Services.StudentAnswer;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace Backend.Services.Test
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly IStudentAnswerService _studentAnswerService;
        private readonly ILessonRepository _lessonRepository;
        private readonly IMapper _mapper;

        public TestService(ITestRepository testRepository,
            IMapper mapper, IStudentRepository studentRepository,
            IStudentAnswerService studentAnswerService, 
            ILessonRepository lessonRepository)
        {
            _testRepository = testRepository;
            _studentRepository = studentRepository;
            _studentAnswerService = studentAnswerService;
            _lessonRepository = lessonRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<TestDTO>> GetAllTest()
        {
            var result = new ServiceResult<ICollection<TestDTO>>();
            try
            {
                var tests = _testRepository.GetAll().Include(x => x.Exam);

                if (!tests.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy bài thi!";
                }

                result.Payload = _mapper.Map<ICollection<TestDTO>>(tests);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<TestDTO>> GetTestByStudentId(string studentId)
        {
            var result = new ServiceResult<TestDTO>();
            try
            {
                var test = _testRepository.GetAll().
                    Where(p => p.StudentId.Equals(studentId)).FirstOrDefault();

                if (test is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "User is not exist";
                    return result;
                }

                result.Payload = _mapper.Map<TestDTO>(test);
            }
            catch (Exception e)
            {
                result.IsError = false;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateTest(TestCreateDTO testCreateDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var test = _testRepository.GetAll().Where(p => p.ExamId == testCreateDTO.ExamId).FirstOrDefault();
                if (test != null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Bài thi đã tồn tại";
                    return result;
                }
                var students = _studentRepository.GetAll().ToList();
                var lessons = _lessonRepository.GetAll()
                    .Include(x => x.ClassStudent)
                    .ThenInclude(x => x.Class)
                    .Where(x => x.ClassStudent.Class.IsTheoryClass == true)
                    .ToList();

                if (students == null || students.Count == 0)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không có học viên!";
                    return result;
                }

                int cont = 0; // Khai báo và khởi tạo biến cont
                foreach (var student in students)
                {
                    foreach (var lesson in lessons)
                    {
                        if (lesson.ClassStudent.StudentId == student.StudentId && lesson.Attendance == true)
                        {
                            cont++;
                        }
                    }

                    if (cont >= 9)
                    {
                        var newTest = _mapper.Map<DB.Models.Test>(testCreateDTO);
                        newTest.ExamId = testCreateDTO.ExamId;
                        newTest.StudentId = student.StudentId;
                        newTest.CreateTime = DateTime.Now;
                        await _testRepository.CreateAsync(newTest);

                        await _studentAnswerService.CreateRandomQuestion(student.StudentId);
                    }
                    cont = 0; // Đặt lại giá trị cont sau khi hoàn thành việc kiểm tra
                }

                // Trả về giá trị thành công
                result.Payload = 1;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> CheckPassTest(string studentID)
        {
            var result = new ServiceResult<int>();
            try
            {
                var test = _testRepository.GetAll().FirstOrDefault(p => p.StudentId.Equals(studentID));

                if (test != null)
                {
                    test.Pass = true;
                    await _testRepository.UpdateAsync(test);
                    result.Payload = 1;
                }
                else
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "No test found for the student.";
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = -1;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

    }
}
