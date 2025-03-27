import * as React from "react";
import { Box, TextField, Button, Avatar, Typography } from "@mui/material";

export default function EmployeeCardEdit({ employee, onSave, onClose }) {
  const [formData, setFormData] = React.useState(employee);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData); // Send updated data to parent
  };

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6">Edit Profile</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={formData.profileImage} alt={formData.name} sx={{ width: 80, height: 80 }} />
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} />
      </Box>

      <TextField fullWidth label="Employee ID" name="employeeid" value={formData.employeeid} onChange={handleChange} />
      <TextField fullWidth label="Role" name="role" value={formData.role} onChange={handleChange} />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} />
      <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
      </Box>
    </Box>
  );
}