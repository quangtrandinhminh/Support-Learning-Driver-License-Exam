using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class TeachingSchedule
{
    public int TeachingScheduleId { get; set; }

    public int MentorId { get; set; }

    public string CourseId { get; set; } = null!;

    public DateTime? TeachingDate { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Mentor Mentor { get; set; } = null!;
}
