using Backend.DTO.CourseDetails;

namespace Backend.Services.CourseDetails
{
    public interface ICourseDetailsService
    {
        public ICollection<CourseDetailsDTO>? AllCourseDetails();
    }
}
