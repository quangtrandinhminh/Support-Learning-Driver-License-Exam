using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.StudentAnswerRepository
{
    public class StudentAnswerRepository : IStudentAnswerRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<StudentAnswer> _dbSet;

        public StudentAnswerRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<StudentAnswer>();
        }

        public IQueryable<StudentAnswer>? GetAll()
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

        public async Task<StudentAnswer?> GetByIdAsync(int id)
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

        public async Task<StudentAnswer?> CreateAsync(StudentAnswer studentAnswer)
        {
            try
            {
                var result = await _dbSet.AddAsync(studentAnswer);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<StudentAnswer?> UpdateAsync(StudentAnswer studentAnswer)
        {
            try
            {
                var result = _dbSet.Update(studentAnswer);
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
