import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                fontSize: {
                  xs: '14px',   // Extra small screens
                  sm: '16px',   // Small screens
                  md: '18px',   // Medium screens
                  lg: '20px',   // Large screens
                  xl: '22px',   // Extra large screens
                },
                fontWeight: 'bold',
                background: '#A7B0CA',
                color: 'white',
                textAlign: {
                  xs: 'center',  // Center-align on small screens
                  sm: 'left',    // Left-align on medium and up
                  md: 'left',    // Left-align remains for larger screens
                  lg: 'left',
                  xl: 'left',
                },
                padding: {
                  xs: '8px',    // Smaller padding on mobile
                  sm: '12px',   // Medium padding
                  md: '14px',   // Larger padding on bigger screens
                },
              }}
            >
              Quotation and Answers
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}