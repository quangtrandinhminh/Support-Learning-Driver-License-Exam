using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class FeedBack
{
    public int FeedBackId { get; set; }

    public int ClassStudentId { get; set; }

    public string? Comment { get; set; }

    public DateTime? FeedBackTime { get; set; }

    public bool Status { get; set; }

    public virtual ClassStudent ClassStudent { get; set; } = null!;
}
