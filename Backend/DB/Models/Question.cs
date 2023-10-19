using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Question
{
    public int QuestionId { get; set; }

    public string Content { get; set; } = null!;

    public string Image { get; set; } = null!;

    public bool KeyQuestion { get; set; }

    public bool CorrectAnswer { get; set; }

    public int StaffId { get; set; }

    public bool Status { get; set; }

    public virtual Staff Staff { get; set; } = null!;

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();
}
