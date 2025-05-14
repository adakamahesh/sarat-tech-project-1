import React, { useState, useEffect } from "react";
import axios from "axios";
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
    projectStatus: "",
    updateWbs: null,
    completedProject: "",
    completionDate: "",
    resignationReason: "",
    lastWorkingDay: "",
  });

  // Replace with your real logged-in employeeId from localStorage/context
  const employeeId = localStorage.getItem("employeeId");

  // Set the current date automatically
  const currentDate = new Date().toISOString().split("T")[0];

  // Fetch employee details on load
  useEffect(() => {
    axios
      .get(`http://192.168.1.49:8084/api/employees/${employeeId}`)
      .then((response) => {
        const data = response.data;
        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.phoneNumber,
          alternateMobile: data.alternateNumber,
          email: data.emailId,
          department: data.departmentName || "",
          designation: data.designation,
          address: data.address,
          joiningDate: data.dateOfJoining,
          noticeStart: currentDate, // Set noticeStart as the current date
        }));
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resignationData = {
      employeeId: employeeId,
      noticePeriodStart: formData.noticeStart,
      projectStatus: formData.projectStatus,
      projectComplete: formData.completedProject,
      reason: formData.resignationReason,
      lastWorkDay: formData.lastWorkingDay,
    };

    axios
      .post("http://192.168.1.49:8084/resignation", resignationData)
      .then((response) => {
        alert("Resignation submitted successfully!");
        console.log("Submitted data:", response.data);

        // Refresh data after submission (this part could be replaced if you want to fetch data)
        axios
          .get(`http://192.168.1.49:8084/api/employees/${employeeId}`)
          .then((response) => {
            const data = response.data;
            setFormData((prev) => ({
              ...prev,
              firstName: data.firstName,
              lastName: data.lastName,
              mobile: data.phoneNumber,
              alternateMobile: data.alternateNumber,
              email: data.emailId,
              department: data.departmentName || "",
              designation: data.designation,
              address: data.address,
              joiningDate: data.dateOfJoining,
              noticeStart: currentDate, // Set noticeStart as the current date
            }));
          })
          .catch((error) => {
            console.error("Error fetching employee data after resignation:", error);
          });

        // Refresh the page after submission
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting resignation:", error);
        alert("Failed to submit resignation.");
      });
  };

  const whiteTextFieldStyles = {
    InputLabelProps: { style: { color: "white" } },
    InputProps: { style: { color: "white" } },
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "white" },
        "&:hover fieldset": { borderColor: "#ccc" },
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
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color="white">
        Resignation Process Form
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={2} color="white">
        EmployeeId: {employeeId}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              required
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              required
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile No"
              name="mobile"
              value={formData.mobile}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              type="tel"
              required
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alternate Mobile No"
              name="alternateMobile"
              value={formData.alternateMobile}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              type="tel"
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              type="email"
              required
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              required
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              required
              disabled
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              InputProps={{ style: { color: "white" }, readOnly: true }}
              onChange={handleChange}
              multiline
              rows={3}
              disabled 
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Joining Date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              type="date"
              required
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                },
                "& .MuiInputBase-input": {
                  color: "white", // Change the text color to white
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Notice Period Start"
              name="noticeStart"
              value={formData.noticeStart}
              onChange={handleChange}
              type="date"
              required
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              InputProps={{ style: { color: "white" }, readOnly: true }} // Make it non-editable
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Status"
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              multiline
              rows={2}
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ color: "white", mb: 1 }}>
              Upload Updated WBS Document
            </InputLabel>
            <input
              type="file"
              name="updateWbs"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleChange}
              style={{ color: "white" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                },
              }}
            >
              <InputLabel sx={{ color: "white" }} >
                Have you completed your project?
              </InputLabel>
              <Select
                name="completedProject"
                value={formData.completedProject}
                onChange={handleChange}
                sx={{ color: "white" }}
                label="Have you completed your project?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.completedProject === "No" && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expected Completion Date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true, style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#ccc" },
                  },
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Resignation Reason"
              name="resignationReason"
              value={formData.resignationReason}
              onChange={handleChange}
              multiline
              rows={3}
              required
              {...whiteTextFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Working Day"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
              type="date"
              required
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
          >
            Submit Resignation
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResignationForm;