namespace Backend.DTO.Student
{
    public class StudentDTO
    {
        public string StudentId { get; set; }

        public int MemberId { get; set; }

        public string CourseId { get; set; }

        public int? TotalKm { get; set; }

        public int? TotalHour { get; set; }

        public bool? Pass { get; set; }
    }
}
