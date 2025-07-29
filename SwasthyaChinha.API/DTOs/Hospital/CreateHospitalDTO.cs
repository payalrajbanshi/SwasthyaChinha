// namespace SwasthyaChinha.DTOs
// {
//     public class CreateHospitalDTO
//     {
//         public string Name { get; set; }
//         public string Address { get; set; }
//     }
// }
using System.ComponentModel.DataAnnotations;

namespace SwasthyaChinha.API.DTOs.Hospital
{
    public class CreateHospitalDTO
    {
        [Required]
        public string Name { get; set; }

        public string Address { get; set; }
    }
}
