import React, { useState, useEffect } from "react";
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
    shift: "",
    alternateNumber: "",
    bankName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    bankCode: "",
    bankAddress: "",
    country: "",
    accountType: "",
    dob: "",
    dateOfJoining: "",
    workStatus: "Active",
    startDate: new Date().toISOString().split("T")[0],
    endDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [applicantInfo, setApplicantInfo] = useState(null);

  useEffect(() => {
    // Fetch departments from backend
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://192.168.1.49:8084/api/department");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Fetch Shifts from backend
    const fetchShifts = async () => {
      try {
        const response = await fetch("http://192.168.1.49:8084/shifts");
        const data = await response.json();
        setShifts(data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const fetchApplicantDetails = async (applicantId) => {
    if (applicantId) {
      try {
        const response = await fetch(
          `http://192.168.1.49:8084/recruitment/applicant/${applicantId}`
        );
        if (response.ok) {
          const data = await response.json();
          setApplicantInfo(data);
          setFormData((prevFormData) => ({
            ...prevFormData,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            gender: data.gender || "",
            emailId: data.email || "",
            phoneNumber: data.mobileNumber || "",
            alternateNumber: data.alternateNumber || "",
            address: data.address || "",
            maritalStatus: data.maritalStatus || "",
            qualification: data.qualification || "",
            emergencyContactName: data.emergencyContactName || "",
            emergencyContactNumber: data.emergencyContactNumber || "",
            dob: data.dateOfBirth
              ? new Date(data.dateOfBirth).toISOString().split("T")[0]
              : "",
          }));
        } else if (response.status === 404) {
          setApplicantInfo(null);
          // Optionally clear fields if applicant not found
          setFormData((prevFormData) => ({
            ...prevFormData,
            firstName: "",
            lastName: "",
            gender: "",
            emailId: "",
            phoneNumber: "",
            alternateNumber: "",
            address: "",
            maritalStatus: "",
            qualification: "",
            emergencyContactName: "",
            emergencyContactNumber: "",
            dob: "",
          }));
          alert(`Applicant with ID ${applicantId} not found.`);
        } else {
          console.error("Error fetching applicant details:", response.status);
          alert("Failed to fetch applicant details.");
        }
      } catch (error) {
        console.error("Error fetching applicant details:", error);
        alert("Failed to fetch applicant details.");
      }
    } else {
      setApplicantInfo(null);
      // Optionally clear fields if applicant ID is cleared
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: "",
        lastName: "",
        gender: "",
        emailId: "",
        phoneNumber: "",
        alternateNumber: "",
        address: "",
        maritalStatus: "",
        qualification: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        dob: "",
      }));
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (field === "applicantId") {
      fetchApplicantDetails(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      employeeName: `${formData.firstName} ${formData.lastName}`,
    };

    try {
      const employeeRes = await fetch(
        "http://192.168.1.49:8084/api/employees",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const employeeData = await employeeRes.json();

      if (!employeeRes.ok) {
        console.error("Employee Creation Error:", employeeData);
        throw new Error(employeeData.message || "Failed to create employee");
      }

      const employeeId = employeeData.employeeId;

      const bankDetails = {
        employeeId,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        branch: formData.branch,
        ifsc: formData.ifsc,
        bankCode: formData.bankCode,
        bankAddress: formData.bankAddress,
        country: formData.country,
        accountType: formData.accountType,
      };

      const bankRes = await fetch("http://192.168.1.49:8084/bank-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankDetails),
      });

      const bankData = await bankRes.json();

      if (!bankRes.ok) {
        console.error("Bank Details Error:", bankData);
        throw new Error(bankData.message || "Failed to save bank details");
      }

      const empShift = {
        employeeId,
        shiftId: formData.shift,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      const shiftRes = await fetch("http://192.168.1.49:8084/employee-shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empShift),
      });

      const shiftData = await shiftRes.json();

      if (!shiftRes.ok) {
        console.error("Shift Details Error:", shiftData);
        throw new Error(shiftData.message || "Failed to save shift details");
      }

      alert("Employee and related details created successfully!");

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
        shift: "",
        alternateNumber: "",
        bankName: "",
        accountNumber: "",
        branch: "",
        ifsc: "",
        bankCode: "",
        bankAddress: "",
        country: "",
        accountType: "",
        dob: "",
        dateOfJoining: "",
        workStatus: "Active",
        startDate: new Date().toISOString().split("T")[0],
        endDate: null,
      });
      setApplicantInfo(null);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error: " + error.message);
    }
  };

  const renderInput = (
    label,
    field,
    type = "text",
    required = false,
    disabled = false
  ) => (
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
        input: { color: "white" }, // input text color
        label: { color: "white" }, // label color
        ".MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // normal border
          },
          "&:hover fieldset": {
            borderColor: "white", // hover border
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // focused border
          },
        },
      }}
      InputLabelProps={{
        shrink: formData[field] !== "",
        sx: { fontSize: 18 },
      }}
      InputProps={{ sx: { fontSize: 18, height: 60 }, disabled: disabled }}
      disabled={disabled}
    />
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 6,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        color: "white",
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        mb={2}
        sx={{ color: "white" }}
      >
        Create New Employee
      </Typography>

      {/* Employee Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Employee Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput(
            "Applicant ID (Optional)",
            "applicantId",
            "text",
            false,
            false
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput(
            "First Name",
            "firstName",
            "text",
            true,
            applicantInfo !== null
          )}
          {renderInput(
            "Last Name",
            "lastName",
            "text",
            true,
            applicantInfo !== null
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput("Designation", "designation")}
          <TextField
            required
            select
            label="Department"
            value={formData.departmentId}
            onChange={handleChange("departmentId")}
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput(
            "Email",
            "emailId",
            "text",
            true,
            applicantInfo !== null
          )}
          {renderInput(
            "Phone",
            "phoneNumber",
            "text",
            true,
            applicantInfo !== null
          )}
        </Box>
      </Box>

      {/* Personal Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Personal Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <TextField
            required
            select
            label="Gender"
            value={formData.gender}
            onChange={handleChange("gender")}
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
            disabled={applicantInfo !== null}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          {renderInput(
            "Qualification",
            "qualification",
            "text",
            false,
            applicantInfo !== null
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput(
            "Address",
            "address",
            "text",
            false,
            applicantInfo !== null
          )}
          <TextField
            required
            select
            label="Marital Status"
            value={formData.maritalStatus}
            onChange={handleChange("maritalStatus")}
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
            disabled={applicantInfo !== null}
          >
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Unmarried">Unmarried</MenuItem>
          </TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput(
            "Emergency Contact Name",
            "emergencyContactName",
            "text",
            false,
            applicantInfo !== null
          )}
          {renderInput(
            "Emergency Contact Number",
            "emergencyContactNumber",
            "text",
            false,
            applicantInfo !== null
          )}
        </Box>

        {/* NEW FIELDS */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <TextField
            required
            select
            label="Shift"
            value={formData.shift}
            onChange={handleChange("shift")}
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            {shifts.map((shift) => (
              <MenuItem key={shift.shiftId} value={shift.shiftId}>
                {shift.shiftType}
              </MenuItem>
            ))}
          </TextField>

          {renderInput(
            "Alternate Number",
            "alternateNumber",
            "text",
            false,
            applicantInfo !== null
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <TextField
            required
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={handleChange("dob")}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            disabled={applicantInfo !== null}
          />
          <TextField
            required
            label="Date of Joining"
            type="date"
            value={formData.dateOfJoining}
            onChange={handleChange("dateOfJoining")}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
          />
        </Box>
      </Box>

      {/* Bank Information */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Bank Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput("Bank Name", "bankName")}
          {renderInput("Account Number", "accountNumber")}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput("Branch", "branch")}
          {renderInput("IFSC", "ifsc")}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput("Bank Code", "bankCode")}
          {renderInput("Bank Address", "bankAddress")}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {renderInput("Country", "country")}
          <TextField
            required
            select
            label="Account Type"
            value={formData.accountType}
            onChange={handleChange("accountType")}
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            InputProps={{ sx: { fontSize: 18, height: 60 } }}
            InputLabelProps={{ sx: { fontSize: 18 } }}
          >
            <MenuItem value="Saving">Saving</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* Shift Assignment - Added UI for startDate and endDate */}
      <Box>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Shift Assignment
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <TextField
            required
            label="Start Date"
            type="date"
            value={formData.startDate}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            disabled // Set to current date on load, so disable editing
          />
          <TextField
            label="End Date (Optional)"
            type="date"
            value={formData.endDate || ""}
            onChange={handleChange("endDate")}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
          />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{
          alignSelf: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
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
