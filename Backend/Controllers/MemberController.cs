using Backend.DTO.Course;
using Backend.DTO.Members;
using Backend.Repository.UserRepository;
using Backend.Services.Member;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : Controller
    {
        private readonly IMemberService _memberService;
        private readonly IUserRepository _userRepository;

        public MemberController(IMemberService memberService,
            IUserRepository userRepository)
        {
            _memberService = memberService;
            _userRepository = userRepository;
        }

        [HttpGet("/api/Members")]
        public IActionResult GetAll()
        {
            var members = _memberService.GetAllMember().ToList();
            if (members == null)
            {
                return NotFound();
            }
            return Ok(members);
        }

        [HttpPost("/api/Member")]
        public async Task<IActionResult> GetMember(int userID)
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

        [HttpPost("add")]
        public async Task<IActionResult> AddMember(MemberCreateDTO memberCreateDTO)
        {
            var result = await _memberService.AddMember(memberCreateDTO);

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

            return Ok(new {
                message = "Add member successfully!",
                data = result.Payload // Include the object in the response
            });
        }

        [HttpPut("editIsPaid")]
        public async Task<IActionResult> UpdateIsPaid(int memberId)
        {
            var result = await _memberService.UpdateIsPaid(memberId);

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

            return Ok("Update member successfully!");
        }
    }
}
