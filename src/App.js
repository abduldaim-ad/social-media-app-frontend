import React, { useEffect, useState } from "react";
import Timeline from "./components/timeline/Timeline";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Navbar from "./components/common/Navbar";
import Profile from "./components/profile/Profile";
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtherUserProfile from "./components/otherUserProfile/OtherUserProfile";

const App = () => {

  const [local, setLocal] = useState();

  const socket = io('http://localhost:5000');

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setLocal(true)
    }
    else {
      setLocal(false)
    }
  }, [])

  return (
    <>
      <div className="main-scrollbar" id="style-4">
        <Router>
          <div className="App">
            <Navbar local={local} setLocal={setLocal} socket={socket} io={io} />
            <Routes>
              <Route path="/" element={<Timeline />} />
              <Route path="/profile" element={<Profile socket={socket} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn setLocal={setLocal} socket={socket} />} />
              <Route path="/profile/:createdBy" element={<OtherUserProfile socket={socket} />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
