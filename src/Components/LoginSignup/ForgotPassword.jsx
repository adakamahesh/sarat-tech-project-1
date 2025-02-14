import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleResetPassword = () => {
    console.log("Reset link sent to:", email);
    navigate("/login"); // Redirect back to login
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 8, 
          p: 4, 
          border: "1px solid #ccc", 
          borderRadius: 2, 
          boxShadow: 3, 
          textAlign: "center" 
        }}
      >
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enter your email to receive a password reset link.
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleResetPassword}
        >
          Send Reset Link
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;