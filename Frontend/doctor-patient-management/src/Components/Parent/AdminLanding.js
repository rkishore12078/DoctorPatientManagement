import { useState, useEffect } from "react";
import Doctor from "../Child/Doctor";
import '../../Css/AdminLanding.css'
import NavBar from "../NavBar";
import {toast } from 'react-toastify';


function AdminLanding() {

    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const[search,setSerach]=useState('');
    const[enteredStatus,setEnteredStatus]=useState(
        {
            "doctorState": ""
        }
    );

    const[pencils,setPencils]=useState([]);

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": localStorage.getItem("role"),
            "token": ""
        }
    )

    useEffect(() => {
        let ignore = false;

        if (!ignore) getAllDoctors()
        return () => { ignore = true; }
    }, []);

    var getAllDoctors = () => {
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
                    setDoctors(await data.json());
                    // console.log(doctors);
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    var doctorFilter=(event)=>{
        setDoctors([]);
        enteredStatus.doctorState=event.target.value;
        //setEnteredStatus({...enteredStatus,"doctorState":event.target.value})
        console.log(enteredStatus);
        if(enteredStatus.doctorState=="All")
            getAllDoctors();
        else{
        fetch("http://localhost:5140/api/Hospital/DoctorFilters",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            "body":JSON.stringify({ ...enteredStatus,"enteredStatus":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                var myData=await data.json();
                console.log(myData)
                setDoctors(myData);
                console.log(doctors);
            }
            else{
                var newData=await data.json();
                if(newData.id==404)
                    toast.warning('No Doctors found');
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }
    }


    return (
        <div className="AdminLanding premthelegend">
            <NavBar user={user} />
            <input id="search-input" className="inputs" placeholder="Search here.." onChange={(event)=>{
                setSerach(event.target.value)
            }}/>
            <div className="radio-buttons">
                <label className="lbl">
                    <input className="radio"
                        type="radio"
                        value="All"
                        name="options"
                        onChange={doctorFilter}
                    />
                    All
                </label>
                <label className="lbl">
                    <input className="radio"
                        type="radio"
                        value="Approved"
                        name="options"
                        onChange={doctorFilter}
                    />
                    Approved
                </label>

                <label className="lbl">
                    <input className="radio"
                        type="radio"
                        value="Denied"
                        name="options"
                        onChange={doctorFilter}
                    />
                    Denied
                </label>
            </div>
            <div className="GetAll">
                {
                    doctors.filter((doctor) =>
                        
                    search.trim() === '' || doctor.name.toLowerCase() === search.toLowerCase() || doctor.yearsOfExperience===search ||
                    doctor.specialization.toLowerCase() === search.toLowerCase() || doctor.phone.toLowerCase() === search.toLowerCase() )
                    .map((doctor, index) => {
                        return (<Doctor key={index} path={doctor} />)
                    })
                    
                }
            </div>
        </div>
    )
}
export default AdminLanding;