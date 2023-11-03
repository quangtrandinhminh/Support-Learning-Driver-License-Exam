namespace Backend.DTO.Lesson
{
    public class LessonTheoryCreateDTO
    {
        public string CourseId { get; set; }

        public string Title { get; set; }

        public string Location { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int NumberOfLessons { get; set; }
    }
}
