// Import React library
import * as React from "react";

// Import styled function from Material-UI for custom styling
import { styled } from "@mui/material/styles";

// Import necessary Material-UI components
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
  Box,
} from "@mui/material";

// Import Material-UI Accordion components
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// Import icons for expanding/collapsing accordion
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Import mock data for recruitment pipeline
import { RecruitmentPipeline } from "../../../mocks_data/RecruitmentPiplineMockData/RecruitmentPipline";

// Styled Accordion component
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { borderBottom: 0 },
  "&::before": { display: "none" },
}));

// Styled AccordionSummary component
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

// Styled AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

// Main component function
export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [accordionData, setAccordionData] = React.useState(RecruitmentPipeline);
  const [newAccordionTitle, setNewAccordionTitle] = React.useState("");
  const [showCreateCard, setShowCreateCard] = React.useState(false);
  const [createForms, setCreateForms] = React.useState({});
  const [subRecruitment, setSubRecruitment] = React.useState({ id: "", title: "" });

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

  const handleCreateSubRecruitment = () => {
    if (subRecruitment.value?.trim()) {
      const newAccordion = {
        id: `panel-${filteredData.length + 1}`,
        title: subRecruitment.value,
      };
      const updatedList = accordionData.map((item) => {
        if (item.id === subRecruitment.id) {
          item.subAccordionList.push(newAccordion);
        }
        return item;
      });
      setAccordionData(updatedList);
      setSubRecruitment({});
      setShowCreateCard(false);
    }
  };

  const toggleCreateForm = (id) => {
    setCreateForms((prev) => ({ ...prev, [id]: !prev[id] }));
    setSubRecruitment({ ...subRecruitment, id: id });
  };

  const filteredData = accordionData
    .filter((item) => !filter || item.category === filter)
    .filter((item) => item.title.toLowerCase().includes(searchQuery));

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Recruitment Pipeline
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          sx={{ width: { xs: "100%", sm: "30%" } }}
        />
        <FormControl variant="outlined" size="small" sx={{ width: { xs: "100%", sm: "30%" } }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter By">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Recruitment">Recruitment</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: { xs: "100%", sm: "10%" }, height: "40px" }}
          onClick={() => setShowCreateCard(true)}
        >
          Create
        </Button>
      </Box>

      {/* Create Accordion Form */}
      {showCreateCard && (
        <Card sx={{ mb: 2, p: { xs: 1, sm: 2 } }}>
          <CardContent>
            <Typography variant="h6">Create New Accordion</Typography>
            <TextField
              fullWidth
              label="Accordion Title"
              variant="outlined"
              size="small"
              value={newAccordionTitle}
              onChange={(e) => setNewAccordionTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateNewAccordion} sx={{ mr: 2 }}>
              Add Accordion
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowCreateCard(false)}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Accordions */}
      {filteredData.map(({ id, title, Component, subAccordionList }) => (
        <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)}>
          <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expanded={expanded === id}>
            <Typography component="span">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === id && (
              <>
                {Component ? (
                  <Component key={id} subAccordionList={subAccordionList} />
                ) : (
                  "--"
                )}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => toggleCreateForm(id)}
                >
                  Create
                </Button>
                {createForms[id] && (
                  <Card sx={{ mt: 2, p: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Add New Accordion</Typography>
                      <TextField
                        fullWidth
                        label="Entry Title"
                        variant="outlined"
                        size="small"
                        value={subRecruitment.value}
                        onChange={(e) =>
                          setSubRecruitment({ ...subRecruitment, value: e.target.value })
                        }
                        sx={{ mb: 2 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleCreateSubRecruitment();
                          toggleCreateForm(id);
                        }}
                      >
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
    </Box>
  );
}