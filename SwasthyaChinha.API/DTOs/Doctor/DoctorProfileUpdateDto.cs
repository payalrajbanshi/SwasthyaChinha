// SwasthyaChinha.API.DTOs/DoctorProfileUpdateDto.cs
using Microsoft.AspNetCore.Http;

namespace SwasthyaChinha.API.DTOs.Doctor
{
    public class DoctorProfileUpdateDto
    {
        public Guid Id { get; set; }               // Doctor ID
        public string FullName { get; set; }      // Updated full name
        public string Specialty { get; set; }     // Updated specialty
        public IFormFile ProfilePicture { get; set; } // Uploaded image
    }
}
