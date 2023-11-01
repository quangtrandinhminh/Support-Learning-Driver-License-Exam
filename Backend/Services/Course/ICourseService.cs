using Backend.DTO.Course;

namespace Backend.Services.Course
{
    public interface ICourseService
    {
        ServiceResult<ICollection<CourseDTO>> GetAllCourses();

        ICollection<CourseDTO>? GetAll();

        ServiceResult<ICollection<CourseDTO>> GetInactiveCourses();

        ServiceResult<ICollection<CourseDTO>> GetCourseByMonth(int month, int year);

        Task<ServiceResult<CourseDTO>> GetCourseById(string id);

        Task<ServiceResult<int>> CreateCourse(CourseCreateDTO courseCreateDto);

        Task<ServiceResult<int>> UpdateCourse(CourseUpdateDTO courseUpdateDto);

        Task<ServiceResult> DeactivateCourse(string id);
    }
}
