import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Paper, TextField, MenuItem,
  Button, Typography, Dialog, Avatar
} from '@mui/material';
import axios from 'axios';
import CreateEmployee from './CreateEmployee';

export default function EmployeeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('DateOfJoining');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://192.168.1.49:8084/api/employees/active');
      const formatted = response.data.map((emp, index) => ({
        id: index + 1,
        Employee: `${emp.firstName} ${emp.lastName}`,
        Email: emp.emailId,
        Phone: emp.phoneNumber,
        EmployeeId: emp.employeeId,
        JobPosition: emp.designation,
        Department: emp.departmentName || '—',
        shift: emp.shiftType ? `${emp.shiftType} (${emp.shiftStartTime} - ${emp.shiftEndTime})` : '—',
        DateOfJoining: emp.dateOfJoining,
      }));
      setRows(formatted);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    fetchEmployees(); // refresh data after new employee added
  };

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.JobPosition === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="h6">Employee</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField select label="Filter by Job Position" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.JobPosition))].map((job) => (
              <MenuItem key={job} value={job}>{job}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleOpen}>Create</Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Employee ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Job Position</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'DateOfJoining'} direction={order} onClick={() => handleRequestSort('DateOfJoining')}>
                    Date of Joining
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
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
                  <TableCell sx={{ textAlign: 'center' }}>{row.Email}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Phone}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.JobPosition}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Department}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.shift}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.DateOfJoining}</TableCell>
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

      {/* Create Employee Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <CreateEmployee onClose={handleClose} />
      </Dialog>
    </Box>
  );
}