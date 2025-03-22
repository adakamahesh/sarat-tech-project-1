import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, MenuItem, Select, InputLabel, FormControl, Typography,Button } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Import all component views
import Reguitment from './Reguitment';
import BA from './BA';
import KlArchitech from './KlArchitech';
import New from './New';
import Demo from './Demo';
import Probal from './Probal';
import Pzda from './Pzda';
import Manager from './Manager';
import AiDeveloper from './AiDeveloper';
import HiringNewDataAnalysts from './HiringNewDataAnalysts';
import WebDeveloper from './WebDeveloper';
import SoftwareEngineer from './SoftwareDeveloper';
import HRManager from './HRManager';
import SalesManager from './SalesManager';

/* 
  Styling the Accordion component using MUI's styled API.
  This ensures the accordions have proper borders and a cleaner look.
*/
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': { borderBottom: 0 },
  '&::before': { display: 'none' }, // Removes the default MUI Accordion indicator
}));

/* 
  Custom styling for Accordion Summary (Header section).
  This dynamically changes the expand/collapse icon.
*/
const AccordionSummary = styled((props) => {
  const { expanded } = props;
  return <MuiAccordionSummary expandIcon={expanded ? <RemoveIcon /> : <AddIcon />} {...props} />;
})(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)', // Light gray background
  flexDirection: 'row-reverse', // Makes the icon appear on the right side
  [`& .${accordionSummaryClasses.content}`]: { marginLeft: theme.spacing(1) },
}));

// Styled Accordion Details section
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)', // Adds a top border for separation
}));

export default function CustomizedAccordions() {
  // State to track which accordion panel is expanded
  const [expanded, setExpanded] = React.useState(false);
  
  // State to track search query
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // State to track filter selection
  const [filter, setFilter] = React.useState("");

  /* 
    Function to handle accordion expansion.
    If a panel is clicked, it sets that panel as expanded.
  */
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  /* 
    Function to handle search input change.
    Updates `searchQuery` state and converts the input to lowercase for case-insensitive matching.
  */
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  /* 
    Function to handle filter selection.
    Updates the `filter` state based on dropdown selection.
  */
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  /* 
    Array of accordion items with their corresponding components.
    Each item has:
    - `id`: Unique identifier
    - `title`: Display name of the accordion
    - `category`: Used for filtering (Recruitment, Developer, Manager)
    - `component`: Corresponding React component for each section
  */
  const accordionData = [
    { id: "panel1", title: "Recruitment", category: "Recruitment", component: <Reguitment /> },
    { id: "panel2", title: "BA", category: "Developer", component: <BA /> },
    { id: "panel3", title: "Kl Architech", category: "Manager", component: <KlArchitech /> },
    { id: "panel4", title: "New", category: "Developer", component: <New /> },
    { id: "panel5", title: "Demo", category: "Recruitment", component: <Demo /> },
    { id: "panel6", title: "Prob", category: "Manager", component: <Probal /> },
    { id: "panel7", title: "Pzda", category: "Recruitment", component: <Pzda /> },
    { id: "panel8", title: "Manager", category: "Manager", component: <Manager /> },
    { id: "panel9", title: "AI Developer", category: "Developer", component: <AiDeveloper /> },
    { id: "panel10", title: "Hiring New Data Analysts", category: "Recruitment", component: <HiringNewDataAnalysts /> },
    { id: "panel11", title: "Web Developer", category: "Developer", component: <WebDeveloper /> },
    { id: "panel12", title: "Software Engineer", category: "Developer", component: <SoftwareEngineer /> },
    { id: "panel13", title: "HR Manager", category: "Manager", component: <HRManager /> },
    { id: "panel14", title: "Sales Manager", category: "Manager", component: <SalesManager /> },
  ];

  /* 
    Filtering Logic:
    1. If a filter is selected, only show items matching the selected category.
    2. Search is applied on top of the filtered results.
  */
  const filteredData = accordionData
    .filter((item) => !filter || item.category === filter) // Apply category filter
    .filter((item) => item.title.toLowerCase().includes(searchQuery)); // Apply search filter

  return (
    <div>
      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        {/* Page Heading */}
        <Typography variant="h5" style={{ marginBottom: 16, fontWeight: 'bold' }}>
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

        {/* Dropdown Filter */}
        <FormControl variant="outlined" size="small" style={{ width: '30%' }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter By">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Recruitment">Recruitment</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
         {/* Create Button */}
         <Button variant="contained" color="primary" sx={{width: '10%',height:'40px'}} onClick={() => console.log("Create New Accordion")}>
          Create
         </Button>
      </div>

      {/* Accordion List - Displays filtered and searched results */}
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