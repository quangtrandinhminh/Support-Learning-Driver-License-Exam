using Backend.DB.Models;

namespace Backend.Repository.ClassRepository
{
    public interface IClassRepository
    {
        IQueryable<Class>? GetAll();

        Task<Class?> GetByIdAsync(int id);

        Task<Class?> CreateAsync(Class Class);

        Task<Class?> UpdateAsync(Class Class);
    }
}
