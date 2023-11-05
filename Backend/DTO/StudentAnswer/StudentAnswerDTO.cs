namespace Backend.DTO.StudentAnswer
{
    public class StudentAnswerDTO
    {
        public int StudentAnswerId { get; set; }

        public int TestId { get; set; }

        public int QuestionId { get; set; }

        public byte? OptionId { get; set; }

        //Question 
        public string? Image { get; set; }

    }
}
