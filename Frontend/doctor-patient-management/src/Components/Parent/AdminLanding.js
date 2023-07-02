import { useState ,useEffect} from "react";
import Doctor from "../Child/Doctor";
import '../../Css/AdminLanding.css'
import NavBar from "../NavBar";

function AdminLanding()
{

    const[doctors,setDoctors]=useState([]);
    const [error, setError] = useState(null);

    const[user,setUser]=useState(
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
        
        if (!ignore)  getAllDoctors()
        return () => { ignore = true; }
        },[]);

    var getAllDoctors=()=>
    {
        fetch("http://localhost:5140/api/Hospital/GetAllDoctors",
        {
            "method":"GET",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

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
            setError(err.message);
        })
    }

    if (error) {
        return <div>Error: {error}</div>;
      }


    return(
        <div>
            <NavBar user={user}/>
            <div>
                
            </div>
            <div className="GetAll">
                {
                    doctors.map((doctor,index)=>{
                        return(<Doctor key={index} path={doctor}/>)
                    })
                }
            </div>
        </div>
    )
}
export default AdminLanding;