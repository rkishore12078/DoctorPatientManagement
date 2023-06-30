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
        private readonly ITokenService _tokenService;

        public UserService(IRepo<User,int> userRepo,
                           ITokenService tokenService)
        {
            _userRepo=userRepo;
            _tokenService=tokenService;
        }
        public async Task<UserDTO?> Login(UserDTO? userDTO)
        {
            UserDTO? user=null;
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
                user = new UserDTO();
                user.Email= userDTO.Email;
                user.Password= userDTO.Password;
                user.UserId = userData.UserId;
                user.Role = userData.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
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
    }
}
