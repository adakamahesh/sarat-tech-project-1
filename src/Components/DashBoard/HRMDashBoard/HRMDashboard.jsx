import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PersonIcon from "@mui/icons-material/Person";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HailIcon from "@mui/icons-material/Hail";
import axios from "axios";
import Meeting from "./Meeting";
import Calender from "./Calender";
import Absent from "./Absent";
import Total from "./Total";
import Present from "./Present";
import Announcement from "./Announcement";
import OverTime from "./OverTime";
import OnLeave from "./OnLeave";
import LeaveReq from "./LeaveReq";
import { Divider, CircularProgress } from "@mui/material";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function HRMDashboard() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [totalEmployees, setTotalEmployees] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [todayPresent, setTodayPresent] = React.useState(0);
  const [todayAbsent, setTodayAbsent] = React.useState(0);
  const [LeaveRequest, setLeaveRequest] = React.useState(0);

  React.useEffect(() => {
    const fetchData = () => {
      Promise.all([
        axios
          .get(`${API_URL}api/employees/count/active`)
          .then((response) => setTotalEmployees(response.data)),
        axios
          .get(`${API_URL}attendance/today/present`)
          .then((response) => setTodayPresent(response.data)),
        axios
          .get(`${API_URL}attendance/today/absent`)
          .then((response) => setTodayAbsent(response.data)),
        axios
          .get(`${API_URL}leave-requests/count/pending`)
          .then((response) => setLeaveRequest(response.data)),
      ])
        .then(() => setLoading(false))
        .catch(() => {
          setError("Failed to load data");
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: "Total Employees",
      description: loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : error ? (
        "Error"
      ) : (
        totalEmployees
      ),
      backgroundColor: "#8EDCE6",
    },
    {
      id: 2,
      icon: <HailIcon />,
      title: "Today Presents",
      description: loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : error ? (
        "Error"
      ) : (
        todayPresent
      ),
      backgroundColor: "#6BF178",
    },
    {
      id: 3,
      icon: <WorkOutlineIcon />,
      title: "Today Absents",
      description: loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : error ? (
        "Error"
      ) : (
        todayAbsent
      ),
      backgroundColor: "#F28B82",
    },
    {
      id: 4,
      icon: <HailIcon />,
      title: "Leave Request",
      description: loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : error ? (
        "Error"
      ) : (
        LeaveRequest
      ),
      backgroundColor: "#93A0B4",
    },
  ];

  const renderComponent = () => {
    switch (selectedCard) {
      case 1:
        return <Total />;
      case 2:
        return <Present />;
      case 3:
        return <Absent />;
      case 4:
        return <LeaveReq />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Top Section: Cards + Right Sidebar */}
      {/* Left Section */}
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "white" }}>
        HRMS Dashboard
      </Typography>
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        {/* Dashboard Cards */}
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            },
            gap: 1,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                borderRadius: 2,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
            >
              <CardActionArea
                onClick={() =>
                  setSelectedCard((prev) => (prev === card.id ? null : card.id))
                }
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
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
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
                      sx={{
                        fontSize: { xs: "16px", sm: "18px", md: "20px" },
                        color: "white",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="white"
                      sx={{ fontSize: { xs: "22px", sm: "26px", md: "30px" } }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* Selected Card Content */}
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          {renderComponent()}
        </Box>

        {/* OnLeave + OverTime */}
        {/* <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mt: 2,
            gap: 2
          }}> */}
        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            display: "flex",
            alignItems: "stretch",
            borderRadius: 2,
          }}
        >
          <OnLeave />
        </Box>
        {/* <Box sx={{
              width: { xs: "100%", md: '50%' },
              display: 'flex',
              alignItems: 'stretch',
              border: '1px solid rgb(237,237,237)'
            }}>
              <OverTime />
            </Box> */}
        {/* </Box> */}

        {/* Bottom Section: Meeting & Calendar */}
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
              flex: 0.45,
              width: "100%",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Meeting />
          </Box>
          <Box
            sx={{
              flex: 0.55,
              width: "100%",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Calender />
          </Box>
        </Box>
        {/* Announcement */}
        <Box sx={{ mt: 4 }}>
          <Announcement />
        </Box>
      </Box>
    </>
  );
}
