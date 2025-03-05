import * as React from "react";
import { Box, Typography, IconButton, Card, CardContent, TextField, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

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
          <Typography variant="h6" gutterBottom>
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
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography><strong>Date of Birth:</strong> {personalDetails.dateOfBirth}</Typography>
              <Typography><strong>Gender:</strong> {personalDetails.gender}</Typography>
              <Typography><strong>Address:</strong> {personalDetails.address}</Typography>
              <Typography><strong>Qualification:</strong> {personalDetails.qualification}</Typography>
              <Typography><strong>Experience:</strong> {personalDetails.experience}</Typography>
              <Typography><strong>Marital Status:</strong> {personalDetails.maritalStatus}</Typography>
              <Typography><strong>Children:</strong> {personalDetails.children}</Typography>
              <Typography><strong>Emergency Contact Name:</strong> {personalDetails.emergencyContactName}</Typography>
              <Typography><strong>Emergency Contact:</strong> {personalDetails.emergencyContact}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}