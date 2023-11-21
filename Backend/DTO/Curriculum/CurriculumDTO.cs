namespace Backend.DTO.Curriculum
{
    public class CurriculumDTO
    {
        public int CurriculumId { get; set; }

        public string Content { get; set; }

        public DateTime CreateTime { get; set; }

        public bool IsTheory { get; set; }
    }
}
