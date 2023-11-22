using Backend.DTO.CourseDetails;

namespace Backend.Services.CourseDetails
{
    public interface ICourseDetailsService
    {
        public ICollection<CourseDetailsDTO>? GetAllCourseDetails();
        Task<ServiceResult<int>> CreateCourseDetails(ICollection<CourseDetailsCreateDTO> courseDetailsCreateDto);

        Task<ServiceResult<ICollection<CourseDetailsDTO>>> GetCourseDetailsByCourse(string courseId);
    }
}
