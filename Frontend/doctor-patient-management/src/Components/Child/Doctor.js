import { useState } from "react";
import '../../Css/Doctor.css';

function Doctor(props)
{

    const[doctor,setDoctor]=useState(props.path);

    const[user,setUser]=useState('');

    const [userId,setUserId]=useState(
        {
            "userId":0
        }
    );

    const[status,setStatus]=useState('');

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  fetchUser()
        return () => { ignore = true; }
        },[]);

    var fetchUser=()=>{
        setUserId({...userId,"userId":doctor.doctorId});
        fetch("",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json'
            },

            "body":JSON.stringify({...userId,"userId":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                var myData = await data.json();
                console.log(myData);
                setStatus(myData.status);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var ChangeStatus=()=>{

        setUserId({...userId,"userId":doctor.doctorId});

        fetch("",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json'
            },

            "body":JSON.stringify({...userId,"userId":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                var myData = await data.json();
                console.log(myData);
                setStatus(myData.status);
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
                    {
                        user.doctorState=="Active"?
                        (
                            <tr>
                                <td colSpan={2}><button onClick={ChangeStatus} className="btn btn-success">{status}</button></td>
                            </tr>
                        ):(
                            <tr>
                                <td colSpan={2}><button onClick={ChangeStatus} className="btn btn-danger">{status}</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Doctor;