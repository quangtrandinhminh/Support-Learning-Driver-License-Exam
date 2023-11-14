namespace Backend.DTO.Lesson
{
    public class LessonUpdateDTO
    {
        public int LessonId { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }

        public bool IsNight { get; set; }
    }
}
