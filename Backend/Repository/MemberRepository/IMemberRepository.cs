using Backend.DB.Models;

namespace Backend.Repository.MemberRepository
{
    public interface IMemberRepository
    {
        public IQueryable<Member>? GetAll();

        public Task<Member> AddAsync(Member? member);
    }
}
