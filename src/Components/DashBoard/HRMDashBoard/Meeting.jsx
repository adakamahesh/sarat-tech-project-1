import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Box, Card, CardContent, TextField
} from '@mui/material';

const API_URL = process.env.REACT_APP_BASE_URL;

export default function AccessibleTable() {
  const [meetingData, setMeetingData] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  const handleButtonClick = () => {
    setShowForm(!showForm); // Toggle form
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
        setMeetingData([...meetingData, response.data]);
        setFormData({ meetingTitle: '', meetingDate: '', meetingTime: '' });
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error creating meeting:', error);
      });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table aria-label="meeting schedule table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5} sx={{ padding: '16px 24px',backgroundColor:'#f5f5f5' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
                    Meeting Schedule
                  </span>
                  <Button
                    variant="contained"
                    color="#93A0B4"
                    onClick={handleButtonClick}
                    size="small"
                  >
                    {showForm ? 'Close Form' : 'New Meeting'}
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
              <TableCell sx={{ fontSize: '20px', fontWeight: 'bold',color: "#fff", backgroundColor: '#93A0B4' }}>
                Meeting Title
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '20px', fontWeight: 'bold',color: "#fff", backgroundColor: '#93A0B4' }}>
                Meeting Date
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '20px', fontWeight: 'bold',color: "#fff", backgroundColor: '#93A0B4' }}>
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

      {showForm && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <Card sx={{ width: 500, padding: 2, boxShadow: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Create New Meeting</span>
                <Button variant="outlined" color="error" size="small" onClick={() => setShowForm(false)}>
                  Close
                </Button>
              </Box>

              <form onSubmit={handleFormSubmit}>
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
                    label="Date"
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
                    label="Time"
                    name="meetingTime"
                    type="time"
                    value={formData.meetingTime}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit Meeting
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}