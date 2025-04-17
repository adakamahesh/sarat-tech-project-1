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
                  xs: '16px',   // small screens
                  sm: '18px',   // medium screens
                  md: '22px',   // large screens
                  lg: '25px',   // extra large
                },
                fontWeight: 'bold',
                background:'#1976d2',
                color: 'white',
                textAlign: {
                  xs: 'center',
                  sm: 'left'
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