namespace Backend.DTO.Exam
{
    public class ExamDTO
    {
        public int ExamId { get; set; }

        public int StaffId { get; set; }

        public string CourseId { get; set; }

        public string ExamName { get; set; }

        public DateTime ExamTime { get; set; }

        public string? Description { get; set; }

        public int Duration { get; set; }

        public int LimitQuestion { get; set; }

        public int LimitKeyQuestion { get; set; }

        public short MinimumCorrectAnswer { get; set; }

        public bool Status { get; set; }
    }
}
