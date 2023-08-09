import React, { useEffect, useState } from "react";
import Timeline from "./components/timeline/Timeline";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Navbar from "./components/common/Navbar";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  const [local, setLocal] = useState();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setLocal(true)
    }
    else {
      setLocal(false)
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar local={local} setLocal={setLocal} />
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn setLocal={setLocal} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
