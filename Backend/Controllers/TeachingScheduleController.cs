using Backend.Services.TeachingSchedule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachingScheduleController : ControllerBase
    {
        private readonly ITeachingScheduleService _teachingScheduleService;

        public TeachingScheduleController(ITeachingScheduleService teachingScheduleService)
        {
            _teachingScheduleService = teachingScheduleService;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _teachingScheduleService.GetAllTeachingSchedules();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("course/{courseId}")]
        public IActionResult GetByCourseId(string courseId)
        {
            var result = _teachingScheduleService.GetTeachingScheduleByCourseId(courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("GetByMentorAndCourse/{courseId}/{mentorId}")]
        public IActionResult GetByMentorAndCourse(string courseId, int mentorId)
        {
            var result = _teachingScheduleService.GetTeachingScheduleByMentorIdAndCourseId(mentorId, courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }
    }
}
