using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.Services.Interfaces;
using System.Security.Claims;

namespace SwasthyaChinha.API.Controllers
{
    [Route("api/[controller]")]
    //[Route("api/Doctor/prescribe")]
    [ApiController]
    [Authorize(Roles = "Doctor,Admin")]
    public class PrescriptionController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly IPrescriptionService _prescriptionService;

        public PrescriptionController(IDoctorService doctorService, IPrescriptionService prescriptionService)
        {
            _doctorService = doctorService;
            _prescriptionService = prescriptionService;
        }

        //✅ Create Prescription (Doctor handles QR generation)
        [HttpPost("prescribe")]
        public async Task<IActionResult> CreatePrescription([FromBody] CreatePrescriptionDTO model)
        {
            if (model == null || model.Medicines == null || model.Medicines.Count == 0)
                return BadRequest("Invalid prescription data.");

            string doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            try
            {
                var qrBase64 = await _doctorService.CreatePrescriptionAsync(model, doctorId);

                return Ok(new
                {
                    message = "Prescription created successfully",
                    qrCode = qrBase64
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ Get Prescription by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrescription(int id)
        {
            var prescription = await _prescriptionService.GetPrescriptionByIdAsync(id);
            if (prescription == null)
                return NotFound();

            return Ok(prescription);
        }

        // ✅ Get Prescription by QR code
        [HttpGet("qr/{qrData}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByQRCode(string qrData)
        {
            try
            {
                var result = await _prescriptionService.GetByQRCodeAsync(qrData);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // ✅ Mark Prescription as Dispensed (Pharmacist/Admin)
        [HttpPost("dispense/{id}")]
        [Authorize(Roles = "Pharmacist,Admin")]
        public async Task<IActionResult> MarkAsDispensed(string id)
        {
            var success = await _prescriptionService.MarkAsDispensedAsync(id);
            if (!success)
                return NotFound("Prescription not found.");

            return Ok("Prescription marked as dispensed.");
        }
    }
}
