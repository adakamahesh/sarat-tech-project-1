import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function createData(JobPosition, Initial, Test, Interview, Hired, Cancelled) {
  return { JobPosition, Initial, Test, Interview, Hired, Cancelled };
}

const rows = [
  createData("Software Engineer", 10, 8, 6, 4, 2),
  createData("Frontend Developer", 12, 9, 7, 5, 3),
  createData("Backend Developer", 15, 12, 9, 6, 3),
  createData("Full Stack Developer", 8, 6, 5, 3, 2),
  createData("DevOps Engineer", 7, 5, 4, 2, 1),
  createData("UI/UX Designer", 10, 7, 6, 4, 2),
  createData("QA Engineer", 11, 8, 7, 5, 2),
  createData("Data Scientist", 9, 6, 5, 3, 1),
];

export default function BasicTable() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Current Hiring Pipeline
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#fff",
                  zIndex: 1000,
                }}
              >
                Job Position
              </TableCell>
              <TableCell align="center">Initial</TableCell>
              <TableCell align="center">Test</TableCell>
              <TableCell align="center">Interview</TableCell>
              <TableCell align="center">Hired</TableCell>
              <TableCell align="center">Cancelled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 999,
                  }}
                >
                  {row.JobPosition}
                </TableCell>
                <TableCell align="center">{row.Initial}</TableCell>
                <TableCell align="center">{row.Test}</TableCell>
                <TableCell align="center">{row.Interview}</TableCell>
                <TableCell align="center">{row.Hired}</TableCell>
                <TableCell align="center">{row.Cancelled}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}