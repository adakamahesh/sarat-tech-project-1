import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  TableSortLabel, Paper, TextField, Typography, Avatar, Autocomplete
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function createData(id,  Date, CheckIn, SLNO, CheckOut, WorkHours, Status,Employee) {
  return { id,  Date, CheckIn, SLNO, CheckOut, WorkHours, Status,Employee };
}

const initialRows = [
  createData(1, '13-3-25', "10:30AM", 501, "6:30PM", '13-3-25',"pending",'Mahesh'),
  createData(2,  '13-3-25', "9:30AM", 502, "6:30PM", '13-3-25',"pending",'Mahesh'),
  createData(3,  '13-3-25', "10:30AM", 503, "6:30PM", '13-3-25',"pending",'Mahesh'),
  createData(4,  '13-3-25', "10:45AM", 504, "6:30PM", '13-3-25',"pending",'Mahesh'),
  createData(5,  '13-3-25', "10:30AM", 505, "6:30PM", '13-3-25',"pending",'Vasu'),
  createData(6,  '13-3-25', "10:00AM", 506, "6:30PM", '13-3-25',"pending",'Vasu'),
  createData(7,  '13-3-25', "10:30AM", 507, "6:30PM", '13-3-25',"pending",'Vasu'),
  createData(8,  '13-3-25', "10:15AM", 508, "6:30PM", '13-3-25',"pending",'Vasu'),
  createData(9,  '13-3-25', "10:30AM", 509, "6:30PM", '13-3-25',"pending",'Vasu'),
];

export default function EmployeeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Employee');
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  
  // Set default date to current month and year
  const currentDate = new Date();
  const defaultDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const [selectedDate, setSelectedDate] = React.useState(defaultDate);

  const uniqueEmployees = [...new Set(initialRows.map(row => row.Employee))];

  const handleEditChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const filteredRows = search
    ? rows.filter((row) => row.Employee.toLowerCase().includes(search.toLowerCase()))
    : rows;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        {/* Filter/Search Section */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, minWidth: 180 }}>
            Attendance Activity
          </Typography>

          {/* Searchable Dropdown */}
          <Autocomplete
            options={uniqueEmployees}
            value={search}
            onInputChange={(e, value) => setSearch(value)}
            renderInput={(params) => (
              <TextField {...params} label="Search Employee" variant="outlined" size="small" />
            )}
            sx={{ minWidth: 250 }}
            clearOnEscape
            freeSolo
          />
          <Typography sx={{ flexGrow: 1, minWidth: 180 }}>
            EmployeeId: 501
          </Typography> 

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Select Month and Year"
              inputFormat="MM/yyyy" // Format to show only month and year
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              renderInput={(params) => <TextField {...params} size="small" />}
              views={['year', 'month']} // Restrict the picker to year and month
            />
          </LocalizationProvider>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>SL.NO</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Check In</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Check Out</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Work Hours</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.SLNO}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Date}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckIn}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckOut}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.WorkHours}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
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