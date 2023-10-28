using Backend.Services.Mentor;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MentorController : ControllerBase
    {
        private readonly IMentorService _mentorService;

        public MentorController(IMentorService mentorService)
        {
            _mentorService = mentorService;
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetMentorList()
        {
            var result = _mentorService.GetMentorList();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet]
        [Route("{mentorId}")]
        public async Task<IActionResult> GetMentorById(int mentorId)
        {
            var result = await _mentorService.GetMentorById(mentorId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        /*[HttpGet]
        [Route("course/{courseId}")]
        public Task<IActionResult> GetMentorByCourseId(string courseId)
        {
            var result = _mentorService.GetAllMentorsByCourseId(courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }*/
    }
}
