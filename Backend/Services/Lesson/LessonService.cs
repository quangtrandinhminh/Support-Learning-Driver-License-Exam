using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Lesson;
using Backend.DTO.TeachingSchedule;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.CourseRepository;
using Backend.Repository.LessonRepository;
using Backend.Repository.MentorRepository;
using Backend.Repository.StudentRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Lesson
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly IClassRepository _classRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IMentorRepository _mentorRepository;
        private readonly IMapper _mapper;

        public LessonService(ILessonRepository lessonRepository
            , IClassStudentRepository classStudentRepository
            , IClassRepository classRepository
            , IStudentRepository studentRepository
            , ICourseRepository courseRepository
            , IMentorRepository mentorRepository
            , IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _classStudentRepository = classStudentRepository;
            _classRepository = classRepository;
            _studentRepository = studentRepository;
            _courseRepository = courseRepository;
            _mentorRepository = mentorRepository;
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
                if (!lessons.Any()) throw new Exception("Không tìm thấy buổi học!");

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
                if (student == null) throw new Exception("Không tìm thấy học viên!");

                var lessons = _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .Where(x => x.ClassStudent.Class.Status == true 
                                && x.ClassStudent.ClassStudentId == classStudentId)
                    .ToList();

                if (!lessons.Any()) throw new Exception("Không tìm thấy buổi học!");

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

        /// <summary>
        /// Return list of lessons for student by studentId
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="studentId"></param>
        /// <returns></returns>
        public async Task<ServiceResult<ICollection<LessonDTO>>> GetLessonsByStudentId(DateTime startDate
            , DateTime endDate
            , string studentId)
        {
            var result = new ServiceResult<ICollection<LessonDTO>>();
            try
            {
                // check if startDate < endDate
                if (startDate >= endDate) throw new Exception("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");

                // check if student exist
                var student = await _classStudentRepository.GetAll()
                    .Where(x => x.StudentId == studentId)
                    .FirstOrDefaultAsync();
                if (student == null) throw new Exception("Học viên chưa đăng kí lớp!");

                // get all lessons for student
                var lessons = await _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .Where(l => l.ClassStudent.StudentId == studentId 
                                && l.ClassStudent.Class.Status == true 
                                && l.Date >= startDate && l.Date <= endDate)
                    .ToListAsync();
                if (!lessons.Any()) throw new Exception("Không tìm thấy buổi học!");

                var resultLessons = _mapper.Map<ICollection<LessonDTO>>(lessons);
                foreach (var lesson in resultLessons)
                {
                    lesson.DayOfWeek = lesson.Date.DayOfWeek.ToString();
                    if (lesson.IsNight)
                    {
                        lesson.Shift = "Tối";
                    }
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

        /// <summary>
        /// Return list of practice lessons for all students in course by the practice class is created by mentor
        /// </summary>
        /// <param name="lessonCreateDto"></param>
        /// <returns></returns>
        public async Task<ServiceResult<int>> CreatePracticeLesson(LessonCreateDTO lessonCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                // check if course exist
                var course = await _courseRepository.GetByIdAsync(lessonCreateDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy lớp học!";
                    return result;
                }

                // get all students in course where class is practice class
                var students = await _classStudentRepository.GetAll()
                    .Include(x => x.Class)
                        .ThenInclude(x => x.Course)
                    .Where(x => x.Class.Course.CourseId == lessonCreateDto.CourseId 
                                && x.Class.IsTheoryClass == false)
                    .ToListAsync();

                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không có học viên!";
                    return result;
                }

                // get all lessons in course where class is practice class
                var existLesson = await _lessonRepository.GetAll()
                    .Include(x => x.ClassStudent)
                    .ThenInclude(x => x.Class)
                    .Where(x => x.ClassStudent.Class.Course.CourseId == lessonCreateDto.CourseId
                                && x.ClassStudent.Class.IsTheoryClass == false
                                && x.Date >= lessonCreateDto.StartDate
                                && x.Date <= lessonCreateDto.EndDate)
                    .ToListAsync();

                // create lesson for each student
                foreach (var student in students)
                {
                    var count = 0;
                    var dayOfWeek = (int)student.Class.DayOfWeek!;
                    var dates = GetAllDatesForDayOfWeek(lessonCreateDto.StartDate
                        , lessonCreateDto.EndDate, dayOfWeek);
                    foreach (var date in dates)
                    {
                        if (existLesson.Any(x => x.Date == date.Date && x.ClassStudentId == student.ClassStudentId))
                        {
                            continue;
                        }

                        var newLesson = _mapper.Map<DB.Models.Lesson>(lessonCreateDto);
                        newLesson.ClassStudentId = student.ClassStudentId;
                        newLesson.Date = date;
                        await _lessonRepository.CreateAsync(newLesson);
                        count++;
                    }

                    if (count == 0) throw new Exception("Không có buổi học nào được tạo!");
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

        /// <summary>
        /// Return list of theory lessons for all students in course by the theory class is created by admin
        /// </summary>
        /// <param name="lessonTheoryCreateDto"></param>
        /// <returns></returns>
        public async Task<ServiceResult<int>> CreateTheoryLesson(LessonTheoryCreateDTO lessonTheoryCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                // check if course exist
                var course = await _courseRepository.GetByIdAsync(lessonTheoryCreateDto.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                    return result;
                }

                // get all students in course where class is theory class
                var students = await _classStudentRepository.GetAll()
                    .Include(x => x.Class)
                        .ThenInclude(x => x.Course)
                    .Where(x => x.Class.Course.CourseId == lessonTheoryCreateDto.CourseId 
                                && x.Class.IsTheoryClass == true)
                    .ToListAsync();

                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không có học viên!";
                    return result;
                }

                // get all lessons in course where class is theory class
                var existLesson = await _lessonRepository.GetAll()
                    .Include(x => x.ClassStudent)
                    .ThenInclude(x => x.Class)
                    .Where(x => x.ClassStudent.Class.Course.CourseId == lessonTheoryCreateDto.CourseId
                                                   && x.ClassStudent.Class.IsTheoryClass == true
                                                                                  && x.Date >= lessonTheoryCreateDto.StartDate
                                                                                  && x.Date <= lessonTheoryCreateDto.EndDate)
                    .ToListAsync();

                // create lesson for each student
                foreach (var student in students)
                {
                    var count = 0;
                    for (var date = lessonTheoryCreateDto.StartDate.Date;
                         date <= lessonTheoryCreateDto.EndDate.Date;
                         date = date.AddDays(1))
                    {
                        if (existLesson.Any(x => x.Date == date.Date && x.ClassStudentId == student.ClassStudentId))
                        {
                            continue;
                        }

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

                    if (count == 0) throw new Exception("Không có buổi học nào được tạo!");
                }

               
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public static List<DateTime> GetAllDatesForDayOfWeek(
            DateTime startDate,
            DateTime endDate,
            int dayOfWeek)
        {
            var dates = new List<DateTime>();

            for (var date = startDate.Date; date <= endDate.Date; date = date.AddDays(1))
            {
                var dow = (DayOfWeek)dayOfWeek;

                if (date.DayOfWeek == dow)
                {
                    dates.Add(date.Date);
                }
            }

            return dates;
        }

        /// <summary>
        /// Return list of teaching schedule for mentor by mentorId
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="mentorId"></param>
        /// <returns></returns>
        public async Task<ServiceResult<ICollection<TeachingScheduleDTO>>> GetTeachingScheduleByMentorId(DateTime startDate
            , DateTime endDate, int mentorId, string courseId)
        {
            var result = new ServiceResult<ICollection<TeachingScheduleDTO>>();
            try
            {
                if (startDate >= endDate) throw new Exception("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");

                var course = await _courseRepository.GetByIdAsync(courseId);
                if (course == null) throw new Exception("Không tìm thấy khóa học!");

                var mentor = await _mentorRepository.GetByIdAsync(mentorId);
                if (mentor == null) throw new Exception("Không tìm thấy giảng viên!");

                // check if mentor is exist in class
                var classMentor = await _classRepository.GetAll()
                    .Include(x => x.Course)
                    .Where(x => x.Course.CourseId == courseId
                                                   && x.MentorId == mentorId)
                    .FirstOrDefaultAsync();
                if (classMentor == null) throw new Exception("Giảng viên chưa đăng kí lớp dạy!");

                // get all teaching schedule for mentor
                var teachingSchedule = await _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .ThenInclude(c => c.Course)
                    .Where(l => l.ClassStudent.Class.MentorId == mentorId
                                && l.ClassStudent.Class.Status == true
                                && l.Date >= startDate && l.Date <= endDate)
                    .GroupBy(l => l.Date).Select(l => l.FirstOrDefault())
                    .ToListAsync();
                if (!teachingSchedule.Any()) throw new Exception("Không tìm thấy bài học!");

                var resultLessons = _mapper.Map<ICollection<TeachingScheduleDTO>>(teachingSchedule);
                foreach (var lesson in resultLessons)
                {
                    lesson.DayOfWeek = lesson.Date.DayOfWeek.ToString();
                    if (lesson.IsNight)
                    {
                        lesson.Shift = "Tối";
                    }
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

        /*public async Task<ServiceResult<int>> DeleteLesson(int lessonId)
                {
                   var result = new ServiceResult<int>();
                   try
                   {
                       var lesson = await _lessonRepository.GetByIdAsync(lessonId);
                       if (lesson == null)
                       {
                           result.IsError = true;
                           result.Payload = -1;
                           result.ErrorMessage = "Không tìm thấy buổi học!";
                           return result;
                       }
        
                        await _lessonRepository.DeleteAsync(lesson);
                   }
                   catch (Exception e)
                   {
                       result.IsError = true;
                       result.Payload = -1;
                       result.ErrorMessage = e.Message;
                   }
        
                    return result;
               }*/

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
