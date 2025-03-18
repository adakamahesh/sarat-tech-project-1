import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HailIcon from '@mui/icons-material/Hail';
import axios from 'axios';
import Meeting from "./Meeting";
import Calender from "./Calender";
import Absent from "./Absent";
import Total from "./Total";
import Present from "./Present";
import Announcement from './Announcement';
import OverTime from './OverTime';
import OnLeave from './OnLeave';
import LeaveReq from './LeaveReq';
import { Divider, CircularProgress } from "@mui/material";

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
            axios.get("http://192.168.1.50:8084/api/employees/count/active")
                .then(response => setTotalEmployees(response.data)),
            axios.get("http://192.168.1.50:8084/attendance/today/present")
                .then(response => setTodayPresent(response.data)),
            axios.get("http://192.168.1.50:8084/attendance/today/absent")
                .then(response => setTodayAbsent(response.data)),
            axios.get("http://192.168.1.50:8084/attendance/today/absent")
                .then(response => setLeaveRequest(response.data))
        ])
        .then(() => setLoading(false))
        .catch(() => {
            setError("Failed to load data");
            setLoading(false);
        });
    };

    // Initial fetch
    fetchData();

    // Polling every 30 seconds
    const interval = setInterval(fetchData, 30000);

    // Cleanup to avoid memory leaks
    return () => clearInterval(interval);

}, []);

  const cards = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: 'Total Employee',
      description: loading ? <CircularProgress size={20} color="inherit" /> : (error ? "Error" : totalEmployees),
      backgroundColor: "#2196F3",
    },
    {
      id: 2,
      icon: <HailIcon />,
      title: "Today Presents",
      description: loading ? <CircularProgress size={20} color="inherit" /> : (error ? "Error" : todayPresent),
      backgroundColor: "#4CAF50",
    },
    {
      id: 3,
      icon: <WorkOutlineIcon />,
      title: 'Total Absents',
      description: loading ? <CircularProgress size={20} color="inherit" /> : (error ? "Error" : todayAbsent),
      backgroundColor: "red",
    },
    {
      id: 4,
      icon: <HailIcon />,
      title: "Leave Request",
      description: loading ? <CircularProgress size={20} color="inherit" /> : (error ? "Error" : LeaveRequest),
      backgroundColor: "#4CAF50",
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
        return <LeaveReq/>;
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: "75%", display: "flex", flexDirection: "column", gap: 2, ml: 2, border: "1px solid rgb(237,237,237)", p: 2 }}>
          <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1 }}>
            {cards.map((card) => (
              <Card key={card.id} sx={{ backgroundColor: card.backgroundColor, color: "white" }}>
                <CardActionArea onClick={() => setSelectedCard(prev => prev === card.id ? null : card.id)}>
                  <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgb(236,239,253)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C76E7' }}>
                      {card.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontSize: '20px' }}>{card.title}</Typography>
                      <Typography variant="h5" color="black" sx={{ fontSize: '30px' }}>{card.description}</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
            <Box sx={{ width: "315%", mt: 4 }}>{renderComponent()}</Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'stretch', border: '1px solid rgb(237,237,237)' }}>
              <OnLeave />
            </Box>
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'stretch', border: '1px solid rgb(237,237,237)' }}>
              <OverTime />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "25%", display: "flex", flexDirection: "column", gap: 2, ml: 2, border: "1px solid rgb(237,237,237)", p: 2 }}>
          <Typography variant="h6">Quotation and Answers</Typography>
          <Divider />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
        <Box sx={{ flex: 0.45, display: 'flex', alignItems: 'stretch', border: '1px solid rgb(237,237,237)' }}>
          <Meeting />
        </Box>
        <Box sx={{ flex: 0.55, display: 'flex', alignItems: 'stretch', border: '1px solid rgb(237,237,237)' }}>
          <Calender />
        </Box>
      </Box>
      <Box sx={{ mt: 4, border: '1px solid rgb(237,237,237)' }}>
        <Announcement />
      </Box>
    </>
  );
}
