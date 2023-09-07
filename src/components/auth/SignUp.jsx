import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// Components
import CustomAlert from '../common/CustomAlert';
import UploadImage from '../common/UploadImage';

// MUI
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

// CSS
import './styles/SignUp.css'

const SignUp = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severityVal, setSeverityVal] = useState("")

    const initialState = {
        username: "",
        email: "",
        password: "",
        cPassword: ""
    }

    const [signUpData, setSignUpData] = useState(initialState);

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        })
    }

    const handleClickSignUp = async () => {

        const { username, email, password, cPassword } = signUpData;

        if (!username || !email || !password || !cPassword || !file) {
            setMessage("Please Fill All the Fields!");
            setSeverityVal("error");
            setOpen(true);
            return;
        } else if (password !== cPassword) {
            setMessage("Passwords Did Not Match!");
            setSeverityVal("error");
            setOpen(true);
            return;
        }

        const body = new FormData();
        body.append("my_file", file);
        body.append("username", username);
        body.append("email", email);
        body.append("password", password);
        body.append("cPassword", cPassword);

        const response = await axios.post("/signup", body);

        if (response && response.data) {
            setMessage(response.data.msg);
            setSeverityVal("success");
            setOpen(true);
            // setSignUpData(initialState);
            navigate('/login');
        }
        else {
            setMessage("Error While Signing Up!");
            setSeverityVal("error");
            setOpen(true);
        }

    }

    return (
        <div className='main-div'>
            <div className='inner-div'>

                <h1 className='heading'>Sign Up</h1>

                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="standard"
                    onChange={(e) => handleChange(e)}
                    className='tf'
                />

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="standard"
                    onChange={(e) => handleChange(e)}
                    className='tf'
                />

                <TextField
                    id="password"
                    name="password"
                    type='password'
                    label="Password"
                    variant="standard"
                    onChange={(e) => handleChange(e)}
                    className='tf'
                />

                <TextField
                    id="confirmPassword"
                    name="cPassword"
                    type='password'
                    label="Confirm Password"
                    variant="standard"
                    onChange={(e) => handleChange(e)}
                    className='tf'
                />

                <UploadImage
                    file={file}
                    setFile={setFile}
                />

                <Button
                    variant="contained"
                    className='btn'
                    onClick={() => handleClickSignUp()}
                >
                    Sign Up
                </Button>

                <Link
                    to="/login"
                    className='link-style'
                >
                    Already a User? Login Here
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

export default SignUp
