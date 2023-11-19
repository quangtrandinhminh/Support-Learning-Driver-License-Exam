using Backend.DTO.CourseContent;

namespace Backend.Services.CourseContent
{
    public interface ICourseContentService
    {
        ServiceResult<ICollection<CourseContentDTO>> GetAll();
    }
}
