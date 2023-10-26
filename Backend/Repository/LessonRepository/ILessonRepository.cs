using Backend.DB.Models;

namespace Backend.Repository.LessonRepository
{
    public interface ILessonRepository
    {
        IQueryable<Lesson>? GetAll();

        Task<Lesson?> GetByIdAsync(int id);

        Task<Lesson?> CreateAsync(Lesson lesson);

        Task<Lesson?> UpdateAsync(Lesson lesson);
    }
}
