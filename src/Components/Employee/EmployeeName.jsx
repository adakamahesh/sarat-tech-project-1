import React, { useState } from "react";
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function EmployeeForm() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [open, setOpen] = useState(false); // State to open/close dialog
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    username: "",
    employeeId: "",
    address: "",
    jobRole: "",
  });

  // Open dialog
  const handleOpen = () => setOpen(true);
  
  // Close dialog
  const handleClose = () => setOpen(false);

  // Handle input change in new employee form
  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("New Employee Data:", newEmployee);
    setOpen(false); // Close form after submitting
  };

  return (
    <>
      <Box sx={{ margin: "20px auto", display: "flex", gap: "45px", flexWrap: "wrap", alignItems: "center" }}>
        {/* Employee Name Input */}
        <TextField
          fullWidth
          label="Employee Name"
          variant="outlined"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          sx={{ flex: 1 }}
        />

        {/* Employee ID Input */}
        <TextField
          fullWidth
          label="Employee ID"
          variant="outlined"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          sx={{ flex: 1 }}
        />

        {/* Job Role Dropdown */}
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel>Job Role</InputLabel>
          <Select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            label="Job Role"
          >
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
        <Button variant="contained" color="primary">Filter</Button>
        <Button variant="contained" color="success" onClick={handleOpen}>Add Employee</Button>
      </Box>

      {/* Dialog (Popup Form) */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="First Name" name="firstName" fullWidth variant="outlined" onChange={handleChange} />
            <TextField label="Last Name" name="lastName" fullWidth variant="outlined" onChange={handleChange} />
            <TextField label="Contact Number" name="contactNumber" fullWidth variant="outlined" onChange={handleChange} />
            <TextField label="Email" name="email" fullWidth variant="outlined" onChange={handleChange} />
            <TextField label="Username" name="username" fullWidth variant="outlined" onChange={handleChange} />
            <TextField label="Employee ID" name="employeeId" fullWidth variant="outlined" onChange={handleChange} />
            <TextField label="Address" name="address" fullWidth variant="outlined" onChange={handleChange} />
            <FormControl fullWidth>
              <InputLabel>Job Role</InputLabel>
              <Select name="jobRole" value={newEmployee.jobRole} onChange={handleChange} label="Job Role">
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeForm;