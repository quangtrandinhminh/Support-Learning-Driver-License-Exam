using Backend.DB.Models;

namespace Backend.Repository.MentorRepository
{
    public interface IMentorRepository
    {
        IQueryable<Mentor>? GetAll();

        Task<Mentor?> GetByIdAsync(int id);

        Task<Mentor?> CreateAsync(Mentor Mentor);

        Task<Mentor?> UpdateAsync(Mentor Mentor);
    }
}
