using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Class
{
    public int ClassId { get; set; }

    public int? MentorId { get; set; }

    public string CourseId { get; set; } = null!;

    public bool? IsTheoryClass { get; set; }

    public int? DayOfWeek { get; set; }

    public string? Shift { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<ClassStudent> ClassStudents { get; set; } = new List<ClassStudent>();

    public virtual Course Course { get; set; } = null!;

    public virtual Mentor? Mentor { get; set; }
}
