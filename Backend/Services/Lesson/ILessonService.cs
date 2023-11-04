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

        Task<ServiceResult<int>> CreatePracticeLesson(LessonCreateDTO lessonCreateDto);

        Task<ServiceResult<int>> CreateTheoryLesson(LessonTheoryCreateDTO lessonTheoryCreateDto);

        Task<ServiceResult<ICollection<TeachingScheduleDTO>>> GetTeachingScheduleByMentorId(DateTime startDate
            , DateTime endDate, int mentorId, string courseId);
    }
}
