using Backend.DB.Models;

namespace Backend.Repository.CourseContentRepository
{
    public interface ICourseContentRepository
    {
        IQueryable<CourseContent>? GetAll();

        Task<CourseContent?> GetByIdAsync(string id);

        Task<bool> AddAsync(CourseContent courseContent);

        Task<bool> UpdateAsync(CourseContent courseContent);
    }
}
