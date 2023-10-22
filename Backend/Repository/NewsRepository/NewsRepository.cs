using Backend.DB;
using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.NewsRepository
{
    public class NewsRepository : INewsRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<News> _dbSet;

        public NewsRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<News>();
        }

        public IQueryable<News>? GetAll()
        {
            try
            {
                var news = _dbSet.AsQueryable();
                return news;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<News?> GetByIdAsync(int id)
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

        public async Task<News?> CreateAsync(News news)
        {
            try
            {
                var result = await _dbSet.AddAsync(news);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<News?> UpdateAsync(News news)
        {
            try
            {
                var result = _dbSet.Update(news);
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
