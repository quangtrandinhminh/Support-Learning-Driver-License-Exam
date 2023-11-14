namespace Backend.DTO.Class
{
    public class ClassDTO
    {
        public int ClassId { get; set; }

        public int MentorId { get; set; }

        public string MentorName { get; set; }

        public string CourseId { get; set; }

        public bool IsTheoryClass { get; set; }

        public int DayOfWeek { get; set; }

        public string Shift { get; set; }

        public bool Status { get; set; }
    }
}
