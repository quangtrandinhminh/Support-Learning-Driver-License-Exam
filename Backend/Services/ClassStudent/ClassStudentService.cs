using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.ClassStudent;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.CourseRepository;
using Backend.Repository.StudentRepository;
using Backend.Services.Class;
using Backend.Services.Lesson;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.ClassStudent
{
    public class ClassStudentService : IClassStudentService
    {
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IClassRepository _classRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly IClassService _classService;
        private readonly ILessonService _lessonService;
        private readonly IMapper _mapper;

        public ClassStudentService(IClassStudentRepository classStudentRepository
            , ICourseRepository courseRepository
            , IClassRepository classRepository
            , IStudentRepository studentRepository
            , IClassService classService
            , ILessonService lessonService
            , IMapper mapper)
        {
            _classStudentRepository = classStudentRepository;
            _courseRepository = courseRepository;
            _classRepository = classRepository;
            _studentRepository = studentRepository;
            _classService = classService;
            _lessonService = lessonService;
            _mapper = mapper;
        }

        public ICollection<ClassStudentDTO> GetAllClassStudent()
        {
            try
            {
                var classStudents = _classStudentRepository.GetAll().ToList();
                return classStudents is null ? null : _mapper.Map<ICollection<ClassStudentDTO>>(classStudents);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<int>> AddStudentIntoClassTheory(string studentId, string courseId)
        {
            var result = new ServiceResult<int>();
            try
            {
                var student = _studentRepository.GetAll()
                    .Where(p => p.StudentId == studentId).FirstOrDefault();
                if (student != null)
                {
                    var classStudents = _classStudentRepository.GetAll().
                    Where(p => p.StudentId == studentId && p.Class.IsTheoryClass == true).
                    FirstOrDefault();
                    if (classStudents == null)
                    {
                        var classs = _classRepository.GetAll()
                            .Where(p => p.CourseId.Equals(courseId) && p.IsTheoryClass == true)
                            .FirstOrDefault();
                        var ClassStudents = new DB.Models.ClassStudent();
                        ClassStudents.ClassId = classs.ClassId;
                        ClassStudents.StudentId = studentId;

                        await _classStudentRepository.CreateAsync(ClassStudents);
                        await _lessonService.CreateTheoryLessonAutoByStudentId(studentId);
                    }
                    else
                    {
                        result.IsError = true;
                        result.Payload = -1;
                        result.ErrorMessage = "Học viên này đã đăng ký lớp học lý thuyết!";
                    }
                }
                else
                {
                    result.IsError = true;
                    result.Payload = -3;
                    result.ErrorMessage = "Học viên không tồn tại";
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // Add all students in course to a class
        public async Task<ServiceResult<int>> AddAllStudentsIntoTheoryClass(string courseId)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetAll().Where(p => p.CourseId == courseId).FirstOrDefaultAsync();
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy khóa học";
                    return result;
                }

                var theoryClass = await _classRepository.GetAll()
                    .Where(p => p.CourseId == courseId && p.IsTheoryClass == true)
                    .FirstOrDefaultAsync();
                if (theoryClass == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy lớp học";
                    return result;
                }

                var students = await _studentRepository.GetAll().Where(p => p.CourseId.Equals(courseId)).ToListAsync();
                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -2;
                    result.ErrorMessage = "Khóa học này chưa có học viên!";
                    return result;
                }

                var existClassStudents = await _classStudentRepository.GetAll()
                    .Where(p => p.ClassId == theoryClass.ClassId).ToListAsync();

                var count = 0;
                foreach (var student in students)
                {
                    if (existClassStudents.Any(p => p.StudentId == student.StudentId)) continue;

                    var classStudent = new DB.Models.ClassStudent
                    {
                        ClassId = theoryClass.ClassId,
                        StudentId = student.StudentId
                    };
                    await _classStudentRepository.CreateAsync(classStudent);
                    count++;
                }

                result.Payload = count;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var student = await _studentRepository.GetAll()
                    .Where(p => p.StudentId == classStudentDTO.StudentId).FirstOrDefaultAsync();
                if (student == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy học viên";
                    return result;
                }

                var classDb = await _classRepository.GetAll()
                    .Where(p => p.ClassId == classStudentDTO.ClassId).FirstOrDefaultAsync();
                if (classDb == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy lớp học";
                    return result;
                }

                var existClassStudent = await _classStudentRepository.GetAll()
                    .Where(p => p.ClassId == classStudentDTO.ClassId 
                                && p.StudentId == classStudentDTO.StudentId)
                    .FirstOrDefaultAsync();
                if (existClassStudent != null)
                {
                    result.IsError = true;
                    result.Payload = -2;
                    result.ErrorMessage = "Học viên đã tồn tại trong lớp học";
                    return result;
                }

                var classStudent = _mapper.Map<DB.Models.ClassStudent>(classStudentDTO);
                classStudent.Status = true;
                await _classStudentRepository.CreateAsync(classStudent);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
