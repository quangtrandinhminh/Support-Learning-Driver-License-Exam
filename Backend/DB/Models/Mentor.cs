using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Mentor
{
    public int MentorId { get; set; }

    public int UserId { get; set; }

    public string? ResidenceAddress { get; set; }

    public bool? IsTeachingTheory { get; set; }

    public bool? IsTeachingPractice { get; set; }

    public string? CurrentCourse { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual User User { get; set; } = null!;
}
