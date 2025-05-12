import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/images/login.jpg";

const API_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (data.status) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("employeeId", data.employeeId);
        localStorage.setItem("employeeName", data.employeeName);
        localStorage.setItem("userPermission", data.userPermission);
        navigate("/home");
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${LoginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: {
            xs: "90%",    // Mobile
            sm: 400,      // Tablets
            md: 480,      // Medium screens
            lg: 500,      // Desktops
          },
          p: {
            xs: 3,
            sm: 4,
          },
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        {/* Login Heading */}
        <Typography
          variant="h5"
          gutterBottom
          color="white"
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
            },
          }}
        >
          Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Email Input */}
        <TextField
          fullWidth
          label="Username"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ input: { color: "white" }, label: { color: "white" } }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password */}
        <Box textAlign="right" sx={{ mt: 1 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/forgot-password")}
            sx={{ color: "#f0f0f0", textDecoration: "underline" }}
          >
            Forgot Password?
          </Link>
        </Box>

        {/* Login Button */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Button
            onClick={handleLogin}
            fullWidth
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "1px solid white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;