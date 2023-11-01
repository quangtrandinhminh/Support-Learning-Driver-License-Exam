using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Image
{
    public int ImageId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string StudentId { get; set; }

    public virtual Student Student { get; set; }
}
