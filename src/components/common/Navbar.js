import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from "../../config/functions";

// Components
import SearchUser from "./SearchUser";

// MUI
import { Button, Badge } from "@mui/material";

// MUI Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// CSS
import './styles/Navbar.css';

const Navbar = () => {

    const [totalRequests, setTotalRequests] = useState();

    const navigate = useNavigate();

    const { token, user, socket } = useContext(AuthContext);

    const handleLogOut = () => {
        localStorage.clear()
    }

    const checkRequest = async () => {
        if (user) {
            const { _id } = user;
            const url = `/getuserdetails/${_id}`;
            const response = await FetchData(url, token, 'GET', null);
            if (response && response.data) {
                setTotalRequests(response.data.receivedUsername.length);
            }
        }
    }

    socket.on("receive_request", (data) => {
        console.log("I am running");
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
                    <Link to="/timeline" className="link">
                        <Button className="btn-style">
                            Timeline
                        </Button>
                    </Link>

                    <div className="right-btn">

                        <SearchUser />
                        <Badge
                            badgeContent={totalRequests}
                            color="primary"
                            className="badge"
                            onClick={() => navigate('/profile')}
                        >
                            <PersonAddIcon className="badge-icon" />
                        </Badge>

                        <Link
                            to="/profile"
                            className="link"
                        >
                            <Button className="btn-style profile-icon">
                                <AccountCircleIcon />
                            </Button>
                        </Link>


                        <Link to="/login" className="link">
                            <Button className="btn-style logout-icon" onClick={handleLogOut}>
                                <LogoutIcon />
                            </Button>
                        </Link>


                    </div>
                </ul>
            </div>
        </>
    );
}

export default Navbar;