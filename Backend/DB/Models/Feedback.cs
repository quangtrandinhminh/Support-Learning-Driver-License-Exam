using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public string StudentId { get; set; } = null!;

    public int ClassId { get; set; }

    public string? Comment { get; set; }

    public int? Rating { get; set; }

    public DateTime? CreatedTime { get; set; }

    public bool? Status { get; set; }

    public virtual Class Class { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
