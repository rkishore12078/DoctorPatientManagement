using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Interfaces
{
    public interface IManagePatient
    {
        public Task<UserDTO?> PatientRegister(PatientDTO patientDTO);
    }
}
