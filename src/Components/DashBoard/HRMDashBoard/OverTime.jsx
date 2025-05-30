import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  { id: "Employee", label: "Employee", minWidth: 170 },
  { id: "EmployeeId", label: "EmployeeId", minWidth: 100 },
  { id: "OverTimeDate", label: "OverTimeDate", minWidth: 100 },
  { id: "Check-In", label: "Check-In", minWidth: 100 },
  { id: "Check-Out", label: "Check-Out", minWidth: 100 },
  { id: "Overtime", label: "Overtime", align: "center", minWidth: 100 },
  { id: "Reason", label: "Reason", align: "center", minWidth: 100 },
  { id: "Action", label: "Action", align: "center", minWidth: 100 },
];

function createData(Employee, Overtime) {
  return { Employee, Overtime };
}

const rows = [
  createData('Mason Diaz', '01:00'),
  createData('Riley Taylor', '01:00'),
  createData('Sofia Howard', '01:00'),
  createData('William Hughes', '01:00'),
  createData('Adam Luis', '01:00'),
  createData('Mason Diaz', '01:00'),
  createData('Riley Taylor', '01:00'),
  createData('Sofia Howard', '01:00'),
  createData('William Hughes', '01:00'),
  createData('Adam Luis', '01:00'),
  createData('Mason Diaz', '01:00'),
  createData('Riley Taylor', '01:00'),
  createData('Sofia Howard', '01:00'),
  createData('William Hughes', '01:00'),
  createData('Adam Luis', '01:00'),
];

const ActionCell = ({ onApprove, onReject }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
    <IconButton
      aria-label="approve"
      sx={{
        backgroundColor: '#71F27D',
        color: 'white',
        width: 75,
        height: 25,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: '#71F27D',
        },
      }}
      onClick={onApprove}
    >
      <CheckIcon />
    </IconButton>
    <IconButton
      aria-label="reject"
      sx={{
        backgroundColor: '#F29087',
        color: 'white',
        width: 75,
        height: 25,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: '#F29087',
        },
      }}
      onClick={onReject}
    >
      <CloseIcon />
    </IconButton>
  </div>
);

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApprove = () => {
    alert('Approved overtime successfully');
  };

  const handleReject = () => {
    alert('Rejected overtime');
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" sx={{
        p: 2,
        backgroundColor: '#F5F5F5',
        fontWeight: 'bold',
        fontSize: { xs: '16px', sm: '18px', md: '20px' },
      }}>
        Over Time To Approve
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: "#fff",
                    backgroundColor: '#93A0B4',
                  }}
                  sx={{
                    position: column.id === 'Employee' ? 'sticky' : 'static',
                    left: column.id === 'Employee' ? 0 : undefined,
                    zIndex: column.id === 'Employee' ? 1100 : undefined,
                    fontSize: { xs: '14px', sm: '16px', md: '20px' },
                    padding: { xs: '8px', sm: '12px', md: '16px' },
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          fontSize: { xs: '12px', sm: '14px', md: '16px' },
                          padding: { xs: '8px', sm: '12px', md: '16px' },
                          position: column.id === 'Employee' ? 'sticky' : 'static',
                          left: column.id === 'Employee' ? 0 : undefined,
                          zIndex: column.id === 'Employee' ? 1000 : undefined,
                        }}
                      >
                        {column.id === 'Action' ? (
                          <ActionCell onApprove={handleApprove} onReject={handleReject} />
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ padding: { xs: '8px', sm: '12px' } }}
      />
    </Paper>
  );
}