using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.LessonRepository
{
    public class LessonRepository : ILessonRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Lesson> _dbSet;

        public LessonRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Lesson>();
        }

        public IQueryable<Lesson>? GetAll()
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

        public async Task<Lesson?> GetByIdAsync(int id)
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

        public async Task<Lesson?> CreateAsync(Lesson lesson)
        {
            try
            {
                var result = await _dbSet.AddAsync(lesson);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Lesson?> UpdateAsync(Lesson lesson)
        {
            try
            {
                var result = _dbSet.Update(lesson);
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
