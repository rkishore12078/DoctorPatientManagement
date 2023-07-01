import 'bootstrap/dist/css/bootstrap.css'
import React, { useState,useEffect } from 'react';
import '../Css/NavBar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar(props){

    var [roles,setRole]=useState('');
    const users=useSelector((state)=>state.users);
    

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  settingRole()
        return () => { ignore = true; }
        },[]);

    var settingRole=()=>
    {
        // setUser(users[0]);
        // localStorage.getItem("role")!=null?(setRole(localStorage.getItem("role"))):(setRole(''));
    }

    return(
        <div>
            {/* {settingRole()} */}
            <div className="nav">
                <input type="checkbox" id="nav-check"/>
                <div className="nav-header">
                    <div className="nav-title">
                    Welcome
                    </div>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                    </label>
                </div>
                
                <div className="nav-links">
                    { roles==""?(
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>
                    ):(
                        <div>
                            { roles=="Admin"?(
                                <div>
                                    <Link to='adminPage'>Home</Link>
                                    <Link to='/logout'>Logout</Link>
                                </div>
                            ):(
                                <div>
                                    {roles=="Doctor"?
                                        (<div>
                                            <Link to='doctorPage'>Home</Link>
                                            <Link to='doctorPage'  >Home</Link>
                                            <Link>Update Details</Link>
                                            <Link to='/logout'>Logout</Link>
                                        </div>):(<div>
                                            <Link to='patientPage'>Home</Link>
                                            <Link>Update Details</Link>
                                            <Link to='/logout'>Logout</Link>
                                        </div>)
                                    }
                                </div>
                            )
                            }
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar;