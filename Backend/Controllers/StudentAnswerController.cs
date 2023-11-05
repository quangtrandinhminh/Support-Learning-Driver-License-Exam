using Backend.DTO.Class;
using Backend.Services.StudentAnswer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAnswerController : ControllerBase
    {
        private readonly IStudentAnswerService _studentAnswerService;

        public StudentAnswerController(IStudentAnswerService studentAnswerService)
        {
            _studentAnswerService = studentAnswerService;
        }

        [HttpGet("/api/StudentAnswer")]
        public IActionResult GetAll()
        {
            try
            {
                var classes = _studentAnswerService.GetAllStudentAnswer();
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

        [HttpPost("/api/Create Student Answer/{studentID}")]
        public async Task<ActionResult<int>> CreateStudentQuestion(string studentID)
        {
            var result = await _studentAnswerService.CreateRandomQuestion(studentID);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã thêm câu hỏi bài thi");
        }
    }
}
