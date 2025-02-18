import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Layouts/Home";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import ForgotPassword from "./Components/LoginSignup/ForgotPassword";

const App = () => {
  const routes = [
    { path: "/dashboard/HRMDashboard", component: <Home /> },
    { path: "/dashboard/EmployeeDashboard", component: <Home /> },
    { path: "/HRM/employee", component: <Home /> },
    { path: "/HRM/EmployeeProfile", component: <Home /> },
    { path: "/HRM/designations", component: <Home /> },
    { path: "/HRM/AdminAttendance", component: <Home /> },
    { path: "/HRM/EmployeeAttendance", component: <Home /> },
    { path: "/HRM/EmployeeLeaves", component: <Home /> },
    { path: "/HRM/holidays", component: <Home /> },
    { path: "/HRM/overtime", component: <Home /> },
    { path: "/HRM/warning", component: <Home /> },
    { path: "/Recruitment/Dashboard", component: <Home /> },
    { path: "/Recruitment/RecruitmentPipeline", component: <Home /> },
    { path: "/Recruitment/Candidates", component: <Home /> },
    { path: "/Recruitment/Interview", component: <Home /> },
    { path: "/Recruitment/Recruitment", component: <Home /> },
    { path: "/Apps/Chat", component: <Home /> },
    { path: "/Apps/Calendar", component: <Home /> },
    { path: "/PayRoll/Dashboard", component: <Home /> },
    { path: "/PayRoll/Allowances", component: <Home /> },
    { path: "/PayRoll/Deduction", component: <Home /> },
    { path: "/PayRoll/Payslips", component: <Home /> },
    { path: "/dashboard", component: <Home /> },
    { path: "/HRM", component: <Home /> },
    { path: "/Recruitment", component: <Home /> },
    { path: "/Apps", component: <Home /> },
    { path: "/PayRoll", component: <Home /> },
    { path:"/home", component: <Home/>}
  ];
  
  return (
    <Routes>
      {/* Redirect "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {routes.map(({ path, component }, index) => (
      <Route key={index} path={path} element={component} />
      ))}
    </Routes>
  );
};

export default App;
