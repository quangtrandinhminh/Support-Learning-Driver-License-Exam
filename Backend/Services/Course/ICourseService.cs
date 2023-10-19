using Backend.DTO.Course;

namespace Backend.Services.Course
{
    public interface ICourseService
    {
        ICollection<CourseDTO>? GetCourses();

        Task<CourseDTO?>? GetCourseById(string id);
    }
}
