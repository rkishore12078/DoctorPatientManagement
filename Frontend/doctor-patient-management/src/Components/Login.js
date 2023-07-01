import React, { useState,useEffect } from "react";
import { Box,Stack,TextField,CircularProgress} from "@mui/material";
import '../Css/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../HospitalSlice";

function Login(props) {

    var [loading,setLoading]=useState(false);
    var dispatch=useDispatch();
    var navigate=useNavigate();
    var myData;
    const[credential,setCredentail]=useState('');

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "",
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
                decide();
                console.log(myData);
            }
            else if(data.status==400)
            {
                setCredentail("Invalid Username or password");
            }
            else if(data.status==401)
            {
                setCredentail("Server down try again");
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var decide=()=>
    {
        if(myData.role=="Admin")
            navigate('/adminPage');
        else if(myData.role=="Doctor")
            navigate('/doctorPage');
        else if(myData.role="Patient")
            navigate('/patientPage');
    }

    var settingLocalStorage=()=>{
        localStorage.setItem("token",myData.token);
        localStorage.setItem("role",myData.role);
        localStorage.setItem("userId",myData.userId);
    }

    var removingLocalStorage=()=>{
        localStorage.clear("token");
        localStorage.clear("role");
        localStorage.clear("userId");
    }

    return (
        <div>
            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">Login</h2>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        title="Username"
                        name="username"
                        onChange={(event)=>{
                            setUser({...user,"email":event.target.value})
                        }}
                        placeholder="Enter Username"

                        fullWidth
                    />
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