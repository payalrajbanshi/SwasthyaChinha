using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using SwasthyaChinha.API.Interfaces;

namespace SwasthyaChinha.API.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("{patientId}")]
        public async Task<IActionResult> GetNotifications(Guid patientId)
        {
            var result = await _notificationService.GetNotificationsAsync(patientId);
            return Ok(result);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _notificationService.MarkAsReadAsync(id);
            return NoContent();
        }
    }
}
