import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, TextField, Button, Card, CardContent, Typography, Dialog,
  IconButton, TablePagination, Select, MenuItem
} from '@mui/material';
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.49:8084/recruitment/applicant';

function createData(applicant) {
  return {
    id: applicant.applicantId,
    Employee: `${applicant.firstName} ${applicant.lastName}`,
    Email: applicant.email,
    Phone: applicant.mobileNumber,
    SrNo: applicant.applicantId,
    ApplicantId: applicant.applicantId,
    JobPosition: 'N/A',
    AlternateNumber: applicant.alternateNumber,
    DOB: applicant.dateOfBirth ? new Date(applicant.dateOfBirth).toLocaleDateString() : '',
    Gender: applicant.gender,
    Status: applicant.status,
    Address: applicant.address,
    EmergencyContactName: applicant.emergencyContactName,
    EmergencyContactNumber: applicant.emergencyContactNumber,
    MaritalStatus: applicant.maritalStatus,
    Qualification: applicant.qualification,
  };
}

export default function Applicant() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Employee');
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [newApplicant, setNewApplicant] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    alternateNumber: '',
    dateOfBirth: null,
    gender: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    maritalStatus: '',
    qualification: '',
  });
  const [editApplicant, setEditApplicant] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setRows(response.data.map(applicant => createData(applicant)));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplicant = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchApplicants();
    } catch (error) {
      console.error("Failed to delete applicant:", error);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleChangePage = (e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditDialog = (applicant) => {
    setEditApplicant(applicant);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplicant(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditApplicant(prev => ({ ...prev, [name]: value }));
  };

  const handleAddApplicant = async () => {
    try {
      await axios.post(API_BASE_URL, newApplicant);
      fetchApplicants();
      handleClose();
      setNewApplicant({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        alternateNumber: '',
        dateOfBirth: null,
        gender: '',
        address: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        maritalStatus: '',
        qualification: '',
      });
    } catch (error) {
      setError("Failed to add applicant.");
    }
  };

  const handleEditApplicant = async () => {
    try {
      await axios.put(`${API_BASE_URL}/${editApplicant.applicantId}`, editApplicant);
      fetchApplicants();
      handleCloseEditDialog();
    } catch (error) {
      setError("Failed to edit applicant.");
    }
  };

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Typography>Loading applicants...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Typography variant="h6">Applicant</Typography>
          <TextField label="Search" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <Button variant="contained" onClick={handleOpen}>Add Applicant</Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['SrNo', 'Applicant ID', 'Name', 'Email', 'Phone', 'Job Position', 'Alternate Number',
                  'DOB', 'Gender', 'Status', 'Address', 'Emergency Contact Name', 'Emergency Contact Number',
                  'Marital Status', 'Qualification'].map((header) => (
                    <TableCell key={header}><b>{header}</b></TableCell>
                  ))}
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 1 }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.SrNo}</TableCell>
                  <TableCell>{row.ApplicantId}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar>{row.Employee[0]}</Avatar>{row.Employee}
                    </Box>
                  </TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>{row.Phone}</TableCell>
                  <TableCell>{row.JobPosition}</TableCell>
                  <TableCell>{row.AlternateNumber}</TableCell>
                  <TableCell>{row.DOB}</TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>{row.Status}</TableCell>
                  <TableCell>{row.Address}</TableCell>
                  <TableCell>{row.EmergencyContactName}</TableCell>
                  <TableCell>{row.EmergencyContactNumber}</TableCell>
                  <TableCell>{row.MaritalStatus}</TableCell>
                  <TableCell>{row.Qualification}</TableCell>
                  <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton color="primary" onClick={() => handleOpenEditDialog(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteApplicant(row.ApplicantId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
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

      {/* Add Applicant Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">Add Applicant</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
              {Object.keys(newApplicant).map((field) => {
                if (['gender', 'qualification', 'maritalStatus'].includes(field)) {
                  const options = field === 'gender'
                    ? ['Male', 'Female', 'Other']
                    : field === 'qualification'
                      ? ['BTech', 'MTech', 'MBA', 'Others']
                      : ['Married', 'Unmarried'];

                  return (
                    <Select
                      key={field}
                      name={field}
                      value={newApplicant[field]}
                      onChange={handleInputChange}
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="" disabled>{field.replace(/([A-Z])/g, ' $1')}</MenuItem>
                      {options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                  );
                }

                return (
                  <TextField
                    key={field}
                    name={field}
                    label={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    variant="outlined"
                    value={newApplicant[field]}
                    onChange={handleInputChange}
                    size="small"
                  />
                );
              })}
            </Box>
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleAddApplicant}>Add</Button>
          </CardContent>
        </Card>
      </Dialog>

      {/* Edit Applicant Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">Edit Applicant</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
              {editApplicant && Object.keys(editApplicant).map((field) => {
                if (['gender', 'qualification', 'maritalStatus'].includes(field)) {
                  const options = field === 'gender'
                    ? ['Male', 'Female', 'Other']
                    : field === 'qualification'
                      ? ['BTech', 'MTech', 'MBA', 'Others']
                      : ['Married', 'Unmarried'];

                  return (
                    <Select
                      key={field}
                      name={field}
                      value={editApplicant[field]}
                      onChange={handleEditInputChange}
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="" disabled>{field.replace(/([A-Z])/g, ' $1')}</MenuItem>
                      {options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                  );
                }

                return (
                  <TextField
                    key={field}
                    name={field}
                    label={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    variant="outlined"
                    value={editApplicant[field]}
                    onChange={handleEditInputChange}
                    size="small"
                  />
                );
              })}
            </Box>
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleEditApplicant}>Save</Button>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}