// using SwasthyaChinha.API.DTOs.Pharmacist;
// using SwasthyaChinha.API.DTOs.Doctor;

// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class PharmacsitService : IPharmacistService
//     {
//         private readonly ApplicationDbContext _context;
//         public PharmacistService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<User?> GetProfileAsync(Guid userId)
//         {
//             return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId && u.Role == "Pharmacist");
//         }
//     }
// }
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;   // your DbContext namespace
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Services
{
    public class PharmacistService : IPharmacistService
    {
        private readonly ApplicationDbContext _context;

        public PharmacistService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetProfileAsync(Guid userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId && u.Role == "Pharmacist");
        }
        // Prescription methods are handled in PrescriptionService
        // public Task<PrescriptionQRDTO> GetPrescriptionByQRAsync(string prescriptionId)
        // {
        //     throw new NotImplementedException();
        // }

        // public Task DispenseMedicineAsync(DispenseDTO dto)
        // {
        //     throw new NotImplementedException();
        // }

    }
}
