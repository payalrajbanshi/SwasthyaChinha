using System.ComponentModel.DataAnnotations;
using SwasthyaChinha.API.DTOs.Auth;

namespace SwasthyaChinha.API.DTOs.Auth
{
    public class LoginDTO
    {
        [Required]
        public string EmailOrPhone  { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
