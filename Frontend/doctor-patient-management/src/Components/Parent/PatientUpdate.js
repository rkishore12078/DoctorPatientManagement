import { useState,useEffect } from "react";
import NavBar from "../NavBar";
import '../../Css/PatientUpdate.css'

function PatientUpdate()
{
    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": localStorage.getItem("role"),
            "token": ""
        }
    )

    const[patient,setPatient]=useState(
        {
            "patientId": 0,
            "name": "",
            "dateOfBirth": new Date(),
            "phone": "",
            "address": "",
            "medicalHistory": "",
            "emergencyContactName": "",
            "emergencyContactNumber": ""
        }
    );

    const [Id,setId]=useState(
        {
            "userID":0
        }
    );

    const[password,setPassword]=useState(
        {
            "userID": 0,
            "newPassword": "string"
        }
    )

    const[toggle,setToggle]=useState(true);
    const[togglePassword,setTogglePassword]=useState(true);

    useEffect(() => {
        let ignore = false;

        if (!ignore) getPatient()
        return () => { ignore = true; }
    }, []);

    var getPatient=()=>
    {
        Id.userID=Number(localStorage.getItem("userId"));
        console.log(Id.userID);
        fetch("http://localhost:5140/api/Hospital/GetPatient",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },

            "body":JSON.stringify({...Id})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setPatient(await data.json());
                // getPatient();
                console.log(patient);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var updateDetails=()=>{
        setToggle(true);
        patient.patientId= Number(localStorage.getItem("userId"));
        fetch("http://localhost:5140/api/Hospital/UpdatePatientDetails",
        {
            "method":"PUT",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },

            "body":JSON.stringify({...patient,"patient":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setPatient(await data.json());
                getPatient();
                console.log(patient);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var updatePassword=()=>
    {
        password.userID=Number(localStorage.getItem("userId"));
        console.log(password.userID);
        console.log(password.newPassword);
        fetch("http://localhost:5140/api/Hospital/UpdatePassword",
        {
            "method":"PUT",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },

            "body":JSON.stringify({...password,"password":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setTogglePassword(false);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    return(
        <div>
            <NavBar user={user}/>
            <div className="body">
                <div class="page-content page-container" id="page-content">
                    <div class="padding">
                        <div class="row container d-flex justify-content-center">
                            <div class="col-xl-8 col-md-12 card-bdy">
                                <div class="card user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-50">
                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                {/* <div className="titles">Name</div> */}
                                                { toggle ? (<div id="name-title">{patient.name}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={patient.name} type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"name":event.target.value})
                                                                }}/>
                                                            </div>)
                                                }
                                                <div>Age: {patient.age}</div>
                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                    <div className="titles">Phone</div>
                                                    { toggle ? (<div>{patient.phone}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={patient.phone} type="tel" onChange={(event)=>{
                                                                    setPatient({...patient,"phone":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                    <div class="col-sm-4">
                                                    <div className="titles">Address</div>
                                                    { toggle ? (<div>{patient.address}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={patient.address} type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"address":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                    <div className="col-sm-4">
                                                    <div className="titles">ContactName</div>
                                                    { toggle ? (<div>{patient.emergencyContactName}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={patient.emergencyContactName} type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"emergencyContactName":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                </div>
                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                    <div className="titles">MedicalHistory</div>
                                                    { toggle ? (<div>{patient.medicalHistory}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={patient.medicalHistory} type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"medicalHistory":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div>
                                                            <button disabled={toggle==false} className="btn btn-primary inner-button rowTwo" onClick={()=>{
                                                                setToggle(false);
                                                            }}>Update</button>
                                                        </div>
                                                        <div>
                                                            <button className="btn btn-primary inner-button rowTwo" disabled={toggle} onClick={updateDetails}>Submit</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div>
                                                            <button onClick={updatePassword} className="btn btn-primary inner-button rowTwo" >Password</button>
                                                        </div>
                                                        <div>
                                                            {togglePassword?(<input id="ins" className="inputs" type="password" onChange={(event)=>{
                                                                setPassword({...password,"newPassword":event.target.value})
                                                            }}/>):(<p>Password Updated...</p>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientUpdate;