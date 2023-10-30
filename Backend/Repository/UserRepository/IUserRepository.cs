using Backend.DB.Models;

namespace Backend.Repository.UserRepository
{
    public interface IUserRepository
    {
        public IQueryable<User>? GetAll();
        public Task<User> AddAsync(User? user);
    }
}
