using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Test
{
    public int TestId { get; set; }

    public string StudentId { get; set; } = null!;

    public int ExamId { get; set; }

    public short? Score { get; set; }

    public bool? Pass { get; set; }

    public DateTime? CreateTime { get; set; }

    public virtual Exam Exam { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;

    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}
