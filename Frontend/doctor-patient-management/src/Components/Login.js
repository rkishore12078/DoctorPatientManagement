import React, { useState,useEffect } from "react";
import { Box,Stack,TextField,CircularProgress} from "@mui/material";
import '../Css/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../HospitalSlice";
import NavBar from "./NavBar";
import {toast } from 'react-toastify';

function Login() {

    var [loading,setLoading]=useState(false);
    var dispatch=useDispatch();
    var navigate=useNavigate();
    var myData;
    const[credential,setCredentail]=useState('');

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "kishore@gmail.com",
            "password": "",
            "role": "",
            "token": ""
        }
    )

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  removingLocalStorage()
        return () => { ignore = true; }
        },[]);

    var login=()=>
    {
        console.log(user);
        fetch("http://localhost:5140/api/Hospital/Login",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json'
            },

            "body":JSON.stringify({...user,"user":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setCredentail("");
                myData = await data.json();
                dispatch(addUser(myData));
                settingLocalStorage();
                // setUser({...user,"role":localStorage.getItem('role')});
                decide();
                console.log(myData);
            }
            else if(data.status==400)
            {
                setCredentail("Invalid Username or password");
            }
            else if(data.status==420)
            {
                setCredentail("Server down try again");
            }
        })
        .catch((err)=>
        {
            toast.warning('Unable to login now');
                console.log(err.error)
        })
    }

    var decide=()=>
    {
        if(myData.role==="Admin")
        {
            toast.success('Success');
            navigate('/adminPage');
        }
        else if(myData.role==="Doctor")
        {
            // toast.success('Success');
            navigate('/doctorPage');
        }
        else if(myData.role==="Patient")
        {
            toast.success('Success');
            navigate('/patientPage');
        }
    }

    var settingLocalStorage=()=>{
        localStorage.setItem('token',myData.token);
        localStorage.setItem('role',myData.role);
        localStorage.setItem('userId',myData.userId);
    }

    var removingLocalStorage=()=>{
        localStorage.clear("");
        // localStorage.clear("role");
        // localStorage.clear("userId");
    }

    return (
        <div>
            <NavBar user={user}/>
            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">Login</h2>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        title="Username"
                        name="username"
                        onBlur={(event)=>{
                            setUser({...user,"email":event.target.value})
                        }}
                        placeholder="Enter Username"

                        fullWidth
                    />
                    {
                            user.email.includes('@gmail.com')==false?(<p className="passwords">*Enter valid Email address</p>):(<div></div>)
                    }
                    <TextField
                        id="password"
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(event)=>{
                            setUser({...user,"password":event.target.value})
                        }}
                        // helperText="Password must be atleast 6 characters length"
                        fullWidth

                        placeholder="Enter a password with minimum 6 characters"
                    />
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <button className="btn btn-primary" variant="contained"
                            onClick={login}
                            >
                            LOGIN
                        </button>
                    )}
                    <p className="secondary-action">
                        Don't have an account?{" "}

                        <Link className="link" to="/register" >
                            Register now
                        </Link>
                    </p>
                    <div>
                        {credential}
                    </div>
                </Stack>
            </Box>
        </div >
    )
}

export default Login;