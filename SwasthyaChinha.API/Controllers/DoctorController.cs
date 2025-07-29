// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.DTOs.Doctor;
// using System.Security.Claims;
// using SwasthyaChinha.API.Models;


// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Doctor")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class DoctorController : ControllerBase
//     {
//         private readonly IDoctorService _doctorService;

//         public DoctorController(IDoctorService doctorService)
//         {
//             _doctorService = doctorService;
//         }
//         [Authorize(Roles = "Doctor")]
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var profile = await _doctorService.GetProfileAsync(doctorId);
//             return Ok(profile);
//         }

//         [HttpPost("prescribe")]
//         public async Task<IActionResult> CreatePrescription(CreatePrescriptionDTO dto)
//         {
//             var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//                         var prescription = new Prescription
//             {
//                 PatientId = dto.PatientId,
//                 DoctorId = doctorId,
//                 HospitalId = dto.HospitalId,
//                 CreatedAt = DateTime.UtcNow,
//                 IsDispensed = false,
//                 Items = dto.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0 // Price will be added by pharmacist later
//                 }).ToList()
//             };
//             //await _doctorService.CreatePrescriptionAsync(dto, doctorId);
//             // var result = await _doctorService.CreatePrescriptionAsync(doctorId, dto);
//             // if (!result.Success)
//             //   return BadRequest(result.Message);
//             return Ok(new { message = "Prescription created" });
//         }

//         [HttpGet("patients")]
//         public async Task<IActionResult> GetMyPatients()
//         {
//             var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var patients = await _doctorService.GetPatientsAsync(doctorId);
//             return Ok(patients);
//         }
//     }
// }
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.DTOs.Doctor;
using System.Security.Claims;

namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "Doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = await _doctorService.GetProfileAsync(doctorId);
            return Ok(profile);
        }

        [HttpPost("prescribe")]
        public async Task<IActionResult> CreatePrescription(CreatePrescriptionDTO dto)
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            await _doctorService.CreatePrescriptionAsync(dto, doctorId);

            return Ok(new { message = "Prescription created" });
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetMyPatients()
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var patients = await _doctorService.GetPatientsAsync(doctorId);
            return Ok(patients);
        }
    }
}
