using System.Collections.Generic;
using System.Threading.Tasks;
using SwasthyaChinha.API.DTOs.Notifications;

namespace SwasthyaChinha.API.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationDTO>> GetNotificationsAsync(Guid patientId);
        Task CreateNotificationAsync(Guid patientId, string title, string message);
        Task MarkAsReadAsync(int notificationId);
    }
}
