namespace Backend.DTO.Class
{
    public class ClassCreateDTO
    {
        public int MentorId { get; set; }
        public string CourseId { get; set; } = null!;

        public bool? IsTheoryClass { get; set; }

        public bool? Status { get; set; }
    }
}
