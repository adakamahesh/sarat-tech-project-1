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
    <Paper
      sx={{
        padding: { xs: 1, sm: 2 },
        mt: { xs: 2, sm: 4 },
        boxShadow: { xs: "none", sm: 3 },
        borderRadius: 2,
        overflowX: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "16px", sm: "20px" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
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
                  fontSize: { xs: "12px", sm: "14px" },
                }}
              >
                Job Position
              </TableCell>
              {["Initial", "Test", "Interview", "Hired", "Cancelled"].map((header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                >
                  {header}
                </TableCell>
              ))}
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
                    fontSize: { xs: "12px", sm: "14px" },
                  }}
                >
                  {row.JobPosition}
                </TableCell>
                {[row.Initial, row.Test, row.Interview, row.Hired, row.Cancelled].map(
                  (value, idx) => (
                    <TableCell
                      key={idx}
                      align="center"
                      sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                    >
                      {value}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}