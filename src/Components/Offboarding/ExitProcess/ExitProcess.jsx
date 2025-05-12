import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ResignationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    department: "",
    designation: "",
    address: "",
    joiningDate: "",
    noticeStart: "",
    noticeDuration: "",
    projectStatus: "",
    updateWbs: "",
    completedProject: "",
    completionDate: "",
    resignationReason: "",
    lastWorkingDay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  const whiteTextFieldStyles = {
    InputLabelProps: { style: { color: "white" } },
    InputProps: { style: { color: "white" } },
    sx: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'white' },
        '&:hover fieldset': { borderColor: '#ccc' },
      },
    },
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
        mt: 4,
        backgroundColor: "transparent", // Changed here
        color: "white",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color="white">
        Resignation Process Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mobile No" name="mobile" value={formData.mobile} onChange={handleChange} type="tel" required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Alternate Mobile No" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} type="tel" {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Department Name" name="department" value={formData.department} onChange={handleChange} required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Joining Date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} type="date" required InputLabelProps={{ shrink: true, style: { color: "white" } }} InputProps={{ style: { color: "white" } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: '#ccc' } } }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Notice Period Start" name="noticeStart" value={formData.noticeStart} onChange={handleChange} type="date" required InputLabelProps={{ shrink: true, style: { color: "white" } }} InputProps={{ style: { color: "white" } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: '#ccc' } } }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Notice Period Duration (in days)" name="noticeDuration" value={formData.noticeDuration} onChange={handleChange} type="number" required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Project Status" name="projectStatus" value={formData.projectStatus} onChange={handleChange} multiline rows={2} {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Update WBS" name="updateWbs" value={formData.updateWbs} onChange={handleChange} multiline rows={2} {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: '#ccc' } } }}>
              <InputLabel sx={{ color: "white" }}>Have you completed your project?</InputLabel>
              <Select name="completedProject" value={formData.completedProject} onChange={handleChange} sx={{ color: "white" }}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.completedProject === "No" && (
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Expected Completion Date" name="completionDate" value={formData.completionDate} onChange={handleChange} type="date" InputLabelProps={{ shrink: true, style: { color: "white" } }} InputProps={{ style: { color: "white" } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: '#ccc' } } }} />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField fullWidth label="Reason for Resignation" name="resignationReason" value={formData.resignationReason} onChange={handleChange} multiline rows={3} required {...whiteTextFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Working Day" name="lastWorkingDay" value={formData.lastWorkingDay} onChange={handleChange} type="date" required InputLabelProps={{ shrink: true, style: { color: "white" } }} InputProps={{ style: { color: "white" } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: '#ccc' } } }} />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit Resignation
        </Button>
      </form>
    </Box>
  );
};

export default ResignationForm;