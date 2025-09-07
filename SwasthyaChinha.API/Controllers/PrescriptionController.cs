
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.DTOs.Pharmacist;


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

        // ✅ Create Prescription (Doctor handles QR generation)
        [HttpPost("prescribe")]
        public async Task<IActionResult> CreatePrescription([FromBody] CreatePrescriptionDTO model)
        {
            if (model == null || model.Medicines == null || model.Medicines.Count == 0)
                return BadRequest("Invalid prescription data.");

            string doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            try
            {
                var prescription = new Prescription
                {
                    PatientId = Guid.Parse(model.PatientId),
                    DoctorId = Guid.Parse(doctorId),
                    HospitalId = Guid.Parse(model.HospitalId),
                    Diagnosis = model.Diagnosis,
                    Items = model.Medicines.Select(m => new PrescriptionItem
                    {
                        MedicineName = m.Name,
                        Dosage = m.Dosage
                    }).ToList()
                };

                var result = await _prescriptionService.CreatePrescriptionAsync(prescription, model.ManualQRId);

                return Ok(new
                {
                    message = "Prescription created successfully",
                    qrCode = result.QRCode,
                    qrData = result.QRCodeData
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

            return Ok(new
            {
                prescription.Id,
                prescription.PatientId,
                prescription.DoctorId,
                prescription.HospitalId,
                prescription.Diagnosis,
                prescription.Items,
                prescription.QRCodeData // ✅ ensure QRCodeData is always included
            });
        }

        // ✅ Get Prescription by QR code
        [HttpGet("qr/{qrData}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByQRCode(string qrData)
        {
            try
            {
                var result = await _prescriptionService.GetByQRCodeAsync(qrData);

                return Ok(new
                {
                    // result.Id,
                    // result.PatientId,
                    // result.DoctorId,
                    // result.HospitalId,
                    // result.Diagnosis,
                    // result.Items,
                    result.QRCode,
                    result.QRCodeData // ✅ include QRCodeData
                });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // ✅ Mark Prescription as Dispensed (Pharmacist/Admin)
        // [HttpPost("dispense/{id}")]
        // [Authorize(Roles = "Pharmacist,Admin")]
        // public async Task<IActionResult> MarkAsDispensed(string id)
        // {
        //     var success = await _prescriptionService.MarkAsDispensedAsync(id);
        //     if (!success)
        //         return NotFound("Prescription not found.");

        //     return Ok("Prescription marked as dispensed.");
        // }
//         [HttpPost("dispense")]
// [Authorize(Roles = "Pharmacist,Admin")]
// public async Task<IActionResult> MarkAsDispensed([FromBody] DispenseDTO dto)
// {
//     if (dto == null || string.IsNullOrEmpty(dto.PrescriptionId) || dto.Medicines == null)
//         return BadRequest("Invalid dispense data.");

//     var success = await _prescriptionService.MarkAsDispensedAsync(dto.PrescriptionId, dto.Medicines);

//     if (!success)
//         return NotFound("Prescription not found.");

//     return Ok(new
//     {
//         Success = true,
//         Message = "Prescription marked as dispensed."
//     });
// }

    }
}
