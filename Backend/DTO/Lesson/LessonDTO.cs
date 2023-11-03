namespace Backend.DTO.Lesson
{
    public class LessonDTO
    {
        public int LessonId { get; set; }

        public int ClassStudentId { get; set; }

        public DateTime Date { get; set; }

        public string DayOfWeek { get; set; }

        public string Shift { get; set; }

        public string Title { get; set; }

        public string Location { get; set; }

        public bool IsTheory { get; set; }

        public double Hours { get; set; }

        public double Kilometers { get; set; }

        public bool Attendance { get; set; }
    }
}
