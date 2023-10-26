using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Mentor
{
    public int MentorId { get; set; }

    public string? ResidenceAddress { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<TeachingSchedule> TeachingSchedules { get; set; } = new List<TeachingSchedule>();

    public virtual User User { get; set; } = null!;
}
