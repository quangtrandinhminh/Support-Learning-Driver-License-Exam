using AutoMapper;
using Backend.DTO.ClassStudent;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.CourseRepository;
using Backend.Repository.StudentRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.ClassStudent
{
    public class ClassStudentService : IClassStudentService
    {
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IClassRepository _classRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public ClassStudentService(IClassStudentRepository classStudentRepository
            , ICourseRepository courseRepository
            , IClassRepository classRepository
            , IStudentRepository studentRepository
            , IMapper mapper)
        {
            _classStudentRepository = classStudentRepository;
            _courseRepository = courseRepository;
            _classRepository = classRepository;
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public ICollection<ClassStudentDTO> GetAllCllassStudent()
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

        public async Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var student = _studentRepository.GetAll()
                    .Where(p => p.StudentId == classStudentDTO.StudentId).FirstOrDefault();
                if (student != null) 
                {
                    var classStudents = _classStudentRepository.GetAll().
                    Where(p => p.StudentId == classStudentDTO.StudentId && p.ClassId == classStudentDTO.ClassId).
                    FirstOrDefault();
                    if (classStudents == null)
                    {
                        var classStudent = _mapper.Map<DB.Models.ClassStudent>(classStudentDTO);
                        await _classStudentRepository.CreateAsync(classStudent);
                    }
                    else if (classStudents.Class.IsTheoryClass == true)
                    {
                        result.IsError = true;
                        result.Payload = -1;
                        result.ErrorMessage = "Học viên này đã đăng ký lớp học lý thuyết!";
                    }
                    else
                    {
                        result.IsError = true;
                        result.Payload = -2;
                        result.ErrorMessage = "Học viên này đã đăng ký lớp học thực hành";
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
        public async Task<ServiceResult<int>> AddAllStudentIntoClass(string courseId, int classId)
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

                var existClass = await _classRepository.GetAll().Where(p => p.ClassId == classId).FirstOrDefaultAsync();
                if (existClass == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy lớp học";
                    return result;
                }

                var students = await _studentRepository.GetAll().Where(p => p.CourseId == courseId).ToListAsync();
                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -2;
                    result.ErrorMessage = "Khóa học này chưa có học viên!";
                    return result;
                }

                var existClassStudents = await _classStudentRepository.GetAll().Where(p => p.ClassId == classId).ToListAsync();

                var count = 0;
                foreach (var student in students)
                {
                    if(existClassStudents.Any(p => p.StudentId == student.StudentId)) continue;

                    var classStudent = new DB.Models.ClassStudent
                    {
                        ClassId = existClass.ClassId,
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
    }
}
