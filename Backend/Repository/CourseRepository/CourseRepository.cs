using Backend.DB;
using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.CourseRepository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Course> _dbSet;

        public CourseRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Course>();
        }

        public IQueryable<Course>? GetAll()
        {
            try
            {
                var courses = _dbSet.AsQueryable().Where(u => u.Status == true);
                return courses;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Course?> GetByIdAsync(string id)
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

        public async Task<bool> AddAsync(Course? course)
        {
            try
            {
                await _dbSet.AddAsync(course);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(Course? course)
        {
            try
            {
                _dbSet.Update(course);
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
