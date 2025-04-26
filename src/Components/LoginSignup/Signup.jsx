import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // Function to fetch employee email based on Employee ID
  const fetchEmailByEmployeeId = async (id) => {
    if (!id) {
      setEmail(""); // Reset email if input is cleared
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8084/api/employees/email/${id}`);
      setEmail(response.data);
      setError(""); // Clear error if found
    } catch (error) {
      setEmail(""); // Reset email if employee not found
      setError("Employee not found! Please enter a valid Employee ID.");
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !userName) {
      setError("Please fill in all fields.");
      return;
    }
  
    const userData = {
      username: userName,
      password: password,
      employee: { employeeid: employeeId }, // Assuming employeeId is required
    };
  
    try {
      const response = await axios.post("http://localhost:8084/api/v1/user/save", userData);
      console.log("User saved:", response.data);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Signup failed. Please try again.");
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
        }}
      >
        <Typography variant="h5" gutterBottom>
          Signup
        </Typography>
        <TextField
          fullWidth
          label="Employee ID"
          variant="outlined"
          margin="normal"
          value={employeeId}
          onChange={(e) => {
            setEmployeeId(e.target.value);
            fetchEmailByEmployeeId(e.target.value); // Auto-fetch email
          }}
        />
        {error && <Typography color="error">{error}</Typography>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          disabled // Prevent manual editing
        />
        <TextField
          fullWidth
          label="User Name"
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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