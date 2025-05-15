import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PersonIcon from "@mui/icons-material/Person";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HailIcon from "@mui/icons-material/Hail";
import Payslip from "./Payslip";

export default function HRMDashboard() {
  const [payrollData, setPayrollData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const fetchPayrollData = async () => {
    try {
      const response = await axios.get("http://192.168.1.49:8084/api/payroll/all");
      setPayrollData(response.data);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };

  // Count function for each status
  const countByStatus = (status) => {
    return payrollData.filter((item) => item.paymentStatus?.toLowerCase() === status.toLowerCase()).length;
  };

  const cards = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: "Paid",
      description: countByStatus("Paid"),
      backgroundColor: "#2196F3",
    },
    {
      id: 2,
      icon: <HailIcon />,
      title: "Confirmation",
      description: countByStatus("Confirmation"),
      backgroundColor: "#4CAF50",
    },
    {
      id: 3,
      icon: <WorkOutlineIcon />,
      title: "Review ongoing",
      description: countByStatus("Review ongoing"),
      backgroundColor: "red",
    },
    {
      id: 4,
      icon: <WorkOutlineIcon />,
      title: "Draft",
      description: countByStatus("Draft"),
      backgroundColor: "orange",
    },
  ];

  return (
    <>
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
            sx={{ backgroundColor: card.backgroundColor, color: "white" }}
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
                    backgroundColor: "rgb(236,239,253)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7C76E7",
                  }}
                >
                  {card.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: "20px" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="h5" color="black" sx={{ fontSize: "30px" }}>
                    {card.description}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Payslip />
      </Box>
    </>
  );
}