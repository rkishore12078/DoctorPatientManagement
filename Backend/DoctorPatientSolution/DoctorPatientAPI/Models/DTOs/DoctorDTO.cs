using System.ComponentModel.DataAnnotations;

namespace DoctorPatientAPI.Models.DTOs
{
    public class DoctorDTO:Doctor
    {
        public string? Password { get; set; }
    }
}
