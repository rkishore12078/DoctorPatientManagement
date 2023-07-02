import { useState, useEffect } from "react";
import Doctor from "../Child/Doctor";
import '../../Css/AdminLanding.css'
import NavBar from "../NavBar";

function AdminLanding() {

    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const[enteredStatus,setEnteredStatus]=useState(
        {
            "doctorState": ""
        }
    );

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
                    console.log(doctors);
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
        enteredStatus.doctorState=event.target.value;
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

            "body":JSON.stringify({...enteredStatus})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setDoctors(await data.json());
                console.log(doctors);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }
    }


    return (
        <div>
            <NavBar user={user} />
            <div>
                <label>
                    <input
                        type="radio"
                        value="All"
                        name="options"
                        readOnly
                        // checked={selectedOption === 'option2'}
                        onChange={doctorFilter}
                    />
                    All
                </label>
                <label>
                    <input
                        readOnly
                        type="radio"
                        value="Approved"
                        name="options"
                        // checked={selectedOption === 'Approved'}
                        onChange={doctorFilter}
                    />
                    Approved
                </label>

                <label>
                    <input
                        readOnly
                        type="radio"
                        value="Denied"
                        name="options"
                        // checked={selectedOption === 'option2'}
                        onChange={doctorFilter}
                    />
                    Denied
                </label>
            </div>
            <div className="GetAll">
                {
                    doctors.map((doctor, index) => {
                        return (<Doctor key={index} path={doctor} />)
                    })
                }
            </div>
        </div>
    )
}
export default AdminLanding;