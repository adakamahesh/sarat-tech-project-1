import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { RecruitmentPipeline } from "../../../mocks_data/RecruitmentPiplineMockData/RecruitmentPipline";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { borderBottom: 0 },
  "&::before": { display: "none" },
}));

const AccordionSummary = styled((props) => {
  const { expanded } = props;
  return (
    <MuiAccordionSummary
      expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
      {...props}
    />
  );
})(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.content}`]: { marginLeft: theme.spacing(1) },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [accordionData, setAccordionData] = React.useState(
    RecruitmentPipeline
  );
  const [newAccordionTitle, setNewAccordionTitle] = React.useState("");
  const [showCreateCard, setShowCreateCard] = React.useState(false);
  const [createForms, setCreateForms] = React.useState({});

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCreateNewAccordion = () => {
    if (newAccordionTitle.trim()) {
      const newAccordion = {
        id: `new-${accordionData.length + 1}`,
        title: newAccordionTitle,
        component: <Typography>New Accordion Content</Typography>,
      };
      setAccordionData([...accordionData, newAccordion]);
      setNewAccordionTitle("");
      setShowCreateCard(false);
    }
  };

  const toggleCreateForm = (id) => {
    setCreateForms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = accordionData
    .filter((item) => !filter || item.category === filter)
    .filter((item) => item.title.toLowerCase().includes(searchQuery));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Onboarding View
        </Typography>
        <TextField label="Search" variant="outlined" size="small" onChange={handleSearch} style={{ width: "30%" }} />
        <FormControl variant="outlined" size="small" style={{ width: "30%" }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter By">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Recruitment">Recruitment</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" sx={{ width: "10%", height: "40px" }} onClick={() => setShowCreateCard(true)}>
          Create
        </Button>
      </div>

      {showCreateCard && (
        <Card sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6">Create New Accordion</Typography>
            <TextField
              fullWidth
              label="Accordion Title"
              variant="outlined"
              size="small"
              value={newAccordionTitle}
              onChange={(e) => setNewAccordionTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateNewAccordion} sx={{ marginRight: 2 }}>
              Add Accordion
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowCreateCard(false)}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {filteredData.map(({ id, title, component }) => (
        <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)}>
          <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expanded={expanded === id}>
            <Typography component="span">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === id && (
              <>
                {component}
                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={() => toggleCreateForm(id)}>
                  Create
                </Button>
                {createForms[id] && (
                  <Card sx={{ marginTop: 2, padding: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Add New Accordion</Typography>
                      <TextField fullWidth label="Entry Title" variant="outlined" size="small" sx={{ marginBottom: 2 }} />
                      <Button variant="contained" color="primary" onClick={handleCreateNewAccordion}>
                        Add Accordion
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}