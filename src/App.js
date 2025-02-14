import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import ForgotPassword from "./Components/LoginSignup/ForgotPassword";

const App = () => {
  return (
    <Routes>
      {/* Redirect "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;