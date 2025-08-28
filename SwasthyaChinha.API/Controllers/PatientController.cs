// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;
// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;
//         private readonly IPrescriptionService _prescriptionService;

//         public PatientController(IPatientService patientService)
//         {
//             _patientService = patientService;
//         }

//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var profile = await _patientService.GetProfileAsync(userId);
//             return Ok(profile);
//         }

//         [HttpPut("update")]
//         public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             await _patientService.UpdatePatientProfileAsync(userId, dto);
//             return NoContent();
//         }

//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//             return Ok(prescriptions);
//         }

//         [HttpGet("expenses")]
//         public async Task<IActionResult> GetExpenses()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var expenses = await _patientService.GetExpensesAsync(userId);
//             return Ok(expenses);
//         }
//         // In PatientsController.cs
//         // [HttpGet("search")]
//         // public async Task<IActionResult> SearchPatients(string query)
//         // {
//         //     if (string.IsNullOrWhiteSpace(query))
//         //         return BadRequest("Search query is required");

//         //     var patients = await _context.Users
//         //         .Where(u => u.Role == "Patient" &&
//         //                    (u.FullName.Contains(query) ||
//         //                     u.Email.Contains(query) ||
//         //                     u.PhoneNumber.Contains(query)))
//         //         .Select(u => new
//         //         {
//         //             id = u.Id,        // GUID
//         //             name = u.FullName,
//         //             email = u.Email,
//         //             phone = u.PhoneNumber
//         //         })
//         //         .Take(10) // limit results
//         //         .ToListAsync();

//         //     return Ok(patients);
//         // }
//         [HttpGet("search")]
//         public async Task<IActionResult> SearchPatients(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return BadRequest("Search query is required");

//             var patients = await _patientService.SearchPatientsAsync(query);
//             return Ok(patients);
//         }
// [HttpGet("last-prescription/{patientId}")]
//         public async Task<ActionResult<LastPrescriptionDTO>> GetLastPrescription(Guid patientId)
//         {
//             var result = await _prescriptionService.GetLastPrescriptionAsync(patientId);
//             if (result == null) return NotFound("No prescriptions found.");
//             return Ok(result);
//         }

//         [HttpGet("last-visit/{patientId}")]
//         public async Task<ActionResult<LastVisitDTO>> GetLastVisit(Guid patientId)
//         {
//             var result = await _prescriptionService.GetLastVisitAsync(patientId);
//             if (result == null) return NotFound("No visits found.");
//             return Ok(result);
//         }

//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;
//         private readonly IPrescriptionService _prescriptionService;

//         public PatientController(IPatientService patientService, IPrescriptionService prescriptionService)
//         {
//             _patientService = patientService;
//             _prescriptionService = prescriptionService;
//         }

//         // ✅ Get logged-in patient's profile
//         // [HttpGet("profile")]
//         // public async Task<IActionResult> GetProfile()
//         // {
//         //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//         //     if (string.IsNullOrEmpty(userId))
//         //         return Unauthorized("Invalid token");

//         //     var profile = await _patientService.GetProfileAsync(userId);
//         //     return Ok(profile);
//         // }
//                 [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             try
//             {
//                 var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

//                 if (string.IsNullOrEmpty(userId))
//                 {
//                     return Unauthorized("❌ No user id found in token.");
//                 }

//                 var profile = await _patientService.GetPatientProfileAsync(userId);

//                 if (profile == null)
//                 {
//                     return NotFound("❌ Patient not found.");
//                 }

//                 return Ok(profile);
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine("❌ ERROR in PatientController.GetProfile: " + ex.ToString());
//                 return StatusCode(500, "Internal server error: " + ex.Message);
//             }
//         }
//         // ✅ Update logged-in patient's profile
//         [HttpPut("update")]
//         public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             await _patientService.UpdatePatientProfileAsync(userId, dto);
//             return NoContent();
//         }

//         // ✅ Get all prescriptions for logged-in patient
//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//             return Ok(prescriptions);
//         }

//         // ✅ Get expenses for logged-in patient
//         [HttpGet("expenses")]
//         public async Task<IActionResult> GetExpenses()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             var expenses = await _patientService.GetExpensesAsync(userId);
//             return Ok(expenses);
//         }

//         // ✅ Search patients (optional)
//         [HttpGet("search")]
//         public async Task<IActionResult> SearchPatients(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return BadRequest("Search query is required");

//             var patients = await _patientService.SearchPatientsAsync(query);
//             return Ok(patients);
//         }

//         // ✅ Get last prescription for patient (default: logged-in if no ID)
//         [HttpGet("last-prescription/{patientId?}")]
//         public async Task<ActionResult<LastPrescriptionDTO>> GetLastPrescription(Guid? patientId = null)
//         {
//             var userId = patientId?.ToString() ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             var result = await _prescriptionService.GetLastPrescriptionAsync(Guid.Parse(userId));
//             if (result == null) return NotFound("No prescriptions found.");

//             return Ok(result);
//         }

