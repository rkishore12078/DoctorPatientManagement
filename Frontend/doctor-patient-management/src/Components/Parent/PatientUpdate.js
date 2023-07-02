import { useState,useEffect } from "react";

function PatientUpdate()
{
    const[patient,setPatient]=useState(
        {
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

    const[toggle,setToggle]=useState(true);

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
                console.log(patient);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }


    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        { toggle ? (<td>{patient.name}</td>):
                                                            (<td>
                                                                <input type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"name":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        <td>Date Of Birth</td>
                        { toggle ? (<td>{patient.dateOfBirth.toString()}</td>):
                                                            (<td>
                                                                <input type="datetime-local" onChange={(event)=>{
                                                                    setPatient({...patient,"dateOfBirth":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{patient.age}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        { toggle ? (<td>{patient.phone}</td>):
                                                            (<td>
                                                                <input type="tel" onChange={(event)=>{
                                                                    setPatient({...patient,"phone":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        <td>Address</td>
                        { toggle ? (<td>{patient.address}</td>):
                                                            (<td>
                                                                <input type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"address":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        <td>MedicalHistory</td>
                        { toggle ? (<td>{patient.medicalHistory}</td>):
                                                            (<td>
                                                                <input type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"medicalHistory":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        <td>EmergencyContactName</td>
                        { toggle ? (<td>{patient.emergencyContactName}</td>):
                                                            (<td>
                                                                <input type="text" onChange={(event)=>{
                                                                    setPatient({...patient,"emergencyContactName":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        <td>EmergencyContactNumber</td>
                        { toggle ? (<td>{patient.emergencyContactNumber}</td>):
                                                            (<td>
                                                                <input type="tel" onChange={(event)=>{
                                                                    setPatient({...patient,"emergencyContactNumber":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr>
                        {toggle?
                        (<td>
                            <button onChange={(event)=>{
                                setToggle(false);
                            }}>Update</button>
                        </td>):
                        (<td>
                            <button onChange={(event)=>{
                                setToggle(true);
                            }}>Submit</button>
                        </td>)
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PatientUpdate;