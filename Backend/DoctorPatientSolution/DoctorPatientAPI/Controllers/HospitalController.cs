using DoctorPatientAPI.ErrorMessages;
using DoctorPatientAPI.Exceptions;
using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace DoctorPatientAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCors")]
    public class HospitalController : ControllerBase
    {
        private readonly IManageDoctor _doctorService;
        private readonly IManagePatient _patientService;
        private readonly IManageUser _userService;
        private readonly ILogger<HospitalController> _logger;
        Error error;
        public HospitalController(IManageDoctor doctorService,
                                    IManagePatient patientService,
                                    IManageUser userService,
                                    ILogger<HospitalController> logger)
        {
            _doctorService= doctorService;
            _patientService= patientService;
            _userService= userService;
            _logger = logger;
            error = new Error();
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> DoctorRegister(DoctorDTO doctorDTO)
        {
            try
            {
                var doctor = await _doctorService.DoctorRegister(doctorDTO);
                if (doctor != null)
                    return Created("Doctor Registered successfully", doctor);
                error.ID = 400;
                error.Message = new Messages().messages[6];
            }
            catch (InvalidSqlException ex)
            {
                if(ex.number== 2627 || ex.number == 2601)
                {
                    error.ID = 400;
                    error.Message = new Messages().messages[12];
                }
                else
                {
                    error.ID = 400;
                    error.Message = ex.Message;
                }

            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> PatientRegister(PatientDTO patientDTO)
        {
            try
            {
                var patient = await _patientService.PatientRegister(patientDTO);
                if (patient != null)
                    return Created("Patient Registered Successfully",patient);
                error.ID = 400;
                error.Message = new Messages().messages[6];
            }
            catch (InvalidSqlException ex)
            {
                if (ex.number == 2627 || ex.number == 2601)
                {
                    error.ID = 400;
                    error.Message = new Messages().messages[12];
                }
                else
                {
                    error.ID = 400;
                    error.Message = ex.Message;
                }

            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> Login(UserDTO userDTO)
        {
            try
            {
                var user = await _userService.Login(userDTO);
                if (user != null)
                    return Ok(user);
                error.ID = 400;
                error.Message = new Messages().messages[4];
            }
            catch (Exception)
            {
                error.ID = 401;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        
        
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDTO?>> ChangeStatus(UserDTO userDTO)
        {
            try
            {
                var user = await _userService.ChangeStatus(userDTO);
                if (user != null)
                    return Ok(user);
                error.ID = 404;
                error.Message = new Messages().messages[11];
                return NotFound(error);
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [Authorize]
        [HttpPut]
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO?>> UpdatePassword(PasswordDTO passwordDTO)
        {
            try
            {
                var user = await _userService.UpdatePassword(passwordDTO);
                if (user != null)
                    return Ok(user);
                error.ID = 404;
                error.Message = new Messages().messages[13];
                return NotFound(error);
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [Authorize(Roles ="Doctor")]
        [HttpPut]
        public async Task<ActionResult<UserDTO?>> UpdateDoctorDetails(DoctorDTO doctorDTO)
        {
            var doctor=await _doctorService.UpdateDetails(doctorDTO);
            if(doctor!=null)
                return Ok(doctor);
            return BadRequest("Error");
        }

        
        
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<User?>> GetUser(UserIdsDTO userIds)
        {
            try
            {
                var user = await _userService.GetUser(userIds);
                if (user != null) return Ok(user);
                error.ID = 404;
                error.Message = new Messages().messages[1];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(List<Doctor>), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<Doctor>?>> GetAllDoctors()
        {
            try
            {
                var doctors = await _doctorService.GetAllDoctors();
                if (doctors != null)
                    return Ok(doctors);
                error.ID = 404;
                error.Message = new Messages().messages[3];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpPost]
        [Authorize(Roles = "Doctor")]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor?>> GetDoctor(UserIdsDTO userIds)
        {
            try{
            var doctor=await _doctorService.GetDoctor(userIds);
            if(doctor != null) return Ok(doctor);
            error.ID = 404;
            error.Message = new Messages().messages[2];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<Doctor>?>> DoctorFilters(Status status)
        {
            try{
            var doctors=await _doctorService.DoctorFilters(status);
            if(doctors != null)
                return Ok(doctors);
            error.ID = 404;
            error.Message = new Messages().messages[2];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }
    }
}
