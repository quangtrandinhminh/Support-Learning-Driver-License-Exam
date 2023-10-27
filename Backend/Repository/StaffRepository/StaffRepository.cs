using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.StaffRepository
{
    public class StaffRepository : IStaffRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Staff> _dbSet;

        public StaffRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Staff>();
        }

        public IQueryable<Staff>? GetAll()
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

        public async Task<Staff?> GetByIdAsync(int id)
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

        public async Task<Staff?> CreateAsync(Staff Staff)
        {
            try
            {
                var result = await _dbSet.AddAsync(Staff);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Staff?> UpdateAsync(Staff Staff)
        {
            try
            {
                var result = _dbSet.Update(Staff);
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
