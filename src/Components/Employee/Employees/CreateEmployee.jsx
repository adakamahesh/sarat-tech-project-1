import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";

const CreateEmployeeForm = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [formData, setFormData] = useState({
    employeeName: "",
    designation: "",
    departmentId: "",
    emailId: "",
    phoneNumber: "",
    dob: "",
    doj: "",
    gender: "",
    qualification: "",
    experience: "",
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
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://192.168.1.49:8084/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Response Error:", data);
        throw new Error(data.message || "Failed to create employee");
      }

      alert("Employee created!");
      setFormData({
        employeeName: "",
        designation: "",
        departmentId: "",
        emailId: "",
        phoneNumber: "",
        dob: "",
        doj: "",
        gender: "",
        qualification: "",
        experience: "",
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
      });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error creating employee: " + error.message);
    }
  };

  const renderInput = (label, field, type = "text") => (
    <TextField
      label={label}
      type={type}
      value={formData[field]}
      onChange={handleChange(field)}
      fullWidth
      sx={{ mb: 2 }}
      InputLabelProps={{ shrink: type === "date", sx: { fontSize: 18 } }}
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
        maxWidth: 900,
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
        {renderInput("Employee Name", "employeeName")}
        {renderInput("Designation", "designation")}
        {renderInput("Department ID", "departmentId")}
        {renderInput("Email", "emailId")}
        {renderInput("Phone", "phoneNumber")}
      </Box>

      {/* Personal Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Personal Information
        </Typography>
        {renderInput("Date of Birth", "dob", "date")}
        {renderInput("Date of Joining", "doj", "date")}
        {renderInput("Gender", "gender")}
        {renderInput("Qualification", "qualification")}
        {renderInput("Experience", "experience")}
        {renderInput("Marital Status", "maritalStatus")}
        {renderInput("Emergency Contact Name", "emergencyContactName")}
        {renderInput("Emergency Contact Number", "emergencyContactNumber")}
      </Box>

      {/* Bank Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Bank Information
        </Typography>
        {renderInput("Bank Name", "bankName")}
        {renderInput("Account Number", "accountNumber")}
        {renderInput("Branch", "branch")}
        {renderInput("IFSC", "ifsc")}
        {renderInput("Bank Code", "bankCode")}
        {renderInput("Bank Address", "bankAddress")}
        {renderInput("Country", "country")}
      </Box>

      <Button
        variant="contained"
        type="submit"
        size="large"
        sx={{
          mt: 4,
          py: 2,
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateEmployeeForm;