namespace Backend.DTO.Curriculum
{
    public class CurriculumUpdateDTO
    {
        public int CurriculumId { get; set; }

        public string Content { get; set; }

        public bool IsTheory { get; set; }
    }
}
