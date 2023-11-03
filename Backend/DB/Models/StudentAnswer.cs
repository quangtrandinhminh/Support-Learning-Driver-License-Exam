using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class StudentAnswer
{
    public int StudentAnswerId { get; set; }

    public int TestId { get; set; }

    public int QuestionId { get; set; }

    public byte? OptionId { get; set; }

    public bool? IsCorrect { get; set; }

    public virtual Question Question { get; set; } = null!;

    public virtual Test Test { get; set; } = null!;
}
