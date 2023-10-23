using AutoMapper;
using Backend.DTO.Course;
using Backend.Repository.CourseRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Course
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<CourseDTO>> GetAllCourses()
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();
            try
            {
                var courses = _courseRepository.GetAll().Where(x => x.Status == true);
                if (!courses.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "No course found!";
                }

                result.Payload = _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public ServiceResult<ICollection<CourseDTO>> GetInactiveCourses()
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();

            try
            {
                var courses = _courseRepository.GetAll().Where(x => x.Status == false);
                if (!courses.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "No course found!";
                }

                result.Payload = _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<CourseDTO>> GetCourseById(string id)
        {
            var result = new ServiceResult<CourseDTO>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(id);
                if (course is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course is not exist";
                    return result;
                }

                result.Payload = _mapper.Map<CourseDTO>(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult> CreateCourse(CourseDTO courseDTO)
        {
            var result = new ServiceResult();
            try
            {
                if (courseDTO.EndDate < courseDTO.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "End date must be greater than start date";
                    return result;
                }

                var course = _mapper.Map<DB.Models.Course>(courseDTO);
                course.CreateTime = DateTime.Now;

                await _courseRepository.AddAsync(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult> UpdateCourse(CourseDTO courseDTO)
        {
            var result = new ServiceResult();
            try
            {
                if (courseDTO.EndDate < courseDTO.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "End date must be greater than start date";
                    return result;
                }

                var course = _mapper.Map<DB.Models.Course>(courseDTO);
                await _courseRepository.UpdateAsync(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult> DeactivateCourse(string id)
        {
            var result = new ServiceResult();
            try
            {
                var course = await _courseRepository.GetByIdAsync(id);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course is not exist";
                    return result;
                }

                course.Status = false;
                await _courseRepository.UpdateAsync(course);
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
