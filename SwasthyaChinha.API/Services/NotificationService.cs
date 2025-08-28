using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.DTOs.Notifications;
using SwasthyaChinha.API.Interfaces;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Patient;

namespace SwasthyaChinha.API.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NotificationDTO>> GetNotificationsAsync(Guid patientId)
        {
            return await _context.Notifications
                .Where(n => n.PatientId == patientId)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDTO
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    CreatedAt = n.CreatedAt,
                    IsRead = n.IsRead
                })
                .ToListAsync();
        }

        public async Task CreateNotificationAsync(Guid patientId, string title, string message)
        {
            var notification = new Notification
            {
                PatientId = patientId,
                Title = title,
                Message = message
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}
