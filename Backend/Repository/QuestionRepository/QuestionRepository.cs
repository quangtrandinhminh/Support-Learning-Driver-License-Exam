using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.QuestionRepository
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Question> _dbSet;

        public QuestionRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Question>();
        }

        public IQueryable<Question>? GetAll()
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

        public async Task<Question?> GetByIdAsync(int id)
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

        public async Task<Question?> CreateAsync(Question question)
        {
            try
            {
                var result = await _dbSet.AddAsync(question);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Question?> UpdateAsync(Question question)
        {
            try
            {
                var result = _dbSet.Update(question);
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
