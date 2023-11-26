using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Class;
using Backend.DTO.CourseDetails;
using Backend.DTO.Lesson;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.CourseDetailsRepository;
using Backend.Repository.CourseRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Backend.Repository.MentorRepository;
using Backend.Services.Lesson;

namespace Backend.Services.Class
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly IMentorRepository _mentorRepository;
        private readonly ICourseDetailsRepository _courseDetailsRepository;
        private readonly IMapper _mapper;

        public ClassService(IClassRepository classRepository
            , ICourseRepository courseRepository
            , IClassStudentRepository classStudentRepository
            , IMentorRepository mentorRepository
            , ICourseDetailsRepository courseDetailsRepository
            , IMapper mapper)
        {
            _classRepository = classRepository;
            _courseRepository = courseRepository;
            _classStudentRepository = classStudentRepository;
            _mentorRepository = mentorRepository;
            _courseDetailsRepository = courseDetailsRepository;
            _mapper = mapper;
        }

        public ICollection<ClassDTO> GetAllClass()
        {
            try
            {
                var classes = _classRepository.GetAll()
                    .Include(c => c.Mentor).ThenInclude(m => m.User);
                return classes is null ? null : _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<ICollection<ClassDTO>>> GetAllClassesByCourseId(string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(courseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    return result;
                }

                var classes = await _classRepository.GetAll()
                    .Where(x => x.Status == true && x.CourseId == courseId && x.IsTheoryClass == false)
                    .ToListAsync();

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

        private int GetNumberOfStudentInClass(int classId)
        {
            var classStudents = _classStudentRepository.GetAll()
                .Where(x => x.ClassId == classId)
                .ToList();
            return classStudents.Count;
        }

        // get all class by mentor id in a course
        public async Task<ServiceResult<ICollection<ClassDTO>>> GetAllClassesByMentorId(int mentorId, string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(courseId);
                if (course == null) throw new Exception("Không tìm thấy khóa học!");

                var classes = await _classRepository.GetAll() 
                    .Include(x => x.Mentor.User)
                    .Where(x => x.Status == true 
                                && x.CourseId == courseId 
                                && x.MentorId == mentorId)
                    .ToListAsync();

                if (!classes.Any()) throw new Exception("Không tìm thấy lớp học!");

                // foreach class dont have classStudent, exclude it from classes
                var classStudents = await _classStudentRepository.GetAll().ToListAsync();
                var classIds = classStudents.Select(x => x.ClassId).ToList();
                classes = classes.Where(x => classIds.Contains(x.ClassId)).ToList();

                result.Payload = _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // get all practice class by mentor id in a course
        public async Task<ServiceResult<ICollection<ClassDTO>>> GetAllPracticeClassesByMentorId(int mentorId,
            string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(courseId);
                if (course == null) throw new Exception("Không tìm thấy khóa học!");

                var classes = await _classRepository.GetAll()
                    .Include(x => x.Mentor.User)
                    .Where(x => x.Status == true
                                && x.CourseId == courseId
                                && x.MentorId == mentorId
                                && x.IsTheoryClass == false)
                    .ToListAsync();

                if (!classes.Any()) throw new Exception("Không tìm thấy lớp học!");
                classes = classes.Where(x => GetNumberOfStudentInClass(x.ClassId) < 3).ToList();

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

                var theory = classCreateDto.IsTheoryClass;
                var newClass = _mapper.Map<DB.Models.Class>(classCreateDto);
                if (theory)
                {
                    newClass.DayOfWeek = 0;
                    newClass.LimitStudent = null;
                }
                await _classRepository.CreateAsync(newClass);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateClassPracticeByMentor(
            ICollection<ClassCreatePracticeDTO> classCreatePracticeDTOs)
        {
            var result = new ServiceResult<int>();
            try
            {
                var mentor = await _mentorRepository.GetByIdAsync(classCreatePracticeDTOs.First().MentorId);
                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy mentor!";
                    result.Payload = -1;
                    return result;
                }

                var course = await _courseRepository.GetByIdAsync(classCreatePracticeDTOs.First().CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    result.Payload = -1;
                    return result;
                }

                var practiceClassesInCourse = await _classRepository.GetAll()
                    .Where(x => x.Status == true 
                                && x.MentorId == mentor.MentorId
                                && x.CourseId == course.CourseId
                                && x.IsTheoryClass == false)
                    .ToListAsync();

                var count = 0;
                foreach (var classCreatePracticeDto in classCreatePracticeDTOs)
                {
                    if (practiceClassesInCourse.Any(x => x.DayOfWeek == classCreatePracticeDto.DayOfWeek 
                                                         && x.Shift == classCreatePracticeDto.Shift))
                    continue;

                    var newClass = _mapper.Map<DB.Models.Class>(classCreatePracticeDto);
                    newClass.IsTheoryClass = false;
                    await _classRepository.CreateAsync(newClass);
                    count++;
                }

                result.Payload = count;

                mentor.CurrentCourse = course.CourseId;
                await _mentorRepository.UpdateAsync(mentor);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // add mentor id into class
        public async Task<ServiceResult<int>> AddMentorIntoClass(ClassMentorDTO classMentorDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var mentor = await _mentorRepository.GetByIdAsync(classMentorDTO.MentorId);
                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy mentor!";
                    result.Payload = -1;
                    return result;
                }

                var existingClass = await _classRepository.GetByIdAsync(classMentorDTO.ClassId);
                if (existingClass == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lớp học!";
                    result.Payload = -1;
                    return result;
                }

                if (existingClass.MentorId != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Lớp học đã có mentor!";
                    result.Payload = -2;
                    return result;
                }

                existingClass.MentorId = classMentorDTO.MentorId;
                await _classRepository.UpdateAsync(existingClass);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // get all theory class in course
        public async Task<ServiceResult<ICollection<ClassDTO>>> GetAllTheoryClassesByCourseId(string courseId)
        {
            var result = new ServiceResult<ICollection<ClassDTO>>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(courseId);
                if (course == null) throw new Exception("Không tìm thấy khóa học!");

                var classes = await _classRepository.GetAll()
                    .Where(x => x.Status == true && x.CourseId == courseId && x.IsTheoryClass == true)
                    .ToListAsync();

                if (!classes.Any()) throw new Exception("Không tìm thấy lớp học!");

                result.Payload = _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        // get all dates of class
        public async Task<ServiceResult<ICollection<DateTime>>> GetAllDatesOfClass(int classId)
        {
            var result = new ServiceResult<ICollection<DateTime>>();
            try
            {
                // check if class is exist
                var classDb = await _classRepository.GetByIdAsync(classId);
                if (classDb == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lớp!";
                    return result;
                }

                //get course details of class
                var courseDetails = await _courseDetailsRepository.GetAll()
                    .Where(x => x.CourseId == classDb.CourseId)
                    .Skip(1)
                    .ToListAsync();

                // get all Dates of class
                var dates = LessonService.GetAllDatesForDayOfWeek(
                    (DateTime)courseDetails.First().CourseTimeStart,
                    (DateTime)courseDetails.Last().CourseTimeEnd, (int)classDb.DayOfWeek);

                result.Payload = dates;
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
