using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace SwasthyaChinha.API.Models.Auth
{

    public class RegisterHospitalAdminDto
    {
        public string HospitalName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
