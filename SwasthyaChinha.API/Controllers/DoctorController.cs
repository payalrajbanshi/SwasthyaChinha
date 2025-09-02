// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.DTOs.Doctor;
// using System.Security.Claims;
// using Microsoft.AspNetCore.Hosting; // for IHostingEnvironment / IWebHostEnvironment
// using SwasthyaChinha.API.Data;  

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "doctor")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class DoctorController : ControllerBase
//     {
//         private readonly IDoctorService _doctorService;
//         private readonly ApplicationDbContext _context;
//     private readonly IWebHostEnvironment _env;

//         public DoctorController(IDoctorService doctorService)
//         {
//             _doctorService = doctorService;
//         }
//          public DoctorController(ApplicationDbContext context, IWebHostEnvironment env)
//     {
//         _context = context;
//         _env = env;
//     }
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var profile = await _doctorService.GetProfileAsync(doctorId);
//             return Ok(profile);
//         }
//         //         [HttpPut("profile")]
//         // public async Task<IActionResult> UpdateProfile([FromForm] UpdateDoctorProfileDTO dto)
//         // {
//         //     var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//         //     if (string.IsNullOrEmpty(doctorId))
//         //         return Unauthorized("Invalid token");

//         //     try
//         //     {
//         //         var updatedDoctor = await _doctorService.UpdateProfileAsync(dto, doctorId);
//         //         return Ok(updatedDoctor);
//         //     }
//         //     catch (Exception ex)
//         //     {
//         //         return StatusCode(500, new { message = $"Server error: {ex.Message}" });
//         //     }
//         // }
//     [HttpPut("profile")]
// public async Task<IActionResult> UpdateProfile([FromForm] DoctorProfileUpdateDto dto)
// {
//     var doctor = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.Id && u.Role == "Doctor");
//     if (doctor == null) return NotFound("Doctor not found");

//     doctor.FullName = dto.FullName;
//     doctor.Specialty = dto.Specialty;

//     if (dto.ProfilePicture != null)
//     {
//         // Ensure uploads folder exists
//         var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
//         if (!Directory.Exists(uploadsFolder))
//             Directory.CreateDirectory(uploadsFolder);

//         // Generate unique filename
//         var fileExtension = Path.GetExtension(dto.ProfilePicture.FileName);
//         var fileName = $"{Guid.NewGuid()}{fileExtension}";
//         var filePath = Path.Combine(uploadsFolder, fileName);

//         // Save file
//         using (var stream = new FileStream(filePath, FileMode.Create))
//         {
//             await dto.ProfilePicture.CopyToAsync(stream);
//         }

//         // Store relative path in DB
//         doctor.ProfileImageUrl = $"/uploads/{fileName}";
//     }

//     await _context.SaveChangesAsync();

//     return Ok(doctor);
// }


        
//         [HttpPost("prescribe")]
// public async Task<IActionResult> CreatePrescription([FromBody] CreatePrescriptionDTO dto)
// {
//     // Get doctorId from JWT token
//     var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//     if (string.IsNullOrEmpty(doctorId))
//         return Unauthorized("Invalid token");

//     try
//     {
//         // Call service to create prescription and get both QR image and QR ID
//         var qrResult = await _doctorService.CreatePrescriptionAsync(dto, doctorId);

//         return Ok(new
//         {
//             success = true,
//             qrCode = qrResult.QRCode,        // Base64 QR image
//             qrCodeData = qrResult.QRCodeData // Prescription ID fallback
//         });
//     }
//     catch (ArgumentException ex)
//     {
//         return BadRequest(new { message = ex.Message });
//     }
//     catch (UnauthorizedAccessException ex)
//     {
//         return Unauthorized(new { message = ex.Message });
//     }
//     catch (Exception ex)
//     {
//         return StatusCode(500, new { message = $"Server error: {ex.Message}" });
//     }
// }


       
//         [HttpGet("patients")]
//         public async Task<IActionResult> GetMyPatients()
//         {
//             var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var patients = await _doctorService.GetPatientsAsync(doctorId);
//             return Ok(patients);
//         }
//         [HttpGet("stats")]
//         public async Task<IActionResult> GetStats()
//         {
//             var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var stats = await _doctorService.GetStatsAsync(doctorId);

//             return Ok(stats);
//         }

//         [Authorize(Roles = "doctor")]
//         [HttpGet("search-patients")]
//         public async Task<IActionResult> SearchPatients([FromQuery] string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return BadRequest("Query is required");

//             var results = await _doctorService.SearchPatientsAsync(query);
//             return Ok(results);
//         }
        
//         [HttpGet("total-patients")]
// public async Task<IActionResult> GetTotalRegisteredPatients()
// {
//     try
//     {
//         var totalPatients = await _doctorService.GetTotalRegisteredPatientsAsync();
//         return Ok(new { count = totalPatients });
//     }
//     catch (Exception ex)
//     {
//         return StatusCode(500, new { message = $"Server error: {ex.Message}" });
//     }
// }



    //}
//}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.DTOs.Doctor;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using System.IO;

namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "doctor")]
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        // Single constructor to inject all dependencies
        public DoctorController(IDoctorService doctorService, ApplicationDbContext context, IWebHostEnvironment env)
        {
            _doctorService = doctorService;
            _context = context;
            _env = env;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = await _doctorService.GetProfileAsync(doctorId);
            return Ok(profile);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromForm] DoctorProfileUpdateDto dto)
        {
            // Fetch doctor (user with role = Doctor)
            var doctor = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.Id && u.Role == "Doctor");
            if (doctor == null) return NotFound("Doctor not found");

            // Update fields
            doctor.FullName = dto.FullName;
            doctor.Specialty = dto.Specialty;

            // Handle profile picture
            if (dto.ProfilePicture != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileExtension = Path.GetExtension(dto.ProfilePicture.FileName);
                var fileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ProfilePicture.CopyToAsync(stream);
                }

                doctor.ProfileImageUrl = $"/uploads/{fileName}";
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                doctor.Id,
                doctor.FullName,
                doctor.Specialty,
                doctor.Email,
                ProfileImageUrl = doctor.ProfileImageUrl
            });
        }

        [HttpPost("prescribe")]
        public async Task<IActionResult> CreatePrescription([FromBody] CreatePrescriptionDTO dto)
        {
            var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(doctorId))
                return Unauthorized("Invalid token");

            try
            {
                var qrResult = await _doctorService.CreatePrescriptionAsync(dto, doctorId);
                return Ok(new
                {
                    success = true,
                    qrCode = qrResult.QRCode,
                    qrCodeData = qrResult.QRCodeData
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

        [HttpGet("total-patients")]
        public async Task<IActionResult> GetTotalRegisteredPatients()
        {
            try
            {
                var totalPatients = await _doctorService.GetTotalRegisteredPatientsAsync();
                return Ok(new { count = totalPatients });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Server error: {ex.Message}" });
            }
        }
    }
}
