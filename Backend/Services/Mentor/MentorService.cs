using AutoMapper;
using Backend.DTO.Mentor;
using Backend.DTO.Staff;
using Backend.Repository.MentorRepository;
using Backend.Repository.UserRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Mentor
{
    public class MentorService : IMentorService
    {
        private readonly IMentorRepository _mentorRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public MentorService(IMentorRepository mentorRepository, IUserRepository userRepository, IMapper mapper)
        {
            _mentorRepository = mentorRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<MentorDTO>> GetMentorList()
        {
            var result = new ServiceResult<ICollection<MentorDTO>>();
            try
            {
                var mentors = _mentorRepository.GetAll()
                    .Include(m => m.User)
                    .ToList();

                if (!mentors.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giảng viên!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<MentorDTO>>(mentors);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<MentorDTO>> GetMentorById(int id)
        {
            var result = new ServiceResult<MentorDTO>();
            try
            {
                var mentor = await _mentorRepository.GetAll()
                    .Include(m => m.User)
                    .FirstOrDefaultAsync(m => m.MentorId == id && m.UserId == m.User.UserId);

                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giảng viên!";
                    return result;
                }

                result.Payload = _mapper.Map<MentorDTO>(mentor);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<MentorDTO>> GetMentorByUserId(int userId)
        {
            var result = new ServiceResult<MentorDTO>();
            try
            {
                var user = await _userRepository.GetAll()
                    .FirstOrDefaultAsync(u => u.UserId == userId && u.RoleId == 3);

                if (user == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giảng viên!";
                    return result;
                }

                var mentor = await _mentorRepository.GetAll()
                    .Include(s => s.User)
                    .FirstOrDefaultAsync(s => s.UserId == user.UserId);

                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giảng viên!";
                    return result;
                }

                result.Payload = _mapper.Map<MentorDTO>(mentor);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateMentor(MentorCreateDTO mentorCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var user = _userRepository.GetAll();

                var username = await user.FirstOrDefaultAsync(u => u.Username == mentorCreateDto.Username);
                if (username != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Tên đăng nhập đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }


                var email = await user.FirstOrDefaultAsync(u => u.Email == mentorCreateDto.Email);
                if (email != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Email đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }

                var phone = await user.FirstOrDefaultAsync(u => u.Phone == mentorCreateDto.Phone);
                if (phone != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Số điện thoại đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }


                var mentor = _mapper.Map<DB.Models.User>(mentorCreateDto);
                mentor.RoleId = 3;
                mentor.CreateTime = DateTime.Now;
                mentor.Status = true;

                mentor = await _userRepository.AddAsync(mentor);
                if (mentor != null)
                {
                    var newMentor = new DB.Models.Mentor()
                    {
                        UserId = mentor.UserId,
                    };
                    _mapper.Map(mentorCreateDto, newMentor);

                    await _mentorRepository.CreateAsync(newMentor);
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
                result.Payload = 0;
            }
            return result;
        }
    }
}
