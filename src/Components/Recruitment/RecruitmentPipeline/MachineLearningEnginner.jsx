import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';

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
  const [selectedRows, setSelectedRows] = React.useState({});
  const [selectAll, setSelectAll] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prev) => {
      const newSelectedRows = { ...prev, [index]: !prev[index] };
      setSelectAll(Object.values(newSelectedRows).every((val) => val));
      return newSelectedRows;
    });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(
      newSelectAll ? Object.fromEntries(tableData.map((_, index) => [index, true])) : {}
    );
  };

  const tableHeaders = ["Candidate", "Email", "Job Position", "Mobile", "Joining Date", "Portal Status", "Task Status", "Stage", "Options", "+ Task"];

  const tableData = [
    { Candidate: "John Doe", Email: "john@example.com", JobPosition: "Software Engineer", Mobile: "+1234567890", JoiningDate: "01-01-2025", PortalStatus: "Active", TaskStatus: "Pending", Stage: "Interview" },
    { Candidate: "Jane Smith", Email: "jane@example.com", JobPosition: "Project Manager", Mobile: "+9876543210", JoiningDate: "05-03-2025", PortalStatus: "Inactive", TaskStatus: "Completed", Stage: "Hired" }
  ];

  const accordionData = [
    { id: "panel1", title: "Applied" },
    { id: "panel2", title: "Initial" },
    { id: "panel3", title: "Interview" },
    { id: "panel4", title: "SkillTest" },
    { id: "panel5", title: "Onboarding" },
    ];

  return (
    <div>
      {accordionData.map(({ id, title }) => (
        <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)}>
          <AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`} expanded={expanded === id}>
            <Typography component="span">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Table stickyHeader sx={{ border: "1px solid #ddd", margin: "10px", borderRadius: "5px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox checked={selectAll} onChange={handleSelectAll} />
                    </TableCell>
                    {tableHeaders.map((header, index) => (
                      <TableCell key={index} sx={{ fontWeight: "bold", textAlign: "center" }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell>
                        <Checkbox checked={!!selectedRows[rowIndex]} onChange={() => handleRowSelect(rowIndex)} />
                      </TableCell>
                      {tableHeaders.map((header, colIndex) => (
                        <TableCell key={colIndex} textAlign="center">
                          {row[header] || "-"}
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