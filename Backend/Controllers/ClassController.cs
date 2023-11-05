using Backend.DTO.Class;
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
                var classes = _classService.GetAllClass();
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
                var classes = _classService.GetAllClass().
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

        [HttpGet("course/{courseId}")]
        public ActionResult<ICollection<ClassDTO>> GetAllClassesByCourseId(string courseId)
        {
            var result = _classService.GetAllClassesByCourseId(courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<int>> CreateClass(ClassCreateDTO classCreateDto)
        {
            var result = await _classService.CreateClass(classCreateDto);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã thêm lớp học");
        }

        [HttpPost]
        [Route("addByMentor")]
        public async Task<ActionResult<int>> CreateClassByMentor(ClassDTO classDto)
        {
            var result = await _classService.CreateClassByMentor(classDto);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã đăng kí lịch thành công");
        }
    }
}
