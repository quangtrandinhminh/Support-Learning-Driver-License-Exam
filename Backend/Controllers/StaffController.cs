using Backend.DTO.Staff;
using Backend.Services.Staff;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;

        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetStaffList()
        {
            var result = _staffService.GetStaffList();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet]
        [Route("{staffId}")]
        public async Task<IActionResult> GetStaffById(int staffId)
        {
            var result = await _staffService.GetStaffById(staffId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<IActionResult> GetStaffByUserId(int userId)
        {
            var result = await _staffService.GetStaffByUserId(userId);
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
        public async Task<IActionResult> AddStaff(StaffCreateDTO staffCreateDto)
        {
            var result = await _staffService.CreateStaff(staffCreateDto);
            if (result.IsError)
            {
                if (result.Payload == -2)
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

            return Ok("Thêm Staff thành công!");
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateStaff(StaffUpdateDTO staffUpdateDto)
        {
            var result = await _staffService.UpdateStaff(staffUpdateDto);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Cập nhật Staff thành công!");
        }

        [HttpDelete]
        [Route("delete/{staffId}")]
        public async Task<IActionResult> DeleteStaff(int staffId)
        {
            var result = await _staffService.DeleteStaff(staffId);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Xóa Staff thành công!");
        }
    }
}
