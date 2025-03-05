import * as React from "react";
import { Box, Typography, IconButton, Card, CardContent, TextField, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

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
          <Typography variant="h6" gutterBottom>
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
              <Typography><strong>Bank Name:</strong> {bankDetails.bankName}</Typography>
              <Typography><strong>Account Number:</strong> {bankDetails.accountNumber}</Typography>
              <Typography><strong>Branch:</strong> {bankDetails.branch}</Typography>
              <Typography><strong>Bank Code:</strong> {bankDetails.bankCode}</Typography>
              <Typography><strong>Bank Address:</strong> {bankDetails.bankAddress}</Typography>
              <Typography><strong>Country:</strong> {bankDetails.country}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
