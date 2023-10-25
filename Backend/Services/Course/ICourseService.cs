using Backend.DTO.Course;

namespace Backend.Services.Course
{
    public interface ICourseService
    {
        ServiceResult<ICollection<CourseDTO>> GetAllCourses();

        ServiceResult<ICollection<CourseDTO>> GetInactiveCourses();

        Task<ServiceResult<CourseDTO>> GetCourseById(string id);

        Task<ServiceResult<int>> CreateCourse(CourseRequestDTO courseRequestDto);

        Task<ServiceResult<int>> UpdateCourse(CourseRequestDTO courseRequestDto);

        Task<ServiceResult> DeactivateCourse(string id);
    }
}
