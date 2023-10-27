using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.TestRepository
{
    public class TestRepository : ITestRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Test> _dbSet;

        public TestRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Test>();
        }

        public IQueryable<Test>? GetAll()
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

        public async Task<Test?> GetByIdAsync(int id)
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

        public async Task<Test?> CreateAsync(Test test)
        {
            try
            {
                var result = await _dbSet.AddAsync(test);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Test?> UpdateAsync(Test test)
        {
            try
            {
                var result = _dbSet.Update(test);
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
