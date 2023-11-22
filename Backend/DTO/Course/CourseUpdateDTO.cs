namespace Backend.DTO.Course
{
    public class CourseUpdateDTO
    {
        public string CourseId { get; set; }

        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int TheoryTeacherId { get; set; }

        public bool Status { get; set; }
    }
}
