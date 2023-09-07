import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import TimelineContainer from "./components/timeline";
import ProfileContainer from "./components/profile";
import OtherUserProfileContainer from "./components/otherUserProfile";

const App = () => {

  return (
    <>
      <div className="main-scrollbar" id="style-4">
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile/:createdBy" element={<OtherUserProfileContainer />} />
              <Route path="/timeline" element={<TimelineContainer />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
