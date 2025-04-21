import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  TableSortLabel, Paper, TextField, MenuItem, Button, Typography
} from '@mui/material';
import { Avatar } from '@mui/material';

function createData(id, Employee, RequestedShift, CurrentShift, EmployeeId,SLNO, Designation, RequestedDate, RequestStart, RequestTill, Description) {
  return { id, Employee, RequestedShift, CurrentShift, EmployeeId,SLNO, Designation, RequestedDate, RequestStart, RequestTill, Description };
}

const initialRows = [
  createData(1, 'Mahesh', 'Regular Shift', 'Night Shift', 501, "FrontEnd Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(2, 'Vasu', 'Regular Shift', 'Morning Shift', 502, "Backend Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(3, 'Praveen', 'Night Shift', 'Regular Shift', 503, "UI/UX Designer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(4, 'Mahesh', 'Regular Shift', 'Night Shift', 504, "FrontEnd Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(5, 'Vasu', 'Regular Shift', 'Morning Shift', 505, "Backend Developer", '07-03-2025', "15-3-25", "15-4-25.com", "Work"),
  createData(6, 'Praveen', 'Morning Shift', 'Regular Shift', 506, "UI/UX Designer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(7, 'Mahesh', 'Regular Shift', 'Night Shift', 507, "FrontEnd Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(8, 'Vasu', 'Regular Shift', 'Morning Shift', 508, "Backend Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(9, 'Praveen', 'Regular Shift', 'Morning Shift', 509, "UI/UX Designer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
];

export default function ShiftRequst() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.Designation === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 10, mb: 2 }}>
          <Typography variant="h6">Shift Request</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField sx={{width:'30%'}} select label="Filter by Job Position" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.Designation))].map((job) => (
              <MenuItem key={job} value={job}>{job}</MenuItem>
            ))}
          </TextField>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>SLNO</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EmployeeId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Requested Shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Current Shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Requested Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Request Start</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Request Till</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Description</TableCell>
                <TableCell sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  position: 'sticky',
                  right: 0,
                  background: 'white',
                  zIndex: 2
                }}>
                  Confirmation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.SLNO}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.EmployeeId}</TableCell>
                  <TableCell sx={{
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'flex-start'
                  }}>
                    <Avatar sx={{ bgcolor: 'gray' }}>{row.Employee[0]}</Avatar>
                    {row.Employee}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestedShift}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CurrentShift}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Designation}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestedDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestStart}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestTill}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Description}</TableCell>
                  <TableCell sx={{ textAlign: 'center', position: 'sticky', right: 0, background: 'white', zIndex: 1, whiteSpace: 'nowrap' }}>
                    <Button variant="contained" sx={{ bgcolor: 'green', color: 'white', mx: 1 }} onClick={() => alert(`Accepted ${row.EmployeeId}`)}>
                      Accept
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: 'red', color: 'white', mx: 1 }} onClick={() => alert(`Rejected ${row.EmployeeId}`)}>
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}