import * as React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
} from "@mui/material";

export default function EditProfile() {
  const [formData, setFormData] = React.useState({
    name: "Mahesh Babu",
    profileImage: "/default-profile.png",
    role: "UI/UX Design Team",
    employeeid: "Employee ID: 501",
    dateofjoin: "27-01-2025",
    phone: "+91 9248184693",
    email: "amb@gmail.com",
    birthday: "06-09-2002",
    address: "100 Terminal, Fort Lauderdale, Miami 33315, United States",
    gender: "Male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Edit Profile
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar
          src={formData.profileImage}
          alt={formData.name}
          sx={{ width: 80, height: 80 }}
        />
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Employee ID"
            name="employeeid"
            value={formData.employeeid}
            onChange={handleChange}
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date of Joining"
            name="dateofjoin"
            value={formData.dateofjoin}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Paper>
  );
}
