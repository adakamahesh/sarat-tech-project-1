import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(title, date, time) {
  return { title, date, time };
}

const rows = [
  createData('Project Kickoff', 'June 1, 2024', '10:00 AM'),
  createData('Weekly Team Sync', 'June 5, 2024', '02:00 PM'),
  createData('Client Presentation', 'June 10, 2024', '11:00 AM'),
  createData('Monthly Review', 'June 15, 2024', '03:00 PM'),
  createData('Weekly Review', 'June 20, 2024', '11:00 AM'),
  createData('Yearly Meeting', 'June 22, 2024', '09:00 AM'),
  createData('Strategy Planning', 'June 28, 2024', '02:00 PM'),
];

export default function AccessibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              colSpan={5}
              sx={{
                fontSize: '25px',
                backgroundColor: '#1976d2',  // Add background color for the title row
                color: 'white',  // White text for contrast
              }}
            >
              Meeting Schedule
            </TableCell>
          </TableRow>
          <TableRow sx={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <TableCell
              sx={{
                fontSize: '20px',
                backgroundColor: '#f5f5f5',  // Light gray background for header row
                fontWeight: 'bold',
              }}
            >
              Meeting Title
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: '20px',
                backgroundColor: '#f5f5f5',  // Same background for date header
                fontWeight: 'bold',
              }}
            >
              Meeting Date
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: '20px',
                backgroundColor: '#f5f5f5',  // Same background for time header
                fontWeight: 'bold',
              }}
            >
              Meeting Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}