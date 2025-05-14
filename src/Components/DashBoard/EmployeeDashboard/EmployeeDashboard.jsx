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

      <Box
        sx={{
          width: { xs: "100%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid rgb(237,237,237)",
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
          <Box sx={{ flex: 1, border: "1px solid rgb(237,237,237)" }}>
            <AttendanceLeave />
          </Box>
          <Box sx={{ flex: 1, border: "1px solid rgb(237,237,237)" }}>
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
          border: "1px solid rgb(237,237,237)",
          p: 2,
        }}
      >
        <Box sx={{ mt: 2, border: "1px solid rgb(237,237,237)" }}>
          <Announcement />
        </Box>
        <Box
          sx={{ mt: 2, pr: { xs: 0 }, border: "1px solid rgb(237,237,237)" }}
        >
          <Calender />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Leavereq />
        </Box>
      </Box>
    </>
  );
}
