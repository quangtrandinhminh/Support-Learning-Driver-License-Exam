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

        public async Task<Curriculum?> GetByIdAsync(int id)
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

        public async Task<bool> AddAsync(Curriculum? curriculum)
        {
            try
            {
                await _dbSet.AddAsync(curriculum);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> UpdateAsync(Curriculum? curriculum)
        {
            try
            {
                _dbSet.Update(curriculum);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var curriculum = await _dbSet.FindAsync(id);
                _dbSet.Remove(curriculum);
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
