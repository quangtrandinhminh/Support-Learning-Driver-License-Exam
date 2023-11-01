using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.Staff
{
    public class StaffCreateDTO
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
