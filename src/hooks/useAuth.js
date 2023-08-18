import React, { useState, useEffect } from 'react';

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const user = localStorage.getItem('userData');
        if (token && user) {
            setToken(token);
            setUser(user);
        }
    }, [])
    return {
        token,
        user,
        setToken
    }
}

export default useAuth