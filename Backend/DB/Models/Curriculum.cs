using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Curriculum
{
    public int CurriculumId { get; set; }

    public string? Content { get; set; }

    public DateTime? CreateTime { get; set; }

    public bool? IsTheory { get; set; }
}
