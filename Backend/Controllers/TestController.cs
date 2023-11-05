using Backend.DTO.Course;
using Backend.DTO.Test;
using Backend.DTO.Users;
using Backend.Services.Course;
using Backend.Services.Test;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _testService.GetAllTest();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCourse(TestCreateDTO testCreateDTO)
        {
            var result = await _testService.CreateTest(testCreateDTO);

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

            return Ok("Thêm bài thi thành công!");
        }
        [HttpGet("/api/TestByStudentId")]
        public async Task<IActionResult> GetMember(string studentId)
        {
            var result = await _testService.GetTestByStudentId(studentId);
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

        [HttpPut("editIsPass")]
        public async Task<IActionResult> UpdateIsPaid(string studentID)
        {
            var result = await _testService.CheckPassTest(studentID);

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

            return Ok("Update test successfully!");
        }
    }
}
