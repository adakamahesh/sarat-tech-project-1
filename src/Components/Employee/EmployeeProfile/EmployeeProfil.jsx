import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BankInformation from "./BankInformation";
import PersonalInfoCard from "./Personalinf";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function EmployeeCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeId = localStorage.getItem("newEmyID") || localStorage.getItem("employeeId");
      if (!employeeId) return;

      try {
        const response = await fetch(`${API_URL}api/employees/${employeeId}`);
        const data = await response.json();
        const empData = {
          firstName: data.firstName,
          lastName: data.lastName,
          employeeId: data.employeeId,
          profileImage: "/default-profile.png",
          designation: data.designation,
          phoneNumber: data.phoneNumber,
          alternateNumber: data.alternateNumber || "",
          emailId: data.emailId,
        };
        setEmployee(empData);
        setEditedData(empData);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, []);

  const handleSave = () => {
    setEmployee(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(employee);
    setIsEditing(false);
  };

  if (!employee) return <Typography>Loading...</Typography>;

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
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, color: "gray" }}
          onClick={() => setIsEditing(true)}
        >
          <EditNoteIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Avatar
              src={employee.profileImage}
              alt={`${employee.firstName} ${employee.lastName}`}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              {isEditing ? (
                <>
                  <TextField
                    label="First Name"
                    value={editedData.firstName}
                    onChange={(e) =>
                      setEditedData({ ...editedData, firstName: e.target.value })
                    }
                    size="small"
                    sx={{ mb: 1, width: "100%" }}
                  />
                  <TextField
                    label="Last Name"
                    value={editedData.lastName}
                    onChange={(e) =>
                      setEditedData({ ...editedData, lastName: e.target.value })
                    }
                    size="small"
                    sx={{ width: "100%" }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    EmployeeId: {employee.employeeId}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5">
                    {employee.firstName} {employee.lastName} ({employee.employeeId})
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {employee.designation}
                  </Typography>
                  <Typography variant="body2">
                    EmployeeId: {employee.employeeId}
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: { xs: "center", sm: "flex-start" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {isEditing ? (
              <>
                <TextField
                  label="Email"
                  value={editedData.emailId}
                  onChange={(e) =>
                    setEditedData({ ...editedData, emailId: e.target.value })
                  }
                  size="small"
                  sx={{ width: "100%" }}
                />
                <TextField
                  label="Phone"
                  value={editedData.phoneNumber}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phoneNumber: e.target.value })
                  }
                  size="small"
                  sx={{ width: "100%" }}
                />
                <TextField
                  label="Alternate Phone"
                  value={editedData.alternateNumber}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      alternateNumber: e.target.value,
                    })
                  }
                  size="small"
                  sx={{ width: "100%" }}
                />
              </>
            ) : (
              <>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MailOutlineIcon sx={{ color: "gray" }} />
                  <span style={{ color: "gray", fontWeight: "bold" }}>Email:</span>{" "}
                  {employee.emailId}
                </Typography>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalPhoneIcon sx={{ color: "gray" }} />
                  <span style={{ color: "gray", fontWeight: "bold" }}>Phone:</span>{" "}
                  {employee.phoneNumber}
                </Typography>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalPhoneIcon sx={{ color: "gray" }} />
                  <span style={{ color: "gray", fontWeight: "bold" }}>
                    Alternate Phone:
                  </span>{" "}
                  {employee.alternateNumber || "—"}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {isEditing && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-end" },
              mt: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button variant="outlined" onClick={handleCancel} fullWidth={true}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} fullWidth={true}>
              Save
            </Button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          mt: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
          <PersonalInfoCard />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
          <BankInformation />
        </Box>
      </Box>
    </Box>
  );
}