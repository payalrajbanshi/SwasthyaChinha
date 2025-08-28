// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// //using SwasthyaChinha.API.Services;
// using SwasthyaChinha.API.DTOs.Pharmacist;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "pharmacist")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PharmacistController : ControllerBase
//     {
//         private readonly IPrescriptionService _prescriptionService;

//         public PharmacistController(IPrescriptionService prescriptionService)
//         {
//             _prescriptionService = prescriptionService;
//         }

//         [HttpGet("prescription/{qr}")]
//         public async Task<IActionResult> GetPrescriptionByQR(string qr)
//         {
//             var prescription = await _prescriptionService.GetByQRCodeAsync(qr);
//             if (prescription == null)
//                 return NotFound();
//             return Ok(prescription);
//         }

//         [HttpPost("dispense")]
//         public async Task<IActionResult> DispenseMedicine([FromBody] DispenseDTO dto)
//         {
//             bool result = await _prescriptionService.MarkAsDispensedAsync(dto.PrescriptionId);
//             if (!result)
//                 return BadRequest("Failed to mark prescription as dispense.");
//             return Ok(new { Success = true, Message = "Prescription marked as dispensed." });
//         }
//         [HttpGet("profile")]
// public async Task<IActionResult> GetProfile()
// {
//     // get current user from JWT
//     var userId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
//     if (userId == null) return Unauthorized();

//     var user = await _context.Users.FindAsync(Guid.Parse(userId));
//     if (user == null) return NotFound();

//     var profile = new PharmacistProfileDTO
//     {
//         FullName = user.FullName,
//         PharmacyName = user.PharmacyName,
//         LicenseNumber = user.LicenseNumber,
//         PhoneNumber = user.PhoneNumber,
//         Email = user.Email,
//         ProfileImageUrl = user.ProfileImageUrl
//     };

//     return Ok(profile);
// }

//     }
// }
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "pharmacist")]
    [ApiController]
    [Route("api/[controller]")]
    public class PharmacistController : ControllerBase
    {
        private readonly IPharmacistService _pharmacistService;
        private readonly IPrescriptionService _prescriptionService;

        public PharmacistController(
            IPrescriptionService prescriptionService,
            IPharmacistService pharmacistService)
        {
            _prescriptionService = prescriptionService;
            _pharmacistService = pharmacistService;
        }

        [HttpGet("prescription/{qr}")]
        public async Task<IActionResult> GetPrescriptionByQR(string qr)
        {
            var prescription = await _prescriptionService.GetByQRCodeAsync(qr);
            if (prescription == null)
                return NotFound();
            return Ok(prescription);
        }

        [HttpPost("dispense")]
        public async Task<IActionResult> DispenseMedicine([FromBody] DispenseDTO dto)
        {
            bool result = await _prescriptionService.MarkAsDispensedAsync(dto.PrescriptionId);
            if (!result)
                return BadRequest("Failed to mark prescription as dispensed.");
            return Ok(new { Success = true, Message = "Prescription marked as dispensed." });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            // Get current user ID from JWT
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            if (userIdClaim == null) return Unauthorized();

            var pharmacist = await _pharmacistService.GetProfileAsync(Guid.Parse(userIdClaim));
            if (pharmacist == null) return NotFound();

            return Ok(pharmacist);
        }
    }
}
