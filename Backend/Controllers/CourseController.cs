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

        [HttpGet("/api/Course/courseMonth")]
        public IActionResult GetCourseByMonth(int month, int year)
        {
            var result =  _courseService.GetCourseByMonth(month, year);
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
        public async Task<IActionResult> AddCourse(CourseCreateDTO courseCreateDto)
        {
            var result = await _courseService.CreateCourse(courseCreateDto);

            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return Conflict(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }
            
            return Ok("Thêm khóa học thành công!");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCourse(CourseUpdateDTO courseUpdateDto)
        {
            var result = await _courseService.UpdateCourse(courseUpdateDto);

            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }


            return Ok("Cập nhật khóa học thành công!");
        }

        [HttpPatch("activate/{id}")]
        public async Task<IActionResult> ActivateCourse(string id)
        {
            var result = await _courseService.ActivateCourse(id);

            if (result.IsError)
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });

            return Ok("Đã kích hoạt khóa học!");
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

            return Ok("Đã xóa khóa học!");
        }
    }
}
