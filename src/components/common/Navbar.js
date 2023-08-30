import React, { useState, useEffect } from "react";
import './styles/Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchUser from "./SearchUser";
import Badge from '@mui/material/Badge';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FetchData } from "../../config/functions";

const Navbar = ({ local, setLocal, socket, io }) => {

    const [totalRequests, setTotalRequests] = useState();

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear()
        setLocal(false)
    }

    const checkRequest = async () => {
        const token = localStorage.getItem("userToken");
        const user = JSON.parse(localStorage.getItem("userData"));
        const { _id } = user;
        const url = `http://localhost:5000/getuserdetails/${_id}`
        const response = await FetchData(url, token, 'GET', null)
        console.log("Here is: ", response.data)
        if (response && response.data) {
            setTotalRequests(response.data.receivedUsername.length);
        }
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Socket connected:", socket.connected);
        });
    }, [])

    socket.on("receive_request", (data) => {
        checkRequest();
    })

    useEffect(() => {
        checkRequest();
    }, [])

    return (
        <>
            <div className="navbar">
                <ul className="nav-links">
                    <img
                        src="https://www.freeiconspng.com/uploads/facebook-logo-4.png"
                        alt=""
                        style={{
                            width: "40px"
                        }}
                    />
                    {local
                        &&
                        <Link to="/" className="link">
                            <Button className="btn-style">
                                Timeline
                            </Button>
                        </Link>}
                    <div className="right-btn">
                        {local && <SearchUser />}
                        {
                            local
                            &&
                            <Badge
                                badgeContent={totalRequests}
                                color="primary"
                                className="badge"
                                onClick={() => navigate('/profile')}
                            >
                                <PersonAddIcon className="badge-icon" />
                            </Badge>
                        }
                        {
                            local
                            &&
                            <Link
                                to="/profile"
                                className="link"
                            >
                                <Button className="btn-style profile-icon">
                                    <AccountCircleIcon />
                                </Button>
                            </Link>
                        }
                        {
                            !local
                            &&
                            <Link
                                to="/signup"
                                className="link"
                            >
                                <Button className="btn-style signup-style">
                                    Sign Up
                                </Button>
                            </Link>
                        }
                        {
                            !local
                            &&
                            <Link
                                to="/login"
                                className="link"
                            >
                                <Button className="btn-style login-style">
                                    Log In
                                </Button>
                            </Link>
                        }
                        {
                            local
                            &&
                            <Link
                                to="/login"
                                className="link"
                            >
                                <Button className="btn-style logout-icon" onClick={handleLogOut}>
                                    <LogoutIcon />
                                </Button>
                            </Link>
                        }
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Navbar;