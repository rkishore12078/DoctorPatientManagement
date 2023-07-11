using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Services
{
    public class DoctorService:IManageDoctor
    {
        private readonly IRepo<Doctor, int> _doctorRepo;
        private readonly IPasswordGenerate _doctorPassword;
        private readonly IAdapterDTO _adapterDTO;
        private readonly IRepo<User, int> _userRepo;

        public DoctorService(IRepo<Doctor,int> doctorRepo,
                             IPasswordGenerate doctorPassword,
                             IAdapterDTO adapterDTO,
                             IRepo<User,int> userRepo)
        {
            _doctorRepo= doctorRepo;
            _doctorPassword= doctorPassword;
            _adapterDTO= adapterDTO;
            _userRepo= userRepo;
        }

        public async Task<UserDTO?> DoctorRegister(DoctorDTO doctorDTO)
        {
            var tempPassword=doctorDTO.Password;
            if (!IsStrongPassword(tempPassword))
            {
                doctorDTO.Password= _doctorPassword.DoctorPasword(doctorDTO);
            }
            doctorDTO.Users= _adapterDTO.DoctorIntoUser(doctorDTO);
            var doctor=await _doctorRepo.Add(doctorDTO);
            if (doctor == null) return null;
            var userDTO = await _adapterDTO.DoctorIntoUserDTO(doctorDTO);
            if (userDTO != null) return userDTO;
            return null;
        }

        private bool IsStrongPassword(string? tempPassword)
        {
            if(tempPassword == null) return false;
            if(tempPassword.Length>=6 && 
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

        public async Task<UserDTO?> UpdateDetails(DoctorDTO doctorDTO)
        {
            var doctor = await _doctorRepo.Get(doctorDTO.DoctorId);
            if(doctor == null) return null;
            doctor.Name= doctorDTO.Name ?? doctor.Name;
            doctor.Phone = doctorDTO.Phone ?? doctor.Phone;
            doctor.DateOfBirth= doctorDTO.DateOfBirth.Date!=DateTime.Now.Date?doctorDTO.DateOfBirth:doctor.DateOfBirth;
            doctor.Specialization= doctorDTO.Specialization ?? doctor.Specialization;
            doctor.Qualification= doctorDTO.Qualification ?? doctor.Qualification;
            doctor.Address= doctorDTO.Address ?? doctor.Address;
            doctor.YearsOfExperience=doctorDTO.YearsOfExperience>0?doctorDTO.YearsOfExperience:doctor.YearsOfExperience;
            var myDoctor=await _doctorRepo.Update(doctor);
            if (myDoctor != null)
            {
                var userDTO = await _adapterDTO.DoctorIntoUserDTO(doctorDTO);
                if(userDTO != null) 
                    return userDTO;
            }
            return null;
        }

        public async Task<List<Doctor>?> GetAllDoctors()
        {
            var doctors = await _doctorRepo.GetAll();
            if (doctors != null)
                return doctors.ToList();
            return null;
        }

        public async Task<Doctor?> GetDoctor(UserIdsDTO userIds)
        {
            var doctor = await _doctorRepo.Get(userIds.UserID);
            if(doctor != null)
                return doctor;
            return null;
        }
        public async Task<List<Doctor>?> DoctorFilters(Status status)
        {
            List<int> ids = new();
            List<Doctor>? doctorFilters= new();
            var users=await _userRepo.GetAll();
            if (users != null)
            {
                foreach (var user in users)
                {
                    if (user.DoctorState == status.DoctorState)
                        ids.Add(user.UserId);
                }
            }
            var doctors =await _doctorRepo.GetAll();
            if (doctors != null)
            {
                foreach (var value in ids)
                {
                    var obj=doctors.SingleOrDefault(d => d.DoctorId == value);
                    if (obj != null)
                    {
                        doctorFilters.Add(obj);
                    }
                }
            }
            if(doctorFilters != null) return doctorFilters;
            return null;
        }

        public async Task<List<string?>> Specializations()
        {
            List<string?> specializations= new ();
            var doctors=await _doctorRepo.GetAll();
            if (doctors != null)
            {
                if (doctors != null)
                {
                    specializations = doctors.Select(d => d.Specialization).Distinct().ToList();
                    if (specializations != null)
                        return specializations;
                }
            }
            throw new Exception();
        }
    }
}
