using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Student
{
    public string StudentId { get; set; }

    public int MemberId { get; set; }

    public string CourseId { get; set; }

    public int? TotalKm { get; set; }

    public int? TotalHour { get; set; }

    public bool? StudyTheoryStatus { get; set; }

    public bool? Pass { get; set; }

    public virtual ICollection<ClassStudent> ClassStudents { get; set; } = new List<ClassStudent>();

    public virtual Course Course { get; set; }

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual Member Member { get; set; }

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();
}
