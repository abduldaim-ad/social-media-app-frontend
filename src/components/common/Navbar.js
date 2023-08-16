import React from "react";
import './styles/Navbar.css'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ local, setLocal }) => {

    const handleLogOut = () => {
        localStorage.clear()
        setLocal(false)
    }

    return (
        <>
            <div className="navbar">
                <ul className="nav-links">
                    <img src="https://www.freeiconspng.com/uploads/facebook-logo-4.png" alt="" style={{ width: "40px" }} />
                    {local && <Link to="/" className="link"><Button className="btn-style">Timeline</Button></Link>}
                    <div className="right-btn">
                        {local && <Link to="/profile" className="link"><Button className="btn-style profile-icon"><AccountCircleIcon /></Button></Link>}
                        {!local && <Link to="/signup" className="link"><Button className="btn-style signup-style">Sign Up</Button></Link>}
                        {!local && <Link to="/login" className="link"><Button className="btn-style login-style">Log In</Button></Link>}
                        {local && <Link to="/login" className="link"><Button className="btn-style logout-icon" onClick={handleLogOut}><LogoutIcon /></Button></Link>}
                    </div>
                </ul>
            </div>
        </>
    );

}

export default Navbar;