using AutoMapper;
using Backend.DTO.CourseDetails;
using Backend.Repository.CourseDetailsRepository;

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

        public ICollection<CourseDetailsDTO>? AllCourseDetails()
        {
            try
            {
                var courseDetails = _courseDetailsRepository.GetAll();
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
