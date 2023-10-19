using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Student
{
    public string StudentId { get; set; } = null!;

    public int MemberId { get; set; }

    public string CourseId { get; set; } = null!;

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

    public virtual Member Member { get; set; } = null!;

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();
}
