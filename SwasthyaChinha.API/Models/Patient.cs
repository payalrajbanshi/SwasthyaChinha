using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
namespace SwasthyaChinha.API.Models
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public Guid UserId { get; set; }
           public User? User { get; set; }
        // Add more fields if needed
    }
}
