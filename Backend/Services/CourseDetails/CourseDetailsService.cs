using AutoMapper;
using Backend.DTO.CourseDetails;
using Backend.Repository.CourseDetailsRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.CourseDetails
{
    public class CourseDetailsService : ICourseDetailsService
    {
        private readonly ICourseDetailsRepository _courseDetailsRepository;
        private readonly IMapper _mapper;

        public CourseDetailsService(ICourseDetailsRepository courseDetailsRepository, IMapper mapper)
        {
            _courseDetailsRepository = courseDetailsRepository;
            _mapper = mapper;
        }

        public ICollection<CourseDetailsDTO>? GetAllCourseDetails()
        {
            try
            {
                var courseDetails = _courseDetailsRepository.GetAll().
                    Include(c => c.Course).ToList(); ;
                return courseDetails is null ? null : _mapper.Map<ICollection<CourseDetailsDTO>>(courseDetails);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
