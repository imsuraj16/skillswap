import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Allskillspage from "../pages/Allskillspage";
import LoginPage from "../pages/LoginPage";
import Registeruser from "../pages/Registeruser";
import Addskill from "../pages/Addskill";
import Profile from "../pages/Profile";
import Userdetails from "../pages/Userdetails";
import Users from "../pages/Users";
import Pagenotfound from "../pages/Pagenotfound";
import Authwrapper from "./Authwrapper";
import Requests from "../pages/Requests";
import Meeting from "../pages/Meeting";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Allskillspage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/registeruser" element={<Registeruser />} />
      <Route
        path="/add-skill"
        element={
          <Authwrapper>
            <Addskill />
          </Authwrapper>
        }
      />
      <Route
        path="/profile"
        element={
          <Authwrapper>
            <Profile />
          </Authwrapper>
        }
      />
      <Route
        path="/requests"
        element={
          <Authwrapper>
            <Requests />
          </Authwrapper>
        }
      />
      <Route
        path="/meeting/:roomId"
        element={
          <Authwrapper>
            <Meeting />
          </Authwrapper>
        }
      />
      
      <Route path="/Users" element={<Users />} />
      <Route path="/user/:id" element={<Userdetails />} />
      <Route path="*" element = {<Pagenotfound/>}/>
    </Routes>
  );
};

export default Mainroutes;
