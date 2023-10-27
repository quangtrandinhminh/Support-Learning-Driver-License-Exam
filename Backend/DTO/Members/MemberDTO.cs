namespace Backend.DTO.Members
{
    public class MemberDTO
    {
        public int memberID {  get; set; }
        public DateTime dob { get; set; }
        public string gender { get; set; }  
        public string nationality { get; set; }
        public string residenceAddress { get; set; }
        public string IdentityCardNumber { get; set; }
        public string passport { get; set; }
        public DateTime cardProvidedDate { get; set; }
        public string cardProvidedLocation { get; set; }
        public string drivingLicenseNumber { get; set; }
        public string drivingLicenseTier { get; set; }
        public string drivingLicenseProvider { get; set; }
        public DateTime drivingLicenseProvidedDate { get; set; }
        public string drivingTestTier { get; set; }
        public bool integratedDrivingLicense { get; set; }
        public bool? revokedDrivingLicense { get; set; }
        public string relatedDocument { get; set; }
        public DateTime registrationDate { get; set; }
        public bool? isPaid { get; set; }
        public string CourseId { get; set; }
        public int UserId { get; set; }

        //User
        public string? Phone { get; set; }

        public string? Email { get; set; }

    }
}
