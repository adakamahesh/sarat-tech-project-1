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
                <TableCell align="left" colSpan={5} sx={{ fontSize: '25px' }}>
                    On Leave
                </TableCell>
            </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}