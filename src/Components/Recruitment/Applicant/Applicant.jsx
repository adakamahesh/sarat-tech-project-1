import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, Card, CardContent, Dialog, IconButton, TextField, Avatar
} from '@mui/material';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.49:8084/recruitment/applicant';

function createData(applicant) {
  return {
    applicantId: applicant.applicantId,  // Add applicantId here
    Employee: `${applicant.firstName} ${applicant.lastName}`,
    Email: applicant.email,
    Phone: applicant.mobileNumber,
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
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [newApplicant, setNewApplicant] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    alternateNumber: '',
    dateOfBirth: '',
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

  const handleSearch = (e) => setSearch(e.target.value);

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
        dateOfBirth: '',
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

        <TableContainer sx={{ height: '400px', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Email', 'Phone', 'Job Position', 'Alternate Number',
                  'DOB', 'Gender', 'Status', 'Address', 'Emergency Contact Name', 'Emergency Contact Number',
                  'Marital Status', 'Qualification'].map((header) => (
                    <TableCell key={header}><b>{header}</b></TableCell>
                  ))}
                <TableCell sx={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 1 }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.applicantId}>
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
                      <IconButton color="error" onClick={() => deleteApplicant(row.applicantId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Applicant Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">Add Applicant</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
              {Object.keys(newApplicant).map((field) => {
                if (field === 'dateOfBirth') {
                  return (
                    <TextField
                      key={field}
                      name={field}
                      label="Date of Birth"
                      type="date"
                      value={newApplicant[field] || ''}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  );
                }
                return (
                  <TextField
                    key={field}
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newApplicant[field] || ''}
                    onChange={handleInputChange}
                  />
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleAddApplicant}>Add</Button>
            </Box>
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
                if (field === 'dateOfBirth') {
                  return (
                    <TextField
                      key={field}
                      name={field}
                      label="Date of Birth"
                      type="date"
                      value={editApplicant[field] || ''}
                      onChange={handleEditInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  );
                }
                return (
                  <TextField
                    key={field}
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editApplicant[field] || ''}
                    onChange={handleEditInputChange}
                  />
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleEditApplicant}>Save</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}