using DoctorPatientAPI.Adapters;
using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Services
{
    public class PatientService:IManagePatient
    {
        private readonly IRepo<Patient, int> _patientRepo;
        private readonly IPasswordGenerate _patientPassword;
        private readonly IAdapterDTO _adapterDTO;

        public PatientService(IRepo<Patient, int> patientRepo,
                             IPasswordGenerate patientPassword,
                             IAdapterDTO adapterDTO)
        {
            _patientRepo = patientRepo;
            _patientPassword = patientPassword;
            _adapterDTO = adapterDTO;
        }
        public async Task<UserDTO?> PatientRegister(PatientDTO patientDTO)
        {
            var tempPassword = patientDTO.Password;
            if (!IsStrongPassword(tempPassword))
            {
                patientDTO.Password = _patientPassword.PatientPassword(patientDTO);
            }
            patientDTO.Users = _adapterDTO.PatientIntoUser(patientDTO);
            var doctor = await _patientRepo.Add(patientDTO);
            if (doctor == null) return null;
            var userDTO = await _adapterDTO.PatientIntoUserDTO(patientDTO);
            if (userDTO != null) return userDTO;
            return null;
        }
        private bool IsStrongPassword(string? tempPassword)
        {
            if (tempPassword.Length >= 6 &&
                tempPassword.Any(char.IsUpper) &&
                tempPassword.Any(char.IsLower) &&
                tempPassword.Any(char.IsDigit) &&
                tempPassword.Any(IsSpecialCharacter))
                return true;
            return false;
        }
        private bool IsSpecialCharacter(char c)
        {
            // Define the set of special characters
            var specialCharacters = "!@#$%^&*()-_=+[]{}\\|;:'\",.<>/?";
            // Check if the character is in the set of special characters
            return specialCharacters.Contains(c);
        }

        public async Task<Patient?> GetPatient(UserIdsDTO userId)
        {
            var patient = await _patientRepo.Get(userId.UserID);
            if(patient!=null)
                return patient;
            return null;
        }
    }
}
