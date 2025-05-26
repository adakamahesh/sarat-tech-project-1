import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PersonIcon from "@mui/icons-material/Person";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HailIcon from "@mui/icons-material/Hail";
import AttendanceBarGraph from "./AttendanceAnalytic";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function HRMDashboard() {
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [onTimeCount, setOnTimeCount] = useState(0);

  const fetchTodayAttendance = async () => {
    try {
      const presentRes = await axios.get(`${API_URL}attendance/today/present`);
      const absentRes = await axios.get(`${API_URL}attendance/today/absent`);
      const lateRes = await axios.get(`${API_URL}attendance/today/late`);
      const onTimeCount = await axios.get(`${API_URL}attendance/today/ontime`);

      setPresentCount(presentRes.data);
      setAbsentCount(absentRes.data);
      setLateCount(lateRes.data);
      setOnTimeCount(onTimeCount.data);
    } catch (error) {
      console.error("Failed to fetch today's attendance:", error);
    }
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const cards = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: "Today Attendances",
      description: presentCount,
    },
    {
      id: 2,
      icon: <HailIcon />,
      title: "On Time",
      description: onTimeCount, // Adjust if needed based on "on-time" logic
    },
    {
      id: 3,
      icon: <WorkOutlineIcon />,
      title: "Late Come",
      description: lateCount,
    },
    {
      id: 4,
      icon: <HailIcon />,
      title: "Today's Absent",
      description: absentCount,
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.18)", // Transparent background
          backdropFilter: "blur(10px)",
          p:3,
          color: "white",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 2,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent background
                backdropFilter: "blur(10px)",
                color: "white",
              }}
            >
              <CardActionArea
                onClick={() =>
                  setSelectedCard((prev) => (prev === card.id ? null : card.id))
                }
                data-active={selectedCard === card.id ? "" : undefined}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.12)",
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: "20px", color: "white" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="black"
                      sx={{ fontSize: "30px", color: "white" }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            mt: 4,
            width: "100%",
          }}
        >
          <AttendanceBarGraph />
        </Box>
      </Box>
    </>
  );
}