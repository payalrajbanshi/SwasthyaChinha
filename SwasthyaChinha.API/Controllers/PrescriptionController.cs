// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using System.Security.Claims;
// using System.Threading.Tasks;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     [Authorize(Roles = "Doctor,Admin")]
//     public class PrescriptionController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//         public PrescriptionController(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         [HttpPost]
//         public async Task<IActionResult> CreatePrescription([FromBody] Prescription prescription)
//         {
//             if (prescription == null)
//                 return BadRequest();

//             prescription.CreatedAt = System.DateTime.UtcNow;
//             prescription.DoctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();

//             return Ok(prescription);
//         }

//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetPrescription(int id)
//         {
//             var prescription = await _context.Prescriptions
//                 .Include(p => p.Items)
//                 .FirstOrDefaultAsync(p => p.Id == id);

//             if (prescription == null)
//                 return NotFound();

//             return Ok(prescription);
//         }
//     }
// }
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;
// using System.Security.Claims;
// using System.Threading.Tasks;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     [Authorize(Roles = "Doctor,Admin")]
//     public class PrescriptionController : ControllerBase
//     {
//         private readonly IPrescriptionService _prescriptionService;

//         public PrescriptionController(IPrescriptionService prescriptionService)
//         {
//             _prescriptionService = prescriptionService;
//         }

//         [HttpPost]
//         public async Task<IActionResult> CreatePrescription([FromBody] Prescription prescription)
//         {
//             // if (prescription == null)
//             //     return BadRequest("Prescription data is required.");
//             if (model == null || model.Medicines == null || model.Medicines.Count == 0)
//                 return BadRequest("Invalid prescription data.");

//             // Attach doctor ID from token (Claim)
//             //prescription.DoctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//              var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

//             var prescription = new Prescription
//             {
//                 PatientId = model.PatientId,
//                 HospitalId = model.HospitalId,
//                 DoctorId = doctorId,
//                 CreatedAt = DateTime.UtcNow,
//                 Items = model.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0 // 🟡 Pharmacist will add cost later
//                 }).ToList(),
//                 IsDispensed = false
//             };

//             var result = await _prescriptionService.CreatePrescriptionAsync(prescription);
//             return Ok(result);
//         }

//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetPrescription(int id)
//         {
//             var prescription = await _prescriptionService.GetPrescriptionByIdAsync(id);

//             if (prescription == null)
//                 return NotFound();

//             return Ok(prescription);
//         }
//         [AllowAnonymous]
//         [HttpGet("qr/{qrCode}")]
//         public async Task<IActionResult> GetByQRCode(string qrCode)
//         {
//             var prescription = await _prescriptionService.GetByQRCodeAsync(qrCode);
//             if (prescription == null)
//                 return NotFound("Prescription not found from QR.");

//             return Ok(prescription);
//         }
//  var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

//             var prescription = new Prescription
//             {
//                 PatientId = model.PatientId,
//                 HospitalId = model.HospitalId,
//                 DoctorId = doctorId,
//                 CreatedAt = DateTime.UtcNow,
//                 Items = model.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0 // 🟡 Pharmacist will add cost later
//                 }).ToList(),
//                 IsDispensed = false
//             };
//  var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

//         var prescription = new Prescription
//         {
//             PatientId = model.PatientId,
//             HospitalId = model.HospitalId,
//             DoctorId = doctorId,
//             CreatedAt = DateTime.UtcNow,
//             Items = model.Medicines.Select(m => new PrescriptionItem
//             {
//                 MedicineName = m.Name,
//                 Dosage = m.Dosage,
//                 Cost = 0 // 🟡 Pharmacist will add cost later
//             }).ToList(),
//             IsDispensed = false
//         };
//     }
// }

// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;
// using System.Security.Claims;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     [Authorize(Roles = "Doctor,Admin")]
//     public class PrescriptionController : ControllerBase
//     {
//         private readonly IPrescriptionService _prescriptionService;

//         public PrescriptionController(IPrescriptionService prescriptionService)
//         {
//             _prescriptionService = prescriptionService;
//         }

//         // ✅ Create Prescription with QR Generation
//         [HttpPost]
//         public async Task<IActionResult> CreatePrescription([FromBody] CreatePrescriptionDTO model)
//         {
//             if (model == null || model.Medicines == null || model.Medicines.Count == 0)
//                 return BadRequest("Invalid prescription data.");

//             string doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);

//             var prescription = new Prescription
//             {
//                 PatientId =Guid.Parse(model.PatientId),
//                 HospitalId = Guid.Parse(model.HospitalId),
//                 DoctorId = Guid.Parse(doctorId),
//                 CreatedAt = DateTime.UtcNow,
//                 Items = model.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0 // 🟡 Pharmacist will later add this
//                 }).ToList(),
//                 IsDispensed = false
//             };

//             var result = await _prescriptionService.CreatePrescriptionAsync(prescription);
//             return Ok(result);
//         }

//         // ✅ Get Prescription by ID
//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetPrescription(int id)
//         {
//             var prescription = await _prescriptionService.GetPrescriptionByIdAsync(id);
//             if (prescription == null)
//                 return NotFound();

//             return Ok(prescription);
//         }

//         // ✅ Get by QR Code
//         [HttpGet("qr/{qrData}")]
//         [AllowAnonymous]
//         public async Task<IActionResult> GetByQRCode(string qrData)
//         {
//             try
//             {
//                 var result = await _prescriptionService.GetByQRCodeAsync(qrData);
//                 return Ok(result);
//             }
//             catch (Exception ex)
//             {
//                 return NotFound(ex.Message);
//             }
//         }

//         // ✅ Mark as Dispensed
//         [HttpPost("dispense/{id}")]
//         [Authorize(Roles = "Pharmacist,Admin")]
//         public async Task<IActionResult> MarkAsDispensed(string id)
//         {
//             var success = await _prescriptionService.MarkAsDispensedAsync(id);
//             if (!success)
//                 return NotFound("Prescription not found.");
//             return Ok("Prescription marked as dispensed.");
//         }
//     }
// }
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
