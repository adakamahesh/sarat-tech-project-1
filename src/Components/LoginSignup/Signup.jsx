import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEmailByEmployeeId = async (id) => {
    if (!id) {
      setEmail("");
      return;
    }

    try {
      const response = await axios.get(`http://192.168.1.49:8084/api/employees/email/${id}`);
      setEmail(response.data);
      setError("");
    } catch (error) {
      setEmail("");
      setError("Employee not found! Please enter a valid Employee ID.");
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !userName || !role) {
      setError("Please fill in all fields.");
      return;
    }

    const userData = {
      username: userName,
      password: password,
      employee: { employeeId: parseInt(employeeId) }, 
      userpermission: role,
    };

    try {
      const response = await axios.post("http://192.168.1.49:8084/api/v1/user/save", userData);
      console.log("User saved:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 5,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white
            backdropFilter: "blur(4px)",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            New Registation
          </Typography>
          <TextField
            fullWidth
            label="Employee ID"
            variant="outlined"
            margin="normal"
            value={employeeId}
            onChange={(e) => {
              setEmployeeId(e.target.value);
              fetchEmailByEmployeeId(e.target.value);
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
            disabled
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
          </FormControl>
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