import PatientDoctor from "./Child/PatientDoctor";
import NavBar from "./NavBar";
import { useState } from "react";

function Home()
{
    localStorage.clear("role");

    const[user,setUser]=useState({
        "userId": 0,
        "email": "",
        "password": "",
        "role": "",
        "token": ""
    })

    return(    
        <div>
            <NavBar user={user}/>
            {/* <PatientDoctor/> */}
        </div>
    )
}
export default Home;