import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Button,Card,CardContent,Typography,Dialog,
} from '@mui/material';
import { Avatar } from '@mui/material';

function createData(id, Employee, RequestedShift, CurrentShift, BadgeId, Designation, RequestedDate, RequestStart , RequestTill, Description) {
  return { id, Employee, RequestedShift, CurrentShift, BadgeId, Designation, RequestedDate, RequestStart, RequestTill, Description };
}

const initialRows = [
  createData(1, 'Mahesh', 'Regular Shift', 'Night Shift', 501, "FrontEnd Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(2, 'Vasu', 'Regular Shift', 'Morning Shift', 502, "Backend Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(3, 'Praveen', 'Night Shift', 'Regular Shift', 503, "UI/UX Designer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(4, 'Mahesh', 'Regular Shift', 'Night Shift', 504, "FrontEnd Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(5, 'Vasu', 'Regular Shift', 'Morning Shift', 505, "Backend Developer", '07-03-2025', "15-3-25", "15-4-25.com", "Work"),
  createData(6, 'Praveen', 'Morning Shift', 'Regular Shift', 506, "UI/UX Designer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(7, 'Mahesh', 'Regular Shift', 'Night Shift', 507, "FrontEnd Developer", '07-03-2025', "15-3-25", "15-4-25", "Work"),
  createData(8, 'Vasu', 'Regular Shift', 'Morning Shift', 508, "Backend Developer", '07-03-2025', "15-3-25",  "15-4-25", "Work"),
  createData(9, 'Praveen', 'Regular Shift','Morning Shift', 509, "UI/UX Designer", '07-03-2025', "15-3-25",  "15-4-25", "Work"),
];

export default function EmployeeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [newEmployee, setNewEmployee] = React.useState({
    Employee: '', RequestedShift: '', CurrentShift: '',BadgeId:'', Designation: '',RequestedDate:'',RequestStart:'', RequestTill:'', Description: ''
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
      setRows([...rows, createData(rows.length + 1, newEmployee.Employee, newEmployee.RequestedShift, newEmployee.CurrentShift, rows.length + 500, newEmployee.Designation, newEmployee.Email, newEmployee.Description)]);
      setNewEmployee({ Employee: '', RequestedShift: '', CurrentShift: '',BadgeId:'', Designation: '',RequestedDate:'',RequestStart:'', RequestTill:'', Description: '' });
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.Designation === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
          <Typography variant="h6">Shift Request</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField select label="Filter by Job Position" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.Designation))].map((job) => (
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
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Requested Shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Current Shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Requested Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Request Start</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}> Request Till</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}> Description</TableCell>
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
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestedShift}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CurrentShift}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Designation}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestedDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestStart}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.RequestTill}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Description}</TableCell>
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
              <TextField name="RequestedShift" label="RequestedShift" variant="outlined" size="small" value={newEmployee.RequestedShift} onChange={handleInputChange} />
              <TextField name="CurrentShift" label="CurrentShift" variant="outlined" size="small" value={newEmployee.CurrentShift} onChange={handleInputChange} />
              <TextField name="BadgeId" label="BadgeId" variant="outlined" size="small" value={newEmployee.BadgeId} onChange={handleInputChange} />
              <TextField name="Designation" label="Designation" variant="outlined" size="small" value={newEmployee.Designation} onChange={handleInputChange} />
              <TextField name="RequestedDate" label="RequestedDate" variant="outlined" size="small" value={newEmployee.RequestedDate} onChange={handleInputChange} />
              <TextField name="RequestStart" label="RequestStart" variant="outlined" size="small" value={newEmployee.RequestStart} onChange={handleInputChange} />
              <TextField name="RequestTill" label="RequestTill" variant="outlined" size="small" value={newEmployee.RequestTill} onChange={handleInputChange} />
              <TextField name="Description" label="Description" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} value={newEmployee.Description} onChange={handleInputChange} />
              <Button variant="contained" onClick={handleAddEmployee}>Add Employee</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}