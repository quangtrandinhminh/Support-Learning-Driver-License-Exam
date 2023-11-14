namespace Backend.DTO.Lesson
{
    public class LessonUpdateAttendanceDTO
    {
        public int LessonId { get; set; }

        public double Hours { get; set; }

        public double Kilometers { get; set; }

        public bool Attendance { get; set; }
    }
}
