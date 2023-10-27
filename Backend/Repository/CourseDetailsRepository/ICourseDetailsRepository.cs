using Backend.DB.Models;

namespace Backend.Repository.CourseDetailsRepository
{
    public interface ICourseDetailsRepository
    {
        public IQueryable<CourseDetail>? GetAll();

        Task<CourseDetail?> CreateAsync(CourseDetail CourseDetail);

        Task<CourseDetail?> UpdateAsync(CourseDetail CourseDetail);
    }
}
