// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Services
// {
//     public class PrescriptionService : IPrescriptionService
//     {
//         private readonly ApplicationDbContext _context;

//         public PrescriptionService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription)
//         {
//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//             return prescription;
//         }

//         public async Task<Prescription> GetPrescriptionByIdAsync(int id)
//         {
//             return await _context.Prescriptions
//                 .Include(p => p.Items)
//                 .FirstOrDefaultAsync(p => p.Id == id);
//         }
//     }
// }
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.DTOs.Pharmacist;
// using SwasthyaChinha.API.DTOs.Doctor;
// using QRCoder;
// using System.Drawing;
// using System.Drawing.Imaging;
// using System.IO;
// using System.Text;
// using SwasthyaChinha.API.DTOs.Patient;


// namespace SwasthyaChinha.API.Services
// {
//     public class PrescriptionService : IPrescriptionService
//     {
//         private readonly ApplicationDbContext _context;

//         public PrescriptionService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription)
//         {
//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//             // Generate QR Code based on prescription ID
//             // string qrContent = $"PRESC-{prescription.Id}";
//             // prescription.QRCodeData = qrContent;
//             string manualQr = $"PRESC-{prescription.Id}";
//     prescription.QRCodeData = manualQr;

//             // using (var qrGenerator = new QRCodeGenerator())
//             // using (var qrData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q))
//             // using (var qrCode = new QRCode(qrData))
//             // using (Bitmap qrBitmap = qrCode.GetGraphic(20))
//             // using (var ms = new MemoryStream())
//             // {
//             //     qrBitmap.Save(ms, ImageFormat.Png);
//             //     var base64 = Convert.ToBase64String(ms.ToArray());
//             //     prescription.QRCode = base64;
//             // }
//             using (var qrGenerator = new QRCodeGenerator())
//             {
//                 var qrData = qrGenerator.CreateQrCode(manualQr, QRCodeGenerator.ECCLevel.Q);
//                 var pngQrCode = new PngByteQRCode(qrData);
//                 byte[] qrCodeBytes = pngQrCode.GetGraphic(20);
//                 prescription.QRCode = Convert.ToBase64String(qrCodeBytes);
//             }

//             await _context.SaveChangesAsync();
//             return prescription;
//         }

//         public async Task<Prescription?> GetPrescriptionByIdAsync(int id)
//         {
//             return await _context.Prescriptions
//                 .Include(p => p.Items)
//                 .FirstOrDefaultAsync(p => p.Id == id);
//         }

//         public async Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync()
//         {
//             return await _context.Prescriptions
//                 .Include(p => p.Items)
//                 .ToListAsync();
//         }
//         public async Task<PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData)
//         {
//             var prescription = await _context.Prescriptions
//                 .Include(p => p.Items)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Patient)
//                 .FirstOrDefaultAsync(p => p.QRCodeData == qrCodeData);

//             if (prescription == null)
//                 throw new Exception("Prescription not found.");

//             return new PrescriptionQRDTO
//             {
//                 PrescriptionId = prescription.Id.ToString(),
//                 PatientName = prescription.Patient?.FullName ?? "Unknown", // Or actual name if you have relation
//                 DoctorName = prescription.Doctor?.FullName ?? "Unknown",
//                 HospitalName = prescription.Hospital?.Name ?? "Unknown",
//                 Medicines = prescription.Items.Select(m => new MedicineDTO
//                 {
//                     Name = m.MedicineName,
//                     Dosage = m.Dosage,
//                     Price = m.Cost
//                 }).ToList(),
//                 IsDispensed = prescription.IsDispensed,
//                 QRCodeData = prescription.QRCodeData
//             };
//         }
//         public async Task<bool> MarkAsDispensedAsync(string prescriptionId)
//         {
//             if (!int.TryParse(prescriptionId, out int id)) return false;
//             var prescription = await _context.Prescriptions.FindAsync(id);
//             if (prescription == null)
//                 return false;

