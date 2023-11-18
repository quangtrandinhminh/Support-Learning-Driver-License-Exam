using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.CurriculumRepository
{
    public class CurriculumRepository : ICurriculumRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Curriculum> _dbSet;

        public CurriculumRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Curriculum>();
        }

        public IQueryable<Curriculum>? GetAll()
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
    }
}
