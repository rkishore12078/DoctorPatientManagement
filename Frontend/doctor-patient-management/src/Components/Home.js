import NavBar from "./NavBar";
import { useState } from "react";
import '../Css/Home.css'

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
            <div class="containerss">
                <h2 class="titley">
                    <span class="title-word title-word-1">Welcome&nbsp;</span>
                    <span class="title-word title-word-2">to&nbsp;</span>
                    <span class="title-word title-word-3">Kishore's&nbsp;</span>
                    <span class="title-word title-word-4">Hospital&nbsp;</span>
                    <span class="title-word title-word-5">Management&nbsp;</span>
                    <span class="title-word title-word-6">System</span>
                </h2>
            </div>
        </div>
    )
}
export default Home;