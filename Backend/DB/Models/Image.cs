using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Image
{
    public int ImageId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string StudentId { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
