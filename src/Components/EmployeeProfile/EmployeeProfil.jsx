import * as React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Personalinf from "./Personalinf";
import EmployeeCardEdit from "./EmployeeCardEdit";
import BankInfoCard from "./BankInfromation";

export default function EmployeeCard() {
  // State to toggle between view and edit mode
  const [isEditing, setIsEditing] = React.useState(false);

  // Employee details stored in state
  const [employee, setEmployee] = React.useState({
    name: "Mahesh Babu (501)",
    employeeid: "EmployeeId:501",
    profileImage: "/default-profile.png",
    role: "Frontend Developer",
    phone: "+91 9248184693",
    email: "amb@gmail.com",
  });

  // Function to update employee details and exit edit mode
  const handleUpdate = (updatedEmployee) => {
    setEmployee(updatedEmployee); // Save updated data
    setIsEditing(false); // Close edit mode
  };

  // Render edit mode if isEditing is true
  if (isEditing) {
    return <EmployeeCardEdit employee={employee} onSave={handleUpdate} onClose={() => setIsEditing(false)} />;
  }

  return (
    <Box>
      {/* Employee Card Container */}
      <Box
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
        }}
      >
        {/* Edit Button */}
        <IconButton sx={{ position: "absolute", top: 10, right: 10, color: "gray" }} onClick={() => setIsEditing(true)}>
          <EditNoteIcon />
        </IconButton>

        {/* Employee Profile Section */}
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Profile Image */}
            <Avatar src={employee.profileImage} alt={employee.name} sx={{ width: 80, height: 80 }} />
            <Box>
              {/* Employee Name and Role */}
              <Typography variant="h5">{employee.name}</Typography>
              <Typography variant="body1" color="textSecondary">{employee.role}</Typography>
              <Typography variant="body2">{employee.employeeid}</Typography>
            </Box>
          </Box>

          {/* Contact Information Section */}
          <Box sx={{ display: "flex",flexDirection:"column", alignItems: "center", gap: 1,mt:2 }}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MailOutlineIcon sx={{ color: "gray" }} />
              <span style={{ color: "gray", fontWeight: "bold" }}>Email:</span> {employee.email}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LocalPhoneIcon sx={{ color: "gray" }} />
              <span style={{ color: "gray", fontWeight: "bold" }}>Phone:</span> {employee.phone}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 4, mt: 4,width:"100%" }}>
      {/* Personal Information Section */}
      <Box sx={{ mt: 4,width:"50%" }}>
        <Personalinf />
      </Box>
      {/* Bank Information Section */}
      <Box sx={{ mt: 4,width:"50%" }}>
        <BankInfoCard/>
      </Box>
      </Box>
    </Box>
  );
}