namespace Backend.DTO.Question
{
    public class QuestionDTO
    {
        public int QuestionId { get; set; }

        public string? Image { get; set; }

        public int StaffId { get; set; }

        public bool? Status { get; set; }
    }
}
