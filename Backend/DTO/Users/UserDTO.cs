namespace Backend.DTO.Users
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? fullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public bool status { get; set; }
        public int RoleId { get; set; }
    }
}