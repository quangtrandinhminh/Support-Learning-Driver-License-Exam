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
    }
}
