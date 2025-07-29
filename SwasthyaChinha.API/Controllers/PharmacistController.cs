using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using SwasthyaChinha.API.Services;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "Pharmacist")]
    [ApiController]
    [Route("api/[controller]")]
    public class PharmacistController : ControllerBase
    {
        private readonly IPrescriptionService _prescriptionService;

        public PharmacistController(IPrescriptionService prescriptionService)
        {
            _prescriptionService = prescriptionService;
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
                return BadRequest("Failed to mark prescription as dispense.");
            return Ok(new {Success=true, Message="Prescription marked as dispensed."});
        }
    }
}
