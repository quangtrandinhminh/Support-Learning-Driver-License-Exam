using AutoMapper;
using Backend.DTO.Course;
using Backend.Repository.CourseRepository;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

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

        public ICollection<CourseDTO>? GetAll()
        {
            try
            {
                var courses = _courseRepository.GetAll();
                return courses is null ? null : _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public ServiceResult<ICollection<CourseDTO>> GetAllCourses()
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();
            try
            {
                var courses = _courseRepository.GetAll();
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

        public ServiceResult<ICollection<CourseDTO>> GetCourseByMonth(int month)
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();

            try
            {
                var courses = _courseRepository.GetAll().Where(p => p.CourseMonth == month);
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
                if (course == null)
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

        public async Task<ServiceResult<int>> CreateCourse(CourseRequestDTO courseRequestDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                if (courseRequestDto.EndDate < courseRequestDto.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "End date must be greater than start date";
                    result.Payload = -2;
                    return result;
                }

                var courseExist = await _courseRepository.GetByIdAsync(courseRequestDto.CourseId);
                if (courseExist != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course is already exist";
                    result.Payload = -1;
                    return result;
                } ;
                ;
                var course = _mapper.Map<DB.Models.Course>(courseRequestDto);
                course.CreateTime = DateTime.Now;
                course.CourseMonth = course.StartDate?.Month;
                course.CourseYear = course.StartDate?.Year;

                await _courseRepository.AddAsync(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> UpdateCourse(CourseRequestDTO courseRequestDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                if (courseRequestDto.EndDate < courseRequestDto.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "End date must be greater than start date";
                    result.Payload = -2;
                    return result;
                }

                var originalCourse = await _courseRepository.GetByIdAsync(courseRequestDto.CourseId);
                if (originalCourse == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course is not exist";
                    result.Payload = -1;
                    return result;
                }

                var course = _mapper.Map(courseRequestDto, originalCourse);
                course.CourseMonth = course.StartDate?.Month;
                course.CourseYear = course.StartDate?.Year;

                await _courseRepository.UpdateAsync(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
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
