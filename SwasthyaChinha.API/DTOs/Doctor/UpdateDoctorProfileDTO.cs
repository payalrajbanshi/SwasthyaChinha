using Microsoft.AspNetCore.Http;

namespace SwasthyaChinha.API.DTOs.Doctor
{
    public class UpdateDoctorProfileDTO
    {
        public string FullName { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public IFormFile ProfilePicture { get; set; }  // optional
    }
}
