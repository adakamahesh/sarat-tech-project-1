import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  MenuItem,
} from "@mui/material";

const CreateEmployeeForm = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [formData, setFormData] = useState({
    applicantId: "", // Optional
    firstName: "",
    lastName: "",
    designation: "",
    departmentId: "",
    emailId: "",
    phoneNumber: "",
    gender: "",
    qualification: "",
    address: "",
    maritalStatus: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    bankName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    bankCode: "",
    bankAddress: "",
    country: "",
    accountType: "",
    dateOfBirth: "",
    dateOfJoining: "",
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyField = Object.entries(formData).some(
      ([key, value]) => key !== "applicantId" && value.trim() === ""
    );

    if (hasEmptyField) {
      alert("Please fill out all required fields.");
      return;
    }

    const payload = {
      ...formData,
      employeeName: `${formData.firstName} ${formData.lastName}`,
    };

    try {
      const res = await fetch("http://192.168.1.49:8084/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Response Error:", data);
        throw new Error(data.message || "Failed to create employee");
      }

      alert("Employee created!");
      setFormData({
        applicantId: "",
        firstName: "",
        lastName: "",
        designation: "",
        departmentId: "",
        emailId: "",
        phoneNumber: "",
        gender: "",
        qualification: "",
        address: "",
        maritalStatus: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        bankName: "",
        accountNumber: "",
        branch: "",
        ifsc: "",
        bankCode: "",
        bankAddress: "",
        country: "",
        accountType: "",
        dateOfBirth: "",
        dateOfJoining: "",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error creating employee: " + error.message);
    }
  };

  const renderInput = (label, field, type = "text", required = true) => (
    <TextField
      required={required}
      label={label}
      type={type}
      value={formData[field]}
      onChange={handleChange(field)}
      fullWidth
      autoComplete="off"
      sx={{
        mb: 2,
        "& .MuiInputLabel-root": { fontSize: 18 },
        "& .MuiInputBase-root": { fontSize: 18, height: 60 },
      }}
      InputLabelProps={{
        shrink: formData[field] !== "",
        sx: { fontSize: 18 },
      }}
      InputProps={{ sx: { fontSize: 18, height: 60 } }}
    />
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 6,
        boxShadow: 4,
        borderRadius: 4,
        backgroundColor: "white",
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
        Create New Employee
      </Typography>

      {/* Employee Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Employee Information
        </Typography>

        {/* Applicant ID (Optional) */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Applicant ID (Optional)", "applicantId", "text", false)}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("First Name", "firstName")}
          {renderInput("Last Name", "lastName")}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Designation", "designation")}
          <TextField
            required
            select
            label="Department"
            value={formData.departmentId}
            onChange={handleChange("departmentId")}
            fullWidth
            autoComplete="off"
            sx={{ mb: 2 }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="NONIT">NONIT</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Email", "emailId")}
          {renderInput("Phone", "phoneNumber")}
        </Box>
      </Box>

      {/* Personal Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Personal Information
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          <TextField
            required
            select
            label="Gender"
            value={formData.gender}
            onChange={handleChange("gender")}
            fullWidth
            autoComplete="off"
            sx={{ mb: 2 }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          {renderInput("Qualification", "qualification")}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Address", "address")}
          <TextField
            required
            select
            label="Marital Status"
            value={formData.maritalStatus}
            onChange={handleChange("maritalStatus")}
            fullWidth
            autoComplete="off"
            sx={{ mb: 2 }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Unmarried">Unmarried</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Emergency Contact Name", "emergencyContactName")}
          {renderInput("Emergency Contact Number", "emergencyContactNumber")}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          <TextField
            required
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange("dateOfBirth")}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label="Date of Joining"
            type="date"
            value={formData.dateOfJoining}
            onChange={handleChange("dateOfJoining")}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </Box>
      </Box>

      {/* Bank Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Bank Information
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Bank Name", "bankName")}
          {renderInput("Account Number", "accountNumber")}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Branch", "branch")}
          {renderInput("IFSC", "ifsc")}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Bank Code", "bankCode")}
          {renderInput("Bank Address", "bankAddress")}
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
          {renderInput("Country", "country")}
          <TextField
            required
            select
            label="Account Type"
            value={formData.accountType}
            onChange={handleChange("accountType")}
            fullWidth
            autoComplete="off"
            sx={{ mb: 2 }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            <MenuItem value="Saving">Saving</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          alignSelf: "center",
          backgroundColor: "#1976d2",
          color: "white",
          fontSize: 18,
          mt: 4,
          height: 50,
        }}
      >
        Create Employee
      </Button>
    </Box>
  );
};

export default CreateEmployeeForm;