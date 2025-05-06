import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Box, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const API_URL = process.env.REACT_APP_BASE_URL;

export default function AccessibleTable() {
  const [meetingData, setMeetingData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    meetingTitle: '',
    meetingDate: '',
    meetingTime: '',
  });

  useEffect(() => {
    axios.get(`${API_URL}meeting-schedule`)
      .then(response => {
        setMeetingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching meeting data:', error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ meetingTitle: '', meetingDate: '', meetingTime: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}meeting-schedule`, formData)
      .then((response) => {
        setMeetingData([response.data, ...meetingData]);
        handleClose();
      })
      .catch(error => {
        console.error('Error creating meeting:', error);
      });
  };

  return (
    <>
      {/* Table with scroll and height */}
      <Box sx={{ overflowX: 'auto', mb: 3 }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 600, overflow: 'auto' }}
        >
          <Table stickyHeader aria-label="meeting schedule table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={5} sx={{ padding: '16px 24px', backgroundColor: '#f5f5f5' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
                      Meeting Schedule
                    </span>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpen}
                      size="small"
                      sx={{ "@media (max-width: 600px)": { fontSize: '12px' } }}
                    >
                      New Meeting
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                <TableCell sx={{
                  fontSize: { xs: '16px', sm: '20px' },
                  fontWeight: 'bold',
                  color: "#fff",
                  backgroundColor: '#93A0B4'
                }}>
                  Meeting Title
                </TableCell>
                <TableCell align="center" sx={{
                  fontSize: { xs: '14px', sm: '20px' },
                  fontWeight: 'bold',
                  color: "#fff",
                  backgroundColor: '#93A0B4'
                }}>
                  Meeting Date
                </TableCell>
                <TableCell align="center" sx={{
                  fontSize: { xs: '14px', sm: '20px' },
                  fontWeight: 'bold',
                  color: "#fff",
                  backgroundColor: '#93A0B4'
                }}>
                  Meeting Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetingData.map((row) => (
                <TableRow key={row.meetingId}>
                  <TableCell component="th" scope="row">
                    {row.meetingTitle}
                  </TableCell>
                  <TableCell align="center">{row.meetingDate}</TableCell>
                  <TableCell align="center">{row.meetingTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for new meeting */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Meeting</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent dividers>
            <Box mb={2}>
              <TextField
                label="Meeting Title"
                name="meetingTitle"
                value={formData.meetingTitle}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Meeting Date"
                name="meetingDate"
                type="date"
                value={formData.meetingDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Meeting Time"
                name="meetingTime"
                type="time"
                value={formData.meetingTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}