namespace Backend.DTO.Staff
{
    public class StaffDTO
    {
        public int StaffId { get; set; }

        public int UserId { get; set; }

        public string? fullName { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public int RoleId { get; set; }

        public DateTime CreatedTime { get; set; }

        public bool Status { get; set; }
    }
}
