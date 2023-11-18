using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.CourseContent;
using Backend.DTO.StudentAnswer;
using Backend.Repository.CourseContentRepository;

namespace Backend.Services.CourseContent
{
    public class CourseContentService : ICourseContentService
    {
        private readonly ICourseContentRepository _courseContentRepository;
        private readonly IMapper _mapper;

        public CourseContentService(ICourseContentRepository courseContentRepository
            ,IMapper mapper) 
        {
            _courseContentRepository = courseContentRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<CourseContentDTO>> GetAll()
        {
            var result = new ServiceResult<ICollection<CourseContentDTO>>();
            try
            {
                var courseContents = _courseContentRepository.GetAll();

                if (!courseContents.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy course content!";
                }

                result.Payload = _mapper.Map<ICollection<CourseContentDTO>>(courseContents);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
