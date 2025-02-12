import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HailIcon from '@mui/icons-material/Hail';
import Meeting from "./Meeting";
// import Calender from "./Calender";
import Absent from "./Absent";
import Total from "./Total";
import Present from  "./Present";
import Announcement  from './Announcement';
import OverTime from './OverTime'
const cards = [
  {
    id: 1,
    icon:<PersonIcon/>,
    title: 'Total Employee',
    description: '50', 
  },
  {
    id: 2,
    icon:<HailIcon/>,
    title: 'Total Presents',
    description: '42',
  },
  {
    id: 3,
    icon:<WorkOutlineIcon/>,
    title: 'Total Absents',
    description: '8',
  },

];

export default function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(null);

  const renderComponent = () => {
    switch (selectedCard) {
      case 1:
        return <Total />;
      case 2:
        return <Present />;
      case 3:
        return <Absent />;
      default:
        return null;
    }
  };

  return (
    <>
    <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 2,
          pr: "20%",
        }}
      >
      {cards.map((card) => (
          <Card key={card.id}>
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
            <CardContent sx={{ height: '100%', display:'flex', alignItems:'center',gap:2 }}>
              <Box 
                sx={{ 
                  width: 40, // Adjust size
                  height: 40, 
                  borderRadius: '50%', // Circle shape
                  backgroundColor: 'rgb(236,239,253)', // Change to desired color
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7C76E7', // Icon color
                }}
              >
               {card.icon}
              </Box>
            <Box sx={{flex:1}}>
              <Typography variant="h6" component="div" sx={{fontSize:'20px'}} >
                {card.title}
              </Typography>
              <Typography variant="h5" color="black" sx={{fontSize:'30px'}}>
                {card.description}
              </Typography>
            </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    <Box sx={{ width:"315%",mt: 4}}>
      {renderComponent()}
    </Box>
    </Box>
    <Box sx={{ display: 'flex', mt: 4, gap: 2, mr: '20%', }}>
      <Box sx={{width: '50%', display: 'flex', alignItems: 'stretch' }}>
        <Meeting />
      </Box>
      <Box sx={{ width: '50%', display: 'flex', alignItems: 'stretch' }}>
        <OverTime/>
      </Box>
    </Box>
    <Box sx={{ display: 'flex' ,mt: 4,gap: 2, }}>
      <Box sx={{ flex: 0.45, display: 'flex', alignItems: 'stretch' }}>
        <Meeting />
      </Box>
      <Box  sx={{ flex: 0.55, display: 'flex', alignItems: 'stretch' }}>
        <Meeting/>
      </Box>
    </Box>
    <Box sx={{ mt: 4 }}>
      <Announcement/>
    </Box>
    </>
  );
}