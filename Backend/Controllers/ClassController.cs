using Backend.Services.Class;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpGet("/api/Class")]
        public IActionResult GetAll() 
        {
            try
            {
                var classes = _classService.GetAllCllass();
                if (classes == null)
                {
                    return NotFound();
                }
                return Ok(classes);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpGet("/api/Class/{mentorId}")]
        public IActionResult GetClassByMentorId (int mentorId)
        {
            try
            {
                var classes = _classService.GetAllCllass().
                    Where(p => p.MentorId == mentorId).
                    Where(q => q.IsTheoryClass == false);
                if (classes == null)
                {
                    return NotFound();
                }
                return Ok(classes);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }
    }
}
