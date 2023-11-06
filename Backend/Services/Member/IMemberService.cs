using Backend.DTO.Members;
using Backend.DTO.Users;

namespace Backend.Services.Member
{
    public interface IMemberService
    {
        public ICollection<MemberDTO>? GetAllMember();
        Task<ServiceResult<MemberDTO>> GetMemberById(int memberId);

        Task<ServiceResult<MemberDTO>> GetMemberByUserId(int userID);
        Task<ServiceResult<int>> AddMember(MemberCreateDTO memberCreateDTO);
        Task<ServiceResult<int>> UpdateIsPaid(int memberID);
    }
}
