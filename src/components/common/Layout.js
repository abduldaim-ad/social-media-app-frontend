import React from "react";
import AuthProviderComp from "./AuthProviderComp";

// Components
import Navbar from './Navbar'

const Layout = ({ children }) => {

    return (
        <>
            <AuthProviderComp>
                <Navbar />
                {children}
            </AuthProviderComp>
        </>
    )
}

export default Layout;