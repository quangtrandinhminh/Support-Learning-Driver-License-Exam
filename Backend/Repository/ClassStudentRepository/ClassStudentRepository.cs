using AutoMapper;
using Backend.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.ClassStudentRepository
{
    public class ClassStudentRepository : IClassStudentRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<DB.Models.ClassStudent> _dbSet;

        public ClassStudentRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<DB.Models.ClassStudent>();
        }

        public IQueryable<DB.Models.ClassStudent>? GetAll()
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

        public async Task<DB.Models.ClassStudent?> CreateAsync(Backend.DB.Models.ClassStudent classStudent)
        {
            try
            {
                var result = await _dbSet.AddAsync(classStudent);
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
