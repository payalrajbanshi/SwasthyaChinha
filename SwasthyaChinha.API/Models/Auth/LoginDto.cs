using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace SwasthyaChinha.API.Models.Auth
{
    public class LoginDto
    {
        public string EmailOrPhone { get; set; }
        public string Password { get; set; }
    }
}