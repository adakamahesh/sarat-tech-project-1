import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleSignup = () => {
    console.log("Signup Email:", email);
    console.log("Signup Password:", password);
    navigate("/login"); // Redirect to Login after Signup
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
          Signup
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
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleSignup}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;