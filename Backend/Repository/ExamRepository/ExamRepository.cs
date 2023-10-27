using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.ExamRepository
{
    public class ExamRepository : IExamRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Exam> _dbSet;

        public ExamRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Exam>();
        }

        public IQueryable<Exam>? GetAll()
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

        public async Task<Exam?> GetByIdAsync(int id)
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

        public async Task<Exam?> CreateAsync(Exam exam)
        {
            try
            {
                var result = await _dbSet.AddAsync(exam);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Exam?> UpdateAsync(Exam exam)
        {
            try
            {
                var result = _dbSet.Update(exam);
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
