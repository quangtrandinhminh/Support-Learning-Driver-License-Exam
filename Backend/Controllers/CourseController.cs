using Backend.DTO.Course;
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

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _courseService.GetAllCourses();
            if (result.IsError)
            {
                return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
            }

            return Ok(result.Payload);
        }

        [HttpGet("inactive-courses")]
        public IActionResult GetInactiveCourses()
        {
            var result = _courseService.GetInactiveCourses();
            if (result.IsError)
            {
                return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
            }

            return Ok(result.Payload);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(string id)
        {
            var result = await _courseService.GetCourseById(id);
            if (result.IsError)
            {
                return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
            }

            return Ok(result.Payload);

        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCourse(CourseDTO courseDTO)
        {
            var result = await _courseService.CreateCourse(courseDTO);

            if (result.IsError)
                return BadRequest(new
                    {
                        error = result.ErrorMessage
                    });
            

            return Ok("Add course successfully!");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCourse(CourseDTO courseDTO)
        {
            var result = await _courseService.UpdateCourse(courseDTO);

            if (result.IsError)
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });

            return Ok("Update course successfully!");
        }

        [HttpDelete("deactivate/{id}")]
        public async Task<IActionResult> DeactivateCourse(string id)
        {
            var result = await _courseService.DeactivateCourse(id);

            if (result.IsError)
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });

            return Ok("Delete course successfully!");
        }
    }
}
