namespace Backend.DTO.Lesson
{
    public class LessonCreateDTO
    {
        public int CourseDetailsId { get; set; }

        public string Location { get; set; }

        public DateTime Date { get; set; }
    }
}
