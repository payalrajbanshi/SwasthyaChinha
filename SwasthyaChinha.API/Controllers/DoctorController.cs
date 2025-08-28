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
    [Authorize(Roles = "doctor")]
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
                if (string.IsNullOrEmpty(doctorId))
        return Unauthorized("Invalid token");
            try
            {
    

            var qrCodeBase64 = await _doctorService.CreatePrescriptionAsync(dto, doctorId);

            return Ok(new
            {
                message = "Prescription created",
                qrCode = qrCodeBase64
            });
        }
         catch (ArgumentException ex)
    {
        return BadRequest(new { message = ex.Message });
    }
    catch (UnauthorizedAccessException ex)
    {
        return Unauthorized(new { message = ex.Message });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = $"Server error: {ex.Message}" });
    }
}
        

        [HttpGet("patients")]
        public async Task<IActionResult> GetMyPatients()
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var patients = await _doctorService.GetPatientsAsync(doctorId);
            return Ok(patients);
        }
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var stats = await _doctorService.GetStatsAsync(doctorId);

            return Ok(stats);
        }

[Authorize(Roles = "doctor")]
[HttpGet("search-patients")]
public async Task<IActionResult> SearchPatients([FromQuery] string query)
{
    if (string.IsNullOrWhiteSpace(query))
        return BadRequest("Query is required");

    var results = await _doctorService.SearchPatientsAsync(query);
    return Ok(results);
}


    }
}
