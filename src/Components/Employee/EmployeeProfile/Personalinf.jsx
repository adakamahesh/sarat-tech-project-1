import * as React from "react";
import { Box, Typography, IconButton, Card, CardContent, TextField, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CallIcon from "@mui/icons-material/Call";

export default function PersonalInfoCard() {
  const [isEditing, setIsEditing] = React.useState(false);

  const [personalDetails, setPersonalDetails] = React.useState({
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Main Street, Mumbai, India",
    qualification: "Bachelor's in Computer Science",
    experience: "5 Years",
    maritalStatus: "Married",
    children: "2",
    emergencyContactName: "John Doe",
    emergencyContact: "+91 9876543210",
  });

  const handleChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 600, p: 3, boxShadow: 3, position: "relative" }}>
        {!isEditing && (
          <IconButton sx={{ position: "absolute", top: 10, right: 10, color: "gray" }} onClick={() => setIsEditing(true)}>
            <EditNoteIcon />
          </IconButton>
        )}

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Personal Information
          </Typography>

          {isEditing ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Date of Birth" name="dateOfBirth" value={personalDetails.dateOfBirth} onChange={handleChange} fullWidth />
              <TextField label="Gender" name="gender" value={personalDetails.gender} onChange={handleChange} fullWidth />
              <TextField label="Address" name="address" value={personalDetails.address} onChange={handleChange} fullWidth />
              <TextField label="Qualification" name="qualification" value={personalDetails.qualification} onChange={handleChange} fullWidth />
              <TextField label="Experience" name="experience" value={personalDetails.experience} onChange={handleChange} fullWidth />
              <TextField label="Marital Status" name="maritalStatus" value={personalDetails.maritalStatus} onChange={handleChange} fullWidth />
              <TextField label="Children" name="children" value={personalDetails.children} onChange={handleChange} fullWidth />
              <TextField label="Emergency Contact Name" name="emergencyContactName" value={personalDetails.emergencyContactName} onChange={handleChange} fullWidth />
              <TextField label="Emergency Contact" name="emergencyContact" value={personalDetails.emergencyContact} onChange={handleChange} fullWidth />

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              {[
                { icon: <CalendarTodayIcon />, label: "Date of Birth", value: personalDetails.dateOfBirth },
                { icon: <PersonIcon />, label: "Gender", value: personalDetails.gender },
                { icon: <HomeIcon />, label: "Address", value: personalDetails.address },
                { icon: <SchoolIcon />, label: "Qualification", value: personalDetails.qualification },
                { icon: <WorkIcon />, label: "Experience", value: personalDetails.experience },
                { icon: <FamilyRestroomIcon />, label: "Marital Status", value: personalDetails.maritalStatus },
                { icon: <ChildCareIcon />, label: "Children", value: personalDetails.children },
                { icon: <ContactPhoneIcon />, label: "Emergency Contact Name", value: personalDetails.emergencyContactName },
                { icon: <CallIcon />, label: "Emergency Contact", value: personalDetails.emergencyContact },
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