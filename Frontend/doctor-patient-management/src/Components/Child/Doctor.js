import { useState,useEffect} from "react";
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
    setStatus('kannaappan');

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  fetchUser()
        return () => { ignore = true; }
        },[]);

    var fetchUser=()=>{
        // setId({"userID":doctor.doctorId});
        Id.userID=doctor.doctorId;
        console.log(Id);
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
        <div className="doctor">
            <table className="table-container">
                <tbody className="table-body">
                    <tr className="table-row">
                        <td className="table-col">Name</td>
                        <td className="table-col">{doctor.name}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Phone</td>
                        <td className="table-col">{doctor.phone}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Age</td>
                        <td className="table-col">{doctor.age}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Specilization</td>
                        <td className="table-col">{doctor.specialization}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Qualification</td>
                        <td className="table-col">{doctor.qualification}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Experience</td>
                        <td className="table-col">{doctor.yearsOfExperience}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Status</td>
                        <td className="table-col">{status}</td>
                    </tr>
                    {
                        status=="Not Approve"?
                        (
                            <tr className="table-row">
                                <td className="table-col"><input value='Approved' onClick={ChangeStatus} className="btn btn-success button"/></td>
                                <td className="table-col"><input value='Denied' onClick={ChangeStatus} className="btn btn-danger button"/></td>
                            </tr>
                        ):( status=="Approved"?(
                                <tr className="table-row">
                                    <td className="table-col"><input value='Approved' disabled className="btn btn-success button"/></td>
                                    <td className="table-col"><input value='Denied' onClick={ChangeStatus} className="btn btn-danger button"/></td>
                                </tr>
                        ):(
                                <tr className="table-row">
                                    <td className="table-col"><input value='Approved' onClick={ChangeStatus} className="btn btn-success button"/></td>
                                    <td className="table-col"><input value='Denied' disabled className="btn btn-danger button"/></td>
                                </tr>
                        ) 
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Doctor;