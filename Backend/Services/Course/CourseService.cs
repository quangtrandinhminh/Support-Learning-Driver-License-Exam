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

        public ICollection<CourseDTO>? GetCourses()
        {
            try
            {
                var courses = _courseRepository.GetAll();
                return courses is null || !courses.Any() ? null : _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<CourseDTO?>? GetCourseById(string id)
        {
            try
            {
                var course = await _courseRepository.GetAll()!.Where(c => c.CourseId.Equals(id)).FirstOrDefaultAsync();
                if (course is null)
                {
                    return null;
                }
                var courseDTO = _mapper.Map<CourseDTO>(course);
                return courseDTO;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
