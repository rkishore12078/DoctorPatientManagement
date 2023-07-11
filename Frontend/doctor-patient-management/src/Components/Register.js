import React, { useState } from "react";
import '../Css/Register.css'
import { useDispatch } from "react-redux";
import { addUser } from "../HospitalSlice"
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { TextField,Box, Select, MenuItem } from "@mui/material";
import {toast } from 'react-toastify';




function Register() {

    // const inputRef=useRef(null);
    const [role,setRole]=useState('');
    const[confirmPassword,setConfirmPassword]=useState("");
    const[passwordToggle,setPasswordToggle]=useState(false);
    var dispatch=useDispatch();
    var myData;
    var navigate=useNavigate();

    var checkPassword=()=>
    {
        console.log(confirmPassword);
        if(newDoctor.password!=confirmPassword)
            setPasswordToggle(true)
        else
            setPasswordToggle(false)
    }

    const[newDoctor,setNewDoctor]=useState({
        "users": {
            "email": "kishore@gmail.com"
        },
        "name": "Kishore",
        "dateOfBirth":new Date(),
        "gender": "",
        "phone": "9999999999",
        "address": "",
        "specialization": "",
        "qualification": "M.D",
        "yearsOfExperience": 0,
    })


    const[patient,setPatient]=useState(
        {
            "users": {
                "email": "kishore@gmail.com"
            },
            "name": "",
            "dateOfBirth": new Date(),
            "gender": "",
            "phone": "",
            "address": "",
            "medicalHistory": "",
            "emergencyContactName": "",
            "emergencyContactNumber": "",
            "registrationDate": new Date(),
            "password": ""
        }
    )

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": "",
            "token": ""
        }
    )

    var doctorRegister=()=>
    {
        console.log('hi')
        console.log(newDoctor);
        console.log(patient)
        //console.log(doctor.specialization);
        fetch("http://localhost:5140/api/Hospital/DoctorRegister",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json'
            },

            "body":JSON.stringify({...newDoctor,"newDoctor":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 201)
            {
                myData = await data.json();
                dispatch(addUser(myData));
                settingLocalStorage();
                validatePassword();
                navigate('/doctorPage')
                console.log(myData);                
            }
            else
            {
                var newData=await data.json();
                if(newData.id==410)
                    toast.warning('Email and PhoneNumber should be unique');
                else if(newData.id==420)
                    toast.warning('Server Down Try again');
                // console.log("helo");
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var patientRegister=()=>
    {
        console.log(patient);
        fetch("http://localhost:5140/api/Hospital/PatientRegister",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json'
            },

            "body":JSON.stringify({...patient,"patient":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 201)
            {
                myData = await data.json();
                dispatch(addUser(myData));
                settingLocalStorage();
                navigate('/patientPage')
                console.log(myData);
                
            }
            else
            {
                var newData=await data.json();
                if(newData.id==410)
                    toast.warning('Email and PhoneNumber should be unique');
                else if(newData.id==420)
                    toast.warning('Server Down Try again');
            }
        })
        .catch((err)=>
        {
                console.log(err.body)
        })
    }

    var validatePassword=()=>
    {
        if(myData.password!=newDoctor.password)
            alert("Your Password is not strong hence your name's 1st 4 characters and dateofbirth's date and month is your password");
            // toast.warning("Your Password is not strong hence your name's 1st 4 characters and dateofbirth's date and month is your password");
    }

    var assignEmail=(event)=>
    {
        setNewDoctor((newDoctor)=>{
            return ({
                ...newDoctor, "users": { ...newDoctor.users,["email"]:event.target.value },
            });
        })
        setPatient((patient)=>{
            return ({
                ...patient, "users": { ...patient.users,["email"]:event.target.value },
            });
        })
    }

    var settingLocalStorage=()=>{
        localStorage.setItem("token",myData.token);
        localStorage.setItem("role",myData.role);
        localStorage.setItem("userId",myData.userId);
    }

    return (
        <div>
            <NavBar user={user}/>
            <Box>
            <div className="out-container">
            <div className="containers">
                <div className="topic">
                    REGISTER
                </div>

                <div className="row">
                    <label className="col-6 titles">Role
                    <Select style={{height:"40px",
                                    width:"100%",
                                    marginTop:"5px",
                                    appearance:'none',
                                    outline:'none',
                                    cursor:'pointer',
                                    borderColor:'#70be51',
                                    borderRadius:"10px"}}   defaultValue={'DEFAULT'} onChange={(event)=>{
                        setRole(event.target.value)
                    }}>
                        <MenuItem value="DEFAULT" disabled>Choose....</MenuItem>
                        <MenuItem value='doctor'>doctor</MenuItem>
                        <MenuItem value='patient'>patient</MenuItem>
                    </Select>
                    </label>

                    
                    <label className="col-6 titles">Name
                    <TextField fullWidth variant="outlined" placeholder="Enter your Name" className="input" type="text" onBlur={(event)=>{
                        setNewDoctor({...newDoctor,"name":event.target.value})
                        setPatient({...patient,"name":event.target.value})
                    }}/>
                    
                    {
                        newDoctor.name===''||newDoctor.name.length<4?(<p className="passwords">*Name should be minimum of 4 characters</p>):(<div></div>)
                    }</label>
                </div>

                <div className="row">
                    <label className="col-6 titles">Email
                    <TextField placeholder="Enter your Email" className="input" type="email" onBlur={assignEmail}/>

                    {
                        newDoctor.users.email.includes('@gmail.com')==false?(<p className="passwords">*Enter valid Email address</p>):(<div></div>)
                    }</label>

                    <label className="col-6 titles">Password
                    <TextField placeholder="Enter your Password" className="input" type="password" onChange={(event)=>{
                        setNewDoctor({...newDoctor,"password":event.target.value})
                        setPatient({...patient,"password":event.target.value})
                    }}/></label>
                </div>

                <div className="row titles">
                    <label className="col-6">Confirm Password
                    <TextField placeholder="Enter confirm Password" className="input" type="password" onChange={(event)=>{
                        setConfirmPassword(event.target.value)
                    }} onBlur={checkPassword}/>
                    {
                        passwordToggle  && (<p className="passwords">*Passwords are not matching</p>)
                    }
                    </label>

                    <label className="col-6 titles">Date Of Birth
                    <TextField className="input" type="datetime-local" onBlur={(event)=>{
                        setNewDoctor({...newDoctor,"dateOfBirth":event.target.value})
                        setPatient({...patient,"dateOfBirth":event.target.value})
                    }}/>
                    {/* {
                        doctor.dateOfBirth.toDateString()>new Date().toDateString()?(<p>Date should be less than today date</p>):(<div></div>)
                    } */}
                    </label>
                </div>

                <div className="row titles">
                    <label className="col-6">Gender
                    <Select style={{height:"40px",
                                    width:"100%",
                                    marginTop:"5px",
                                    appearance:'none',
                                    outline:'none',
                                    cursor:'pointer',
                                    borderColor:'#70be51',
                                    borderRadius:"10px"}}  defaultValue={'DEFAULT'} onChange={(event)=>{
                        setNewDoctor({...newDoctor,"gender":event.target.value})
                        setPatient({...patient,"gender":event.target.value})
                    }}>
                        <MenuItem value="DEFAULT" disabled>Select...</MenuItem>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                        <MenuItem value='Others'>Others</MenuItem>
                    </Select>
                    </label>

                    <label className="col-6 titles">Phone
                    <TextField placeholder="Enter your Number" className="input" type="tel" onBlur={(event)=>{
                        setNewDoctor({...newDoctor,"phone":event.target.value})
                        setPatient({...patient,"phone":event.target.value})
                    }}/>
                    {
                            newDoctor.phone.trim==='' || newDoctor.phone.length!=10?(<p className="passwords"> *Phone Number should be 10 digits</p>):(<div></div>)
                    }
                    </label>
                </div>

                <div className="row">
                    <label className="col-6 titles">Address
                    <TextField placeholder="Enter your Address" className="input" type="text" onChange={(event)=>{
                        setNewDoctor({...newDoctor,"address":event.target.value})
                        setPatient({...patient,"address":event.target.value})
                    }}/></label>

                    {
                        role=="doctor"?(
                            <div className="col-6">
                                <label className="titles">Specialization</label>
                                <TextField placeholder="Enter your Specialization" className="input" type="text" onChange={(event)=>{
                                    console.log(event.target.value);
                                    setNewDoctor({...newDoctor,"specialization":event.target.value})
                                }}/>
                            </div>
                        ):(
                            <div className="col-6">
                                {role =="patient" &&
                                    <div >
                                        <label className="titles">MedicalHistory</label>
                                        <TextField placeholder="Enter History" className="input" type="text" onChange={(event)=>{
                                            setPatient({...patient,"medicalHistory":event.target.value})
                                        }}/>
                                    </div>
                                }
                            </div>)
                    }
                </div>

                <div className="row">
                    {
                        role=="doctor"?(
                            <div className="col-6 titles">
                                <label className="titles">Qualification</label>
                                <TextField placeholder="Enter your Qualification" className="input" type="text" onBlur={(event)=>{
                                    setNewDoctor({...newDoctor,"qualification":event.target.value})
                                }}/>
                                {
                                    newDoctor.qualification.includes('.')==false?(<p className="passwords">*Enter a valid Qualification</p>):(<div></div>)
                                }
                            </div>
                        ):(
                            <div className="col-6">
                                {role =="patient" &&
                                    <div>
                                        <label className="titles">EmergencyContactName</label>
                                        <TextField placeholder="Enter your EmergencyContactName" className="input" type="text" onChange={(event)=>{
                                            setPatient({...patient,"emergencyContactName":event.target.value})
                                        }}/>
                                    </div>
                                }
                            </div>
                        )
                    }

                    {
                        role=="doctor"?(
                            <div className="col-6">
                                <label className="titles">YearsOfExperience</label>
                                <TextField placeholder="Enter your Experience"  className="input" type="number" onChange={(event)=>{
                                    setNewDoctor({...newDoctor,"yearsOfExperience":event.target.value})
                                }}/>
                            </div>
                        ):(
                            <div className="col-6">
                                {role =="patient" &&
                                    <div>
                                        <label className="titles">EmergencyContactNumber</label>
                                        <TextField placeholder="Enter your EmergencyContactNumber" className="input" type="number" onChange={(event)=>{
                                            setPatient({...patient,"emergencyContactNumber":event.target.value})
                                        }}/>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
                <div className="row">
                    {
                        role=="doctor"?(
                            <div>
                                <button className="btn btn-primary buttton" onClick={doctorRegister}>Register</button>
                            </div>
                        ):(
                            <div>
                                <button className="btn btn-primary buttton" onClick={patientRegister}>Register</button>
                            </div>
                        )
                    }
                </div>
            </div>
            </div>
            </Box>
        </div>
    )
}
export default Register;