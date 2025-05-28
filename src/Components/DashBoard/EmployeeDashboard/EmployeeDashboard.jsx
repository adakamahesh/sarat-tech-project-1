import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PersonIcon from "@mui/icons-material/Person";
import HailIcon from "@mui/icons-material/Hail";

import Meeting from "./Meeting";
import Calender from "./Calender";
import Announcement from "./Announcement";
import AttendanceLeave from "./AttendanceLeave";
import Leavereq from "../../Leaves/LeaveRequest/LeaveRequest";

export default function EmployeeDashboard() {
  const [selectedCard, setSelectedCard] = React.useState(null);

  return (
    <>
      {/* Top Grid */}
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
        Employee Dashboard
      </Typography>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
      <Box
        sx={{
          width: { xs: "100%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        {/* Attendance & Meeting */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mt: 4,
            gap: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <AttendanceLeave />
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <Meeting />
          </Box>
        </Box>
      </Box>

      {/* Bottom Grid */}
      {/* Announcement & Calendar */}
      <Box
        sx={{
          width: { xs: "100%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        <Box sx={{ mt: 2}}>
          <Announcement />
        </Box>
        <Box sx={{ mt: 2, pr: { xs: 0 } }}>
          <Calender />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Leavereq />
        </Box>
      </Box>
      </Box>
    </>
  );
}
