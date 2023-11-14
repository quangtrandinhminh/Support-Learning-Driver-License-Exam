using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.FeedBackRepository
{
    public class FeedBackRepository : IFeedBackRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<FeedBack> _dbSet;

        public FeedBackRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<FeedBack>();
        }

        public IQueryable<FeedBack>? GetAll()
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

        public async Task<bool> AddAsync(FeedBack? feedBack)
        {
            try
            {
                await _dbSet.AddAsync(feedBack);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(FeedBack? feedBack)
        {
            try
            {
                _dbSet.Update(feedBack);
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
