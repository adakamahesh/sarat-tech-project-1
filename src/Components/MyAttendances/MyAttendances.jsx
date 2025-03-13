import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Typography} from '@mui/material';
import { Avatar } from '@mui/material';

function createData(id,EmployeeId, Employee, Date, Day, CheckIn, InDate, Checkout, OutDate , Shift, MinHours,AtWork,PendingHour,OverTime) {
  return {id,EmployeeId, Employee, Date, Day, CheckIn, InDate, Checkout, OutDate , Shift, MinHours,AtWork,PendingHour,OverTime };
}

const initialRows = [
  createData(1,501, 'Mahesh', '13-03-2025', 'Thursday', "10:30AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(2,502, 'Vasu', '13-03-2025', 'Thursday', "10:20AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(3,503, 'Praveen', '13-03-2025', 'Thursday', "10:15AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(4,504, 'Mahesh', '13-03-2025', 'Thursday', "10:00AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(5,505, 'Vasu', '13-03-2025', 'Thursday', "10:05AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(6,506, 'Praveen', '13-03-2025', 'Thursday', "10:00AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(7,507, 'Mahesh', '13-03-2025', 'Thursday', "10:15AM", '13-03-2025', "06:30PM", "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(8,508, 'Vasu', '13-03-2025', 'Thursday', "10:20AM", '13-03-2025', "06:30PM",  "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
  createData(9,509, 'Praveen', '13-03-2025', 'Thursday', "10:30AM", '13-03-2025', "06:30PM",  "13-03-2025", "Regular Shift",'08:10','06:10','01:50','00:10'),
];

export default function EmployeeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('DateOfJoining');
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
    (filter ? row.Date === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '150%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:90, mb: 2 }}>
          <Typography variant="h6">My Attendances</Typography>
          <TextField select label="Filter by Date" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.Date))].map((job) => (
              <MenuItem key={job} value={job}>{job}</MenuItem>
            ))}
          </TextField>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EmployeeId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Day</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Check-In</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>InDate</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Check-Out</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>OutDate</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Shift</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Min Hours</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>At Work</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>PendingHour</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>OverTime</TableCell>
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
                  <TableCell sx={{ textAlign: 'center' }}>{row.Date}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Day}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckIn}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.InDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Checkout}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.OutDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Shift}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.MinHours}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.AtWork}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.PendingHour}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.OverTime}</TableCell>
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