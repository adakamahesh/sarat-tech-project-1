import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Button,Card,CardContent,Typography,Dialog,
} from '@mui/material';
import { Avatar } from '@mui/material';

function createData(id, Employee, Email, Phone, BadgeId, JobPosition, Department, shift , WorkEmail, DateOfJoining) {
  return { id, Employee, Email, Phone, BadgeId, JobPosition, Department, shift, WorkEmail, DateOfJoining };
}

const initialRows = [
  createData(1, 'Mahesh', 'adakamahesh@gmail.com', 9700784065, 501, "FrontEnd Developer", 'IT Dept', "Day Shift", "amb@gmail.com", "2025-01-28"),
  createData(2, 'Vasu', 'vasu@gmail.com', 9700784065, 502, "Backend Developer", 'IT Dept', "Night Shift", "vasu@gmail.com", "2024-12-15"),
  createData(3, 'Praveen', 'praveen@gmail.com', 9700784065, 503, "UI/UX Designer", 'Design', "Day Shift", "praveen@gmail.com", "2024-10-10"),
  createData(4, 'Mahesh', 'adakamahesh@gmail.com', 9700784065, 504, "FrontEnd Developer", 'IT Dept', "Day Shift", "amb@gmail.com", "2025-01-28"),
  createData(5, 'Vasu', 'vasu@gmail.com', 9700784065, 505, "Backend Developer", 'IT Dept', "Night Shift", "vasu@gmail.com", "2024-12-15"),
  createData(6, 'Praveen', 'praveen@gmail.com', 9700784065, 506, "UI/UX Designer", 'Design', "Day Shift", "praveen@gmail.com", "2024-10-10"),
  createData(7, 'Mahesh', 'adakamahesh@gmail.com', 9700784065, 507, "FrontEnd Developer", 'IT Dept', "Day Shift", "amb@gmail.com", "2025-01-28"),
  createData(8, 'Vasu', 'vasu@gmail.com', 9700784065, 508, "Backend Developer", 'IT Dept', "Night Shift",  "vasu@gmail.com", "2024-12-15"),
  createData(9, 'Praveen', 'praveen@gmail.com', 9700784065, 509, "UI/UX Designer", 'Design', "Day Shift",  "praveen@gmail.com", "2024-10-10"),
];

export default function EmployeeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('DateOfJoining');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [newEmployee, setNewEmployee] = React.useState({
    Employee: '', Email: '', Phone: '',BadgeId:'', JobPosition: '',Department:'',shift:'', WorkEmail:'', DateOfJoining: ''
  });

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
  const handleClose = () => setOpen(false);

  const handleAddEmployee = () => {
    if (newEmployee.Employee && newEmployee.Email) {
      setRows([...rows, createData(rows.length + 1, newEmployee.Employee, newEmployee.Email, newEmployee.Phone, rows.length + 500, newEmployee.JobPosition, 'IT Dept', "Day Shift", "Office", 'Mahii', 'Sarat Tech', newEmployee.Email, newEmployee.DateOfJoining)]);
      setNewEmployee({ Employee: '', Email: '', Phone: '',BadgeId:'', JobPosition: '',Department:'',shift:'', WorkEmail:'', DateOfJoining: '' });
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.JobPosition === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
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
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>BadgeId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Job Position</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}> WorkEmail</TableCell>
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
                  <TableCell sx={{ textAlign: 'center' }}>{row.BadgeId}</TableCell>
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
                  <TableCell sx={{ textAlign: 'center' }}>{row.WorkEmail}</TableCell>
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
      <Dialog open={open} onClose={handleClose}  maxWidth="sm" fullWidth>
        <Card sx={{ p: 2, minWidth: 300 }}>
          <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Typography variant="h6">Add Employee</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField name="Employee" label="Employee Name" variant="outlined" size="small" value={newEmployee.Employee} onChange={handleInputChange} />
              <TextField name="Email" label="Email" variant="outlined" size="small" value={newEmployee.Email} onChange={handleInputChange} />
              <TextField name="Phone" label="Phone" variant="outlined" size="small" value={newEmployee.Phone} onChange={handleInputChange} />
              <TextField name="BadgeId" label="BadgeId" variant="outlined" size="small" value={newEmployee.BadgeId} onChange={handleInputChange} />
              <TextField name="JobPosition" label="JobPosition" variant="outlined" size="small" value={newEmployee.JobPosition} onChange={handleInputChange} />
              <TextField name="Department" label="Department" variant="outlined" size="small" value={newEmployee.Department} onChange={handleInputChange} />
              <TextField name="shift" label="shift" variant="outlined" size="small" value={newEmployee.shift} onChange={handleInputChange} />
              <TextField name="WorkEmail" label="WorkEmail" variant="outlined" size="small" value={newEmployee.WorkEmail} onChange={handleInputChange} />
              <TextField name="DateOfJoining" label="Date of Joining" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} value={newEmployee.DateOfJoining} onChange={handleInputChange} />
              <Button variant="contained" onClick={handleAddEmployee}>Add Employee</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}