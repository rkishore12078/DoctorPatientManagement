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
        private readonly IRepo<User, int> _userRepo;

        public AdapterDTO(ITokenService tokenService,
                            IRepo<User,int> userRepo)
        {
            _tokenService=tokenService;
            _userRepo=userRepo;
        }

        public User? DoctorIntoUser(DoctorDTO doctorDTO)
        {
            var hmac = new HMACSHA512();
            if (doctorDTO.Users == null) return null;
            doctorDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(doctorDTO.Password ?? "1234"));
            doctorDTO.Users.PasswordKey = hmac.Key;
            doctorDTO.Users.Role = "Doctor";
            doctorDTO.Users.DoctorState = "Not Approve";
            return doctorDTO.Users;
        }
        public User? PatientIntoUser(PatientDTO patientDTO)
        {
            var hmac = new HMACSHA512();
            if (patientDTO.Users == null) return null;
            patientDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(patientDTO.Password ?? "1234"));
            patientDTO.Users.PasswordKey = hmac.Key;
            patientDTO.Users.Role = "Patient";
            return patientDTO.Users;
        }
        public async Task<UserDTO?> DoctorIntoUserDTO(DoctorDTO doctor)
        {
            UserDTO userDTO = new()
            {
                UserId = doctor.DoctorId
            };
            UserDTO user = userDTO;
            var myUser = await _userRepo.Get(user.UserId);
            if (myUser == null) return null;
            user.Role = myUser.Role;
            user.Email= myUser.Email;
            user.Password=doctor.Password;
            user.Token = _tokenService.GenerateToken(user);
            return user;
        }

        public async Task<UserDTO?> PatientIntoUserDTO(PatientDTO patient)
        {
            UserDTO user = new()
            {
                UserId = patient.PatientId
            };
            var myUser = await _userRepo.Get(user.UserId);
            if (myUser == null) return null;
            user.Role = myUser.Role;
            user.Email = myUser.Email;
            user.Password = patient.Password;
            user.Token = _tokenService.GenerateToken(user);
            return user;
        }

        public UserDTO? UserIntoUserDTO(User user)
        {
            UserDTO? userDTO = new()
            {
                Email = user.Email,
                UserId = user.UserId,
                Role = user.Role,
                Status = user.DoctorState
            };
            userDTO.Token = _tokenService.GenerateToken(userDTO);
            return userDTO;
        }
    }
}
