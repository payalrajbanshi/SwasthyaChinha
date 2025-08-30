using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace SwasthyaChinha.API.Models
{

    public class Hospital
    {
        // public string Id { get; set; } = Guid.NewGuid().ToString();
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;
        //public string? LogoUrl { get; set; }


        // public ICollection<User>? Doctors { get; set; } = new List<User>();
        // public ICollection<Prescription>? Prescriptions { get; set; } = new List<Prescription>();
        //         public ICollection<User> Doctors { get; set; }
        // public ICollection<User> Users { get; set; } // for patients, pharmacists
        // public ICollection<Prescription> Prescriptions { get; set; }
        //public ICollection<User> Doctors { get; set; } = new List<User>();
        public ICollection<User> Users { get; set; } = new List<User>();
public ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();


    }
}