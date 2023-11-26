using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Course;
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

        public async Task<ServiceResult<int>> CreateCourseContent(CourseContentCreate courseContentCreate)
        {
            var result = new ServiceResult<int>();
            try
            {
                var courseContents = _courseContentRepository.GetAll().ToList();
                foreach (var courseContentt in courseContents) 
                { 
                    if (courseContentt.CourseContent1.Equals(courseContentCreate))
                    {
                        result.IsError = true;
                        result.ErrorMessage = "CourseContent đã tồn tại";
                        result.Payload = -1;
                        return result;
                    }
                }
                var courseContent = _mapper.Map<DB.Models.CourseContent>(courseContentCreate);

                await _courseContentRepository.AddAsync(courseContent);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> UpdateCourseContent(CourseContentCreate courseContentCreate)
        {
            var result = new ServiceResult<int>();
            try
            {
                var courseContents = _courseContentRepository.GetAll().ToList();
                foreach (var courseContentt in courseContents)
                {
                    if (courseContentt.CourseContent1.Equals(courseContentCreate))
                    {
                        result.IsError = true;
                        result.ErrorMessage = "CourseContent đã tồn tại";
                        result.Payload = -1;
                        return result;
                    }
                }
                var courseContent = _mapper.Map<DB.Models.CourseContent>(courseContentCreate);
                courseContent.Status = true;

                await _courseContentRepository.UpdateAsync(courseContent);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult> DeactivateCourseContent(int id)
        {
            var result = new ServiceResult();
            try
            {
                var courseContent =  _courseContentRepository.GetAll()
                    .Where(p => p.CourseContentId == id).FirstOrDefault();
                if (courseContent == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "CourseContent không tồn tại!";
                    return result;
                }

                courseContent.Status = false;
                await _courseContentRepository.UpdateAsync(courseContent);

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
