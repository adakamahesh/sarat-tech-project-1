import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HailIcon from '@mui/icons-material/Hail';
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MovingIcon from "@mui/icons-material/Moving";

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
    title: 'On Leave Employee',
    description: '55',
  },
  {
    id: 3,
    icon:<WorkOutlineIcon/>,
    title: 'Total Vacancies',
    description: '37',
  },
  {
    id: 4,
    icon:<Diversity3Icon/>,
    title: 'New joining Today',
    description: '1',
  },
  {
    id: 5,
    icon:<Diversity3Icon/>,
    title: 'New Joining This Week',
    description: '20',
  },
  {
    id: 6,
    icon:<MovingIcon/>,
    title: 'Total Strength Today',
    description: '258',
  },

];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 2,
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
  );
}

export default SelectActionCard;