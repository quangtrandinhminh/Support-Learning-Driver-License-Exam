using Backend.DTO.Exam;
using Backend.Services.Exam;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamController(IExamService examService)
        {
            _examService = examService;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _examService.GetAll();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _examService.GetById(id);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create(ExamCreateDTO examDTO)
        {
            var result = await _examService.Create(examDTO);
            if (result.IsError)
            {
                if(result.Payload == -1)
                    return NotFound( new
                    {
                        error = result.ErrorMessage
                    });

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Tạo kì thi thành công !");
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(ExamDTO examDTO)
        {
            var result = await _examService.Update(examDTO);
            if (result.IsError)
            {
                if(result.Payload == -1)
                    return NotFound( new
                    {
                        error = result.ErrorMessage
                    });

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Cập nhật kì thi thành công !");
        }

        [HttpPatch("ChangeStatus/{id}")]
        public async Task<IActionResult> ChangStatus(int id)
        {
            var result = await _examService.ChangeStatus(id);
            if (result.IsError)
            {
                if(result.Payload == -1)
                    return NotFound( new
                    {
                        error = result.ErrorMessage
                    });

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Cập nhật trạng thái thành công!");
        }
    }
}
