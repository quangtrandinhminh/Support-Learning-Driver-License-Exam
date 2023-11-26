using Backend.DB.Models;

namespace Backend.Repository.CurriculumRepository
{
    public interface ICurriculumRepository
    {
        IQueryable<Curriculum>? GetAll();

        Task<Curriculum?> GetByIdAsync(int id);

        Task<bool> AddAsync(Curriculum? curriculum);

        Task<bool> UpdateAsync(Curriculum? curriculum);

        Task<bool> DeleteAsync(int id);
    }
}