//             prescription.IsDispensed = true;
//             _context.Prescriptions.Update(prescription);
//             await _context.SaveChangesAsync();
//             return true;
//         }
//         //  public async Task<LastPrescriptionDTO?> GetLastPrescriptionAsync(Guid patientId)
//         // {
//         //     var prescription = await _context.Prescriptions
//         //         .Include(p => p.Doctor)
//         //         .Include(p => p.Hospital)
//         //         .Where(p => p.PatientId == patientId)
//         //         .OrderByDescending(p => p.CreatedAt)
//         //         .FirstOrDefaultAsync();

//         //     if (prescription == null) return null;

//         //     return new LastPrescriptionDTO
//         //     {
//         //         PrescriptionId = prescription.Id,
//         //         DoctorName = prescription.Doctor?.FullName,
//         //         HospitalName = prescription.Hospital?.Name,
//         //         DateIssued = prescription.CreatedAt,
//         //         Status = prescription.IsDispensed ? "Dispensed" :"Pending"
//         //     };
//         // }

//         // public async Task<LastVisitDTO> GetLastVisitAsync(Guid patientId)
//         // {
//         //     var visit = await _context.Prescriptions
//         //         .Include(p => p.Doctor)
//         //         .Include(p => p.Hospital)
//         //         .Where(p => p.PatientId == patientId)
//         //         .OrderByDescending(p => p.CreatedAt)
//         //         .FirstOrDefaultAsync();

//         //     if (visit == null) return null;

//         //     return new LastVisitDTO
//         //     {
//         //         DoctorName = visit.Doctor?.FullName,
//         //         HospitalName = visit.Hospital?.Name,
//         //         VisitDate = visit.CreatedAt
//         //     };
//         // }


//     }
    
// }


// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.DTOs.Pharmacist;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.DTOs.Patient;
// using QRCoder;
// using System.Drawing;
// using System.Drawing.Imaging;
// using System.IO;
// using System.Linq;
// using System.Threading.Tasks;
// using System;
// using System.Collections.Generic;

// namespace SwasthyaChinha.API.Services
// {
//     public class PrescriptionService : IPrescriptionService
//     // {
//     //     private readonly ApplicationDbContext _context;

//     //     public PrescriptionService(ApplicationDbContext context)
//     //     {
//     //         _context = context;
//     //     }

//     //     // Create new prescription with QR generation
//     //     public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription)
//     //     {
//     //         _context.Prescriptions.Add(prescription);
//     //         await _context.SaveChangesAsync();

//     //         // Generate QR Code content
//     //         string qrContent = manualQrId ?? $"PRESC-{prescription.Id}";
//     //         prescription.QRCodeData = qrContent;

//     //         // Generate Base64 QR image
//     //         using (var qrGenerator = new QRCodeGenerator())
//     //         {
//     //             var qrData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
//     //             var pngQrCode = new PngByteQRCode(qrData);
//     //             byte[] qrCodeBytes = pngQrCode.GetGraphic(20);
//     //             prescription.QRCode = Convert.ToBase64String(qrCodeBytes);
//     //         }

//     //         await _context.SaveChangesAsync();
//     //         return prescription;
//     //     }

//     //     // Get prescription by ID
//     //     public async Task<Prescription?> GetPrescriptionByIdAsync(int id)
//     //     {
//     //         return await _context.Prescriptions
//     //             .Include(p => p.Items)
//     //             .Include(p => p.Doctor)
//     //             .Include(p => p.Hospital)
//     //             .Include(p => p.Patient)
//     //             .FirstOrDefaultAsync(p => p.Id == id);
//     //     }

//     //     // Get all prescriptions
//     //     public async Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync()
//     //     {
//     //         return await _context.Prescriptions
//     //             .Include(p => p.Items)
//     //             .Include(p => p.Doctor)
//     //             .Include(p => p.Hospital)
//     //             .Include(p => p.Patient)
//     //             .ToListAsync();
//     //     }

