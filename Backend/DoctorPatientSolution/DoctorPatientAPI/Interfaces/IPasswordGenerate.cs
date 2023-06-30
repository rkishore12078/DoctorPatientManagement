using DoctorPatientAPI.Models;

namespace DoctorPatientAPI.Interfaces
{
    public interface IPasswordGenerate
    {
        public string? DoctorPasword(Doctor doctor);
        public string? PatientPassword(Patient patient);
    }
}
