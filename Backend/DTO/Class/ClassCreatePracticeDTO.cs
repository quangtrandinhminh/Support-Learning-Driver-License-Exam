namespace Backend.DTO.Class
{
    public class ClassCreatePracticeDTO
    {
        public int MentorId { get; set; }

        public string CourseId { get; set; }

        public int DayOfWeek { get; set; }

        public string Shift { get; set; }

        public bool Status { get; set; }
    }
}
