import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Layouts/Home";
import Login from "./Components/LoginSignup/Login";
import ForgotPassword from "./Components/LoginSignup/ForgotPassword";

const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true"; // Check login status
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  const routes = [
    { path: "/dashboard/HRMDashboard", component: <Home /> },
    { path: "/dashboard/EmployeeDashboard", component: <Home /> },
    { path: "/Employee/Profile", component: <Home /> },
    { path: "/Employee/Employees", component: <Home /> },
    { path: "/Employee/ShiftRequests", component: <Home /> },
    { path: "/Recruitment/RecruitmentDashboard", component: <Home /> },
    { path: "/Recruitment/RecruitmentPipeline", component: <Home /> },
    { path: "/Recruitment/Applicant", component: <Home /> },
    { path: "/OnBoarding/OnBoardingView", component: <Home /> },
    { path: "/OnBoarding/CandidatesView", component: <Home /> },
    { path: "/Attendance", component: <Home /> },
    { path: "/Attendance/AttendanceDashboard", component: <Home /> },
    { path: "/Attendance/Attendances", component: <Home /> },
    { path: "/Attendance/WorkRecord", component: <Home /> },
    { path: "/Attendance/AttendanceActivity", component: <Home /> },
    { path: "/Attendance/EmployeeLate", component: <Home /> },
    { path: "/Attendance/MyAttendances", component: <Home /> },
    { path: "/Leave", component: <Home /> },
    { path: "/Leave/LeaveDashboard", component: <Home /> },
    { path: "/Leave/LeaveRequest", component: <Home /> },
    { path: "/Leave/LeaveType", component: <Home /> },
    { path: "/PayRoll/PayrollDashboard", component: <Home /> },
    { path: "/PayRoll/Contract", component: <Home /> },
    { path: "/PayRoll/Allowances", component: <Home /> },
    { path: "/PayRoll/Deduction", component: <Home /> },
    { path: "/PayRoll/Payslips", component: <Home /> },
    { path: "/PayRoll/Traveling", component: <Home /> },
    { path: "/OffBoarding", component: <Home /> },
    { path: "/OffBoarding/ExitProcess", component: <Home /> },
    { path: "/OffBoarding/ResignationLater", component: <Home /> },
    { path: "/HelpDesk", component: <Home /> },
    { path: "/Configuration", component: <Home /> },
    { path: "/Configuration/Holidays", component: <Home /> },
    { path: "/Configuration/CompanyLeaves", component: <Home /> },
    { path: "/dashboard", component: <Home /> },
    { path: "/Employee", component: <Home /> },
    { path: "/Recruitment", component: <Home /> },
    { path: "/OnBoarding", component: <Home /> },
    { path: "/PayRoll", component: <Home /> },
    { path:"/home", component: <Home/>}
  ];
  
  return (
    <Routes>
      {/* Redirect "/" to "/login" */}
      <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Routes>
            {routes.map(({ path, component }, index) => (
              <Route key={index} path={path} element={component} />
            ))}
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
