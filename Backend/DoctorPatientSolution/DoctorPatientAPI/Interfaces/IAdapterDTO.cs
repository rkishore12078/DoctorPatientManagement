using DoctorPatientAPI.Models.DTOs;
using DoctorPatientAPI.Models;

namespace DoctorPatientAPI.Interfaces
{
    public interface IAdapterDTO
    {
        public User? DoctorIntoUser(DoctorDTO doctorDTO);
        public User? PatientIntoUser(PatientDTO patientDTO);
        public Task<UserDTO?> DoctorIntoUserDTO(DoctorDTO doctor);
        public Task<UserDTO?> PatientIntoUserDTO(PatientDTO patient);
    }
}
