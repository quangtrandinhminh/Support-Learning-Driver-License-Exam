using Backend.DB.Models;
using Backend.DTO.Mentor;
using Backend.Services;
using Backend.Services.Mentor;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.MentorRepository
{
    public class MentorRepository : IMentorRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Mentor> _dbSet;

        public MentorRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Mentor>();
        }

        public IQueryable<Mentor>? GetAll()
        {
            try
            {
                return _dbSet.AsQueryable();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Mentor?> GetByIdAsync(int id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Mentor?> CreateAsync(Mentor mentor)
        {
            try
            {
                var result = await _dbSet.AddAsync(mentor);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Mentor?> UpdateAsync(Mentor mentor)
        {
            try
            {
                var result = _dbSet.Update(mentor);
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
