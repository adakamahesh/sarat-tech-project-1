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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import CodeIcon from "@mui/icons-material/Code";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function BankInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankDetailId: null,
    bankName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    bankCode: "",
    bankAddress: "",
    country: "",
    accountType: "",
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      const employeeId = localStorage.getItem("newEmyID") || localStorage.getItem("employeeId");
      if (!employeeId) return;

      try {
        const response = await fetch(`${API_URL}bank-details`);
        const data = await response.json();
        const employeeData = data.find((item) => item.employeeId === +employeeId);
        if (employeeData) {
          setBankDetails(employeeData);
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, []);

  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const employeeId = localStorage.getItem("employeeId");
    try {
      await fetch(`${API_URL}bank-details/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankDetails),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving bank details:", error);
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <Card
        sx={{
          maxWidth: 600,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          position: "relative",
          mx: "auto",
          [theme => theme.breakpoints.down("sm")]: {
            p: 2,
            maxWidth: "100%",
          },
        }}
      >
        {!isEditing && (
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
            onClick={() => setIsEditing(true)}
          >
            <EditNoteIcon />
          </IconButton>
        )}

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{color:'white'}}>
            Bank Information
          </Typography>

          {isEditing ? (
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{
                [theme => theme.breakpoints.down("sm")]: {
                  gap: 1.5,
                },
              }}
            >
              <TextField
                label="Bank Name"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="Account Number"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="Branch"
                name="branch"
                value={bankDetails.branch}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="IFSC"
                name="ifsc"
                value={bankDetails.ifsc}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="Bank Code"
                name="bankCode"
                value={bankDetails.bankCode}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="Bank Address"
                name="bankAddress"
                value={bankDetails.bankAddress}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="Country"
                name="country"
                value={bankDetails.country}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                label="Account Type"
                name="accountType"
                value={bankDetails.accountType}
                onChange={handleChange}
                fullWidth
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                mt={2}
                sx={{
                  [theme => theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    gap: 1.5,
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ backgroundColor: "white", color: "#000" }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              gap={1.5}
              sx={{
                [theme => theme.breakpoints.down("sm")]: {
                  gap: 1,
                },
              }}
            >
              {[
                {
                  icon: <AccountBalanceIcon />,
                  label: "Bank Name",
                  value: bankDetails.bankName,
                },
                {
                  icon: <CreditCardIcon />,
                  label: "Account Number",
                  value: bankDetails.accountNumber,
                },
                {
                  icon: <StoreIcon />,
                  label: "Branch",
                  value: bankDetails.branch,
                },
                { icon: <CodeIcon />, label: "IFSC", value: bankDetails.ifsc },
                {
                  icon: <CodeIcon />,
                  label: "Bank Code",
                  value: bankDetails.bankCode,
                },
                {
                  icon: <LocationOnIcon />,
                  label: "Bank Address",
                  value: bankDetails.bankAddress,
                },
                {
                  icon: <PublicIcon />,
                  label: "Country",
                  value: bankDetails.country,
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    [theme => theme.breakpoints.down("sm")]: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 0.5,
                    },
                  }}
                >
                  <Box sx={{ color: "white" }}>{item.icon}</Box>
                  <Typography sx={{ color: "white",fontWeight:'bold' }}>{item.label}:</Typography>
                  <Typography sx={{ color: "white" }}>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}