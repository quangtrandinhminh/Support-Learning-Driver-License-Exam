using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.StudentRepository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<Student> _dbSet;

        public StudentRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<Student>();
        }

        public IQueryable<Student>? GetAll()
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

        public async Task<Student?> GetByIdAsync(int id)
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

        public async Task<Student?> CreateAsync(Student student)
        {
            try
            {
                var result = await _dbSet.AddAsync(student);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Student?> UpdateAsync(Student student)
        {
            try
            {
                var result = _dbSet.Update(student);
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
