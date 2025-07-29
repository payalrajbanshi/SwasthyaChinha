// Models/Auth/AuthResponseDto.cs
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;



namespace SwasthyaChinha.API.Models.Auth
{
    public class AuthResponseDto
    {
        public string Token { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; } 
    }
}
