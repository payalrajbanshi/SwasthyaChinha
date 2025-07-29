using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace SwasthyaChinha.API.Models
{

    public class Expense
    {
        public int Id { get; set; }

        public Guid PatientId { get; set; }
        public User Patient { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}