using Backend.DTO.Lesson;

namespace Backend.Services.Lesson
{
    public interface ILessonService
    {
        ServiceResult<ICollection<LessonDTO>> GetAllLesson();

        ServiceResult<ICollection<LessonDTO>> GetLessonsByClassStudentId(int classStudentId);

        Task<ServiceResult<ICollection<LessonDTO>>> GetLessonsByCourseIdAndStudentId(string studentId);

        Task<ServiceResult<int>> CreateLesson(LessonCreateDTO lessonCreateDto);

        Task<ServiceResult<int>> CreateTheoryLesson(LessonTheoryCreateDTO lessonTheoryCreateDto);
    }
}
