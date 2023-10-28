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
                var members = _memberRepository.GetAll().Include(m => m.User).ToList();
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
                var member = _memberRepository.GetAll()
                    .FirstOrDefault(p => p.UserId == userID);

                if (member is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Member is not exist";
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

        public int checkValidation(MemberDTO memberDTO)
        {
            var members = _memberRepository.GetAll().ToList();
            foreach (var member in members) 
            { 
                if (member.UserId.Equals(memberDTO.UserId))
                {
                    return e = 1;
                }

                if (member.IdentityCardNumber.Equals(memberDTO.IdentityCardNumber))
                {
                    return e = 2;
                }

                if (member.Passport.Equals(memberDTO.passport))
                {
                    return e = 3;
                }
            }
            return 0;
        }

        public async Task<ServiceResult<int>> AddMember(MemberDTO memberDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                int e = checkValidation(memberDTO);
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


                await _memberRepository.AddAsync(_mapper.Map<DB.Models.Member>(memberDTO));
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
