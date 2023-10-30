using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.MemberRepository
{
    public class MemberRepository : IMemberRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Member> _dbSet;

        public MemberRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Member>();
        }

        public IQueryable<Member>? GetAll()
        {
            try
            {
                var members = _dbSet.AsQueryable();
                return members;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Member> AddAsync(Member? member)
        {
            try
            {
                var result = await _dbSet.AddAsync(member);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
