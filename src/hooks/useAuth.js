import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useAuth = () => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const socket = io('http://localhost:5000/');

    const registerUser = (user) => {
        const senderId = user._id;
        socket.emit('register_user', senderId);
    }

    const connectSocket = (localStorageUser) => {
        socket.on('connect', () => {
            console.log("SocketConnected", socket.connected);
            registerUser(localStorageUser);
        });
    }

    useEffect(() => {
        const localStorageToken = localStorage.getItem('userToken');
        const localStorageUser = JSON.parse(localStorage.getItem('userData'));
        if (localStorageToken && localStorageUser) {
            setToken(localStorageToken);
            setUser(localStorageUser);
            connectSocket(localStorageUser);
        }
    }, [])
    return {
        token,
        user,
        socket,
    }
}

export default useAuth