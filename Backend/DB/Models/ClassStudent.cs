using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class ClassStudent
{
    public int ClassStudentId { get; set; }

    public int ClassId { get; set; }

    public string StudentId { get; set; } = null!;

    public bool? Status { get; set; }

    public virtual Class Class { get; set; } = null!;

    public virtual ICollection<FeedBack> FeedBacks { get; set; } = new List<FeedBack>();

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

    public virtual Student Student { get; set; } = null!;
}
