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
    }
}
