using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Lesson;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.CourseRepository;
using Backend.Repository.LessonRepository;
using Backend.Repository.StudentRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Lesson
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public LessonService(ILessonRepository lessonRepository
            , IClassStudentRepository classStudentRepository
            , IClassRepository classRepository
            , IStudentRepository studentRepository
            , ICourseRepository courseRepository
            , IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _classStudentRepository = classStudentRepository;
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<LessonDTO>> GetAllLesson()
        {
            var result = new ServiceResult<ICollection<LessonDTO>>();
            try
            {
                var lessons = _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                        .ThenInclude(cs => cs.Class)
                    .Where(x => x.ClassStudent.Class.Status == true).ToList();
                if (!lessons.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy bài học!";
                    return result;
                }

                var resultLessons = _mapper.Map<ICollection<LessonDTO>>(lessons);
                foreach ( var lesson in resultLessons ) { lesson.DayOfWeek = lesson.Date.DayOfWeek.ToString();}

                result.Payload = resultLessons;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public ServiceResult<ICollection<LessonDTO>> GetLessonsByClassStudentId(int classStudentId)
        {
            var result = new ServiceResult<ICollection<LessonDTO>>();
            try
            {
                var student = _classStudentRepository.GetByIdAsync(classStudentId);
                if (student == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy học viên!";
                    return result;
                }

                var lessons = _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .Where(x => x.ClassStudent.Class.Status == true 
                                && x.ClassStudent.ClassStudentId == classStudentId)
                    .ToList();

                if (!lessons.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy bài học!";
                    return result;
                }

                var resultLessons = _mapper.Map<ICollection<LessonDTO>>(lessons);
                foreach (var lesson in resultLessons) { lesson.DayOfWeek = lesson.Date.DayOfWeek.ToString(); }

                result.Payload = resultLessons;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<ICollection<LessonDTO>>> GetLessonsByCourseIdAndStudentId(string studentId)
        {
            var result = new ServiceResult<ICollection<LessonDTO>>();
            try
            {
                var student = await _classStudentRepository.GetAll()
                    .Where(x => x.StudentId == studentId)
                    .FirstOrDefaultAsync();
                if (student == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Học viên chưa đăng kí lớp!";
                    return result;
                }

                var lessons = await _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .Where(l => l.ClassStudent.StudentId == studentId && l.ClassStudent.Class.Status == true)
                    .ToListAsync();
                if (!lessons.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy bài học!";
                    return result;
                }

                var resultLessons = _mapper.Map<ICollection<LessonDTO>>(lessons);
                foreach (var lesson in resultLessons)
                {
                    lesson.DayOfWeek = lesson.Date.DayOfWeek.ToString();
                }

                result.Payload = resultLessons;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> CreateLesson(LessonCreateDTO lessonCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(lessonCreateDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy lớp học!";
                    return result;
                }

                // get all students in course where class is not theory class
                var students = await _classStudentRepository.GetAll()
                    .Include(x => x.Class)
                        .ThenInclude(x => x.Course)
                    .Where(x => x.Class.Course.CourseId == lessonCreateDto.CourseId && x.Class.IsTheoryClass == false)
                    .ToListAsync();

                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không có học viên!";
                    return result;
                }

                foreach (var student in students)
                {
                    var dayOfWeek = (int)student.Class.DayOfWeek!;
                    var dates = GetAllDatesForDayOfWeek(lessonCreateDto.StartDate
                        , lessonCreateDto.EndDate, dayOfWeek);
                    foreach (var date in dates)
                    {
                        var newLesson = _mapper.Map<DB.Models.Lesson>(lessonCreateDto);
                        newLesson.ClassStudentId = student.ClassStudentId;
                        newLesson.Date = date;
                        await _lessonRepository.CreateAsync(newLesson);
                    }
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = -1;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> CreateTheoryLesson(LessonTheoryCreateDTO lessonTheoryCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(lessonTheoryCreateDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    return result;
                }

                // get all students in course where class is not theory class
                var students = await _classStudentRepository.GetAll()
                    .Include(x => x.Class)
                        .ThenInclude(x => x.Course)
                    .Where(x => x.Class.Course.CourseId == lessonTheoryCreateDto.CourseId && x.Class.IsTheoryClass == true)
                    .ToListAsync();

                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không có học viên!";
                    return result;
                }

                foreach (var student in students)
                {
                    var count = 0;
                    for (var date = lessonTheoryCreateDto.StartDate;
                         date <= lessonTheoryCreateDto.EndDate;
                         date = date.AddDays(1))
                    {
                        if (count == lessonTheoryCreateDto.NumberOfLessons)
                        {
                            break;
                        }
                        var newLesson = _mapper.Map<DB.Models.Lesson>(lessonTheoryCreateDto);
                        newLesson.ClassStudentId = student.ClassStudentId;
                        newLesson.Date = date;
                        await _lessonRepository.CreateAsync(newLesson);
                        count++;
                    }
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = -1;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public static List<DateTime> GetAllDatesForDayOfWeek(
            DateTime startDate,
            DateTime endDate,
            int dayOfWeek)
        {
            List<DateTime> dates = new List<DateTime>();

            for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
            {
                DayOfWeek dow = (DayOfWeek)dayOfWeek;

                if (date.DayOfWeek == dow)
                {
                    dates.Add(date);
                }
            }

            return dates;
        }

        /*public async Task<ServiceResult<int>> UpdateLesson(LessonUpdateDTO lessonUpdateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var lesson = await _lessonRepository.GetByIdAsync(lessonUpdateDto.LessonId);
                if (lesson == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy buổi học!";
                    return result;
                }

                lesson = _mapper.Map<DB.Models.Lesson>(lessonUpdateDto);
                await _lessonRepository.UpdateAsync(lesson);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = -1;
                result.ErrorMessage = e.Message;
            }

            return result;
        }*/
    }
}
