using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Class;
using Backend.DTO.CourseDetails;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.CourseDetailsRepository;
using Backend.Repository.CourseRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Class
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly IMapper _mapper;

        public ClassService(IClassRepository classRepository
            , ICourseRepository courseRepository
            , IClassStudentRepository classStudentRepository
            , IMapper mapper)
        {
            _classRepository = classRepository;
            _courseRepository = courseRepository;
            _classStudentRepository = classStudentRepository;
            _mapper = mapper;
        }

        public ICollection<ClassDTO> GetAllClass()
        {
            try
            {
                var classes = _classRepository.GetAll();
                return classes is null ? null : _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public ServiceResult<ICollection<ClassDTO>> GetAllClassesByCourseId(string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = _courseRepository.GetByIdAsync(courseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    return result;
                }

                var classes = _classRepository.GetAll()
                    .Where(x => x.Status == true && x.CourseId == courseId && x.IsTheoryClass == false)
                    .ToList();

                if (!classes.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lớp học!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // get all class by mentor id in a course
        public async Task<ServiceResult<ICollection<ClassDTO>>> GetAllClassesByMentorId(int mentorId, string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(courseId);
                if (course == null) throw new Exception("Không tìm thấy khóa học!");

                // get all class by mentor id in a course,  



                var classes = await _classRepository.GetAll() 
                    .Where(x => x.Status == true && x.CourseId == courseId && x.MentorId == mentorId)
                    .ToListAsync();

                if (!classes.Any()) throw new Exception("Không tìm thấy lớp học!");

                // foreach class dont have classStudent, exclude it from classes
                var classStudents = await _classStudentRepository.GetAll().ToListAsync();
                var classIds = classStudents.Select(x => x.ClassId).ToList();
                classes = classes.Where(x => classIds.Contains(x.ClassId)).ToList();

                result.Payload = _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }


        public async Task<ServiceResult<int>> CreateClass(ClassCreateDTO classCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(classCreateDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    result.Payload = -1;
                    return result;
                }

                var newClass = _mapper.Map<DB.Models.Class>(classCreateDto);
                await _classRepository.CreateAsync(newClass);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateClassByMentor(ClassDTO classDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(classDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    result.Payload = -1;
                    return result;
                }

                var newClass = _mapper.Map<DB.Models.Class>(classDto);
                newClass.IsTheoryClass = false;
                await _classRepository.CreateAsync(newClass);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
