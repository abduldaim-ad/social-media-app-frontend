import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import TimelineContainer from "./components/timeline";
import ProfileContainer from "./components/profile";
import OtherUserProfileContainer from "./components/otherUserProfile";

const App = () => {

  const notify = () => {
    const notification = new Notification("FB Clone", {
      body: `Not Registered? Sign Up Here`,
      icon: 'https://www.freeiconspng.com/uploads/facebook-logo-4.png',
    })

    notification.addEventListener('click', () => {
      window.open('/signup')
    })

    setTimeout(() => {
      notification.close();
    }, 5000)
  }

  const callNotification = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        notify();
      }
      else {
        Notification.requestPermission().then((res) => {
          if (res === "granted") {
            notify();
          }
          else if (res === "denied") {
            console.log("Notifiations access denied");
          }
          else if (res === "default") {
            console.log("Notifications Permission is Not Given");
          }
        })
      }
    }
    else {
      console.log("Not Supported");
    }
  }

  useEffect(() => {
    callNotification();
  }, [])

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
