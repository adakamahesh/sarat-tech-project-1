import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../assets/images/login.jpg";

const API_URL = process.env.REACT_APP_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/v1/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status) {
        alert("A password reset link has been sent to your email.");
        navigate("/login");
      } else {
        alert(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
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
            xs: "90%",
            sm: 300,
            md: 480,
            lg: 500,
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
          disabled={loading}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;