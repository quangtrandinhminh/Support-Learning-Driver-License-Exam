using Backend.DB.Models;

namespace Backend.Repository.CourseDetailsRepository
{
    public interface ICourseDetailsRepository
    {
        public IQueryable<CourseDetail>? GetAll();
    }
}