//         // ✅ Get last visit for patient (default: logged-in if no ID)
//         [HttpGet("last-visit/{patientId?}")]
//         public async Task<ActionResult<LastVisitDTO>> GetLastVisit(Guid? patientId = null)
//         {
//             var userId = patientId?.ToString() ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             var result = await _prescriptionService.GetLastVisitAsync(Guid.Parse(userId));
//             if (result == null) return NotFound("No visits found.");

//             return Ok(result);
//         }
//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;
//         private readonly IPrescriptionService _prescriptionService;

//         public PatientController(IPatientService patientService, IPrescriptionService prescriptionService)
//         {
//             _patientService = patientService;
//             _prescriptionService = prescriptionService;
//         }

//         // ✅ Get logged-in patient's profile
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var profile = await _patientService.GetProfileAsync(userId);
//                 if (profile == null)
//                     return NotFound("Profile not found");

//                 return Ok(profile);
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine("❌ ERROR in PatientController.GetProfile: " + ex.ToString());
//                 return StatusCode(500, "Server error. Please try later.");
//             }
//         }

//         // ✅ Update logged-in patient's profile
//         [HttpPut("update")]
//         public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 await _patientService.UpdatePatientProfileAsync(userId, dto);
//                 return NoContent();
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine("❌ ERROR in PatientController.UpdateProfile: " + ex.ToString());
//                 return StatusCode(500, "Server error. Please try later.");
//             }
//         }

//         // ✅ Get all prescriptions for logged-in patient
//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//                 return Ok(prescriptions);
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine("❌ ERROR in PatientController.GetPrescriptions: " + ex.ToString());
//                 return StatusCode(500, "Server error. Please try later.");
//             }
//         }

//         // ✅ Get expenses for logged-in patient
//         [HttpGet("expenses")]
//         public async Task<IActionResult> GetExpenses()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var expenses = await _patientService.GetExpensesAsync(userId);
//                 return Ok(expenses);
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine("❌ ERROR in PatientController.GetExpenses: " + ex.ToString());
//                 return StatusCode(500, "Server error. Please try later.");
//             }
//         }

//         // ✅ Search patients
//         [HttpGet("search")]
//         public async Task<IActionResult> SearchPatients(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return BadRequest("Search query is required");

//             try
//             {
//                 var patients = await _patientService.SearchPatientsAsync(query);
//                 return Ok(patients);
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine("❌ ERROR in PatientController.SearchPatients: " + ex.ToString());
//                 return StatusCode(500, "Server error. Please try later.");
//             }
//         }
//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;
//         private readonly IPrescriptionService _prescriptionService;

//         public PatientController(IPatientService patientService, IPrescriptionService prescriptionService)
//         {
//             _patientService = patientService;
//             _prescriptionService = prescriptionService;
//         }

//         // ✅ Get logged-in patient's profile
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var profile = await _patientService.GetProfileAsync(userId);
//                 return Ok(profile);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Update logged-in patient's profile
//         [HttpPut("update")]
//         public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 await _patientService.UpdatePatientProfileAsync(userId, dto);
//                 return NoContent();
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get all prescriptions for logged-in patient
//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             try
//             {
//                 var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//                 return Ok(prescriptions);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get expenses for logged-in patient
//         [HttpGet("expenses")]
//         public async Task<IActionResult> GetExpenses()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             try
//             {
//                 var expenses = await _patientService.GetExpensesAsync(userId);
//                 return Ok(expenses);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Search patients
//         [HttpGet("search")]
//         public async Task<IActionResult> SearchPatients(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return BadRequest("Search query is required");

//             var patients = await _patientService.SearchPatientsAsync(query);
//             return Ok(patients);
//         }
//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;

//         public PatientController(IPatientService patientService)
//         {
//             _patientService = patientService;
//         }

//         // ✅ Get logged-in patient's profile
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var profile = await _patientService.GetProfileAsync(userId);
//                 return Ok(profile);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Update logged-in patient's profile
//         [HttpPut("update")]
//         public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 await _patientService.UpdatePatientProfileAsync(userId, dto);
//                 return NoContent();
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get prescriptions for logged-in patient
//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             try
//             {
//                 var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//                 return Ok(prescriptions);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get expenses for logged-in patient
//         [HttpGet("expenses")]
//         public async Task<IActionResult> GetExpenses()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             try
//             {
//                 var expenses = await _patientService.GetExpensesAsync(userId);
//                 return Ok(expenses);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }
//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "Patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;

//         public PatientController(IPatientService patientService)
//         {
//             _patientService = patientService;
//         }

//         // ✅ Get logged-in patient's profile
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var profile = await _patientService.GetProfileAsync(userId);
//                 return Ok(profile);
//             }
//             catch (Exception ex)
//             {
//                 if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//                     return NotFound(new { message = ex.Message });

//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Update logged-in patient's profile
//         [HttpPut("update")]
//         public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 await _patientService.UpdatePatientProfileAsync(userId, dto);
//                 return NoContent();
//             }
//             catch (Exception ex)
//             {
//                 if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//                     return NotFound(new { message = ex.Message });

