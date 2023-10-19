using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Test
{
    public int TestId { get; set; }

    public string TestName { get; set; } = null!;

    public int? Score { get; set; }

    public bool? Pass { get; set; }

    public DateTime TestTime { get; set; }

    public string StudentId { get; set; } = null!;

    public int ExamId { get; set; }

    public virtual Exam Exam { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;

    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
