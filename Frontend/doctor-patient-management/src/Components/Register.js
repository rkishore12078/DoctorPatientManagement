import React, { useState ,useRef} from "react";
import '../Css/Register.css'
import { useDispatch } from "react-redux";
import { addUser } from "../HospitalSlice";



function Register() {

    // const inputRef=useRef(null);
    const [role,setRole]=useState();
    const[confirmPassword,setConfirmPassword]=useState("");
    const[passwordToggle,setPasswordToggle]=useState(false);
    var dispatch=useDispatch();
    var myData;

    var checkPassword=()=>
    {
        console.log(confirmPassword);
        if(doctor.password!=confirmPassword)
            setPasswordToggle(true)
        else
            setPasswordToggle(false)
    }

    const[doctor,setDoctor]=useState({
        "users": {
            "email": ""
        },
        "name": "",
        "dateOfBirth": new Date(),
        "gender": "",
        "phone": "",
        "address": "",
        "specialization": "",
        "qualification": "",
        "yearsOfExperience": 0,
        "password": ""
    })

    const[patient,setPatient]=useState(
        {
            "users": {
                "email": ""
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

    var doctorRegister=()=>
    {
        console.log(doctor);
        fetch("http://localhost:5140/api/Hospital/DoctorRegister",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json'
            },

            "body":JSON.stringify({...doctor,"doctor":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 201)
            {
                myData = await data.json();
                dispatch(addUser(myData));
                settingLocalStorage();
                console.log(myData);
                // navigate("/second/"+myData.gender)
                
            }
            else
            {
                console.log("helo");
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
                console.log(myData);
                // navigate("/second/"+myData.gender)
                
            }
        })
        .catch((err)=>
        {
                console.log(err.body)
        })
    }

    var assignEmail=(event)=>
    {
        setDoctor((doctor)=>{
            return ({
                ...doctor, "users": { ...doctor.users,["email"]:event.target.value },
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
            <div>

                <select onChange={(event)=>{
                    setRole(event.target.value)
                }}>
                    <option value="none" defaultValue disabled hidden>Select</option>
                    <option value='doctor'>doctor</option>
                    <option value='patient'>patient</option>
                </select>

                <label>Name</label>
                <input type="text" onChange={(event)=>{
                        setDoctor({...doctor,"name":event.target.value})
                        setPatient({...patient,"name":event.target.value})
                }}/>

                <label>Email</label>
                <input type="email" onChange={assignEmail}/>

                <label>Password</label>
                <input type="password" onChange={(event)=>{
                    setDoctor({...doctor,"password":event.target.value})
                    setPatient({...patient,"password":event.target.value})
                }}/>

                <label>Confirm Password</label>
                <input type="password" onChange={(event)=>{
                    setConfirmPassword(event.target.value)
                }} onBlur={checkPassword}/>
                {
                    passwordToggle  && (<p>Passwords are not matching</p>)
                }

                <label>Date Of Birth</label>
                <input type="datetime-local" onChange={(event)=>{
                    setDoctor({...doctor,"dateOfBirth":event.target.value})
                    setPatient({...patient,"dateOfBirth":event.target.value})
                }}/>

                <select onChange={(event)=>{
                    setDoctor({...doctor,"gender":event.target.value})
                    setPatient({...patient,"gender":event.target.value})
                }}>
                    <option value="none" defaultValue disabled hidden>Select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Others'>Others</option>
                </select>

                <label>Phone</label>
                <input type="tel" onChange={(event)=>{
                    setDoctor({...doctor,"phone":event.target.value})
                    setPatient({...patient,"phone":event.target.value})
                }}/>

                <label>Address</label>
                <input type="text" onChange={(event)=>{
                    setDoctor({...doctor,"address":event.target.value})
                    setPatient({...patient,"address":event.target.value})
                }}/>

                {
                    role=="doctor"?(
                        <div>
                            <label>Specilization</label>
                            <input type="text" onChange={(event)=>{
                                setDoctor({...doctor,"specialization":event.target.value})
                            }}/>
                        </div>
                    ):(
                        <div>
                            {role =="patient" &&
                                <div>
                                    <label>MedicalHistory</label>
                                    <input type="text" onChange={(event)=>{
                                        setDoctor({...patient,"medicalHistory":event.target.value})
                                    }}/>
                                </div>
                            }
                        </div>)
                }

                {
                    role=="doctor"?(
                        <div>
                            <label>Qualification</label>
                            <input type="text" onChange={(event)=>{
                                setDoctor({...patient,"qualification":event.target.value})
                            }}/>
                        </div>
                    ):(
                        <div>
                            {role =="patient" &&
                                <div>
                                    <label>EmergencyContactName</label>
                                    <input type="text" onChange={(event)=>{
                                        setDoctor({...patient,"emergencyContactName":event.target.value})
                                    }}/>
                                </div>
                            }
                        </div>
                    )
                }

                {
                    role=="doctor"?(
                        <div>
                            <label>YearsOfExperience</label>
                            <input type="number" onChange={(event)=>{
                                setDoctor({...doctor,"yearsOfExperience":event.target.value})
                            }}/>
                        </div>
                    ):(
                        <div>
                            {role =="patient" &&
                                <div>
                                    <label>EmergencyContactNumber</label>
                                    <input type="number" onChange={(event)=>{
                                        setDoctor({...patient,"emergencyContactNumber":event.target.value})
                                    }}/>
                                </div>
                            }
                        </div>
                    )
                }

                {
                    role=="doctor"?(
                        <div>
                            <button className="btn btn-primary" onClick={doctorRegister}>Register</button>
                        </div>
                    ):(
                        <div>
                            <button className="btn btn-primary" onClick={patientRegister}>Register</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Register;