import NavBar from "../NavBar";
import { useState } from "react";

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

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getDoctors()
        return () => { ignore = true; }
        },[]);

    var getDoctors=()=>
    {
    }

    
    return(
        <div>
            <NavBar user={user}/>
        </div>
    )
}

export default PatientLanding;