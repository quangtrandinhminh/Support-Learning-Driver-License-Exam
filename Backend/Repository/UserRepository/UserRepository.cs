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

        public async Task<bool> AddAsync(User? user)
        {
            try
            {
                await _dbSet.AddAsync(user);
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
