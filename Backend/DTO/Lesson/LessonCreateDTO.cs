namespace Backend.DTO.Lesson
{
    public class LessonCreateDTO
    {
        public string CourseId { get; set; }

        public string Title { get; set; }

        public string Location { get; set; }

        public bool IsNight { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int numberOfLessons { get; set; }
    }
}
