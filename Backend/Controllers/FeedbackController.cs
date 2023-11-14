using Backend.DTO.Feedback;
using Backend.DTO.Members;
using Backend.Repository.FeedBackRepository;
using Backend.Services.FeedBacks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedBackService _feedbackService;

        public FeedbackController(IFeedBackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet("/api/FeedBacks")]
        public IActionResult GetAll()
        {
            var members = _feedbackService.GetAllFeedBack().ToList();
            if (members == null)
            {
                return NotFound();
            }
            return Ok(members);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFeedBack(FeedBackDTO feedBackDTO)
        {
            var result = await _feedbackService.AddFeedBack(feedBackDTO);

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

            return Ok(new
            {
                message = "Add feedback successfully!",
                data = result.Payload // Include the object in the response
            });
        }
    }
}
