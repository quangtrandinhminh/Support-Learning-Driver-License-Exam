using Backend.Services.Course;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("courses")]
        public IActionResult GetAll()
        {
            try
            {
                var courses = _courseService.GetCourses();
                if (courses is null)
                {
                    return NotFound("No courses found !");
                }
                return Ok(courses);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(string id)
        {
            try
            {
                var course = await _courseService.GetCourseById(id)!;
                if (course is null)
                {
                    return NotFound("The course is not exist!");
                }

                return Ok(course);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
