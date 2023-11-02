using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class StudentAnswer
{
    public int StudentAnswerId { get; set; }

    public byte? OptionId { get; set; }

    public bool? IsCorrect { get; set; }

    public int TestId { get; set; }

    public virtual Test Test { get; set; }
}
