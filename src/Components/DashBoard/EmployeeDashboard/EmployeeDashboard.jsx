import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import HailIcon from '@mui/icons-material/Hail';

import Meeting from "./Meeting";
import Calender from "./Calender";
import Announcement from './Announcement';
import AttendanceLeave from './AttendanceLeave';
import Leavereq from '../../Leaves/LeaveRequest/LeaveRequest';

const cards = [
  {
    id: 1,
    icon: <PersonIcon />,
    title: 'Total Leave Ticket',
    description: '50',
    backgroundColor: "#2196F3",
  },
  {
    id: 2,
    icon: <HailIcon />,
    title: 'Ticket Resolved',
    description: '42',
    backgroundColor: "#4CAF50",
  },
];

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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {cards.map((card) => (
              <Card key={card.id} sx={{ backgroundColor: card.backgroundColor, color: "white" }}>
                <CardActionArea
                  onClick={() => setSelectedCard(prev => prev === card.id ? null : card.id)}
                  data-active={selectedCard === card.id ? "" : undefined}
                  sx={{
                    height: "100%",
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": { backgroundColor: "action.selectedHover" },
                    },
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'rgb(236,239,253)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#7C76E7',
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '18px' }}>{card.title}</Typography>
                      <Typography variant="h5" sx={{ fontSize: '26px', color: 'white' }}>{card.description}</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          {/* Attendance & Meeting */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: "column", md: "row" },
            mt: 4,
            gap: 2,
          }}>
            <Box sx={{ flex: 1, border: '1px solid rgb(237,237,237)' }}>
              <AttendanceLeave />
            </Box>
            <Box sx={{ flex: 1, border: '1px solid rgb(237,237,237)' }}>
              <Meeting />
            </Box>
          </Box>
        </Box>

      {/* Bottom Grid */}
        {/* Announcement & Calendar */}
        <Box
          sx={{
            width: { xs: "100%"},
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "1px solid rgb(237,237,237)",
            p: 2,
          }}
        >
          <Box sx={{ mt: 2, border: '1px solid rgb(237,237,237)' }}>
            <Announcement />
          </Box>
          <Box sx={{ mt: 2, pr: { xs: 0}, border: '1px solid rgb(237,237,237)' }}>
            <Calender />
          </Box>
      </Box>
      <Box sx={{mt:4}}>
        <Leavereq/>
      </Box>
    </>
  );
}