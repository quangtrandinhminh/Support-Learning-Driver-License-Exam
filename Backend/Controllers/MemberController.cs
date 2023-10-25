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

        [HttpGet("Member")]
        public IActionResult GetAll()
        {
            try
            {
                var members = _memberService.GetAllMember();
                if (members == null)
                {
                    return NotFound();
                }
                return Ok(members);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpPost("/Member")]
        public async Task<IActionResult> GetMember(int userID)
        {
            try
            {
                var member = await _memberService.MemberInformation(userID);
                if (member is null)
                {
                    return NotFound();
                }

                return Ok(member);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
