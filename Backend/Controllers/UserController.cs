using Microsoft.AspNetCore.Mvc;
using Backend.Services.User;
using Backend.DTO.Members;
using Backend.DTO.Users;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("/api/Users")]
        public IActionResult GetAll()
        {
            try
            {
                var users = _userService.GetUsers();
                if (users == null)
                {
                    return NotFound();
                }
                return Ok(users);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpPost("/api/login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            try
            {
                var user = await _userService.Login(username, password);
                if (user is null)
                {
                    return NotFound();
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserCreateDTO userCreateDTO)
        {
            var result = await _userService.AddUser(userCreateDTO);

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

            return Ok("Create Account Successfully!");
        }
    }
}