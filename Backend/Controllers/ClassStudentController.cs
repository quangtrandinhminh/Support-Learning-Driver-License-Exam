using Backend.DTO.ClassStudent;
using Backend.Services.ClassStudent;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassStudentController : Controller
    {
        private readonly IClassStudentService _classStudentService;
        public ClassStudentController(IClassStudentService classStudentService)
        {
            _classStudentService = classStudentService;
        }

        [HttpGet("/api/ClassStudent")]
        public IActionResult GetAll()
        {
            try
            {
                var classes = _classStudentService.GetAllCllassStudent();
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

        [HttpPost("/api/ClassStudent")]
        public async Task<ActionResult<int>> CreateClassStudent(ClassStudentDTO classStudentDTO)
        {
            var result = await _classStudentService.AddStudentIntoClass(classStudentDTO);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã thêm lớp học");
        }
    }
}