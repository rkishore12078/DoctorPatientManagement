import { useState ,useEffect} from "react";
import '../../Css/DoctorLanding.css';
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';


function DoctorLanding()
{
    var navigate=useNavigate()

    const[doctor,setDoctor]=useState({
        "doctorId": 0,
        "users": {
        },
        "name": "",
        "dateOfBirth": new Date(),
        "gender": "",
        "phone": "",
        "address": "",
        "specialization": "",
        "qualification": "",
        "yearsOfExperience": 0,
    });
    const [error, setError] = useState(null);

    const[Id,setId]=useState(
        {
            "userID":0
        }
    );

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": localStorage.getItem("role"),
            "token": ""
        }
    )

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
        
        if (!ignore)  checkAccess()
        return () => { ignore = true; }
        },[]);

    var checkAccess=()=>
    {
        getDoctor();
        Id.userID=Number(localStorage.getItem("userId"));
        fetch("http://localhost:5140/api/Hospital/GetUser",
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
                var myData=await data.json();
                if(myData.doctorState=="Not Approve")
                {
                    // alert("Your application is still in Progerss");
                    toast.warning('Your application is still in Progerss');
                    navigate('/login');
                }
                else if(myData.doctorState=="Denied")
                {
                    // alert("Sorry your application is Rejected");
                    toast.error('Sorry your application is Rejected');
                    navigate('/login');
                }
                else
                    // alert("Welcome");
                    toast.success('Welcome');
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var getDoctor=()=>
    {
        Id.userID=Number(localStorage.getItem("userId"));
        fetch("http://localhost:5140/api/Hospital/GetDoctor",
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
                setDoctor(await data.json());
                console.log(doctor);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    if (error) {
        return <div>Error: {error}</div>;
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

    var updateDetails=()=>
    {
        setToggle(true);
        doctor.doctorId= Number(localStorage.getItem("userId"));
        fetch("http://localhost:5140/api/Hospital/UpdateDoctorDetails",
        {
            "method":"PUT",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },

            "body":JSON.stringify({...doctor,"doctor":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setDoctor(await data.json());
                getDoctor();
                console.log(doctor);
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
            <div className="bdy">
            <table >
                <tbody className="card-body">
                    <tr className="tbl-rows">
                        <td className="profile" colSpan={2}>PROFILE</td>
                    </tr>
                    <tr className="tbl-row">
                        <td className="tbl-cols">Name</td>
                        { toggle ? (<td className="tbl-cols">{doctor.name}</td>):
                                                            (<td className="tbl-cols">
                                                                <input className="inputs" value={doctor.name} type="text" onChange={(event)=>{
                                                                    setDoctor({...doctor,"name":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">Age</td>
                        <td className="tbl-cols">{doctor.age}</td>
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">Phone</td>
                        { toggle ? (<td className="tbl-cols">{doctor.phone}</td>):
                                                            (<td className="tbl-cols">
                                                                <input className="inputs" value={doctor.phone} type="tel" onChange={(event)=>{
                                                                    setDoctor({...doctor,"phone":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">Address</td>
                        { toggle ? (<td className="tbl-cols">{doctor.address}</td>):
                                                            (<td className="tbl-cols">
                                                                <input className="inputs" value={doctor.address} type="text" onChange={(event)=>{
                                                                    setDoctor({...doctor,"address":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">Specilization</td>
                        { toggle ? (<td className="tbl-cols">{doctor.specialization}</td>):
                                                            (<td className="tbl-cols">
                                                                <input className="inputs" value={doctor.specialization} type="text" onChange={(event)=>{
                                                                    setDoctor({...doctor,"specialization":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">Qualification</td>
                        { toggle ? (<td className="tbl-cols">{doctor.qualification}</td>):
                                                            (<td className="tbl-cols">
                                                                <input className="inputs" value={doctor.qualification} type="text" onChange={(event)=>{
                                                                    setDoctor({...doctor,"qualification":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">YearsOfExperience</td>
                        { toggle ? (<td className="tbl-cols">{doctor.yearsOfExperience}</td>):
                                                            (<td className="tbl-cols">
                                                                <input className="inputs" value={doctor.yearsOfExperience} type="tel" onChange={(event)=>{
                                                                    setDoctor({...doctor,"yearsOfExperience":event.target.value})
                                                                }}/>
                                                            </td>)
                        }
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">
                            <button disabled={toggle==false} className="btn btn-primary" onClick={()=>{
                                setToggle(false);
                            }}>Update</button>
                        </td>
                        <td className="tbl-cols">
                            <button className="btn btn-primary" disabled={toggle} onClick={updateDetails}>Submit</button>
                        </td>
                    </tr>
                    <tr className="tbl-rows">
                        <td className="tbl-cols">
                            <button onClick={updatePassword} className="btn btn-primary" >Password</button>
                        </td>
                        <td className="tbl-cols">
                            {togglePassword?(<input className="inputs" type="password" onChange={(event)=>{
                                setPassword({...password,"newPassword":event.target.value})
                            }}/>):(<p>Password Updated...</p>)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default DoctorLanding;