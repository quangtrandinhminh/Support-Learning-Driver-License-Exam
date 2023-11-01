using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.Mentor
{
    public class MentorCreateDTO
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string ResidenceAddress { get; set; } = null!;

        public bool isTeachingTheory { get; set; }

        public bool isTeachingPractice { get; set; }
    }
}
