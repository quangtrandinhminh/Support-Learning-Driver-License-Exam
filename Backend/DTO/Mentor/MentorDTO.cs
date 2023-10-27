namespace Backend.DTO.Mentor
{
    public class MentorDTO
    {
        public int MentorId { get; set; }

        public string ResidenceAddress { get; set; } = null!;

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
