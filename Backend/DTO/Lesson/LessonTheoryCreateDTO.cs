namespace Backend.DTO.Lesson
{
    public class LessonTheoryCreateDTO
    {
        public string CourseId { get; set; }

        public string LessonContent { get; set; }

        public string Location { get; set; }

        public DateTime Date { get; set; }
    }
}
