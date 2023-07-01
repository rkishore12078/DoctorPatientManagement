import React, { useState } from "react";
import { Box,Stack,TextField,CircularProgress} from "@mui/material";
import '../Css/Login.css'
import { Link } from "react-router-dom";

function Login() {

    var [loading,setLoading]=useState(false);

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": "",
            "token": ""
        }
    )

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
                var myData = await data.json();
                console.log(myData);
                // navigate("/second/"+myData.gender)
                
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
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
                </Stack>
            </Box>
        </div >
    )
}

export default Login;