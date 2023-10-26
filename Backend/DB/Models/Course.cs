using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Course
{
    public string CourseId { get; set; } = null!;

    public string? Name { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? NumberOfStudents { get; set; }

    public int? LimitStudent { get; set; }

    public DateTime? CreateTime { get; set; }

    public int? CourseMonth { get; set; }

    public int? CourseYear { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<CourseDetail> CourseDetails { get; set; } = new List<CourseDetail>();

    public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

    public virtual ICollection<Member> Members { get; set; } = new List<Member>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    public virtual ICollection<TeachingSchedule> TeachingSchedules { get; set; } = new List<TeachingSchedule>();
}
