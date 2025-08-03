using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace SwasthyaChinha.API.Models.Auth
{

    public class RegisterHospitalAdminDto
    {
        public string HospitalName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }  // ✅ Name of the hospital admin
         public string PhoneNumber { get; set; }  // optional
    public string Address { get; set; } 
    

    }
}
