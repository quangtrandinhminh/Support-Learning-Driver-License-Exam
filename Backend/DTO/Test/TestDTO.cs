namespace Backend.DTO.Test
{
    public class TestDTO
    {
        public int TestId { get; set; }

        public string StudentId { get; set; } = null!;

        public int ExamId { get; set; }

        public short? Score { get; set; }

        public bool? Pass { get; set; }

        public DateTime? CreateTime { get; set; }

        //Exam 
        public DateTime? ExamTime { get; set; }
    }
}
