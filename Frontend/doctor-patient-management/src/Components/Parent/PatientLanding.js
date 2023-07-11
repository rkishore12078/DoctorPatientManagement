import PatientDoctor from "../Child/PatientDoctor";
import NavBar from "../NavBar";
import { useState ,useEffect, useCallback} from "react";
import '../../Css/PatientLanding.css'
import {toast } from 'react-toastify';


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
                    // console.log(mydoctors)
                    setDoctors(doctors);
                    saveDoctor=doctors;
                    setSaveDoctor(saveDoctor);
                    console.log(saveDoctor[0]);
                    console.log(doctors[0]);
                }
                else{
                    var newData=await data.json();
                    if(newData.id==404)
                        toast.warning('No Doctors found');
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
            <div className="patients-body">
            <div className="filter">
                <select style={{height:"40px",
                                    width:"10%",
                                    marginTop:"5px",
                                    appearance:'none',
                                    outline:'none',
                                    cursor:'pointer',
                                    borderColor:'#70be51',
                                    borderRadius:"10px",
                                    paddingLeft:"10px"}} className="flter-dropdown" defaultValue={'DEFAULT'} onChange={specializationFilter}>
                    <option className="opt" value='DEFAULT' disabled>Select....</option>
                    <option className="opt" value='All'>All</option>
                    {
                        specializations.map((specialization,index)=>{
                            return(<option className="opt" key={index}>{specialization}</option>)
                        })
                    }
                </select>
            </div>
            <div className="tbl-name">
                <table className="tbl-body">
                    <thead className="tbl-head">
                        <tr className="tbl-row">
                            <td className="tbl-col">Name</td>
                            <td className="tbl-col">Age</td>
                            <td className="tbl-col">Gender</td>
                            <td className="tbl-col">Phone</td>
                            <td className="tbl-col">Specilization</td>
                            <td className="tbl-col">Qualification</td>
                            <td className="tbl-col">Experience</td>
                        </tr>
                    </thead>
                    {/* <div>
                        {
                            doctors==null &&   <div>toast.warning('No Doctors found')</div>

                        }
                    </div> */}
                        {
                            ids.map((id,ind)=>{
                                return(
                                    <tbody key={ind}>
                                        { doctors.length>0?(
                                            doctors.filter(d=>d!=null &&d.doctorId==id).map((doctor, inde) => {
                                                return (<PatientDoctor key={inde} path={doctor} />)
                                            })):(<div>no doctors found</div>)
                                        }
                                    </tbody>
                                )
                            })
                        }
                </table>
            </div>
            </div>
        </div>
    )
}

export default PatientLanding;