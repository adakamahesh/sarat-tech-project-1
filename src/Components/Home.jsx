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
import HRMDashBoard from "./HRMDashBoard/HRMDashboard"
// import TopBarRight from "./TopBarRight";

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
        segment: "sales",
        title: "HRM DashBoard",
        icon: <HorizontalRuleIcon />,
      },
      {
        segment: "traffic",
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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const [activeSegments, setActiveSegments] = React.useState([]);

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path, segments = []) => {
      setPathname(String(path));
      setActiveSegments(segments);
    },
  }), [pathname, ]);

  return { router, activeSegments, setActiveSegments };
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const { router, activeSegments, setActiveSegments } = useDemoRouter("/dashboard");

  const handleNavigation = (path, segment) => {
    let updatedSegments = [...activeSegments];

    if (updatedSegments.includes(segment)) {
      updatedSegments = updatedSegments.filter(s => s !== segment);
    } else {
      updatedSegments.push(segment);
    }

    router.navigate(path, updatedSegments);
    setActiveSegments(updatedSegments);
  };

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout >
          <PageContainer>
            <HRMDashBoard />
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </>
  );
}
