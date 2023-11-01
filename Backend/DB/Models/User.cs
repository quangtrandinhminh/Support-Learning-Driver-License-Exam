using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; }

    public string FullName { get; set; }

    public string Password { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    public DateTime? CreateTime { get; set; }

    public bool? Status { get; set; }

    public int RoleId { get; set; }

    public virtual Member Member { get; set; }

    public virtual Mentor Mentor { get; set; }

    public virtual Role Role { get; set; }

    public virtual Staff Staff { get; set; }
}
