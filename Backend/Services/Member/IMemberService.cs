using Backend.DTO.Members;

namespace Backend.Services.Member
{
    public interface IMemberService
    {
        public ICollection<MemberDTO>? GetAllMember();
        Task<ServiceResult<MemberDTO>> GetMemberById(int userID);
        Task<ServiceResult<int>> AddMember(MemberCreateDTO memberCreateDTO);
    }
}
