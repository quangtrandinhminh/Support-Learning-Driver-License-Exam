using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Course
{
    public string CourseId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int? NumberOfStudents { get; set; }

    public int LimitStudent { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
