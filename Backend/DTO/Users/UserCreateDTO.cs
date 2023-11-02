﻿namespace Backend.DTO.Users
{
    public class UserCreateDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string? fullName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public bool status { get; set; }
    }
}
