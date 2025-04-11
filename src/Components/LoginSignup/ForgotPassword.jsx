import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/images/login.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    console.log("Reset link sent to:", email);
    navigate("/login");
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
            sm: 300,      // Tablets
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
          Forgot Password
        </Typography>
        <Typography variant="body2" color="white" sx={{ mb: 2 }}>
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
          sx={{ input: { color: "white" }, label: { color: "white" } }}
        />

        <Button
          variant="outlined"
          fullWidth
          onClick={handleResetPassword}
          sx={{
            mt: 2,
            color: "white",
            border: "1px solid white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          Send Reset Link
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;