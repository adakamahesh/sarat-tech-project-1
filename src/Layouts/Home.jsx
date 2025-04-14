import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import logo from "../assets/images/st_logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ConstructionIcon from "@mui/icons-material/Construction";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Logout from "../Components/LoginSignup/Logout";

// Import pages
import HRMDashboard from "../Components/DashBoard/HRMDashBoard/HRMDashboard";
import EmployeeDashboard from "../Components/DashBoard/EmployeeDashboard/EmployeeDashboard";
import Employee from "../Components/Employee/Employees/Employee";
import EmployeeProfile from "../Components/Employee/EmployeeProfile/EmployeeProfil";
import RecruitmentDashboard from "../Components/Recruitment/RecruitmentDashboard/RecruitmentDashboard";
import Applicant from "../Components/Recruitment/Applicant/Applicant";
import RecruitmentPipeline from "../Components/Recruitment/RecruitmentPipeline/RecruitmentPipeline";
import CandidatesView from "../Components/OnBoarding/CandidatesView/CandidatesView";
import OnBoardingView from "../Components/OnBoarding/OnBoardingView/OnBoardingView";
import AttendanceDashboard from "../Components/Attendance/AttendanceDashBoard/AttendanceDashboard";
import AttendanceActivity from "../Components/Attendance/AttendanceActivity/AttendanceActivity";
import EmployeeLate from "../Components/Attendance/EmployeeLate/EmployeeLate";
import MyAttendances from "../Components/Attendance/MyAttendances/MyAttendances";
import Holidays from "../Components/Configuration/Holidays/Holidays";
import CompanyLeaves from "../Components/Configuration/CompanyLeaves/CompanyLeaves";
import Contract from "../Components/PayRoll/Contract/Contract";
import ResignationLater from "../Components/Offboarding/ResignationLatters/ResignationLatter";
import Payslips from "../Components/PayRoll/Payslip/Payslip";
import LeaveRequest from "../Components/Leaves/LeaveRequest/LeaveRequest";
import Allowances from "../Components/PayRoll/Allowances/Allowances";
import Deduction from "../Components/PayRoll/Deductions/Dedutions";
import ExitProcess from "../Components/Offboarding/ExitProcess/ExitProcess";
import AssignedLeave from "../Components/Leaves/AssignedLeave/AssignedLeave";
import HelpDesk from "../Components/HelpDesk/HelpDesk";
import PayRollDashBoard from "../Components/PayRoll/PayRollDashBoard/PayRollDashBoard";
import WorkRecord from "../Components/Attendance/WorkRecord/WorkRecord";
import Attendances from "../Components/Attendance/Attendances/Attendances";
import LeaveType from "../Components/Leaves/LeaveType/LeaveType";
import ShiftRequests from "../Components/Employee/Shiftreq/Shiftreq";
import Dashboard from "../Components/Leaves/Dashboard/Dashboard";

// Inline style with media query adjustments
const isMobile = window.innerWidth <= 768;
const containerStyle = {
  padding: isMobile ? "10px" : "30px",
  fontSize: isMobile ? "14px" : "16px",
};

export default function DashboardLayoutBasic() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.split("/").pop();

  const renderComponent = () => {
    switch (currentPage) {
      case "home":
      case "Dashboard":
      case "HRMDashboard":
        return <HRMDashboard />;
      case "EmployeeDashboard":
        return <EmployeeDashboard />;
      case "Employee":
      case "Employees":
        return <Employee />;
      case "Profile":
        return <EmployeeProfile />;
      case "RecruitmentDashboard":
        return <RecruitmentDashboard />;
      case "AttendanceDashboard":
        return <AttendanceDashboard />;
      case "LeaveDashboard":
        return <Dashboard />;
      case "ShiftRequests":
        return <ShiftRequests />;
      case "Applicant":
        return <Applicant />;
      case "RecruitmentPipeline":
        return <RecruitmentPipeline />;
      case "CandidatesView":
        return <CandidatesView />;
      case "AttendanceActivity":
        return <AttendanceActivity />;
      case "EmployeeLate":
        return <EmployeeLate />;
      case "MyAttendances":
        return <MyAttendances />;
      case "Attendances":
        return <Attendances />;
      case "Holidays":
        return <Holidays />;
      case "CompanyLeaves":
        return <CompanyLeaves />;
      case "ResignationLater":
        return <ResignationLater />;
      case "Contract":
        return <Contract />;
      case "Payslips":
        return <Payslips />;
      case "LeaveRequest":
        return <LeaveRequest />;
      case "Allowances":
        return <Allowances />;
      case "Deduction":
        return <Deduction />;
      case "OnBoardingView":
        return <OnBoardingView />;
      case "ExitProcess":
        return <ExitProcess />;
      case "AssignedLeave":
        return <AssignedLeave />;
      case "HelpDesk":
        return <HelpDesk />;
      case "PayRollDashBoard":
        return <PayRollDashBoard />;
      case "WorkRecord":
        return <WorkRecord />;
      case "LeaveType":
        return <LeaveType />;
      default:
        return null;
    }
  };

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
        { segment: "Profile", title: "Profile", icon: <HorizontalRuleIcon /> },
        {
          segment: "Employees",
          title: "Employees",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "ShiftRequests",
          title: "Shift Requests",
          icon: <HorizontalRuleIcon />,
        },
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
          segment: "PayRollDashBoard",
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
      icon: <ConstructionIcon />,
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
      icon: <Logout />,
    },
  ];

  // Light mode only
  const demoTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          mode: "light",
        },
      },
    },
  });

  const NAVIGATION = createNavigation(navigate);

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={window || undefined}
      branding={{
        logo: (
          <img
            src={logo}
            alt="Custom Logo"
            style={{
              height: isMobile ? 30 : 42,
              margin: isMobile ? "4px 0" : "0 0",
            }}
          />
        ),
        title: "",
        homeUrl: "/dashboard/HRMDashboard",
      }}
    >
      <DashboardLayout
        slotProps={{
          drawer: {
            sx: { width: 180 },
            PaperProps: { sx: { width: 180 } },
          },
        }}
      >
        <PageContainer style={containerStyle}>
          {renderComponent()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
