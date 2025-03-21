import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Button,Card,CardContent,Typography,Dialog,IconButton
} from '@mui/material';
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function createData(id, Employee, Email, CandidateId, JobPosition, DateOfJoining,Recruitment, OfferLetter = 'Not Sent') {
  return { id, Employee, Email, CandidateId, JobPosition, DateOfJoining,Recruitment,OfferLetter,
    ProbationEnds: DateOfJoining ? dayjs(DateOfJoining, 'DD-MM-YYYY').add(6, 'month').format('DD-MM-YYYY') : ''
   };
}

const initialRows = [
  createData(1, 'Mahesh', 'adakamahesh@gmail.com', 501, "FrontEnd Developer","2024-01-10","Recruitment Drive", "Sent"),
  createData(2, 'Vasu', 'vasu@gmail.com', 502, "Backend Developer","2024-01-10","Recruitment Drive", "Sent"),
  createData(3, 'Praveen', 'praveen@gmail.com', 503, "UI/UX Designer","2024-02-15","Recruitment Drive", "Sent"),
  createData(4, 'Mahesh', 'adakamahesh@gmail.com', 504, "FrontEnd Developer","2024-01-10","Recruitment Drive", "Accepted"),
  createData(5, 'Vasu', 'vasu@gmail.com', 505, "Backend Developer","2024-02-15","Recruitment Drive", "Accepted"),
  createData(6, 'Praveen', 'praveen@gmail.com', 506, "UI/UX Designer","2024-02-15","Recruitment Drive", "Accepted"),
  createData(7, 'Mahesh', 'adakamahesh@gmail.com', 507, "FrontEnd Developer","2024-02-15","Recruitment Drive", "Rejected"),
  createData(8, 'Vasu', 'vasu@gmail.com', 508, "Backend Developer","2024-02-15","Recruitment Drive", "Rejected"),
  createData(9, 'Praveen', 'praveen@gmail.com', 509, "UI/UX Designer","2024-02-15","Recruitment Drive", "Rejected"),
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
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [newEmployee, setNewEmployee] = React.useState({
    Employee: '', Email: '',CandidateId:'', JobPosition: '', DateOfJoining:null,RecruitmentDrive:''
  });
  
  const handleEdit = (row) => {
    setEditId(row.id);
    setEditData(row);
  };

  const handleEditChange = (field, value) => {
    const updatedData = { ...editData, [field]: value };
    if (field === 'DateOfJoining') {
      updatedData.ProbationEnds = dayjs(value, 'DD-MM-YYYY').add(6, 'month').format('DD-MM-YYYY');
    }
    setEditData(updatedData);
  };

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  const handleDateChange = (newDate) => {
    setEditData({ ...editData, DateOfJoining: newDate.format('DD-MM-YYYY') });
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
      setRows([...rows, createData(rows.length + 1, newEmployee.Employee, newEmployee.Email, newEmployee.Phone, rows.length + 500, newEmployee.JobPosition, 'IT Dept', "Day Shift", "Office", 'Mahii', 'Sarat Tech', newEmployee.Email, newEmployee.DateOfJoining)]);
      setNewEmployee({ Employee: '', Email: '',CandidateId:'', JobPosition: '',Department:'',shift:'', WorkEmail:'', DateOfJoining: '' });
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.JobPosition === filter : true)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '135%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
          <Typography variant="h6">Hired Candidates</Typography>
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
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Candidate Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                  Candidate
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date of Joining</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Probation Ends</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Job Position</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Recuitment</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Offer Letter</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>          
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.CandidateId}</TableCell>
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
                        <DatePicker
                        value={dayjs(editData.DateOfJoining, 'DD-MM-YYYY')}
                        onChange={handleDateChange}
                        format="DD-MM-YYYY"
                        />
                    ) : (
                        dayjs(row.DateOfJoining).format("DD-MM-YYYY")
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                        <DatePicker
                        value={dayjs(editData.ProbationEnds, 'DD-MM-YYYY')}
                        disabled
                        format="DD-MM-YYYY"
                        />
                    ) : (
                        row.ProbationEnds
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <TextField name="JobPosition" value={editData.JobPosition} onChange={handleEditChange} size="small" />
                    ) : (
                      row.JobPosition
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                      <TextField name="Recruitment" value={editData.Recruitment} onChange={handleEditChange} size="small" />
                    ) : (
                      row.Recruitment
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {editId === row.id ? (
                        <TextField
                        select
                        name="OfferLetter"
                        value={editData.OfferLetter}
                        onChange={(e) => handleEditChange('OfferLetter', e.target.value)}
                        size="small"
                        >
                            {["Not Sent", "Sent", "Accepted", "Rejected", "Joined"].map((status) => (
                                <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                        </TextField>
                    ) : (
                        row.OfferLetter
                    )}
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
      <Dialog open={open} onClose={handleClose}  maxWidth="sm" fullWidth>
        <Card sx={{ p: 2, minWidth: 300 }}>
          <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Typography variant="h6">Add Candidate</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField name="Employee" label="Employee Name" variant="outlined" size="small" value={newEmployee.Employee} onChange={handleInputChange} />
              <TextField name="Email" label="Email" variant="outlined" size="small" value={newEmployee.Email} onChange={handleInputChange} />
              <TextField name="Phone" label="Phone" variant="outlined" size="small" value={newEmployee.Phone} onChange={handleInputChange} />
              <TextField name="CandidateId" label="CandidateId" variant="outlined" size="small" value={newEmployee.CandidateId} onChange={handleInputChange} />
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
    </LocalizationProvider>
  );
}