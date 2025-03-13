import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  TableSortLabel, Paper, TextField, Button, Typography, IconButton, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from "@mui/icons-material/EditNote";

function createData(id, Employee, Type, AttendanceDate, CheckIn, InDate, EmployeeId, CheckOut, OutDate, MinHour, AtWork, Penalties) {
  return { id, Employee, Type, AttendanceDate, CheckIn, InDate, EmployeeId, CheckOut, OutDate, MinHour, AtWork, Penalties };
}

const initialRows = [
  createData(1, 'Mahesh', "Late Come", '13-3-25', "10:30AM", '13-3-25', 501, "6:30PM", '13-3-25', "00:00", "09:00"),
  createData(2, 'Vasu', "Late Come", '13-3-25', "9:30AM", '13-3-25', 502, "6:30PM", '13-3-25', "00:00", "09:00"),
  createData(3, 'Praveen', "Early Out", '13-3-25', "10:30AM", '13-3-25', 503, "6:30PM", '13-3-25', "00:00", "09:00"),
  createData(4, 'Mahesh', "Late Come", '13-3-25', "10:30AM", '13-3-25', 504, "6:30PM", '13-3-25', "00:00", "09:00"),
  createData(5, 'Vasu', "Late Come", '13-3-25', "9:30AM", '13-3-25', 505, "6:30PM", '13-3-25', "00:00", "09:00"),
  createData(6, 'Praveen', "Early Out", '13-3-25', "10:30AM", '13-3-25', 506, "6:30PM", '13-3-25', "00:00", "09:00"),
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState(null);

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

  const handleDeleteClick = (id) => {
    setRowToDelete(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete));
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{display: 'flex', gap:20, mb: 2  }}>
          <Typography variant="h6">LateCome/EarlyOut</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
        </Box>
        <TableContainer >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EmployeeId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Attendance Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CheckIn</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CheckOut</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>OutDate</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>MinHour</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>AtWork</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Penalties</TableCell>
                <TableCell sx={{ 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    position: 'sticky',
                    right: 0, 
                    background: 'white',
                    zIndex: 2 
                }}>
                    Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center'}}>{row.EmployeeId}</TableCell>
                  <TableCell sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ bgcolor: 'gray' }}>{row.Employee[0]}</Avatar>
                    {editId === row.id ? (
                      <TextField name="Employee" value={editData.Employee} onChange={handleEditChange} size="small" variant="outlined" fullWidth />
                    ) : (
                      <Typography variant="body1">{row.Employee}</Typography>
                    )}
                  </TableCell>
                  
                  <TableCell sx={{ textAlign: 'center' }}>{row.Type}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.AttendanceDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckIn}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CheckOut}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.OutDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.MinHour}</TableCell>
                  <TableCell sx={{ textAlign: 'center'}}>{row.AtWork}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Penalties}</TableCell>
                  <TableCell sx={{  textAlign: 'center',position: 'sticky', right: 0,background: 'white',zIndex: 1, whiteSpace: 'nowrap'  }}>
                    {editId === row.id ? (
                      <Button variant="contained" color="success" size="small" onClick={handleSave}>Save</Button>
                    ) : (
                      <>
                        <IconButton color="primary" onClick={() => { setEditId(row.id); setEditData(row); }}>
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteClick(row.id)}>
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
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this row?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}