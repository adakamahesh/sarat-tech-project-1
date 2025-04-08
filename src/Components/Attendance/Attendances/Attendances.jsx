// React & MUI Imports
import * as React from "react";

// MUI styling
import { styled } from "@mui/material/styles";

// Base Accordion components
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// MUI Components
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Checkbox,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";

// Mock data for initial accordion list
import Attendances from "../../../mocks_data/Attendances/Attendances";

// Styled Accordion with custom border and no default before content
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": { borderBottom: 0 },
  "&::before": { display: "none" },
}));

// Customized AccordionSummary with toggle icons
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
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

// AccordionDetails with padding and border
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// Main component
export default function CustomizedAccordions() {
  // State hooks
  const [expanded, setExpanded] = React.useState(false); // Which accordion is expanded
  const [search, setSearch] = React.useState(""); // Search value
  const [filter, setFilter] = React.useState(""); // Dropdown filter
  const [accordionList, setAccordionList] = React.useState(Attendances); // Accordion items
  const [showCreateForm, setShowCreateForm] = React.useState(false); // Whether to show the create form
  const [newTitle, setNewTitle] = React.useState(""); // Title for new accordion

  // Sample table row data
  const tableData = [
    {
      Employee: "John Doe",
      Batch: "A1",
      Date: "2024-04-01",
      Day: "Monday",
      "Check-in": "09:00",
      "In Date": "2024-04-01",
      "Check-out": "18:00",
      "Out Date": "2024-04-01",
      Shift: "Morning",
      WorkType: "Remote",
      "Min Hour": "8h",
      "At Work": "8h",
      "Pending Hour": "0h",
      Overtime: "1h",
    },
  ];

  // Open create accordion card
  const handleCreateAccordion = () => setShowCreateForm(true);

  // Add new accordion to list
  const handleAddAccordion = () => {
    if (!newTitle.trim()) return;
    const newAccordion = {
      id: Date.now(), // Unique ID
      title: newTitle,
      headers: [
        "Employee",
        "Batch",
        "Date",
        "Day",
        "Check-in",
        "In Date",
        "Check-out",
        "Out Date",
        "Shift",
        "WorkType",
        "Min Hour",
        "At Work",
        "Pending Hour",
        "Overtime",
        "Confirmation",
        "Action",
      ],
    };
    setAccordionList((prev) => [...prev, newAccordion]);
    setNewTitle("");
    setShowCreateForm(false);
  };

  // Filter accordions by search input
  const filteredAccordions = accordionList.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle action button events
  const handleConfirm = (row) => alert(`Confirmed for ${row.Employee}`);
  const handleEdit = (row) => alert(`Edit clicked for ${row.Employee}`);
  const handleDelete = (row) => alert(`Delete clicked for ${row.Employee}`);

  return (
    <div style={{ position: "relative" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Attendances
        </Typography>

        {/* Search, Filter, Create Accordion Button */}
        <div style={{ display: "flex", gap: "20px", flex: 1 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            sx={{ width: "40%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            select
            label="Filter"
            variant="outlined"
            size="small"
            value={filter}
            sx={{ width: "40%" }}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Annual Leave">Annual Leave</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={handleCreateAccordion}
            sx={{ whiteSpace: "nowrap" }}
          >
            Create Accordion
          </Button>
        </div>
      </div>

      {/* Create Accordion Form Modal */}
      {showCreateForm && (
        <Card
          sx={{
            width: 400,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
            padding: 2,
            backgroundColor: "#fff",
            boxShadow: 10,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add New Accordion
            </Typography>
            <TextField
              fullWidth
              label="Accordion Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button
                onClick={() => setShowCreateForm(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAddAccordion}>
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Render each accordion */}
      {filteredAccordions.map(({ id, title, headers }) => (
        <Accordion
          key={id}
          expanded={expanded === id}
          onChange={() => setExpanded(expanded === id ? false : id)}
        >
          <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`}>
            <Typography component="span">{title}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div style={{ overflowX: "auto", maxHeight: "400px" }}>
              <Table
                stickyHeader
                sx={{
                  minWidth: 1000,
                  border: "1px solid #ddd",
                  margin: "10px 0",
                  borderRadius: "5px",
                }}
              >
                {/* Table Header */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        position: "sticky",
                        top: 0,
                        background: "#fff",
                        zIndex: 2,
                      }}
                    >
                      Select
                    </TableCell>
                    {headers.map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          position: "sticky",
                          top: 0,
                          background:
                            header === "Confirmation" ? "#e8f5e9" : "#fff",
                          zIndex:
                            header === "Confirmation" || header === "Action"
                              ? 3
                              : 2,
                          ...(header === "Action" && { right: 0 }),
                          ...(header === "Confirmation" && { right: 0 }),
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  {tableData
                    .filter((row) => !filter || row["Leave Type"] === filter)
                    .map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {/* Select checkbox */}
                        <TableCell align="center">
                          <Checkbox />
                        </TableCell>

                        {/* Row data */}
                        {headers.map((header, colIndex) => (
                          <TableCell
                            key={colIndex}
                            align="center"
                            sx={{
                              ...(header === "Action" && {
                                position: "sticky",
                                right: 0,
                                background: "#fff",
                                zIndex: 1,
                              }),
                              ...(header === "Confirmation" && {
                                position: "sticky",
                                right: 0,
                                background: "#e8f5e9",
                                zIndex: 2,
                              }),
                            }}
                          >
                            {/* Render Action or Confirmation buttons, otherwise show cell text */}
                            {header === "Action" ? (
                              <Box display="flex" alignItems="center">
                                <Button
                                  onClick={() => handleEdit(row)}
                                  size="small"
                                  variant="outlined"
                                  sx={{ minWidth: 30, marginRight: 1 }}
                                >
                                  <EditIcon fontSize="small" />
                                </Button>
                                <Button
                                  onClick={() => handleDelete(row)}
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                  sx={{ minWidth: 30, marginRight: 1 }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </Button>
                              </Box>
                            ) : header === "Confirmation" ? (
                              <Button
                                onClick={() => handleConfirm(row)}
                                size="small"
                                variant="contained"
                                color="success"
                                sx={{
                                  minWidth: 50,
                                  height: 25,
                                  borderRadius: "4px",
                                  padding: 0,
                                }}
                              >
                                <CheckIcon />
                              </Button>
                            ) : (
                              row[header] || "-"
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}