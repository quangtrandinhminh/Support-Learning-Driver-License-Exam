namespace Backend.DTO.Lesson
{
    public class AttendanceDTO
    {
        public int LessonId { get; set; }

        public int ClassStudentId { get; set; }

        public string StudentName { get; set; }

        public DateTime Dob { get; set; }

        public bool IsTheory { get; set; }

        public bool IsNight { get; set; }

        public double Hours { get; set; }

        public double Kilometers { get; set; }

        public bool Attendance { get; set; }
    }
}
