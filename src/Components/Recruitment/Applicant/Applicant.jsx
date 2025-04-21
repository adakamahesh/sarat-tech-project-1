import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
  TableSortLabel, Paper, TextField, MenuItem, Button, Card, CardContent, Typography, Dialog, IconButton
} from '@mui/material';
import { Avatar } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, Employee, Email, Phone, ApplicantId, SLNO, JobPosition) {
  return { id, Employee, Email, Phone, ApplicantId, SLNO, JobPosition };
}

const initialRows = [
  createData(1, 'Mahesh', 'adakamahesh@gmail.com', 9700784065, 501, 'SL001', "FrontEnd Developer"),
  createData(2, 'Vasu', 'vasu@gmail.com', 9700784065, 502, 'SL002', "Backend Developer"),
  createData(3, 'Praveen', 'praveen@gmail.com', 9700784065, 503, 'SL003', "UI/UX Designer"),
  createData(4, 'Mahesh', 'adakamahesh@gmail.com', 9700784065, 504, 'SL004', "FrontEnd Developer"),
  createData(5, 'Vasu', 'vasu@gmail.com', 9700784065, 505, 'SL005', "Backend Developer"),
  createData(6, 'Praveen', 'praveen@gmail.com', 9700784065, 506, 'SL006', "UI/UX Designer"),
  createData(7, 'Mahesh', 'adakamahesh@gmail.com', 9700784065, 507, 'SL007', "FrontEnd Developer"),
  createData(8, 'Vasu', 'vasu@gmail.com', 9700784065, 508, 'SL008', "Backend Developer"),
  createData(9, 'Praveen', 'praveen@gmail.com', 9700784065, 509, 'SL009', "UI/UX Designer"),
];

export default function Applicant() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('DateOfJoining');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [newEmployee, setNewEmployee] = React.useState({
    Employee: '', Email: '', Phone: '', SLNO: '', ApplicantId: '', JobPosition: '', Department: '', shift: '', WorkEmail: '', DateOfJoining: ''
  });

  const handleEdit = (row) => {
    setEditId(row.id);
    setEditData(row);
  };

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEmployee = () => {
    if (newEmployee.Employee && newEmployee.Email) {
      const newId = rows.length + 1;
      const newApplicantId = 500 + newId;
      const newRow = createData(
        newId,
        newEmployee.Employee,
        newEmployee.Email,
        newEmployee.Phone,
        newApplicantId,
        newEmployee.SLNO,
        newEmployee.JobPosition
      );
      setRows([...rows, newRow]);
      setNewEmployee({
        Employee: '', Email: '', Phone: '', SLNO: '', ApplicantId: '', JobPosition: '', Department: '', shift: '', WorkEmail: '', DateOfJoining: ''
      });
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });

  const handleResumeClick = (employee) => {
    alert(`Viewing resume for ${employee}`);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.JobPosition === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Applicant</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField sx={{width:'30%'}} select label="Filter by Job Position" variant="outlined" size="small" value={filter} onChange={handleFilter}>
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
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>SLNO</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Applicant Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                    Applicant
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Job Position</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Resume</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.SLNO}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.ApplicantId}</TableCell>
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
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <TextField name="Email" value={editData.Email} onChange={handleEditChange} size="small" />
                    ) : (
                      row.Email
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <TextField name="Phone" value={editData.Phone} onChange={handleEditChange} size="small" />
                    ) : (
                      row.Phone
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <TextField name="JobPosition" value={editData.JobPosition} onChange={handleEditChange} size="small" />
                    ) : (
                      row.JobPosition
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconButton onClick={() => handleResumeClick(row.Employee)}>
                      <DescriptionIcon color="gray" />
                    </IconButton>
                    <Typography variant="body2" sx={{ cursor: 'pointer' }}>
                      View
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <Button variant="contained" color="success" size="small" onClick={handleSave}>Save</Button>
                    ) : (
                      <>
                        <IconButton color="primary" onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Card sx={{ p: 2, minWidth: 300 }}>
          <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Typography variant="h6">Add Applicant</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField name="Employee" label="Employee Name" variant="outlined" size="small" value={newEmployee.Employee} onChange={handleInputChange} />
              <TextField name="Email" label="Email" variant="outlined" size="small" value={newEmployee.Email} onChange={handleInputChange} />
              <TextField name="Phone" label="Phone" variant="outlined" size="small" value={newEmployee.Phone} onChange={handleInputChange} />
              <TextField name="SLNO" label="SLNO" variant="outlined" size="small" value={newEmployee.SLNO} onChange={handleInputChange} />
              <TextField name="ApplicantId" label="Applicant ID" variant="outlined" size="small" value={newEmployee.ApplicantId} onChange={handleInputChange} />
              <TextField name="JobPosition" label="Job Position" variant="outlined" size="small" value={newEmployee.JobPosition} onChange={handleInputChange} />
              <TextField name="Department" label="Department" variant="outlined" size="small" value={newEmployee.Department} onChange={handleInputChange} />
              <TextField name="shift" label="Shift" variant="outlined" size="small" value={newEmployee.shift} onChange={handleInputChange} />
              <TextField name="WorkEmail" label="Work Email" variant="outlined" size="small" value={newEmployee.WorkEmail} onChange={handleInputChange} />
              <TextField name="DateOfJoining" label="Date of Joining" variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} value={newEmployee.DateOfJoining} onChange={handleInputChange} />
              <Button variant="contained" onClick={handleAddEmployee}>Add Employee</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}