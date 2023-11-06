using Backend.DB.Models;

namespace Backend.Repository.MemberRepository
{
    public interface IMemberRepository
    {
        public IQueryable<Member>? GetAll();

        public Task<Member?> GetMemberById(int memberId);
        public Task<bool> AddAsync(Member? member);
        Task<bool> UpdateAsync(Member member);
    }
}
