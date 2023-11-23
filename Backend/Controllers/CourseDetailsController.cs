using Backend.DTO.Course;
using Backend.DTO.CourseDetails;
using Backend.Services.Course;
using Backend.Services.CourseDetails;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseDetailsController : Controller
    {
        private readonly ICourseDetailsService _courseDetailsService;
        private readonly ICourseService _courseService;

        public CourseDetailsController(ICourseDetailsService courseDetailsService, ICourseService courseService)
        {
            _courseDetailsService = courseDetailsService;
            _courseService = courseService;
        }

        [HttpGet("/api/CourseDetails")]
        public IActionResult GetAllCourseDetails()
        {
            try
            {
                var courseDetails = _courseDetailsService.GetAllCourseDetails();
                if (courseDetails == null)
                {
                    return NotFound();
                }
                return Ok(courseDetails);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpGet("/api/CourseDetail")]
        public IActionResult GetCourseDetailsByCourseMonth(int courseMonth)
        {
            try
            {
                var courseDetails = _courseDetailsService.GetAllCourseDetails().
                    Where(p => p.CourseMonth == courseMonth);
                if (courseDetails == null)
                {
                    return NotFound();
                }
                return Ok(courseDetails);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpGet("/api/CourseDetail/{courseId}")]
        public async Task<IActionResult> GetCourseDetailsByCourse(string courseId)
        {
            var result = await _courseDetailsService.GetCourseDetailsByCourse(courseId);
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
        public async Task<IActionResult> AddCourse(ICollection<CourseDetailsCreateDTO> courseDetailsCreateDto)
        {
            var result = await _courseDetailsService.CreateCourseDetails(courseDetailsCreateDto);

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

            return Ok("Thêm chi tiết khóa học thành công!");
        }


    }
}
