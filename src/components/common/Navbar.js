import React from "react";
import './styles/Navbar.css'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = ({ local, setLocal }) => {

    const handleLogOut = () => {
        localStorage.clear()
        setLocal(false)
    }

    return (
        <>
            <div className="navbar">
                <ul className="nav-links">
                    <img src="https://www.freeiconspng.com/uploads/facebook-logo-4.png" alt="" style={{ width: "3%" }} />
                    {local && <Link to="/" className="link"><Button className="btn-style">Timeline</Button></Link>}
                    {local && <Link to="/profile" className="link"><Button className="btn-style">Profile</Button></Link>}
                    <div className="right-btn">
                        {!local && <Link to="/signup" className="link"><Button className="btn-style" style={{ position: "absolute", right: "0" }}>Sign Up</Button></Link>}
                        {!local && <Link to="/login" className="link"><Button className="btn-style" style={{ position: "absolute", right: "7%" }}>Log In</Button></Link>}
                        {local && <Link to="/login" className="link"><Button className="btn-style" style={{ position: "absolute", right: "0" }} onClick={handleLogOut}>Log Out</Button></Link>}
                    </div>
                </ul>
            </div>
        </>
    );

}

export default Navbar;