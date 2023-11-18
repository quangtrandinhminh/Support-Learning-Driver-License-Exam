using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class CourseContent
{
    public int CourseContentId { get; set; }

    public string CourseContent1 { get; set; } = null!;

    public bool? Status { get; set; }
}
