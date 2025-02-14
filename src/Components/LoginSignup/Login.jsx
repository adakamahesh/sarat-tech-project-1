import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Grid, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "adakamahesh@gmail.com" && password === "Mahesh@123") {
      console.log("Login successful!");
      navigate("/home"); // Redirect to Home
    } else {
      setError("Invalid email or password!");
    }
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
          textAlign: "center",
          backgroundColor: "#f9f9f9"
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

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
          type={showPassword ? "text" : "password"} // Toggle input type
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password Link */}
        <Box textAlign="right" sx={{ mt: 1 }}>
          <Link component="button" variant="body2" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </Link>
        </Box>

        {/* Login & Signup Buttons */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Login
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;