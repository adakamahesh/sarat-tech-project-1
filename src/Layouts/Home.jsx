import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import HRMDashBoard from "../Components/HRMDashBoard/HRMDashboard";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
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
    segment: "HRM",
    title: "HRM",
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: "employee",
        title: "Employee",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "EmployeeProfile",
        title: "Employee Profile",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "designations",
        title: "Designations",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "AdminAttendance",
        title: "Admin Attendance",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "EmployeeAttendance",
        title: "Employee Attendance",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "EmployeeLeaves",
        title: "Employee Leaves",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "holidays",
        title: "Holidays",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "overtime",
        title: "Overtime",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "warning",
        title: "Warning",
        icon: <HorizontalRuleIcon />,
      },
    ],
  },
  {
    segment: "Recruitment",
    title: "Recruitment",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "Dashboard",
        title: "Dashboard",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "RecruitmentPipeline",
        title: "RecruitmentPipeline",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "Candidates",
        title: "Candidates",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "Interview",
        title: "Interview",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "Recruitment",
        title: "Recruitment",
        icon: <HorizontalRuleIcon />,
      },
    ],
  },
  {
    segment: "Apps",
    title: "Apps",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "Chat",
        title: "Chat",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "Calendar",
        title: "Calendar",
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
        segment: "Dashboard",
        title: "Dashboard",
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
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
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

export default function DashboardLayoutBasic(props) {

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme} window={window || undefined}>
      <DashboardLayout>
        <PageContainer>
          <HRMDashBoard />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}