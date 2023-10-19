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
                var news = _dbSet.AsQueryable().Where(n=> n.Status == true);
                return news;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
