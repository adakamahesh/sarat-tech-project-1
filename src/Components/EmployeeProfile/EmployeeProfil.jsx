import * as React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Personalinf from "./Personalinf"

export default function EmployeeCard() {
  const employee = {
    name: "Mahesh Babu (501)",
    profileImage: "/default-profile.png",
    Phone: "+91 9248184693",
    email: "amb@gmail.com",
  };

  return (
    <Box>
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
      {/* Edit Icon on Top Right */}
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10, color: "gray" }}
      >
        <EditNoteIcon />
      </IconButton>

      {/* Profile Section */}
      <Box sx={{ display: "flex", gap: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={employee.profileImage}
          alt={employee.name}
          sx={{ width: 60, height: 60 }}
        />
        <Typography variant="h5">{employee.name}</Typography>
      </Box>

      {/* Contact Information */}
      <Box>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MailOutlineIcon sx={{ color: "gray" }} />
          <span style={{ color: "gray", fontWeight: "bold" }}>Work Email:</span>{" "}
          {employee.email}
        </Typography>

        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <MailOutlineIcon sx={{ color: "gray" }} />
          <span style={{ color: "gray", fontWeight: "bold" }}>Email:</span>{" "}
          {employee.email}
        </Typography>

        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <LocalPhoneIcon sx={{ color: "gray" }} />
          <span style={{ color: "gray", fontWeight: "bold" }}>Work Phone:</span>{" "}
          {employee.Phone}
        </Typography>

        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <LocalPhoneIcon sx={{ color: "gray" }} />
          <span style={{ color: "gray", fontWeight: "bold" }}>Phone:</span>{" "}
          {employee.Phone}
        </Typography>
      </Box>
      </Box>
    </Box>
    <Box sx={{mt:4}}>
      <Personalinf/>
    </Box>
    </Box>
  );
}
