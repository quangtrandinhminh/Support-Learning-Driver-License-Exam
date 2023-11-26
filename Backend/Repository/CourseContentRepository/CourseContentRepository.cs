using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.CourseContentRepository
{
    public class CourseContentRepository : ICourseContentRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<CourseContent> _dbSet;

        public CourseContentRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<CourseContent>();
        }

        public IQueryable<CourseContent>? GetAll()
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

        public async Task<CourseContent?> GetByIdAsync(string id)
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

        public async Task<bool> AddAsync(CourseContent? courseContent)
        {
            try
            {
                await _dbSet.AddAsync(courseContent);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(CourseContent? courseContent)
        {
            try
            {
                _dbSet.Update(courseContent);
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
