using AutoMapper;
using Backend.DTO.Course;
using Backend.Repository.CourseRepository;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Backend.DTO.Class;
using Backend.Repository.ClassRepository;
using Backend.Repository.MentorRepository;
using Backend.Services.Class;
using Backend.DB.Models;

namespace Backend.Services.Course
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IClassRepository _classRepository;
        private readonly IMentorRepository _mentorRepository;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository courseRepository
            , IClassRepository classRepository
            , IMentorRepository mentorRepository
            ,IMapper mapper)
        {
            _courseRepository = courseRepository;
            _classRepository = classRepository;
            _mentorRepository = mentorRepository;
            _mapper = mapper;
        }

        public ICollection<CourseDTO>? GetAll()
        {
            try
            {
                var courses = _courseRepository.GetAll();
                return courses is null ? null : _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public ServiceResult<ICollection<CourseDTO>> GetAllCourses()
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();
            try
            {
                var courses = _courseRepository.GetAll()
                    .Include(x => x.Classes)
                    .ThenInclude(x => x.Mentor)
                    .ThenInclude(x => x.User)
                    .Where(x => x.Status == true);

                if (!courses.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                }

                var coursesResult = _mapper.Map<ICollection<CourseDTO>>(courses);
                result.Payload = coursesResult;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public ServiceResult<ICollection<CourseDTO>> GetInactiveCourses()
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();

            try
            {
                var courses = _courseRepository.GetAll()
                    .Include(x => x.Classes)
                    .ThenInclude(x => x.Mentor)
                    .ThenInclude(x => x.User)
                    .Where(x => x.Status == false);
                if (!courses.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                }

                result.Payload = _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public ServiceResult<ICollection<CourseDTO>> GetCourseByMonth(int month, int year)
        {
            var result = new ServiceResult<ICollection<CourseDTO>>();

            try
            {
                var courses = _courseRepository.GetAll()
                        .Include(x => x.Classes)
                        .ThenInclude(x => x.Mentor)
                        .ThenInclude(x => x.User)
                        .Where(c => c.Status == true && c.CourseMonth == month).Where(b => b.CourseYear == year);

                if (!courses.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                }

                result.Payload = _mapper.Map<ICollection<CourseDTO>>(courses);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<CourseDTO>> GetCourseById(string id)
        {
            var result = new ServiceResult<CourseDTO>();
            try
            {
                var course = await _courseRepository.GetAll()
                    .Include(x => x.Classes)
                    .ThenInclude(x => x.Mentor)
                    .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(x => x.CourseId == id);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "CourseID này không tồn tại!";
                    return result;
                }

                result.Payload = _mapper.Map<CourseDTO>(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateCourse(CourseCreateDTO courseCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                if (courseCreateDto.EndDate < courseCreateDto.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Ngày bế giảng phải lớn hơn ngày khai giảng!";
                    result.Payload = -2;
                    return result;
                }

                var courseExist = await _courseRepository.GetByIdAsync(courseCreateDto.CourseId);
                if (courseExist != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course ID đã tồn tại";
                    result.Payload = -1;
                    return result;
                } ;

                var mentor = await _mentorRepository.GetByIdAsync(courseCreateDto.TheoryTeacherId);
                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "MentorID này không tồn tại!";
                    result.Payload = -3;
                    return result;
                }
                ;
                var course = _mapper.Map<DB.Models.Course>(courseCreateDto);
                course.NumberOfStudents = 0;
                course.CreateTime = DateTime.Now;
                course.CourseMonth = course.StartDate?.Month;
                course.CourseYear = course.StartDate?.Year;

                await _courseRepository.AddAsync(course);

                // create theory class
                await CreateTheoryClassByCourse(mentor.MentorId, course.CourseId);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // add new class with mentorId
        private async Task CreateTheoryClassByCourse(int mentorId, string courseId)
        {
            try
            {
                var existClass = await _classRepository
                    .GetAll()
                    .FirstOrDefaultAsync(x => x.CourseId == courseId && x.MentorId == mentorId && x.IsTheoryClass == true);
                if (existClass == null)
                {
                    var newClass = new DB.Models.Class()
                    {
                        CourseId = courseId,
                        MentorId = mentorId,
                        IsTheoryClass = true,
                        DayOfWeek = 0,
                        Shift = null,
                        Status = true
                    };
                    await _classRepository.CreateAsync(newClass);
                }
                else
                {
                    throw new Exception("Lớp học lý thuyết của khóa đã tồn tại!");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<int>> UpdateCourse(CourseUpdateDTO courseUpdateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                if (courseUpdateDto.EndDate < courseUpdateDto.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Ngày bế giảng phải lớn hơn ngày khai giảng!";
                    result.Payload = -2;
                    return result;
                }

                var originalCourse = await _courseRepository.GetByIdAsync(courseUpdateDto.CourseId);
                if (originalCourse == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "CourseID này không tồn tại!";
                    result.Payload = -1;
                    return result;
                }

                var course = _mapper.Map(courseUpdateDto, originalCourse);
                course.CourseMonth = course.StartDate?.Month;
                course.CourseYear = course.StartDate?.Year;

                await _courseRepository.UpdateAsync(course);

                var mentor = await _mentorRepository.GetByIdAsync(courseUpdateDto.TheoryTeacherId);
                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "MentorID này không tồn tại!";
                    result.Payload = -3;
                    return result;
                }

                // update theory class
                UpdateTheoryClassByCourse(mentor.MentorId, course.CourseId);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // update class with mentorId
        private void UpdateTheoryClassByCourse(int mentorId, string courseId)
        {
            try
            {
                var existClass = _classRepository.GetAll()
                    .Where(x => x.CourseId == courseId && x.IsTheoryClass == true)
                    .FirstOrDefault();
                if (existClass == null)
                {
                    throw new Exception("Lớp học lý thuyết của khóa không tồn tại!");
                }

                existClass.MentorId = mentorId;
                _classRepository.UpdateAsync(existClass);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult> DeactivateCourse(string id)
        {
            var result = new ServiceResult();
            try
            {
                var course = await _courseRepository.GetByIdAsync(id);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "CourseID này không tồn tại!";
                    return result;
                }

                course.Status = false;  
                await _courseRepository.UpdateAsync(course);
                
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult> ActivateCourse(string id)
        {
            var result = new ServiceResult();
            try
            {
                var course = await _courseRepository.GetByIdAsync(id);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "CourseID này không tồn tại!";
                    return result;
                }

                course.Status = true;
                await _courseRepository.UpdateAsync(course);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // check create course is valid
        public async Task<ServiceResult<bool>> CheckValidCourse(CourseCreateDTO courseCreateDto)
        {
            var result = new ServiceResult<bool>();
            try
            {
                if (courseCreateDto.EndDate < courseCreateDto.StartDate)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Ngày bế giảng phải lớn hơn ngày khai giảng!";
                    result.Payload = false;
                    return result;
                }

                var courseExist = await _courseRepository.GetByIdAsync(courseCreateDto.CourseId);
                if (courseExist != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course ID đã tồn tại";
                    result.Payload = false;
                    return result;
                }

                var mentor = await _mentorRepository.GetByIdAsync(courseCreateDto.TheoryTeacherId);
                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "MentorID này không tồn tại!";
                    result.Payload = false;
                    return result;
                }
                ;
                result.Payload = true;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = false;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
