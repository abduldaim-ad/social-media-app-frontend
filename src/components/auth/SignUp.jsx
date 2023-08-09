/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import './styles/SignUp.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import CustomAlert from '../common/CustomAlert';
import axios from 'axios';

const SignUp = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severityVal, setSeverityVal] = useState("")

    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        cPassword: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        })

        console.log("This value: ", value)
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleClickSignUp = () => {
        // setSignUpData(
        //     ...signUpData,
        //     {
        //         username: "",
        //         email: "",
        //         password: "",
        //         cPassword: ""
        //     })
        const { username, email, password, cPassword } = signUpData;
        if (!username || !email || !password || !cPassword) {
            setOpen(true)
            setMessage("Please Fill All the Fields!")
            setSeverityVal("error")
        }
        else if (!isValidEmail(email)) {
            setOpen(true)
            setMessage("Incorrect Email Format!")
            setSeverityVal("error")
        }
        else if (password !== cPassword) {
            setOpen(true)
            setMessage("Passwords Did Not Match!")
            setSeverityVal("error")
        }
        else {
            let data = JSON.stringify({
                username,
                email,
                password,
                cPassword
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    setOpen(true)
                    setMessage(response.data.msg)
                    setSeverityVal("success")
                    navigate('/login')
                })
                .catch((error) => {
                    setOpen(true)
                    setMessage(error.response.data.err)
                    setSeverityVal("error")
                });
        }
    }

    return (
        <div className='main-div'>
            <div className='inner-div'>
                <h1 className='heading'>Sign Up</h1>
                <TextField id="username" name="username" label="Username" variant="standard"
                    onChange={(e) => handleChange(e)} className='tf' />
                <TextField id="email" name="email" label="Email" variant="standard"
                    onChange={(e) => handleChange(e)} className='tf' />
                <TextField id="password" name="password" type='password' label="Password" variant="standard"
                    onChange={(e) => handleChange(e)} className='tf' />
                <TextField id="confirmPassword" name="cPassword" type='password' label="Confirm Password" variant="standard"
                    onChange={(e) => handleChange(e)} className='tf' />
                <Button variant="contained" className='btn' onClick={() => handleClickSignUp()}>Sign Up</Button>
                <Link to="/login" className='link-style'>Already a User? Login Here</Link>
                {open && <CustomAlert open={open} setOpen={setOpen} severityVal={severityVal} message={message} />}
            </div>
        </div>
    )
}

export default SignUp