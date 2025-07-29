using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace SwasthyaChinha.API.Models.Auth
{
    public class RegisterPharmacistDto
    {
        public string FullName { get; set; }
        public string LicenseNumber { get; set; }
        public string PharmacyName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

}