using Backend.DTO.Course;

namespace Backend.Services.Course
{
    public interface ICourseService
    {
        ServiceResult<ICollection<CourseDTO>> GetAllCourses();

        ServiceResult<ICollection<CourseDTO>> GetInactiveCourses();

        Task<ServiceResult<CourseDTO>> GetCourseById(string id);

        Task<ServiceResult> CreateCourse(CourseDTO courseDTO);

        Task<ServiceResult> UpdateCourse(CourseDTO courseDTO);

        Task<ServiceResult> DeactivateCourse(string id);
    }
}
