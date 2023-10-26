using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.FeedbackRepository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Feedback> _dbSet;

        public FeedbackRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Feedback>();
        }

        public IQueryable<Feedback>? GetAll()
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

        public async Task<Feedback?> GetByIdAsync(int id)
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

        public async Task<Feedback?> CreateAsync(Feedback feedback)
        {
            try
            {
                var result = await _dbSet.AddAsync(feedback);
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
