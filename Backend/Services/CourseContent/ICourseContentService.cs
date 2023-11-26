using Backend.DTO.Course;
using Backend.DTO.CourseContent;

namespace Backend.Services.CourseContent
{
    public interface ICourseContentService
    {
        ServiceResult<ICollection<CourseContentDTO>> GetAll();
        Task<ServiceResult<int>> CreateCourseContent(CourseContentCreate courseContentCreate);
        Task<ServiceResult<int>> UpdateCourseContent(CourseContentCreate courseContentCreate);
        Task<ServiceResult> DeactivateCourseContent(int id);
    }
}
