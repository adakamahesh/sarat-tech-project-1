import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PersonIcon from "@mui/icons-material/Person";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HailIcon from "@mui/icons-material/Hail";
import TotalLeave from "./TotalLeaves";
import { Divider } from "@mui/material";

const cards = [
  {
    id: 1,
    icon: <PersonIcon />,
    title: "Requests to Approve",
    description: "5",
    backgroundColor: "#2196F3", // Blue
  },
  {
    id: 2,
    icon: <HailIcon />,
    title: "Approved Leaves",
    description: "2",
    backgroundColor: "#4CAF50", // Green
  },
  {
    id: 3,
    icon: <WorkOutlineIcon />,
    title: "Rejected Leaves",
    description: "3",
    backgroundColor: "red", // red
  },
];

export default function HRMDashboard() {
  const [selectedCard, setSelectedCard] = React.useState(null);

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: "75%", display: "flex", flexDirection: "column", gap: 2, ml: 2, border: "1px solid rgb(237,237,237)", p: 2 }}>
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
                sx={{ backgroundColor: card.backgroundColor, color: "white" }}
              >
                <CardActionArea
                  onClick={() =>
                    setSelectedCard((prev) =>
                      prev === card.id ? null : card.id
                    )
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
                        width: 40, // Adjust size
                        height: 40,
                        borderRadius: "50%", // Circle shape
                        backgroundColor: "rgb(236,239,253)", // Change to desired color
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7C76E7", // Icon color
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
                      <Typography
                        variant="h5"
                        color="black"
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
          <Box sx={{ mt: 4 }}>
            <TotalLeave />
          </Box>
        </Box>
        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            ml: 2,
            border: "1px solid rgb(237,237,237)",
            p: 2,
          }}
        >
          <Typography variant="h6">Upcoming holidays</Typography>
          <Divider />
        </Box>
      </Box>
    </>
  );
}
