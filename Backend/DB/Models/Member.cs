using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Member
{
    public int MemberId { get; set; }

    public DateTime Dob { get; set; }

    public string Gender { get; set; } = null!;

    public string Nationality { get; set; } = null!;

    public string ResidenceAddress { get; set; } = null!;

    public DateTime CardProvidedDate { get; set; }

    public string CardProvidedLocation { get; set; } = null!;

    public string? DrivingLicenseNumber { get; set; }

    public string? DrivingLicenseTier { get; set; }

    public string? DrivingLicenseProvider { get; set; }

    public DateTime? DrivingLicenseProvidedDate { get; set; }

    public string? DrivingTestTier { get; set; }

    public string? IntegratedDrivingLicense { get; set; }

    public string? RevokedDrivingLicense { get; set; }

    public string? RelatedDocument { get; set; }

    public DateTime RegistrationDate { get; set; }

    public bool Status { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    public virtual User User { get; set; } = null!;
}
