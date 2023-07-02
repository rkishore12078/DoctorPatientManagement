import 'bootstrap/dist/css/bootstrap.css'
import React, { useState,useEffect } from 'react';
import '../Css/NavBar.css'
import { Link } from 'react-router-dom';

function NavBar(props){
    
    const[user,setUser]=useState(props.user)

    return(
        <div>
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
                    { user.role==""?(
                    <div className='summa'>
                        <Link className='a' to='/login'>Login</Link>
                        <Link className='a' to='/register'>Register</Link>
                    </div>
                    ):(
                        <div className='summa'>
                            { user.role==="Admin"?(
                                <div className="summa1">
                                    <Link className='a' to='adminPage'>Home</Link>
                                    <Link className='a' to='/logout'>Logout</Link>
                                </div>
                            ):(
                                <div className='summa'>
                                    {user.role==="Doctor"?
                                        (<div className="summa1">
                                            <Link className='a' to='doctorPage'>Home</Link>
                                            <Link className='a'>Update Details</Link>
                                            <Link className='a' to='/logout'>Logout</Link>
                                        </div>):(<div className="nav-links">
                                            <Link className='a' to='patientPage'>Home</Link>
                                            <Link className='a'>Update Details</Link>
                                            <Link className='a' to='/logout'>Logout</Link>
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