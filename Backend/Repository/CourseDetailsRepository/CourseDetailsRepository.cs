using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.CourseDetailsRepository
{
    public class CourseDetailsRepository : ICourseDetailsRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<CourseDetail> _dbSet;

        public CourseDetailsRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<CourseDetail>();
        }

        public IQueryable<CourseDetail>? GetAll()
        {
            try
            {
                var courseDetails = _dbSet.AsQueryable().Where(u => u.Status == true);
                return courseDetails;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<CourseDetail?> CreateAsync(CourseDetail courseDetail)
        {
            try
            {
                var result = await _dbSet.AddAsync(courseDetail);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<CourseDetail?> UpdateAsync(CourseDetail courseDetail)
        {
            try
            {
                var result = _dbSet.Update(courseDetail);
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
