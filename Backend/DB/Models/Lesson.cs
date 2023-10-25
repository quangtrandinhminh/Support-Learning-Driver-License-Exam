using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Lesson
{
    public int LessonId { get; set; }

    public int ClassId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Title { get; set; }

    public double? Hours { get; set; }

    public double? Kilometers { get; set; }

    public string StudentId { get; set; } = null!;

    public bool? Attendance { get; set; }

    public virtual Class Class { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
