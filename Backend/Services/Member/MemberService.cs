using AutoMapper;
using AutoMapper.Execution;
using Backend.DTO.Members;
using Backend.Repository.MemberRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Member
{
    public class MemberService : IMemberService
    {
        int e;
        private readonly IMemberRepository _memberRepository;
        private readonly IMapper _mapper;

        public MemberService(IMemberRepository memberRepository, IMapper mapper)
        {
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
            var members = _memberRepository.GetAll().ToList();
            foreach (var member in members) 
            { 
                if (member.UserId.Equals(memberCreateDTO.UserId))
                {
                    return e = 1;
                }

                if (member.IdentityCardNumber.Equals(memberCreateDTO.IdentityCardNumber))
                {
                    return e = 2;
                }

                if (member.Passport.Equals(memberCreateDTO.passport))
                {
                    return e = 3;
                }
                return e = 0;
            }
            return 0;
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
                    result.ErrorMessage = "Passport đã tồn tại";
                    result.Payload = -3;
                    return result;
                }


                await _memberRepository.AddAsync(_mapper.Map<DB.Models.Member>(memberCreateDTO));
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
