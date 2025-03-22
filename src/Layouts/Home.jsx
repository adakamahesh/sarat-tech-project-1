import * as React from "react";
import { useLocation } from 'react-router-dom'; // Add this line
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import logo from "../assets/images/st_logo.png";
import EmployeeDashboard from "../Components/EmployeeDashboard/EmployeeDashboard";
import { useNavigate } from "react-router-dom";
import HRMDashboard from "../Components/HRMDashBoard/HRMDashboard";
import Employee from "../Components/Employee/Employee";
import Logout from "../Components/LoginSignup/Logout";
import EmployeeProfile from "../Components/EmployeeProfile/EmployeeProfil";
import RecruitmentDashboard from "../Components/RecruitmentDashboard/RecruitmentDashboard"
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ConstructionIcon from '@mui/icons-material/Construction';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AttendanceDashboard from "../Components/Attendance/AttendanceDashboard";
import Dashboard from "../Components/Leaves/Dashboard/Dashboard";
import ShiftRequests from "../Components/Shiftreq/Shiftreq";
import Applicant from "../Components/Applicant/Applicant";
import CandidatesView from "../Components/OnBoarding/CandidatesView/CandidatesView";
import OnBoardingView from "../Components/OnBoarding/OnBoardingView/OnBoardingView";
import AttendanceActivity from "../Components/AttendanceActivity/AttendanceActivity";
import EmployeeLate from "../Components/EmployeeLate/EmployeeLate";
import MyAttendances from "../Components/MyAttendances/MyAttendances";
import Holidays from "../Components/Configuration/Holidays/Holidays";
import CompanyLeaves from "../Components/Configuration/CompanyLeaves/CompanyLeaves";
import Contract from "../Components/PayRoll/Contract/Contract";
import ResignationLater from "../Components/Offboarding/ResignationLatters/ResignationLatter";
import Payslips from "../Components/PayRoll/Payslip/Payslip";
import LeaveRequest from "../Components/Leaves/LeaveRequest/LeaveRequest";
import Allowances from "../Components/PayRoll/Allowances/Allowances";
import Deduction from "../Components/PayRoll/Deductions/Dedutions";

export default function DashboardLayoutBasic(props) {
  const createNavigation = (navigate) => [
    {
      kind: "header",
      title: "Main items",
    },
    {
      segment: "Dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
      children: [
        {
          segment: "HRMDashboard",
          title: "HRM DashBoard",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "EmployeeDashboard",
          title: "Employee Dashboard",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "Employee",
      title: "Employee",
      icon: <GroupsIcon />,
      children: [
        {
          segment: "Profile",
          title: "Profile",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Employees",
          title: "Employees",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "ShiftRequests",
          title: "Shift Requests",
          icon: <HorizontalRuleIcon />,
        }
      ],
    },
    {
      segment: "Recruitment",
      title: "Recruitment",
      icon: <GroupAddIcon />,
      children: [
        {
          segment: "RecruitmentDashboard",
          title: "Recruitment Dashboard",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "RecruitmentPipeline",
          title: "Recruitment Pipeline",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Applicant",
          title: "Applicant",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "OnBoarding",
      title: "On Boarding",
      icon: <LoginIcon />,
      children: [
        {
          segment: "OnBoardingView",
          title: "On Boarding View",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "CandidatesView",
          title: "Candidates View",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "Attendance",
      title: "Attendance",
      icon: <HowToRegIcon />,
      children: [
        {
          segment: "AttendanceDashboard",
          title: "Attendance Dashboard",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Attendances",
          title: "Attendances",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "WorkRecord",
          title: "Work Record",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "AttendanceActivity",
          title: "Attendance Activity",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "EmployeeLate",
          title: "Employee Late",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "MyAttendances",
          title: "My Attendances",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "Leave",
      title: "Leave",
      icon: <EventBusyIcon />,
      children: [
        {
          segment: "LeaveDashboard",
          title: "Leave Dashboard",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "LeaveRequest",
          title: "Leave Request",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "LeaveType",
          title: "Leave Type",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "AssignedLeave",
          title: "Assigned Leave",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "PayRoll",
      title: "PayRoll",
      icon: <FolderCopyIcon />,
      children: [
        {
          segment: "PayrollDashboard",
          title: "Payroll Dashboard",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Contract",
          title: "Contract",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Allowances",
          title: "Allowances",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Deduction",
          title: "Deduction",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Payslips",
          title: "Payslips",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Traveling",
          title: "Traveling",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "OffBoarding",
      title: "Off Boarding",
      icon: <LogoutIcon />,
      children: [
        {
          segment: "ExitProcess",
          title: "Exit Process",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "ResignationLater",
          title: "Resignation Later",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {
      segment: "HelpDesk",
      title: "Help Desk",
      icon: <HeadsetMicIcon />,
    },
    {
      segment: "Configuration",
      title: "Configuration",
      icon: <ConstructionIcon/>,
      children: [
        {
          segment: "Holidays",
          title: "Holidays",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "CompanyLeaves",
          title: "Company Leaves",
          icon: <HorizontalRuleIcon />,
        },
      ],
    },
    {

      icon:<Logout/>,
    }
  ];

  const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: "class",
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const location = useLocation();  // Using useLocation to get the current URL
  const currentPage = location.pathname.split("/").pop();  // Extracting the last part of the path to render the correct page

  const renderComponent = () => {
    switch (currentPage) {
      case "home":
        return <HRMDashboard/>;
      case "Dashboard":
        return <HRMDashboard/>;
      case "HRMDashboard":
        return <HRMDashboard />;
      case "EmployeeDashboard":
        return <EmployeeDashboard />;
      case "Employee":
        return <Employee/>;
      case "Employees":
        return <Employee/>;
      case "Profile":
        return <EmployeeProfile/>;
      case "RecruitmentDashboard":
        return <RecruitmentDashboard/>;
      case "AttendanceDashboard":
        return <AttendanceDashboard/>;
      case "LeaveDashboard":
        return <Dashboard/>;
      case "ShiftRequests":
        return <ShiftRequests/>;
      case "Applicant":
        return <Applicant/>;
      case "CandidatesView":
        return <CandidatesView/>;
      case "AttendanceActivity":
        return <AttendanceActivity/>;
      case "EmployeeLate":
        return <EmployeeLate/>;
      case "MyAttendances":
        return <MyAttendances/>;
      case "Holidays":
        return <Holidays/>;
      case "CompanyLeaves":
        return <CompanyLeaves/>;
      case "ResignationLater":
        return <ResignationLater/>;
      case "Contract":
        return <Contract/>;
      case "Payslips":
        return <Payslips/>;
      case "LeaveRequest":
        return <LeaveRequest/>;
      case "Allowances":
        return <Allowances/>;
      case "Deduction":
        return <Deduction/>;
      case "OnBoardingView":
        return <OnBoardingView/>;
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  const NAVIGATION = createNavigation(navigate);

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={window || undefined}
      branding={{
        logo: <img src={logo} alt="Custom Logo" />,
        title: "",
        homeUrl: "/dashboard/HRMDashboard",
      }}
    >
      <DashboardLayout>
        <PageContainer>{renderComponent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}