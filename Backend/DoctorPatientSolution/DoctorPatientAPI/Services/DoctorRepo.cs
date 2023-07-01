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
                transaction.CreateSavepoint("Doctor");
                await _userRepo.Add(item.Users);
                var user = _context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
                item.DoctorId = user.UserId;
                _context.Doctors.Add(item);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return item;
            }
            catch (SqlException ex)
            {
                transaction.RollbackToSavepoint("Doctor");
                throw new InvalidSqlException(ex.Number);
            }
            catch (Exception)
            {
                transaction.RollbackToSavepoint("Doctor");
            }
            return null;
        }

        public Task<Doctor?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Doctor?> Get(int id)
        {
            try
            {
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
