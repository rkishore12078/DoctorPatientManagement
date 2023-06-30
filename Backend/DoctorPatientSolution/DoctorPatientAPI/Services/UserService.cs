using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;
using Microsoft.Extensions.Logging.Abstractions;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;

namespace DoctorPatientAPI.Services
{
    public class UserService:IManageUser
    {
        private readonly IRepo<User, int> _userRepo;
        private readonly IAdapterDTO _adapter;

        public UserService(IRepo<User,int> userRepo,
                           IAdapterDTO adapter)
        {
            _userRepo=userRepo;
            _adapter=adapter;
        }
        public async Task<UserDTO?> Login(UserDTO? userDTO)
        {
            userDTO = await GetIdByEmail(userDTO);
            if (userDTO == null) return null;
            var userData = await _userRepo.Get(userDTO.UserId);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordHash[i])
                        return null;
                }
                var user = _adapter.UserIntoUserDTO(userData);
                if (user != null)
                    return user;
            }
            return null;
        }
        private async Task<UserDTO?> GetIdByEmail(UserDTO? userDTO)
        {
            var users=await _userRepo.GetAll();
            if (users != null)
            {
                var user = users.SingleOrDefault(u=>u.Email==userDTO.Email);
                if (user == null) return null;
                userDTO.UserId = user.UserId;
                return userDTO; 
            }
            return null;
        }

        public async Task<User?> ChangeStatus(UserIdsDTO userID)
        {
            var user = await _userRepo.Get(userID.UserID);
            if (user != null)
            {
                if (user.DoctorState == "Inactive")
                    user.DoctorState = "Active";
                else if (user.DoctorState == "Active")
                    user.DoctorState = "Inactive";
                else
                    user.DoctorState = "Active";
                var myUser=await _userRepo.Update(user);
                return myUser;
            }
            return null;   
        }
    }
}
