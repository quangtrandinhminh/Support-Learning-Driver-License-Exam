using Microsoft.AspNetCore.Mvc;
using Backend.Services.User;

namespace Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Users")]
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

        [HttpGet("/User")]
        public async Task<IActionResult> GetUser(string username)
        {
            try
            {
                var user = await _userService.Login(username);
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

        [HttpPost("/login")]
        public async Task<IActionResult> Login(string username)
        {
            try
            {
                var user = await _userService.Login(username);
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
    }
}