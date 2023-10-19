using Backend.DB.Models;

namespace Backend.Repository.CourseRepository
{
    public interface ICourseRepository
    {
        IQueryable<Course>? GetAll();
    }
}