//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get prescriptions for logged-in patient
//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             try
//             {
//                 var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//                 return Ok(prescriptions);
//             }
//             catch (Exception ex)
//             {
//                 if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//                     return NotFound(new { message = ex.Message });

//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get expenses for logged-in patient
//         // [HttpGet("expenses")]
//         // public async Task<IActionResult> GetExpenses()
//         // {
//         //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//         //     try
//         //     {
//         //         var expenses = await _patientService.GetExpensesAsync(userId);
//         //         return Ok(expenses);
//         //     }
//         //     catch (Exception ex)
//         //     {
//         //         if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//         //             return NotFound(new { message = ex.Message });

//         //         return StatusCode(500, $"Server error: {ex.Message}");
//         //     }
//         // }
//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Patient;
// using System.Security.Claims;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Controllers
// {
//     // ✅ Make the role lowercase to match JWT token "patient"
//     [Authorize(Roles = "patient")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class PatientController : ControllerBase
//     {
//         private readonly IPatientService _patientService;

//         public PatientController(IPatientService patientService)
//         {
//             _patientService = patientService;
//         }

//         // ✅ Get logged-in patient's profile
//         [HttpGet("profile")]
//         public async Task<IActionResult> GetProfile()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized("Invalid token");

//             try
//             {
//                 var profile = await _patientService.GetProfileAsync(userId);
//                 return Ok(profile);
//             }
//             catch (Exception ex)
//             {
//                 if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//                     return NotFound(new { message = ex.Message });

//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // // ✅ Update logged-in patient's profile
//         // [HttpPut("update")]
//         // public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
//         // {
//         //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//         //     if (string.IsNullOrEmpty(userId))
//         //         return Unauthorized("Invalid token");

//         //     try
//         //     {
//         //         await _patientService.UpdatePatientProfileAsync(userId, dto);
//         //         return NoContent();
//         //     }
//         //     catch (Exception ex)
//         //     {
//         //         if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//         //             return NotFound(new { message = ex.Message });

//         //         return StatusCode(500, $"Server error: {ex.Message}");
//         //     }
//         // }

//         // ✅ Get prescriptions for logged-in patient
//         [HttpGet("prescriptions")]
//         public async Task<IActionResult> GetPrescriptions()
//         {
//             var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//             try
//             {
//                 var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
//                 return Ok(prescriptions);
//             }
//             catch (Exception ex)
//             {
//                 if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//                     return NotFound(new { message = ex.Message });

//                 return StatusCode(500, $"Server error: {ex.Message}");
//             }
//         }

//         // ✅ Get expenses for logged-in patient
//         // [HttpGet("expenses")]
//         // public async Task<IActionResult> GetExpenses()
//         // {
//         //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//         //     try
//         //     {
//         //         var expenses = await _patientService.GetExpensesAsync(userId);
//         //         return Ok(expenses);
//         //     }
//         //     catch (Exception ex)
//         //     {
//         //         if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
//         //             return NotFound(new { message = ex.Message });

//         //         return StatusCode(500, $"Server error: {ex.Message}");
//         //     }
//         // }
//         // Get the last visit for a patient by ID
// // [HttpGet("last-visit/{patientId}")]
// // public async Task<IActionResult> GetLastVisit(string patientId)
// // {
// //     try
// //     {
// //         var lastVisit = await _patientService.GetLastVisitAsync(patientId);
// //         if (lastVisit == null)
// //             return NotFound(new { message = "No visits found for this patient." });

// //         return Ok(lastVisit);
// //     }
// //     catch (Exception ex)
// //     {
// //         return StatusCode(500, $"Server error: {ex.Message}");
// //     }
// // }

//     }
// }

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.DTOs.Patient;
using System.Security.Claims;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "patient,Patient")] // lowercase to match JWT role
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        // Get logged-in patient's profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            try
            {
                var profile = await _patientService.GetProfileAsync(userId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Update logged-in patient's profile
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            try
            {
                await _patientService.UpdatePatientProfileAsync(userId, dto);
                return NoContent();
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Get prescriptions for logged-in patient
        [HttpGet("prescriptions")]
        public async Task<IActionResult> GetPrescriptions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try
            {
                var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
                return Ok(prescriptions);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Get last visit for logged-in patient
        // [HttpGet("last-visit")]
        // public async Task<IActionResult> GetLastVisit()
        // {
        //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //     try
        //     {
        //         var lastVisit = await _patientService.GetLastVisitAsync(userId);
        //         if (lastVisit == null)
        //             return NotFound(new { message = "No visits found for this patient." });

        //         return Ok(lastVisit);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Server error: {ex.Message}");
        //     }
        // }

        // Get last prescription for logged-in patient
        // [HttpGet("last-prescription")]
        // public async Task<IActionResult> GetLastPrescription()
        // {
        //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //     try
        //     {
        //         var lastPrescription = await _patientService.GetLastPrescriptionAsync(userId);
        //         if (lastPrescription == null)
        //             return NotFound(new { message = "No prescriptions found for this patient." });

        //         return Ok(lastPrescription);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Server error: {ex.Message}");
        //     }
        // }
    }
}
