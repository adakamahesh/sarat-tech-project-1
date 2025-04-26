import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';

function createData(id, RequestedShift, CurrentShift, RequestedDate, RequestStart, RequestTill, Description, SRNO, Status) {
  return { id, RequestedShift, CurrentShift, RequestedDate, RequestStart, RequestTill, Description, SRNO, Status };
}

const initialRows = [
  createData(1, 'Regular Shift', 'Night Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 501, 'Pending'),
  createData(2, 'Regular Shift', 'Morning Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 502, 'Approved'),
  createData(3, 'Night Shift', 'Regular Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 503, 'Rejected'),
  createData(4, 'Regular Shift', 'Night Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 504, 'Pending'),
  createData(5, 'Regular Shift', 'Morning Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 505, 'Approved'),
  createData(6, 'Morning Shift', 'Regular Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 506, 'Pending'),
  createData(7, 'Regular Shift', 'Night Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 507, 'Rejected'),
  createData(8, 'Regular Shift', 'Morning Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 508, 'Pending'),
  createData(9, 'Regular Shift', 'Morning Shift', '07-03-2025', "15-3-25", "15-4-25", "Work", 509, 'Approved'),
];

export default function ShiftRequest() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [newRequest, setNewRequest] = React.useState({
    RequestedShift: 'Regular Shift',    // Default values
    CurrentShift: 'Morning Shift',
    RequestedDate: '',                  // Empty initially
    RequestStart: '',
    RequestTill: '',
    Description: '',
    Status: 'Pending',
  });

  const handleClickOpen = () => {
    // Automatically set RequestedDate to current date when dialog opens
    const currentDate = new Date().toLocaleDateString('en-GB'); // Format the date as dd/mm/yyyy
    setOpen(true);
    setNewRequest((prev) => ({
      ...prev,
      RequestedDate: currentDate, // Set today's date
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setNewRequest({
      RequestedShift: 'Regular Shift',
      CurrentShift: 'Morning Shift',
      RequestedDate: '',
      RequestStart: '',
      RequestTill: '',
      Description: '',
      Status: 'Pending',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'RequestedShift') {
      let currentShift = '';
      if (value === 'Regular Shift') currentShift = 'Morning Shift';
      else if (value === 'Morning Shift') currentShift = 'Night Shift';
      else if (value === 'Night Shift') currentShift = 'Regular Shift';

      setNewRequest((prev) => ({
        ...prev,
        RequestedShift: value,
        CurrentShift: currentShift,
      }));
    } else {
      setNewRequest((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const newSRNO = Math.max(...rows.map(row => row.SRNO)) + 1;
    const newRow = {
      id: rows.length + 1,
      SRNO: newSRNO,
      RequestedShift: newRequest.RequestedShift,
      CurrentShift: newRequest.CurrentShift,
      RequestedDate: newRequest.RequestedDate,
      RequestStart: newRequest.RequestStart,
      RequestTill: newRequest.RequestTill,
      Description: newRequest.Description,
      Status: newRequest.Status,
    };
    setRows([...rows, newRow]);
    handleClose();
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">Shift Request</Typography>
          <Button variant="contained" size="small" onClick={handleClickOpen}>
            Create
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>SRNO</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Requested Shift</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Current Shift</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Requested Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Request Start</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Request Till</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.SRNO}</TableCell>
                  <TableCell align="center">{row.RequestedShift}</TableCell>
                  <TableCell align="center">{row.CurrentShift}</TableCell>
                  <TableCell align="center">{row.RequestedDate}</TableCell>
                  <TableCell align="center">{row.RequestStart}</TableCell>
                  <TableCell align="center">{row.RequestTill}</TableCell>
                  <TableCell align="center">{row.Description}</TableCell>
                  <TableCell align="center">{row.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Shift Request</DialogTitle>
          <DialogContent>

            {/* Requested Shift Dropdown */}
            <TextField
              select
              label="Requested Shift"
              name="RequestedShift"
              fullWidth
              value={newRequest.RequestedShift}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Regular Shift">Regular Shift</MenuItem>
              <MenuItem value="Morning Shift">Morning Shift</MenuItem>
              <MenuItem value="Night Shift">Night Shift</MenuItem>
            </TextField>

            {/* Current Shift (disabled) */}
            <TextField
              label="Current Shift"
              name="CurrentShift"
              fullWidth
              value={newRequest.CurrentShift}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            {/* Requested Date (non-editable, auto-filled) */}
            <TextField
              label="Requested Date"
              name="RequestedDate"
              fullWidth
              value={newRequest.RequestedDate}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            {/* Request Start (Date Picker) */}
            <TextField
              label="Request Start"
              name="RequestStart"
              type="date"
              fullWidth
              value={newRequest.RequestStart}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Request Till (Date Picker) */}
            <TextField
              label="Request Till"
              name="RequestTill"
              type="date"
              fullWidth
              value={newRequest.RequestTill}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Description */}
            <TextField
              label="Description"
              name="Description"
              fullWidth
              value={newRequest.Description}
              onChange={handleChange}
              margin="normal"
            />

            {/* Status Dropdown */}
            <TextField
              select
              label="Status"
              name="Status"
              fullWidth
              value={newRequest.Status}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}