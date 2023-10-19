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
                var courses = _dbSet.AsQueryable();
                return courses;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
