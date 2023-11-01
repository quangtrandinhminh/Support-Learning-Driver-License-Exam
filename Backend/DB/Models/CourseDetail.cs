using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class CourseDetail
{
    public int CourseDetailsId { get; set; }

    public string CourseContent { get; set; }

    public DateTime? CourseTimeStart { get; set; }

    public DateTime? CourseTimeEnd { get; set; }

    public string CourseId { get; set; }

    public bool? Status { get; set; }

    public virtual Course Course { get; set; }
}
