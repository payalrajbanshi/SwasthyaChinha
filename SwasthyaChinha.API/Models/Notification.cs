using System;

namespace SwasthyaChinha.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public Guid PatientId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;

        // Navigation
        public Patient Patient { get; set; }
    }
}
