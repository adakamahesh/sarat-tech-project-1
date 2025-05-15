import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

const genderOptions = ["Male", "Female", "Other"];
const statusOptions = ["Applied", "Interviewed", "Hired", "Rejected"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const qualificationOptions = ["High School", "Bachelor", "Master", "PhD"];

export default function AddApplicantForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = React.useState({
    Employee: "",
    Email: "",
    Phone: "",
    JobPosition: "",
    AlternateNumber: "",
    DOB: "",
    Gender: "",
    Status: "",
    Address: "",
    EmergencyContactName: "",
    EmergencyContactNumber: "",
    MaritalStatus: "",
    Qualification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Simple validation (add your own if needed)
    if (!formData.Employee || !formData.Email) {
      alert("Please fill in required fields: Applicant Name and Email.");
      return;
    }
    onAdd(formData);
    setFormData({
      Employee: "",
      Email: "",
      Phone: "",
      JobPosition: "",
      AlternateNumber: "",
      DOB: "",
      Gender: "",
      Status: "",
      Address: "",
      EmergencyContactName: "",
      EmergencyContactNumber: "",
      MaritalStatus: "",
      Qualification: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Applicant</DialogTitle>
      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Applicant Name"
          name="Employee"
          value={formData.Employee}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Job Position"
          name="JobPosition"
          value={formData.JobPosition}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Alternate Number"
          name="AlternateNumber"
          value={formData.AlternateNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="DOB"
          name="DOB"
          type="date"
          value={formData.DOB}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Gender"
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          fullWidth
        >
          {genderOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          name="Status"
          value={formData.Status}
          onChange={handleChange}
          fullWidth
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Address"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Emergency Contact Name"
          name="EmergencyContactName"
          value={formData.EmergencyContactName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Emergency Contact Number"
          name="EmergencyContactNumber"
          value={formData.EmergencyContactNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Marital Status"
          name="MaritalStatus"
          value={formData.MaritalStatus}
          onChange={handleChange}
          fullWidth
        >
          {maritalStatusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Qualification"
          name="Qualification"
          value={formData.Qualification}
          onChange={handleChange}
          fullWidth
        >
          {qualificationOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Applicant
        </Button>
      </DialogActions>
    </Dialog>
  );
}