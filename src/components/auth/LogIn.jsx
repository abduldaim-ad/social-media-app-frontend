/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './styles/SignUp.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import CustomAlert from '../common/CustomAlert';
import axios from 'axios';

const LogIn = ({ setLocal, socket }) => {

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
                url: 'http://localhost:5000/login',
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
                        const user = JSON.parse(localStorage.getItem("userData"));
                        const senderId = user._id;
                        socket.emit('register_user', senderId);
                        setLocal(true)
                        navigate('/')
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
                <TextField id="email" name="email" label="Email" variant="standard" value={logInData.email} onChange={handleChange} className='tf' />
                <TextField id="password" name="password" type='password' label="Password" variant="standard" value={logInData.password} onChange={handleChange} className='tf' />
                <Button variant="contained" className='btn' onClick={() => handleClickLogIn()}>Log In</Button>
                <Link to="/signup" className='link-style'>Not Registered? Sign Up Here</Link>
                {open && <CustomAlert open={open} setOpen={setOpen} severityVal={severityVal} message={message} />}
            </div>
        </div>
    )
}

export default LogIn