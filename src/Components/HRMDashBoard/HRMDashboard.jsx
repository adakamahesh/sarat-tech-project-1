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
// import Absent from "./Absent";

const cards = [
  {
    id: 1,
    icon:<PersonIcon/>,
    title: 'Total Employee',
    description: '313', 
  },
  {
    id: 2,
    icon:<HailIcon/>,
    title: 'Total Presents',
    description: '55',
  },
  {
    id: 3,
    icon:<WorkOutlineIcon/>,
    title: 'Total Absents',
    description: '37',
  },

];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <>
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 2,
        pr: '20%',
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
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
    </Box>
    <Box sx={{ display: 'flex', mt: 4, gap: 2, pr: '20%', }}>
      <Box>
        <Meeting />
      </Box>
      <Box>
        <Meeting />
      </Box>
    </Box>
    <Box sx={{ mt: 4 , pr:'55%'}}>
      <Meeting />
    </Box>
    <Box sx={{ mt: 4 }}>
      <Meeting />
    </Box>
    </>
  );
}

export default SelectActionCard;