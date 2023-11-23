using Backend.DTO.Course;
using Backend.DTO.CourseContent;
using Backend.Services.CourseContent;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseContentController : Controller
    {
        private readonly ICourseContentService _courseContentService;

        public CourseContentController(ICourseContentService courseContentService)
        {
            _courseContentService = courseContentService;
        }

        [HttpGet("/api/CourseContent")]
        public IActionResult GetAllCourseDetails()
        {
            try
            {
                var result = _courseContentService.GetAll();
                if (result.IsError)
                {
                    return NotFound();
                }
                return Ok(result.Payload);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCourseContent(CourseContentCreate courseContentCreate)
        {
            var result = await _courseContentService.CreateCourseContent(courseContentCreate);

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

            return Ok("Thêm thông tin khóa học thành công!");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCourseContent(CourseContentCreate courseContentCreate)
        {
            var result = await _courseContentService.UpdateCourseContent(courseContentCreate);

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

            return Ok("Cập nhật thông tin khóa học thành công");
        }

        [HttpDelete("deactivate/{id}")]
        public async Task<IActionResult> DeactivateCourse(int id)
        {
            var result = await _courseContentService.DeactivateCourseContent(id);

            if (result.IsError)
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });

            return Ok("Đã xóa thông tin khóa học!");
        }
    }
}
