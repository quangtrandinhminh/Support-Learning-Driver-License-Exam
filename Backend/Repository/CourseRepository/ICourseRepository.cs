using Backend.DB.Models;

namespace Backend.Repository.CourseRepository
{
    public interface ICourseRepository
    {
        IQueryable<Course>? GetAll();

        Task<Course?> GetByIdAsync(string id);

        Task<bool> AddAsync(Course course);

        Task<bool> UpdateAsync(Course course);
    }
}
