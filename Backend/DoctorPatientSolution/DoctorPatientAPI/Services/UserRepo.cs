﻿using DoctorPatientAPI.Exceptions;
using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace DoctorPatientAPI.Services
{
    public class UserRepo : IRepo<User, int>
    {
        private readonly Context _context;

        public UserRepo(Context context)
        {
            _context = context;
        }
        public async Task<User?> Add(User item)
        {
            try
            {
                _context.Users.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (SqlException ex)
            {
                throw new InvalidSqlException(ex.Number);
            }
            catch (Exception ex)
            {
                var sqlException = ex.InnerException as SqlException;
                if (sqlException != null)
                    throw sqlException;
                throw new Exception();
            }
        }

        public async Task<User?> Delete(int id)
        {
            var doctor = await _context.Users.SingleOrDefaultAsync(d => d.UserId == id);
            if (doctor != null)
            {
                return doctor;
            }
            return null;
        }

        public async Task<User?> Get(int id)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u=>u.UserId== id);
                if (user != null)
                    return user;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<User>?> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            if (users != null)
                return users;
            return null;
        }

        public async Task<User?> Update(User item)
        {
            var user = await Get(item.UserId);
            if (user != null)
            {
                user = item;
                await _context.SaveChangesAsync();
                return user;
            }
            return null;
        }
    }
}
