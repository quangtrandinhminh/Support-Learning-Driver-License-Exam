using Backend.DTO.News;
using Backend.Services.News;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        // GET: api/News
        [HttpGet("list")]
        public IActionResult GetAllNews()
        {
            var result = _newsService.GetNewsList();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        // GET: api/News/inactive-news
        [HttpGet("inactive-news")]
        public IActionResult GetAllActiveNews()
        {
            var result = _newsService.GetInactiveNewsList();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(int id)
        {
            var result = await _newsService.GetNewsById(id);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        // POST: api/News/post-news
        [HttpPost("add")]
        public async Task<IActionResult> PostNews(NewsCreateDTO newsCreateDto)
        {
            var result = await _newsService.PostNews(newsCreateDto);
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

            return Ok("Posted");
        }

        // Not available 
        // PUT: api/News/5
        [HttpPut("update")]
        public async Task<IActionResult> EditNews(NewsUpdateDTO newsUpdateDto)
        {
            var result = await _newsService.UpdateNews(newsUpdateDto);
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

            return Ok("Saved");
        }

        // DELETE: api/News/5
        [HttpDelete("deactivate/{id}")]
        public async Task<IActionResult> DeactivateNews(int id)
        {
            var result = await _newsService.DeactivateNews(id);
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

            return Ok("Saved");
        }
    }
}
