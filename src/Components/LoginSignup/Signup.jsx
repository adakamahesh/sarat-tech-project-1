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

  const whiteTextFieldStyles = {
    "& .MuiInputBase-input": {
      color: "white", // input text
    },
    "& .MuiInputLabel-root": {
      color: "white", // label
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  };
  
  const whiteSelectStyles = {
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiSelect-select": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  };

  const fetchEmailByEmployeeId = async (id) => {
    if (!id) {
      setEmail("");
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.1.49:8084/api/employees/email/${id}`
      );
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
      const response = await axios.post(
        "http://192.168.1.49:8084/api/v1/user/save",
        userData
      );
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
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
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
          sx={whiteTextFieldStyles}
        />
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          sx={whiteTextFieldStyles}
          disabled
        />
        <TextField
          fullWidth
          label="User Name"
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={whiteTextFieldStyles}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={whiteTextFieldStyles}
        />
        <FormControl fullWidth margin="normal" sx={whiteSelectStyles}>
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
          fullWidth
          sx={{
            mt: 2,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            color:'white',
          }}
          onClick={handleSignup}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
