using Backend.Services.Member;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class MemberController : Controller
    {
        private readonly IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet("Members")]
        public IActionResult GetAll()
        {
            var members = _memberService.GetAllMember();
            if (members == null)
            {
                return NotFound();
            }
            return Ok(members);
        }

        [HttpPost("/Member")]
        public async Task<IActionResult> GetMemberById(int userID)
        {
            var result = await _memberService.GetMemberById(userID);
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
    }
}