//     //     // Get prescription by QR code (works for old and new)
//     //     public async Task<PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData)
//     //     {
//     //         var prescription = await _context.Prescriptions
//     //             .Include(p => p.Items)
//     //             .Include(p => p.Doctor)
//     //             .Include(p => p.Hospital)
//     //             .Include(p => p.Patient)
//     //             .FirstOrDefaultAsync(p => p.QRCodeData == qrCodeData || p.QRCode == qrCodeData);

//     //         if (prescription == null)
//     //             throw new Exception("Prescription not found.");

//     //         return new PrescriptionQRDTO
//     //         {
//     //             PrescriptionId = prescription.Id.ToString(),
//     //             PatientName = prescription.Patient?.FullName ?? "Unknown",
//     //             DoctorName = prescription.Doctor?.FullName ?? "Unknown",
//     //             HospitalName = prescription.Hospital?.Name ?? "Unknown",
//     //             Medicines = prescription.Items.Select(m => new MedicineDTO
//     //             {
//     //                 Name = m.MedicineName,
//     //                 Dosage = m.Dosage,
//     //                 Price = m.Cost
//     //             }).ToList(),
//     //             IsDispensed = prescription.IsDispensed,
//     //             QRCodeData = prescription.QRCodeData ?? prescription.QRCode
//     //         };
//     //     }

//     //     // Mark prescription as dispensed
//     //     public async Task<bool> MarkAsDispensedAsync(string prescriptionId)
//     //     {
//     //         if (!int.TryParse(prescriptionId, out int id)) return false;

//     //         var prescription = await _context.Prescriptions.FindAsync(id);
//     //         if (prescription == null) return false;

//     //         prescription.IsDispensed = true;
//     //         _context.Prescriptions.Update(prescription);
//     //         await _context.SaveChangesAsync();

//     //         return true;
//     //     }
//     // }
//     //public class PrescriptionService : IPrescriptionService
// {
//     private readonly ApplicationDbContext _context;

//     public PrescriptionService(ApplicationDbContext context)
//     {
//         _context = context;
//     }

//     // Create new prescription with optional manual QR
//     public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription, string? manualQrId = null)
//     {
//         _context.Prescriptions.Add(prescription);
//         await _context.SaveChangesAsync();

//         // QR content: manual or auto
//         string qrContent = string.IsNullOrEmpty(manualQrId) ? $"PRESC-{prescription.Id}" : manualQrId;
//         prescription.QRCodeData = qrContent;

//         // Generate Base64 QR code
//         using (var qrGenerator = new QRCoder.QRCodeGenerator())
//         {
//             var qrData = qrGenerator.CreateQrCode(qrContent, QRCoder.QRCodeGenerator.ECCLevel.Q);
//             var pngQrCode = new QRCoder.PngByteQRCode(qrData);
//             byte[] qrCodeBytes = pngQrCode.GetGraphic(20);
//             prescription.QRCode = Convert.ToBase64String(qrCodeBytes);
//         }

//         await _context.SaveChangesAsync();
//         return prescription;
//     }

//     public async Task<Prescription?> GetPrescriptionByIdAsync(int id)
//     {
//         return await _context.Prescriptions
//             .Include(p => p.Items)
//             .Include(p => p.Doctor)
//             .Include(p => p.Hospital)
//             .Include(p => p.Patient)
//             .FirstOrDefaultAsync(p => p.Id == id);
//     }

//     public async Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync()
//     {
//         return await _context.Prescriptions
//             .Include(p => p.Items)
//             .Include(p => p.Doctor)
//             .Include(p => p.Hospital)
//             .Include(p => p.Patient)
//             .ToListAsync();
//     }

