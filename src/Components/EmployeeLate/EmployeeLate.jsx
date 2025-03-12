import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Button,Typography,IconButton
} from '@mui/material';
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, Employee,Type, InDate, CheckIn, EmployeeId, CheckOut,OutDate ) {
  return { id, Employee,Type, InDate, CheckIn, EmployeeId, CheckOut,OutDate };
}

const initialRows = [
  createData(1, 'Mahesh',"Late Come", '13-3-25', "10:30AM", 501, "6:30PM", '13-3-25'),
  createData(2, 'Vasu',"Late Come", '13-3-25', "9:30AM", 502, "6:30PM", '13-3-25'),
  createData(3, 'Praveen',"Early Out", '13-3-25',"10:30AM" , 503, "6:30PM", '13-3-25'),
  createData(4, 'Mahesh',"Late Come", '13-3-25', "10:45AM", 504, "6:30PM", '13-3-25'),
  createData(5, 'Vasu', "Early Out",'13-3-25', "10:30AM", 505, "6:30PM", '13-3-25'),
  createData(6, 'Praveen',"Late Come", '13-3-25', "10:00AM", 506, "6:30PM", '13-3-25'),
  createData(7, 'Mahesh',"Early Out", '13-3-25', "10:30AM", 507, "6:30PM", '13-3-25'),
  createData(8, 'Vasu',"Late Come", '13-3-25', "10:15AM", 508, "6:30PM", '13-3-25'),
  createData(9, 'Praveen',"Early Out", '13-3-25',"10:30AM", 509, "6:30PM", '13-3-25'),
];

export default function EmployeeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('DateOfJoining');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});  

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

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.CheckIn === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
          <Typography variant="h6">LateCome/EarlyOut</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField select label="Filter by Job Position" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.CheckIn))].map((job) => (
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
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>In Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Check In</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Check Out</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Out Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>          
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
                     justifyContent: 'flex-start',
                     minWidth: 150
                    }}>
                    <Avatar sx={{ bgcolor: 'gray' }}>{row.Employee[0]}</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                    {editId === row.id ? (
                      <TextField name="Employee" value={editData.Employee} onChange={handleEditChange} size="small" variant="outlined" fullWidth />
                    ) : (
                      <Typography variant="body1">{row.Employee}</Typography>
                    )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Type}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.InDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckIn}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckOut}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.OutDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <Button variant="contained" color="success" size="small" onClick={handleSave}>Save</Button>
                    ) : (
                      <>
                      <IconButton color="error" onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                      </>
                    )}
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