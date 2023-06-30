using System.ComponentModel.DataAnnotations;

namespace DoctorPatientAPI.Models.DTOs
{
    public class PatientDTO:Patient
    {
        public string? Password { get; set; }
    }
}
