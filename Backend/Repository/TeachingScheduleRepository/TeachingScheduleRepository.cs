using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.TeachingScheduleRepository
{
    public class TeachingScheduleRepository : ITeachingScheduleRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<TeachingSchedule> _dbSet;

        public TeachingScheduleRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<TeachingSchedule>();
        }
        public IQueryable<TeachingSchedule>? GetAll()
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

        public async Task<TeachingSchedule?> CreateAsync(TeachingSchedule TeachingSchedule)
        {
            try
            {
                var result = await _dbSet.AddAsync(TeachingSchedule);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<TeachingSchedule?> UpdateAsync(TeachingSchedule TeachingSchedule)
        {
            try
            {
                var result = _dbSet.Update(TeachingSchedule);
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
