using Backend.DTO.Course;

namespace Backend.Services.Course
{
    public interface ICourseService
    {
        ServiceResult<ICollection<CourseDTO>> GetAllCourses();
        ICollection<CourseDTO>? GetAll();
        ServiceResult<ICollection<CourseDTO>> GetInactiveCourses();
        ServiceResult<ICollection<CourseDTO>> GetCourseByMonth(int month);

        Task<ServiceResult<CourseDTO>> GetCourseById(string id);

        Task<ServiceResult> CreateCourse(CourseDTO courseDTO);

        Task<ServiceResult> UpdateCourse(CourseDTO courseDTO);

        Task<ServiceResult> DeactivateCourse(string id);
    }
}
