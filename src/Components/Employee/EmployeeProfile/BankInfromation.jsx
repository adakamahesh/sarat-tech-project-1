import * as React from "react";
import { Box, Typography, IconButton, Card, CardContent, TextField, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import CodeIcon from "@mui/icons-material/Code";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";

export default function BankInfoCard() {
  const [isEditing, setIsEditing] = React.useState(false);

  const [bankDetails, setBankDetails] = React.useState({
    bankName: "State Bank of India",
    accountNumber: "1234567890",
    branch: "Mumbai Main Branch",
    bankCode: "SBI0001234",
    bankAddress: "Nariman Point, Mumbai, India",
    country: "India",
  });

  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
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
            Bank Information
          </Typography>

          {isEditing ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Bank Name" name="bankName" value={bankDetails.bankName} onChange={handleChange} fullWidth />
              <TextField label="Account Number" name="accountNumber" value={bankDetails.accountNumber} onChange={handleChange} fullWidth />
              <TextField label="Branch" name="branch" value={bankDetails.branch} onChange={handleChange} fullWidth />
              <TextField label="Bank Code" name="bankCode" value={bankDetails.bankCode} onChange={handleChange} fullWidth />
              <TextField label="Bank Address" name="bankAddress" value={bankDetails.bankAddress} onChange={handleChange} fullWidth />
              <TextField label="Country" name="country" value={bankDetails.country} onChange={handleChange} fullWidth />

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              {[
                { icon: <AccountBalanceIcon />, label: "Bank Name", value: bankDetails.bankName },
                { icon: <CreditCardIcon />, label: "Account Number", value: bankDetails.accountNumber },
                { icon: <StoreIcon />, label: "Branch", value: bankDetails.branch },
                { icon: <CodeIcon />, label: "Bank Code", value: bankDetails.bankCode },
                { icon: <LocationOnIcon />, label: "Bank Address", value: bankDetails.bankAddress },
                { icon: <PublicIcon />, label: "Country", value: bankDetails.country },
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
