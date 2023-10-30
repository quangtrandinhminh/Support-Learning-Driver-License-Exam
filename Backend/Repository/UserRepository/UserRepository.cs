using Microsoft.EntityFrameworkCore;
using Backend.DB.Models;

namespace Backend.Repository.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly DrivingLicenseContext _context;
        private readonly DbSet<User> _dbSet;

        public UserRepository(DrivingLicenseContext context)
        {
            _context = context;
            _dbSet = _context.Set<User>(); 
        }

        public IQueryable<User>? GetAll()
        {
            try
            {
                var users = _dbSet.AsQueryable().Where(u => u.Status == true);
                return users;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<User> AddAsync(User? user)
        {
            try
            {
                var result = await _dbSet.AddAsync(user);
                await _context.SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<User?> UpdateAsync(User user)
        {
            try
            {
                var result = _dbSet.Update(user);
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
