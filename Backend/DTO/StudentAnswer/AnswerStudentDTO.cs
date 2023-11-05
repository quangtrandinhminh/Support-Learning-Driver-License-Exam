namespace Backend.DTO.StudentAnswer
{
    public class AnswerStudentDTO
    {
        public int QuestionId { get; set; }
        public byte? OptionId { get; set; }
        public bool? KeyQuestion { get; set; }
        public int? CorrectAnswer { get; set; }
    }
}
