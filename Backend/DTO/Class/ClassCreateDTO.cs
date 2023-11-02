namespace Backend.DTO.Class
{
    public class ClassCreateDTO
    {
        public string CourseId { get; set; } = null!;

        public bool? IsTheoryClass { get; set; }

        public bool? Status { get; set; }
    }
}
