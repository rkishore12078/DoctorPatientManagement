using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace DoctorPatientAPI.Adapters
{
    public class AdapterDTO:IAdapterDTO
    {
        private readonly ITokenService _tokenService;

        public AdapterDTO(ITokenService tokenService)
        {
            _tokenService=tokenService;
        }

        public async Task<User?> DoctorIntoUser(DoctorDTO doctorDTO)
        {
            var hmac = new HMACSHA512();
            doctorDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(doctorDTO.Password ?? "1234"));
            doctorDTO.Users.PasswordKey = hmac.Key;
            doctorDTO.Users.Role = "Doctor";
            return doctorDTO.Users;
        }
        public async Task<User?> PatientIntoUser(PatientDTO patientDTO)
        {
            //var hmac = new HMACSHA512();
            //doctorDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(doctorDTO.Password ?? "1234"));
            //doctorDTO.Users.PasswordKey = hmac.Key;
            //doctorDTO.Users.Role = "Doctor";
            //return doctorDTO.Users;
            return null;
        }
    }
}
