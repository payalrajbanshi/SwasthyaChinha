using System.ComponentModel.DataAnnotations;
using SwasthyaChinha.API.DTOs.Auth;

namespace SwasthyaChinha.API.DTOs.Auth
{
    public class RegisterDTO
    {
        [Required]
        public string FullName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        public Guid? HospitalId { get; set; }
                // Optional fields, used only for specific roles
        public string? LicenseNumber { get; set; }      // For doctors
        public string? PharmacyName { get; set; }       // For pharmacists
        public string? PhoneNumber { get; set; }        // For patients
        public DateTime? DateOfBirth { get; set; }      // For patients
        public string? Gender { get; set; }             // For patients
        public string? HospitalName { get; set; }       // For hospital admin
    }
}
