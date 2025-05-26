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
import TotalLeave from "./TotalLeaves";

export default function HRMDashboard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [leaveCounts, setLeaveCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const pendingRes = await axios.get(
          "http://192.168.1.49:8084/leave-requests/count/pending"
        );
        const approvedRes = await axios.get(
          "http://192.168.1.49:8084/leave-requests/count/approved"
        );
        const rejectedRes = await axios.get(
          "http://192.168.1.49:8084/leave-requests/count/rejected"
        );

        setLeaveCounts({
          pending: pendingRes.data,
          approved: approvedRes.data,
          rejected: rejectedRes.data,
        });
      } catch (error) {
        console.error("Error fetching leave counts", error);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: "Requests to Approve",
      description: leaveCounts.pending,
    },
    {
      id: 2,
      icon: <HailIcon />,
      title: "Approved Leaves",
      description: leaveCounts.approved,
    },
    {
      id: 3,
      icon: <WorkOutlineIcon />,
      title: "Rejected Leaves",
      description: leaveCounts.rejected,
    },
  ];

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          p:2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 2,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              sx={{
                color: "white",
                textAlign: "center",
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
                data-active={selectedCard === card.id ? "" : undefined}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": { backgroundColor: "action.selectedHover" },
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
                      textAlign: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: "20px" }}>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="white"
                      sx={{ fontSize: "30px" }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Box sx={{ mt: 4}}>
          <TotalLeave />
        </Box>
      </Box>
    </>
  );
}
