using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Staff
{
    public int StaffId { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<News> News { get; set; } = new List<News>();

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    public virtual User User { get; set; }
}
