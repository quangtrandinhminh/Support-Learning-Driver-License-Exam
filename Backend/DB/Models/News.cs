using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class News
{
    public int NewsId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime CreatedTime { get; set; }

    public bool Status { get; set; }

    public int StaffId { get; set; }

    public virtual Staff Staff { get; set; } = null!;
}
