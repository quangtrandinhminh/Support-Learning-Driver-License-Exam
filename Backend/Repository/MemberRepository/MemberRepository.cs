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

        public async Task<bool> AddAsync(Member? member)
        {
            try
            {
                await _dbSet.AddAsync(member);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(Member? member)
        {
            try
            {
                _dbSet.Update(member);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
