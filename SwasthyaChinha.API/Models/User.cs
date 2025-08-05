// === Models/User.cs ===
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;


namespace SwasthyaChinha.API.Models
{

    public class User
    {
        [Key]
        public Guid Id { get; set; }
        // public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? LicenseNumber { get; set; }
        public string? PharmacyName { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? HospitalName { get; set; }
        public string? Specialty { get; set; } // nullable optional field

        public Guid? HospitalId { get; set; }

        public Hospital? Hospital { get; set; }
        public string? Address { get; set; }
        public string? LogoUrl { get; set; }
        public string? ProfileImageUrl { get; set; }
    public string? SignatureUrl { get; set; }
    }
}