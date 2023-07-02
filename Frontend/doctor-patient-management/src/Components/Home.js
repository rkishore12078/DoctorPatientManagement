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
        </div>
    )
}
export default Home;