import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonIcon from '@mui/icons-material/Person';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HailIcon from '@mui/icons-material/Hail';
import HiringPipline from "./HiringPipline";
import Bargraph from "./Bargraph";

export default function HRMDashboard() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [dashboardData, setDashboardData] = React.useState({
    totalVacancies: 0,
    totalApplied: 0,
    hiredCandidates: 0
  });

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [vacancyRes, appliedRes, hiredRes] = await Promise.all([
        axios.get("http://192.168.1.49:8084/recruitment/job_postings/total-vacancy"),
        axios.get("http://192.168.1.49:8084/recruitment/job_postings/not-hired-applicant-count"),   // or your actual applicant count endpoint
        axios.get("http://192.168.1.49:8084/recruitment/job_postings/hired-applicant-count")
      ]);

      setDashboardData({
        totalVacancies: vacancyRes.data,
        totalApplied: appliedRes.data,
        hiredCandidates: hiredRes.data
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const cards = [
    {
      id: 1,
      icon: <PersonIcon />,
      title: 'Total Vacancies',
      description: dashboardData.totalVacancies,
      backgroundColor: "#4CAF50",
    },
    {
      id: 2,
      icon: <HailIcon />,
      title: 'Total Applied',
      description: dashboardData.totalApplied,
      backgroundColor: "#2196F3",
    },
    {
      id: 3,
      icon: <WorkOutlineIcon />,
      title: 'Hired Candidates',
      description: dashboardData.hiredCandidates,
      backgroundColor: "orange",
    },
  ];

  return (
    <>
      {/* Card Grid */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
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
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
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
                    mx: { xs: 'auto', sm: 0 },
                  }}
                >
                  {card.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: '20px' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h5" color="black" sx={{ fontSize: '30px' }}>
                    {card.description}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mt: 4,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <HiringPipline />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Bargraph />
        </Box>
      </Box>
    </>
  );
}