//     public async Task<PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData)
//     {
//         var prescription = await _context.Prescriptions
//             .Include(p => p.Items)
//             .Include(p => p.Doctor)
//             .Include(p => p.Hospital)
//             .Include(p => p.Patient)
//             .FirstOrDefaultAsync(p => p.QRCodeData == qrCodeData || p.QRCode == qrCodeData);

//         if (prescription == null)
//             throw new Exception("Prescription not found.");

//         return new PrescriptionQRDTO
//         {
//             PrescriptionId = prescription.Id.ToString(),
//             PatientName = prescription.Patient?.FullName ?? "Unknown",
//             DoctorName = prescription.Doctor?.FullName ?? "Unknown",
//             HospitalName = prescription.Hospital?.Name ?? "Unknown",
//             Medicines = prescription.Items.Select(m => new MedicineDTO
//             {
//                 Name = m.MedicineName,
//                 Dosage = m.Dosage,
//                 Price = m.Cost
//             }).ToList(),
//             IsDispensed = prescription.IsDispensed,
//             QRCodeData = prescription.QRCodeData ?? prescription.QRCode
//         };
//     }

//     public async Task<bool> MarkAsDispensedAsync(string prescriptionId)
//     {
//         if (!int.TryParse(prescriptionId, out int id)) return false;

//         var prescription = await _context.Prescriptions.FindAsync(id);
//         if (prescription == null) return false;

//         prescription.IsDispensed = true;
//         _context.Prescriptions.Update(prescription);
//         await _context.SaveChangesAsync();

//         return true;
//     }
// }

// }
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.Services.Interfaces;
using DoctorDTOs = SwasthyaChinha.API.DTOs.Doctor;
using PharmacistDTOs = SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.DTOs.Patient;
using QRCoder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SwasthyaChinha.API.Services
{
    public class PrescriptionService : IPrescriptionService
    {
        private readonly ApplicationDbContext _context;

        public PrescriptionService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create new prescription with optional manual QR
        public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription, string? manualQrId = null)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();

            // QR content: manual or auto
            string qrContent = string.IsNullOrEmpty(manualQrId) ? $"PRESC-{prescription.Id}" : manualQrId;
            prescription.QRCodeData = qrContent;

            // Generate Base64 QR code
            using (var qrGenerator = new QRCodeGenerator())
            {
                var qrData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
                var pngQrCode = new PngByteQRCode(qrData);
                byte[] qrCodeBytes = pngQrCode.GetGraphic(20);
                prescription.QRCode = Convert.ToBase64String(qrCodeBytes);
            }

            await _context.SaveChangesAsync();
            return prescription;
        }

        public async Task<Prescription?> GetPrescriptionByIdAsync(int id)
        {
            return await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync()
        {
            return await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .ToListAsync();
        }

        public async Task<DoctorDTOs.PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData)
        {
            var prescription = await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.QRCodeData == qrCodeData || p.QRCode == qrCodeData);

            if (prescription == null)
                throw new Exception("Prescription not found.");

            return new DoctorDTOs.PrescriptionQRDTO
            {
                PrescriptionId = prescription.Id.ToString(),
                PatientName = prescription.Patient?.FullName ?? "Unknown",
                DoctorName = prescription.Doctor?.FullName ?? "Unknown",
                HospitalName = prescription.Hospital?.Name ?? "Unknown",
                Medicines = prescription.Items.Select(m => new DoctorDTOs.MedicineDTO
                {
                    Name = m.MedicineName,
                    Dosage = m.Dosage,
                    Price = m.Cost
                }).ToList(),
                IsDispensed = prescription.IsDispensed,
                QRCodeData = prescription.QRCodeData ?? prescription.QRCode
            };
        }

        public async Task<bool> MarkAsDispensedAsync(string prescriptionId)
        {
            if (!int.TryParse(prescriptionId, out int id)) return false;

            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription == null) return false;

            prescription.IsDispensed = true;
            _context.Prescriptions.Update(prescription);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
