using DoctorPatientAPI.Exceptions;
using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace DoctorPatientAPI.Services
{
    public class DoctorRepo : IRepo<Doctor, int>
    {
        private readonly Context _context;
        private readonly IRepo<User, int> _userRepo;

        public DoctorRepo(Context context,
                            IRepo<User,int> userRepo)
        {
            _context = context;
            _userRepo= userRepo;
        }
        public async Task<Doctor?> Add(Doctor item)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                //transaction.CreateSavepoint("Doctor");
                var doctor = item.Users;
                if (doctor == null) return null;
                await _userRepo.Add(doctor);
                if(_context.Users==null) return null;
                var user = _context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
                if(user == null) return null;
                item.DoctorId = user.UserId;
                if(_context.Doctors==null) return null;
                _context.Doctors.Add(item);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return item;
            }
            catch (SqlException ex)
            {
                transaction.Rollback();
                throw new InvalidSqlException(ex.Number);
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
            return null;
        }

        public async Task<Doctor?> Delete(int id)
        {
            if(_context.Doctors==null) return null;
            var doctor=await _context.Doctors.SingleOrDefaultAsync(d=>d.DoctorId==id);
            if (doctor != null)
            {
                return doctor;
            }
            return null;
        }

        public async Task<Doctor?> Get(int id)
        {
            try
            {
                if(_context.Doctors == null) return null;
                var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.DoctorId == id);
                if (doctor != null)
                    return doctor;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Doctor>?> GetAll()
        {
            try
            {
                if (_context.Doctors == null) return null;
                var doctors = await _context.Doctors.ToListAsync();
                if (doctors != null)
                    return doctors;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Doctor?> Update(Doctor item)
        {
            try
            {
                var doctor = await Get(item.DoctorId);
                if (doctor != null)
                {
                    doctor = item;
                    _context.Update(doctor);
                    await _context.SaveChangesAsync();
                    return doctor;
                }
                return null;
            }
            catch (Exception )
            {
                throw new Exception();
            }
        }
    }
}
