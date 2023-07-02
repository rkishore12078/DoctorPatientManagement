import PatientDoctor from "../Child/PatientDoctor";
import NavBar from "../NavBar";
import { useState ,useEffect, useCallback} from "react";

function PatientLanding()
{
    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": localStorage.getItem("role"),
            "token": ""
        }
    )

    var [doctors, setDoctors] = useState([]);
    var [users,setUsers]=useState([]);
    const[ids,setIds]=useState([]);
    var [specializations,setSpecializations]=useState([]);
    const [error, setError] = useState(null);
    const[experience,setExperience]=useState('');

    var skill;
    var tempDoctors=[];
    var [saveDoctor,setSaveDoctor]=useState([]);

    useEffect(()=> {
        getDoctors();
        console.log("effect")
        },[]);

    var fetchSpecializations= async ()=>
    {
        console.log("special")
            fetch("http://localhost:5140/api/Hospital/Specializations",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },

            })
            .then(async (data) => {
                if (data.status == 200) 
                {
                    specializations=await data.json();
                    setSpecializations(specializations);
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    var filterApproveDoctor= async ()=>
    {
        console.log(",,,,,")
        console.log(ids.length)
        for(let index=0;index<users.length;index++)
        {
            if(users[index].doctorState=="Approved")
            {
                ids.push(users[index].userId);
                console.log(users[index].userId);
            }
        }
        console.log(",,,,,")
        console.log(ids.length)
    }

    var fetchUser=()=>
    {
        fetch("http://localhost:5140/api/Hospital/GetAllUsers",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },

            })
            .then(async (data) => {
                if (data.status == 200) {
                    users=await data.json();
                    setUsers(users)
                    // console.log(users[0]);
                    filterApproveDoctor();
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    var getDoctors=async ()=>
    {
        console.log("doctors")
        await fetchSpecializations();
        await fetchUser();
        fetch("http://localhost:5140/api/Hospital/GetAllDoctors",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },

            })
            .then(async (data) => {
                if (data.status == 200) {
                    doctors=await data.json();
                    setDoctors(doctors);
                    saveDoctor=doctors;
                    setSaveDoctor(saveDoctor);
                    console.log(saveDoctor[0])
                    console.log(doctors[0]);
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    var specializationFilter=(event)=>
    {
        console.log("....")
        console.log(ids.length)
        skill=event.target.value;
        console.log(skill);
        if(skill=="All")
            setDoctors(saveDoctor);
        else
        {
            for(let index=0;index<saveDoctor.length;index++)
            {
                if(saveDoctor[index].specialization==skill)
                {
                    tempDoctors.push(saveDoctor[index]);
                }
            }
            setDoctors(tempDoctors);
        }
    }

    
    return(
        <div>
            <NavBar user={user}/>
            <div>
                <select defaultValue={'DEFAULT'} onChange={specializationFilter}>
                    <option value='DEFAULT' disabled>Select....</option>
                    <option value='All'>All</option>
                    {
                        specializations.map((specialization,index)=>{
                            return(<option key={index}>{specialization}</option>)
                        })
                    }
                </select>
            </div>
            <div>
                <input type="number" onChange={(event)=>{
                    setExperience(...experience,event.target.value);
                }}/>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Gender</td>
                            <td>Phone</td>
                            <td>Specilization</td>
                            <td>Qualification</td>
                            <td>YearsOfExperience</td>
                        </tr>
                    </thead>
                        {
                            ids.map((id,ind)=>{
                                return(
                                    <tbody key={ind}>
                                        {
                                            doctors.filter(d=>d.doctorId==id).map((doctor, inde) => {
                                                return (<PatientDoctor key={inde} path={doctor} />)
                                            })
                                        }
                                    </tbody>
                                )
                            })
                        }
                </table>
            </div>
        </div>
    )
}

export default PatientLanding;