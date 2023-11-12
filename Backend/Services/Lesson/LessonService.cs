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

        public async Task<ServiceResult<int>> CreatePracticeLessons(LessonCreateDTO lessonCreateDto)
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

                // check start time > end time
                if (lessonCreateDto.StartDate >= lessonCreateDto.EndDate) throw new Exception("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");

                // check if startime >= course.month
                if (lessonCreateDto.StartDate < course.StartDate) throw new Exception("Ngày bắt đầu phải lớn hơn ngày bắt đầu của khóa học!");

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
                    var dates = GetAllDatesForDayOfWeek(lessonCreateDto.StartDate.Date
                        , lessonCreateDto.EndDate.Date, dayOfWeek);
                    foreach (var date in dates)
                    {
                        if (existLesson.Any(x => x.Date == date.Date
                                                 && x.ClassStudentId == student.ClassStudentId
                                                 && x.IsNight == lessonCreateDto.IsNight))
                        {
                            continue;
                        }

                        if(count == lessonCreateDto.numberOfLessons) break;

                        var newLesson = _mapper.Map<DB.Models.Lesson>(lessonCreateDto);
                        newLesson.ClassStudentId = student.ClassStudentId;
                        newLesson.Date = date;
                        await _lessonRepository.CreateAsync(newLesson);
                        count++;
                    }

                    if (count == 0) throw new Exception("Buổi học đã có. Không có buổi học nào được tạo thêm!");
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
        public async Task<ServiceResult<int>> CreateTheoryLessons(LessonTheoryCreateDTO lessonTheoryCreateDto)
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

                // check if startime >= course.month
                if (lessonTheoryCreateDto.Date < course.StartDate) throw new Exception("Ngày bắt đầu phải lớn hơn ngày bắt đầu của khóa học!");

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
                                                   && x.ClassStudent.Class.IsTheoryClass == true)
                    .ToListAsync();

                // create lesson for each student
                var count = 0;
                foreach (var student in students)
                {
                    if (existLesson.Any(x => x.Date == lessonTheoryCreateDto.Date.Date
                                             && x.ClassStudentId == student.ClassStudentId))
                    {
                        continue;
                    }

                    var newLesson = _mapper.Map<DB.Models.Lesson>(lessonTheoryCreateDto);
                    newLesson.ClassStudentId = student.ClassStudentId;
                    await _lessonRepository.CreateAsync(newLesson);
                    count++;
                }

                if (count == 0) throw new Exception("Buổi học đã có. Không có buổi học nào được tạo thêm!");

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
                var classMentors = await _classRepository.GetAll()
                    .Include(x => x.Course)
                    .Where(x => x.Status == true
                                           && x.Course.CourseId == courseId
                                                   && x.MentorId == mentorId)
                    .ToListAsync();
                if (classMentors == null) throw new Exception("Giảng viên chưa đăng kí lớp dạy!");

                // get all lesson in each class in classMentors
                var teachingSchedule = await _lessonRepository.GetAll().
                    Include(l => l.ClassStudent)
                    .ThenInclude(c => c.Class)
                    .Where(l => l.ClassStudent.Class.Status == true &&
                                l.ClassStudent.Class.MentorId == mentorId &&
                                l.ClassStudent.Class.CourseId == courseId && 
                                l.Date >= startDate && l.Date <= endDate)
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

        // get all lessons by studentId and date
        public async Task<ServiceResult<ICollection<AttendanceDTO>>> GetLessonsByClassIdAndDate(int classId, DateTime date)
        {
            var result = new ServiceResult<ICollection<AttendanceDTO>>();
            try
            {
                // lessons by studentId and date, join with classStudent and student

                var lessons = await _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                        .ThenInclude(cs => cs.Class)
                    .Where(x => x.ClassStudent.Class.ClassId == classId
                                && x.Date == date)
                    .ToListAsync();
                if (!lessons.Any()) throw new Exception("Không tìm thấy buổi học!");

                var students = await _classStudentRepository.GetAll()
                    .Include(cs => cs.Student)
                    .ThenInclude(s => s.Member)
                    .ThenInclude(m => m.User)
                    .Where(cs => cs.Class.ClassId == classId)
                    .ToListAsync();

                var resultLessons = _mapper.Map<ICollection<AttendanceDTO>>(lessons);
                foreach (var lesson in resultLessons)
                {
                    lesson.StudentName = students.FirstOrDefault(x => x.ClassStudentId == lesson.ClassStudentId).Student.Member.User.FullName;
                    lesson.Dob = (DateTime)students.FirstOrDefault(x => x.ClassStudentId == lesson.ClassStudentId).Student.Member.Dob;
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

        // check attendance for students by a list of lessons
        public async Task<ServiceResult<int>> CheckAttendanceForStudents(
            ICollection<LessonUpdateAttendanceDTO> lessons)
        {
            var result = new ServiceResult<int>();
            try
            {
                var count = 0;
                foreach (var lesson in lessons)
                {
                    var lessonDb = await _lessonRepository.GetByIdAsync(lesson.LessonId);

                    if (lessonDb == null)
                    {
                        continue;
                    }

                    lessonDb.Attendance = lesson.Attendance;
                    lessonDb.Hours = lesson.Hours;
                    lessonDb.Kilometers = lesson.Kilometers;
                    await _lessonRepository.UpdateAsync(lessonDb);
                    count++;
                }

                result.Payload = count;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> CreateTheoryLessonAuto(LessonTheory lessonTheoryCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                // check if course exist
                var course = await _courseRepository.GetAll()
                    .Include(x => x.CourseDetails)
                    .FirstOrDefaultAsync(x => x.CourseId == lessonTheoryCreateDto.CourseId);
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
                    .Where(x => x.Class.Course.CourseId == lessonTheoryCreateDto.CourseId && x.Class.IsTheoryClass == true)
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
                                                   && x.Date >= course.CourseDetails.First().CourseTimeStart
                                                   && x.Date <= course.CourseDetails.First().CourseTimeEnd)
                    .ToListAsync();
                // create lesson for each student
                foreach (var student in students)
                {
                    var count = 0;
                    for (var date = (DateTime) course.CourseDetails.First().CourseTimeStart;
                         date <= course.CourseDetails.First().CourseTimeEnd;
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
                        newLesson.Attendance = true;
                        await _lessonRepository.CreateAsync(newLesson);
                        count++;
                    }

                    if (count == 0) throw new Exception("Buổi học đã có. Không có buổi học nào được tạo thêm!");
                }
            }catch (Exception e)
            {
                result.IsError = true;
                result.Payload = -1;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreatePracticeLessonsAuto(string courseId)
        {
            var result = new ServiceResult<int>();
            try
            {
                // Check if course exists and get course details
                var course = await _courseRepository.GetAll()
                                .Include(c => c.CourseDetails)
                                .FirstOrDefaultAsync(c => c.CourseId == courseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy lớp học!";
                    return result;
                }

                // Get all students in the course where class is a practice class
                var students = await _classStudentRepository.GetAll()
                                .Include(x => x.Class)
                                .ThenInclude(x => x.Course)
                                .Where(x => x.Class.Course.CourseId == courseId && x.Class.IsTheoryClass == false)
                                .ToListAsync();

                if (!students.Any())
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không có học viên!";
                    return result;
                }

                // Loop through each CourseDetail to create lessons for the appropriate date ranges and titles
                foreach (var courseDetail in course.CourseDetails)
                {
                    if (courseDetail == course.CourseDetails.First())
                    {
                        continue;
                    }

                    var startDate = (DateTime)courseDetail.CourseTimeStart;
                    var endDate = (DateTime)courseDetail.CourseTimeEnd;
                    var title = courseDetail.CourseContent;

                    // Create lessons for each student
                    foreach (var student in students)
                    {
                        var existingLessons = await _lessonRepository.GetAll()
                            .Include(x => x.ClassStudent)
                            .ThenInclude(x => x.Class).ThenInclude(x => x.Course)
                                            .Where(x => x.ClassStudent.Class.Course.CourseId == courseId
                                                        && x.ClassStudent.Class.IsTheoryClass == false
                                                        && x.Date >= startDate
                                                        && x.Date <= endDate)
                                            .ToListAsync();

                        var dates = GetAllDatesForDayOfWeek(startDate, endDate, (int)student.Class.DayOfWeek);
                        foreach (var date in dates)
                        {
                            if (existingLessons.Any(x => x.Date == date && x.ClassStudentId == student.ClassStudentId))
                                continue;

                            var newLesson = new DB.Models.Lesson();
                            newLesson.ClassStudentId = student.ClassStudentId;
                            newLesson.Date = date;
                            newLesson.Title = title;
                            newLesson.Attendance = true;

                            await _lessonRepository.CreateAsync(newLesson);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = -1;
                result.ErrorMessage = e.Message;
                return result;
            }

            return result;
        }

        public async Task<ServiceResult<ICollection<LessonDTO>>> GetTheoryLessonsByStudentId(string studentId)
        {
            var result = new ServiceResult<ICollection<LessonDTO>>();
            try
            {
                // check if student exist
                var student = await _classStudentRepository.GetAll()
                    .Include(x => x.Student)
                    .ThenInclude(x => x.Member)
                    .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(x => x.StudentId == studentId);
                if (student == null) throw new Exception("Không tìm thấy học viên!");

                // get classStudent has class is theory class
                var classStudent = await _classStudentRepository.GetAll()
                    .Include(x => x.Class)
                    .ThenInclude(x => x.Course)
                    .FirstOrDefaultAsync(x => x.StudentId == studentId && x.Class.IsTheoryClass == true);
                if (classStudent == null) throw new Exception("Không tìm thấy lớp của học viên!");

                // get all lessons for student
                var lessons = await _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .Where(x => x.ClassStudent.ClassStudentId == classStudent.ClassStudentId)
                    .ToListAsync();

                if (!lessons.Any()) throw new Exception("Không tìm thấy buổi học!");

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

        public async Task<ServiceResult<ICollection<LessonDTO>>> GetPracticeLessonsByStudentId(string studentId)
        {
            var result = new ServiceResult<ICollection<LessonDTO>>();
            try
            {
                // check if student exist
                var student = await _classStudentRepository.GetAll()
                    .Include(x => x.Student)
                    .ThenInclude(x => x.Member)
                    .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(x => x.StudentId == studentId);
                if (student == null) throw new Exception("Không tìm thấy học viên!");

                // get classStudent has class is practice class
                var classStudent = await _classStudentRepository.GetAll()
                    .Include(x => x.Class)
                    .ThenInclude(x => x.Course)
                    .FirstOrDefaultAsync(x => x.StudentId == studentId && x.Class.IsTheoryClass == false);
                if (classStudent == null) throw new Exception("Không tìm thấy lớp của học viên!");

                // get all lessons for student
                var lessons = await _lessonRepository.GetAll()
                    .Include(l => l.ClassStudent)
                    .ThenInclude(cs => cs.Class)
                    .Where(x => x.ClassStudent.ClassStudentId == classStudent.ClassStudentId)
                    .ToListAsync();

                if (!lessons.Any()) throw new Exception("Không tìm thấy buổi học!");

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

        // update lesson by lesson id
        public async Task<ServiceResult<int>> UpdateLesson(LessonUpdateDTO lessonUpdateDto)
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
                }

                lesson.IsNight = lessonUpdateDto.IsNight;
                lesson.Date = lessonUpdateDto.Date;
                lesson.Location = lessonUpdateDto.Location;
                await _lessonRepository.UpdateAsync(lesson);
                result.Payload = lesson.LessonId;
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
