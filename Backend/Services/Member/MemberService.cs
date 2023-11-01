using AutoMapper;
using AutoMapper.Execution;
using Backend.DTO.Members;
using Backend.DTO.News;
using Backend.Repository.MemberRepository;
using Backend.Repository.UserRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Member
{
    public class MemberService : IMemberService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMemberRepository _memberRepository;
        private readonly IMapper _mapper;

        public MemberService(IMemberRepository memberRepository, IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _memberRepository = memberRepository;
            _mapper = mapper;
        }

        public ICollection<MemberDTO>? GetAllMember()
        {
            try
            {
                var members = _memberRepository.GetAll().
                    Include(c => c.User).ToList();
                return members is null ? null : _mapper.Map<ICollection<MemberDTO>>(members);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<MemberDTO>> GetMemberById(int userID)
        {
            var result = new ServiceResult<MemberDTO>();
            try
            {
                var member = _memberRepository.GetAll().
                    Include(c => c.User).ToList()
                    .FirstOrDefault(p => p.UserId == userID);

                if (member is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "User is not exist";
                    return result;
                }

                result.Payload = _mapper.Map<MemberDTO>(member);
            }
            catch (Exception e)
            {
                result.IsError = false;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public int checkValidation(MemberCreateDTO memberCreateDTO)
        {
            int e = 0;
            var members = _memberRepository.GetAll().ToList();
            foreach (var member in members) 
            { 
                if (member.UserId.Equals(memberCreateDTO.UserId))
                {
                    e = 1;
                }

                if (member.IdentityCardNumber.Equals(memberCreateDTO.IdentityCardNumber))
                {
                    e = 2;
                }
                var users = _userRepository.GetAll().ToList();
                foreach (var user in users) 
                { 
                    if (user.Phone.Equals(memberCreateDTO.Phone))
                    {
                        e = 3;
                    }
                }
            }
            return e;
        }

        public async Task<ServiceResult<int>> AddMember(MemberCreateDTO memberCreateDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                int e = checkValidation(memberCreateDTO);
                if (e == 1)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Bạn đã tạo hồ sơ đăng ký thi";
                    result.Payload = -1;
                    return result;
                }
                else if (e == 2) 
                {
                    result.IsError = true;
                    result.ErrorMessage = "Số cmnd đã tồn tại";
                    result.Payload = -2;
                    return result;
                }
                else if (e == 3)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Số điện thoại đã tồn tại";
                    result.Payload = -3;
                    return result;
                }

                var members = _mapper.Map<DB.Models.Member>(memberCreateDTO);
                members.RegistrationDate = DateTime.Now;
                var user = _userRepository.GetAll().Where(p => p.UserId == members.UserId).FirstOrDefault();
                user.FullName = memberCreateDTO.FullName;   
                user.Phone = memberCreateDTO.Phone;
                user.Email = memberCreateDTO.Email;
                await _userRepository.UpdateAsync(user);
                await _memberRepository.AddAsync(members);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
