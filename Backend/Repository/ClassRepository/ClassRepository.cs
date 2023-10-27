using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.ClassRepository
{
    public class ClassRepository : IClassRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Class> _dbSet;

        public ClassRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Class>();
        }

        public IQueryable<Class>? GetAll()
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

        public async Task<Class?> GetByIdAsync(int id)
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

        public async Task<Class?> CreateAsync(Class Class)
        {
            try
            {
                var result = await _dbSet.AddAsync(Class);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Class?> UpdateAsync(Class Class)
        {
            try
            {
                var result = _dbSet.Update(Class);
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
