import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CallIcon from "@mui/icons-material/Call";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function Personalinf() {
  const [isEditing, setIsEditing] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    dob: "",
    gender: "",
    address: "",
    qualification: "",
    dateOfJoining: "",
    maritalStatus: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      const employeeId = localStorage.getItem("employeeId");
      if (!employeeId) return;

      try {
        const response = await fetch(`${API_URL}api/employees/${employeeId}`);
        const data = await response.json();
        setPersonalDetails(data);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    fetchPersonalDetails();
  }, []);

  const handleChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const employeeId = localStorage.getItem("employeeId");
    try {
      await fetch(`${API_URL}api/employees/${employeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalDetails),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving personal details:", error);
    }
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 600, p: 3, boxShadow: 3, position: "relative" }}>
        {!isEditing && (
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "gray" }}
            onClick={() => setIsEditing(true)}
          >
            <EditNoteIcon />
          </IconButton>
        )}

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Personal Information
          </Typography>

          {isEditing ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Date of Birth"
                name="dob"
                value={personalDetails.dob}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Gender"
                name="gender"
                value={personalDetails.gender}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Address"
                name="address"
                value={personalDetails.address}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Qualification"
                name="qualification"
                value={personalDetails.qualification}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Date Of Joining"
                name="dateOfJoining"
                value={personalDetails.dateOfJoining}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Marital Status"
                name="maritalStatus"
                value={personalDetails.maritalStatus}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Emergency Contact Name"
                name="emergencyContactName"
                value={personalDetails.emergencyContactName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Emergency Contact"
                name="emergencyContactNumber"
                value={personalDetails.emergencyContactNumber}
                onChange={handleChange}
                fullWidth
              />

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              {[
                {
                  icon: <CalendarTodayIcon />,
                  label: "Date of Birth",
                  value: personalDetails.dob,
                },
                {
                  icon: <PersonIcon />,
                  label: "Gender",
                  value: personalDetails.gender,
                },
                {
                  icon: <HomeIcon />,
                  label: "Address",
                  value: personalDetails.address,
                },
                {
                  icon: <SchoolIcon />,
                  label: "Qualification",
                  value: personalDetails.qualification,
                },
                {
                  icon: <CalendarTodayIcon />,
                  label: "dateOfJoining",
                  value: personalDetails.dateOfJoining,
                },
                {
                  icon: <FamilyRestroomIcon />,
                  label: "Marital Status",
                  value: personalDetails.maritalStatus,
                },
                {
                  icon: <ContactPhoneIcon />,
                  label: "Emergency Contact Name",
                  value: personalDetails.emergencyContactName,
                },
                {
                  icon: <CallIcon />,
                  label: "Emergency Contact",
                  value: personalDetails.emergencyContactNumber,
                },
              ].map((item, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                  <Box sx={{ color: "gray" }}>{item.icon}</Box>
                  <Typography sx={{ color: "gray" }}>{item.label}:</Typography>
                  <Typography sx={{ color: "black" }}>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}