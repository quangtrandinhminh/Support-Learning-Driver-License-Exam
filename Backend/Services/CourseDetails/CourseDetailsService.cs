using AutoMapper;
using Backend.DTO.Course;
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

        public async Task<ServiceResult<int>> CreateCourseDetails(CourseDetailsCreateDTO courseDetailsCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                if (courseDetailsCreateDto.CourseTimeEnd < courseDetailsCreateDto.CourseTimeStart)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Ngày bế giảng phải lớn hơn ngày khai giảng!";
                    result.Payload = -2;
                    return result;
                }

                var courseDeatils = _mapper.Map<DB.Models.CourseDetail>(courseDetailsCreateDto);

                await _courseDetailsRepository.CreateAsync(courseDeatils);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
