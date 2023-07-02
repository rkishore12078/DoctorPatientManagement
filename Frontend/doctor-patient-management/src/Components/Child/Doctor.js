import { useState,useEffect, useCallback} from "react";
import '../../Css/Doctor.css';

function Doctor(props)
{

    const[doctor,setDoctor]=useState(props.path);

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": "",
            "token": "",
            "status": ""
        }
    );

    var myUser;
    var userDTO;

    const [Id,setId]=useState(
        {
            "userID":0
        }
    );

    const[status,setStatus]=useState('');

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  fetchUser()
        return () => { ignore = true; }
        },[]);

    var fetchUser=()=>{
        Id.userID=Number(doctor.doctorId);
        console.log(Id.userID);
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
                myUser=await data.json();
                console.log(myUser);
                setStatus(myUser.doctorState);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var ChangeStatus=(event)=>{

        user.userId=doctor.doctorId;
        user.status=event.target.value;
        console.log(user);

        fetch("http://localhost:5140/api/Hospital/ChangeStatus",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            "body":JSON.stringify({...user,"user":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                userDTO=await data.json();
                setStatus(userDTO.status);
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
                        <td>{doctor.name}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{doctor.phone}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{doctor.age}</td>
                    </tr>
                    <tr>
                        <td>Specilization</td>
                        <td>{doctor.specialization}</td>
                    </tr>
                    <tr>
                        <td>Qualification</td>
                        <td>{doctor.qualification}</td>
                    </tr>
                    <tr>
                        <td>Experience</td>
                        <td>{doctor.yearsOfExperience}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{status}</td>
                    </tr>
                    {
                        status=="Not Approve"?
                        (
                            <tr>
                                <td><input value='Approved' onClick={ChangeStatus} className="btn btn-success"/></td>
                                <td><input value='Denied' onClick={ChangeStatus} className="btn btn-danger"/></td>
                            </tr>
                        ):( status=="Approved"?(
                            <div>
                                <tr>
                                    <td><input value='Approved' disabled className="btn btn-success"/></td>
                                    <td><input value='Denied' onClick={ChangeStatus} className="btn btn-danger"/></td>
                                </tr>
                            </div>
                        ):(
                            <div>
                                <tr>
                                    <td><input value='Approved' onClick={ChangeStatus} className="btn btn-success"/></td>
                                    <td><input value='Denied' disabled className="btn btn-danger"/></td>
                                </tr>
                            </div>
                        ) 
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Doctor;