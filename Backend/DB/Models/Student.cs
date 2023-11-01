using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Student
{
    public string StudentId { get; set; } = null!;

    public int MemberId { get; set; }

    public string CourseId { get; set; } = null!;

    public double? TotalKm { get; set; }

    public double? TotalHour { get; set; }

    public bool? Pass { get; set; }

    public virtual ICollection<ClassStudent> ClassStudents { get; set; } = new List<ClassStudent>();

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual Member Member { get; set; } = null!;

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();
}
