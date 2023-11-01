using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Test
{
    public int TestId { get; set; }

    public string StudentId { get; set; }

    public int ExamId { get; set; }

    public short? Score { get; set; }

    public bool? Pass { get; set; }

    public DateTime? CreateTime { get; set; }

    public virtual Exam Exam { get; set; }

    public virtual Student Student { get; set; }

    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
