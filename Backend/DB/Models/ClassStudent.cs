using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class ClassStudent
{
    public int ClassStudentId { get; set; }

    public int ClassId { get; set; }

    public string StudentId { get; set; }

    public string Comment { get; set; }

    public int? Rating { get; set; }

    public DateTime? FeedbackCreatedTime { get; set; }

    public bool? Status { get; set; }

    public virtual Class Class { get; set; }

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

    public virtual Student Student { get; set; }
}
