using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Class;
using Backend.DTO.CourseDetails;
using Backend.Repository.ClassRepository;
using Backend.Repository.CourseDetailsRepository;
using Backend.Repository.CourseRepository;

namespace Backend.Services.Class
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly ICourseDetailsRepository _courseDetails;
        private readonly IMapper _mapper;

        public ClassService(IClassRepository classRepository
            , ICourseRepository courseRepository
            , ICourseDetailsRepository courseDetails
            , IMapper mapper)
        {
            _classRepository = classRepository;
            _courseRepository = courseRepository;
            _courseDetails = courseDetails;
            _mapper = mapper;
        }

        public ICollection<ClassDTO> GetAllCllass()
        {
            try
            {
                var classes = _classRepository.GetAll();
                return classes is null ? null : _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public ServiceResult<ICollection<ClassDTO>> GetAllClassesByCourseId(string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = _courseRepository.GetByIdAsync(courseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    return result;
                }

                var classes = _classRepository.GetAll()
                    .Where(x => x.Status == true && x.CourseId == courseId)
                    .ToList();

                if (!classes.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lớp học!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateClass(ClassCreateDTO classCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(classCreateDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    result.Payload = -1;
                    return result;
                }

                var newClass = _mapper.Map<DB.Models.Class>(classCreateDto);
                /*ICollection<DB.Models.CourseDetail> courseDetails = _courseDetails.GetAll()
                    .Where(x => x.CourseId == course.CourseId)
                    .ToList();
                if (newClass.IsPractice == false)
                {
                    newClass.DateStart = courseDetails.First().CourseTimeStart;
                    newClass.DateEnd = courseDetails.First().CourseTimeEnd;
                }
                else
                {
                    newClass.DateStart = courseDetails.ElementAt(1).CourseTimeStart;
                    newClass.DateEnd = courseDetails.Last().CourseTimeEnd;
                }*/

                await _classRepository.CreateAsync(newClass);
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
