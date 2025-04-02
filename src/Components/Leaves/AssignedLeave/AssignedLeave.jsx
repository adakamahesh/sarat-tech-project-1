import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
} from "@mui/material";

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
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const accordionData = [
    { id: "panel1", title: "Krishna Gupta" },
    { id: "panel2", title: "Annual Leave (Staffs)" },
    { id: "panel3", title: "Casual" },
    { id: "panel4", title: "Lop" },
    { id: "panel5", title: "Test G" },
    { id: "panel6", title: "Custom" },
    { id: "panel7", title: "Half Day Leave" },
    { id: "panel8", title: "Kazual" },
    { id: "panel9", title: "Test" },
    { id: "panel10", title: "SL" },
    { id: "panel11", title: "Holi" },
    { id: "panel12", title: "UnPaid-Test" },
    { id: "panel13", title: "Medical Leave" },
    { id: "panel14", title: "Vacalionces" },
    { id: "panel15", title: "Maternity Leave" },
    { id: "panel16", title: "Sick Leave" },
    { id: "panel17", title: "Casual Leave" },
    { id: "panel18", title: "Private Leave" },
  ];

  const tableHeaders = [
    "Employee",
    "Leave Type",
    "Available Days",
    "Carry Forward Days",
    "Total Leave Days",
    "Used Leave Days",
    "Assigned Data",
    "Action",
  ];

  const tableData = [
    { Employee: "John Doe", "Leave Type": "Sick Leave", "Available Days": 5 },
    {
      Employee: "Jane Smith",
      "Leave Type": "Annual Leave",
      "Available Days": 10,
    },
  ];

  const filteredAccordions = accordionData.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          All Assigned  Leaves
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "30%" }}
        />
        <TextField
          select
          label="Filter"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "30%" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Annual Leave">Annual Leave</MenuItem>
          <MenuItem value="Sick Leave">Sick Leave</MenuItem>
        </TextField>
      </div>
      {filteredAccordions.map(({ id, title }) => (
        <Accordion
          key={id}
          expanded={expanded === id}
          onChange={() => setExpanded(expanded === id ? false : id)}
        >
          <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`}>
            <Typography component="span">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table
              stickyHeader
              sx={{
                border: "1px solid #ddd",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header, index) => (
                    <TableCell
                      key={index}
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .filter((row) => !filter || row["Leave Type"] === filter)
                  .map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {tableHeaders.map((header, colIndex) => (
                        <TableCell key={colIndex} textAlign="center">
                          {row[header] || "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
