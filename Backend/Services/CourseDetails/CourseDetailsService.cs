using AutoMapper;
using Backend.DB.Models;
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
                if (courseDetailsCreateDto.CourseTimeEnd6 < courseDetailsCreateDto.CourseTimeStart1)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Ngày bế giảng phải lớn hơn ngày khai giảng!";
                    result.Payload = -2;
                    return result;
                }
                var courseDetails1 = new CourseDetail();
                var courseDetails2 = new CourseDetail();
                var courseDetails3 = new CourseDetail();
                var courseDetails4 = new CourseDetail();
                var courseDetails5 = new CourseDetail();
                var courseDetails6 = new CourseDetail();

                courseDetails1.CourseContent = courseDetailsCreateDto.CourseContent1;
                courseDetails1.CourseTimeStart = courseDetailsCreateDto.CourseTimeStart1;
                courseDetails1.CourseTimeEnd = courseDetailsCreateDto.CourseTimeEnd1;
                courseDetails1.CourseId = courseDetailsCreateDto.CourseId;
                await _courseDetailsRepository.CreateAsync(courseDetails1);

                courseDetails2.CourseContent = courseDetailsCreateDto.CourseContent2;
                courseDetails2.CourseTimeStart = courseDetailsCreateDto.CourseTimeStart2;
                courseDetails2.CourseTimeEnd = courseDetailsCreateDto.CourseTimeEnd2;
                courseDetails2.CourseId = courseDetailsCreateDto.CourseId;
                await _courseDetailsRepository.CreateAsync(courseDetails2);

                courseDetails3.CourseContent = courseDetailsCreateDto.CourseContent3;
                courseDetails3.CourseTimeStart = courseDetailsCreateDto.CourseTimeStart3;
                courseDetails3.CourseTimeEnd = courseDetailsCreateDto.CourseTimeEnd3;
                courseDetails3.CourseId = courseDetailsCreateDto.CourseId;
                await _courseDetailsRepository.CreateAsync(courseDetails3);

                courseDetails4.CourseContent = courseDetailsCreateDto.CourseContent4;
                courseDetails4.CourseTimeStart = courseDetailsCreateDto.CourseTimeStart4;
                courseDetails4.CourseTimeEnd = courseDetailsCreateDto.CourseTimeEnd4;
                courseDetails4.CourseId = courseDetailsCreateDto.CourseId;
                await _courseDetailsRepository.CreateAsync(courseDetails4);

                courseDetails5.CourseContent = courseDetailsCreateDto.CourseContent5;
                courseDetails5.CourseTimeStart = courseDetailsCreateDto.CourseTimeStart5;
                courseDetails5.CourseTimeEnd = courseDetailsCreateDto.CourseTimeEnd5;
                courseDetails5.CourseId = courseDetailsCreateDto.CourseId;
                await _courseDetailsRepository.CreateAsync(courseDetails5);

                courseDetails6.CourseContent = courseDetailsCreateDto.CourseContent6;
                courseDetails6.CourseTimeStart = courseDetailsCreateDto.CourseTimeStart6;
                courseDetails6.CourseTimeEnd = courseDetailsCreateDto.CourseTimeEnd6;
                courseDetails6.CourseId = courseDetailsCreateDto.CourseId;
                await _courseDetailsRepository.CreateAsync(courseDetails6);
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
