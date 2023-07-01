import React, { useState } from "react";
import { Box,Stack,TextField,Button,CircularProgress} from "@mui/material";
import '../Css/Login.css'
import { Link } from "react-router-dom";

function Login() {

    var [loading,setLoading]=useState(false);

    const[user,setUser]=useState(
        {
            ""
        }
    )

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
                        // onChange={onChangeHandler}
                        placeholder="Enter Username"

                        fullWidth
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        // onChange={onChangeHandler}
                        // helperText="Password must be atleast 6 characters length"
                        fullWidth

                        placeholder="Enter a password with minimum 6 characters"
                    />
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Button className="button" variant="contained"
                            // onClick={onSubmitHandler}
                            >
                            LOGIN
                        </Button>
                    )}
                    <p className="secondary-action">
                        Don't have an account?{" "}

                        <Link to="register" >
                            Register now
                        </Link>
                    </p>
                </Stack>
            </Box>
        </div >
    )
}

export default Login;