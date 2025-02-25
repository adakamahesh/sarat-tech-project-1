import * as React from "react";
import { useLocation } from 'react-router-dom'; // Add this line
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LayersIcon from "@mui/icons-material/Layers";
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
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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
      icon: <BarChartIcon />,
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
      icon: <BarChartIcon />,
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
      icon: <BarChartIcon />,
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
      ],
    },
    {
      segment: "PayRoll",
      title: "PayRoll",
      icon: <BarChartIcon />,
      children: [
        {
          segment: "PayrollDashboard",
          title: "Payroll Dashboard",
          icon: <HorizontalRuleIcon />,
        },
        {
          segment: "Context",
          title: "Context",
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
      icon: <BarChartIcon />,
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
      icon: <LayersIcon />,
    },
    {
      segment: "Configuration",
      title: "Configuration",
      icon: <BarChartIcon />,
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
        return <EmployeeProfile/>
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