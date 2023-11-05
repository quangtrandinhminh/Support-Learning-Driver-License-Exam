using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Question
{
    public int QuestionId { get; set; }

    public string? Content { get; set; }

    public string? Image { get; set; }

    public bool? KeyQuestion { get; set; }

    public int? CorrectAnswer { get; set; }

    public int StaffId { get; set; }

    public bool? Status { get; set; }

    public virtual Staff Staff { get; set; } = null!;

    public virtual ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}
