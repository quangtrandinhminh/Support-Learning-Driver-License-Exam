using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Lesson
{
    public int LessonId { get; set; }

    public int ClassStudentId { get; set; }

    public string Title { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string Location { get; set; }

    public double? Hours { get; set; }

    public double? Kilometers { get; set; }

    public bool? Attendance { get; set; }

    public virtual ClassStudent ClassStudent { get; set; }
}
