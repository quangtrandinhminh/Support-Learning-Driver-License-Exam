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
        [HttpGet("news-list")]
        public IActionResult GetNewsList()
        {
            try
            {
                var newsList = _newsService.GetNewsList();
                if(newsList is null) return NotFound("There is not any news!");
                return Ok(newsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
