import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

// Context
import { AuthContext } from '../../context';

//Components
import CustomAlert from '../common/CustomAlert';

//MUI
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

//CSS
import './styles/SignUp.css'

const LogIn = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severityVal, setSeverityVal] = useState("")

    const [logInData, setLogInData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogInData({
            ...logInData,
            [name]: value
        })

    }

    const handleClickLogIn = () => {

        const { email, password } = logInData;

        if (!email || !password) {
            setOpen(true)
            setMessage("Please Fill All the Fields!")
            setSeverityVal("error")
        }
        else {
            let data = JSON.stringify({
                email,
                password
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    if (response && response.data) {
                        console.log("LogRes", response.data)
                        setOpen(true)
                        setMessage("LogIn Successful!")
                        setSeverityVal("success")
                        localStorage.setItem("userToken", response.data.token)
                        localStorage.setItem("userData", JSON.stringify(response.data.user))
                        navigate('/timeline')
                    }
                })
                .catch((error) => {
                    if (error && error.response && error.response.data && error.response.data.err) {
                        console.log(error);
                        setOpen(true)
                        setMessage(error.response.data.err)
                        setSeverityVal("error")
                    }
                });

        }
    }

    return (
        <div className='main-div'>
            <div className='inner-div'>

                <h1 className='heading'>Log In</h1>

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="standard"
                    value={logInData.email}
                    onChange={handleChange}
                    className='tf'
                />

                <TextField
                    id="password"
                    name="password"
                    type='password'
                    label="Password"
                    variant="standard"
                    value={logInData.password}
                    onChange={handleChange}
                    className='tf'
                />

                <Button
                    variant="contained"
                    className='btn'
                    onClick={() => handleClickLogIn()}
                >
                    Log In
                </Button>

                <Link
                    to="/signup"
                    className='link-style'
                >
                    Not Registered? Sign Up Here
                </Link>

                {
                    open
                    &&
                    <CustomAlert
                        open={open}
                        setOpen={setOpen}
                        severityVal={severityVal}
                        message={message}
                    />
                }

            </div>
        </div>
    )
}

export default LogIn