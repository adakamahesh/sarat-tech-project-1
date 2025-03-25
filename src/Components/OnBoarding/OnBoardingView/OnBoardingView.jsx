import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { onBoardingAccordionList } from "../../../mocks_data/onBoardingMockData/onboardingMockData";

// Styled Accordion
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

// Styled Accordion Summary
const AccordionSummary = styled((props) => {
  const { expanded } = props;
  return (
    <MuiAccordionSummary
      expandIcon={expanded ? <RemoveIcon /> : <AddIcon />} // Dynamic Icon
      {...props}
    />
  );
})(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const accordionData = onBoardingAccordionList;

  // Filter accordion items based on search
  const filteredData = accordionData.filter(({ title }) =>
    title.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      {/* Filter & Search Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Onboarding View
        </Typography>
        {/* Search Bar */}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          style={{ width: '30%' }}
        />
        
        {/* Dropdown Filter (For future expansion) */}
        <FormControl variant="outlined" size="small" style={{ width: '30%' }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter By">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Recruitment">Recruitment</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Accordions */}
      {filteredData.map(({ id, title, component }) => (
        <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)}>
          <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expanded={expanded === id}>
            <Typography component="span">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{expanded === id && component}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}