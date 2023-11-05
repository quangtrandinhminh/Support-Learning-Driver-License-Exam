using Backend.Repository.StudentRepository;
using Backend.Services.Student;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("/api/Students")]
        public IActionResult GetAll()
        {
            try
            {
                var students = _studentService.GetAllStudent();
                if (students == null)
                {
                    return NotFound();
                }
                return Ok(students);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpGet("/api/Student/{memberId}")]
        public async Task<IActionResult> GetMember(int memberId)
        {
            var result = await _studentService.GetStudentById(memberId);
            if (result.IsError)
            {
                return NotFound(
                    new
                    {
                        error = result.ErrorMessage
                    });
            }

            return Ok(result.Payload);
        }

        [HttpGet("/api/{courseId}")]
        public IActionResult GetStudentByCourseId(string courseId)
        {
            try
            {
                var students = _studentService.GetAllStudent().
                    Where(p => p.CourseId.Equals(courseId));
                if (students == null)
                {
                    return NotFound();
                }
                return Ok(students);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }
    }
}
