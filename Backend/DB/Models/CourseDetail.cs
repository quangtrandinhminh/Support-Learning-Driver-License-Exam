using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class CourseDetail
{
    public string CourseDetailsId { get; set; } = null!;

    public string CourseContent { get; set; } = null!;

    public DateTime CourseTimeStart { get; set; }

    public DateTime CourseTimeEnd { get; set; }

    public string CourseId { get; set; } = null!;

    public bool Status { get; set; }

    public virtual Course Course { get; set; } = null!;
}
