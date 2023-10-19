namespace Backend.DTO.Course
{
    public class CourseDTO
    {
        public string CourseId { get; set; }

        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? NumberOfStudents { get; set; }

        public int LimitStudent { get; set; }
    }
}
