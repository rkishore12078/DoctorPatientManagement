import { useState ,useEffect} from "react";
import Doctor from "../Child/Doctor";
import '../../Css/DoctorLanding.css';
import NavBar from "../NavBar";

function DoctorLanding()
{

    const[doctor,setDoctor]=useState(null);
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

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getDoctor()
        return () => { ignore = true; }
        },[]);

    var getDoctor=()=>
    {
        Id.userID=Number(localStorage.getItem("userId"));
        console.log(Id);
        fetch("http://localhost:5140/api/Hospital/GetDoctor",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": 'application/json',
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
            else{
                var err = await data.json()
                console.log(err)
            }
        })
        .catch((err)=>
        {
            setError(err.message);
            console.log(err)
        })
    }

    if (error) {
        return <div>Error: {error}</div>;
      }


    return(
        <div>
            <NavBar user={user}/>
            <div className="GetAll">
                {/* <Doctor path={doctor}/> */}
            </div>
        </div>
    )
}
export default DoctorLanding;