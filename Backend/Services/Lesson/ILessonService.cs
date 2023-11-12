using Backend.DTO.Lesson;
using Backend.DTO.TeachingSchedule;

namespace Backend.Services.Lesson
{
    public interface ILessonService
    {
        ServiceResult<ICollection<LessonDTO>> GetAllLesson();

        ServiceResult<ICollection<LessonDTO>> GetLessonsByClassStudentId(int classStudentId);

        Task<ServiceResult<ICollection<LessonDTO>>> GetLessonsByStudentId(DateTime startDate, DateTime endDate,
            string studentId);

        Task<ServiceResult<int>> CreatePracticeLessons(LessonCreateDTO lessonCreateDto);

        Task<ServiceResult<int>> CreateTheoryLessons(LessonTheoryCreateDTO lessonTheoryCreateDto);

        Task<ServiceResult<ICollection<TeachingScheduleDTO>>> GetTeachingScheduleByMentorId(DateTime startDate
            , DateTime endDate, int mentorId, string courseId);

        Task<ServiceResult<ICollection<AttendanceDTO>>> GetLessonsByClassIdAndDate(int classId, DateTime date);

        Task<ServiceResult<int>> CheckAttendanceForStudents(ICollection<LessonUpdateDTO> lessons);

        Task<ServiceResult<int>> CreateTheoryLessonAuto(LessonTheory lessonTheoryCreateDto);

        Task<ServiceResult<int>> CreatePracticeLessonsAuto(string courseId);

        Task<ServiceResult<ICollection<LessonDTO>>> GetTheoryLessonsByStudentId(string studentId);

        Task<ServiceResult<ICollection<LessonDTO>>> GetPracticeLessonsByStudentId(string studentId);
    }
}
