using Backend.DB.Models;
using Backend.DTO.Curriculum;
using Backend.Services.Curriculum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurriculumController : ControllerBase
    {
        private readonly ICurriculumService _curriculumService;

        public CurriculumController(ICurriculumService curriculumService)
        {
            _curriculumService = curriculumService;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _curriculumService.GetAll();
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
        public async Task<IActionResult> CreateCurriculum([FromBody] CurriculumCreateDTO curriculumCreateDto)
        {
            var result = await _curriculumService.CreateCurriculum(curriculumCreateDto);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Thêm thành công!");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCurriculum([FromBody] CurriculumDTO curriculumDto)
        {
            var result = await _curriculumService.UpdateCurriculum(curriculumDto);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(result.ErrorMessage);
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Cập nhật thành công!");
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCurriculum(int id)
        {
            var result = await _curriculumService.DeleteCurriculum(id);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(result.ErrorMessage);
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã xóa");
        }
    }
}
