using AutoMapper;
using Backend.DTO.Users;
using Backend.Repository.UserRepository;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public ICollection<UserDTO>? GetUsers()
        {
            try
            {
                var users = _userRepository.GetAll();
                return users is null ? null : _mapper.Map<ICollection<UserDTO>>(users);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<UserDTO>> Login(string username)
        {
            var result = new ServiceResult<UserDTO>();
            try
            {
                var user = _userRepository.GetAll()
                    .Where(p => p.Username == username)
                    .FirstOrDefault();

                if (user is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "User is not exist";
                    return result;
                }
                else
                {
                    result.Payload = _mapper.Map<UserDTO>(user);
                }
            }
            catch (Exception e)
            {
                result.IsError = false;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}