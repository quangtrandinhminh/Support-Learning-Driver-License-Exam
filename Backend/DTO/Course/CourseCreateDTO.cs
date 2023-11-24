namespace Backend.DTO.Course
{
    public class CourseCreateDTO
    {
        public string CourseId { get; set; }

        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int LimitStudent { get; set; }

        public decimal CourseFee { get; set; }

        public decimal PassTheoryLs { get; set; }

        public int PassKm { get; set; }

        public int TheoryTeacherId { get; set; }

        public bool Status { get; set; }
    }
}
