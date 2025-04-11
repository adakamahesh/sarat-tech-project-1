// import React, { useState } from "react";
// import {
//   TextField, Button, Typography, Container, Box, Grid,
//   Link, IconButton, InputAdornment, Paper
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (email === "adakamahesh@gmail.com" && password === "Mahesh@123") {
//       localStorage.setItem("isAuthenticated", "true");
//       navigate("/home");
//     } else {
//       setError("Invalid email or password!");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>

//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <TextField
//           fullWidth
//           label="Email"
//           type="email"
//           variant="outlined"
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           label="Password"
//           type={showPassword ? "text" : "password"}
//           variant="outlined"
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box textAlign="right" sx={{ mt: 1 }}>
//           <Link component="button" variant="body2" onClick={() => navigate("/forgot-password")}>
//             Forgot Password?
//           </Link>
//         </Box>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={6}>
//             <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
//               Login
//             </Button>
//           </Grid>
//           <Grid item xs={6}>
//             <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/signup")}>
//               Signup
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const API_URL=process.env.REACT_APP_BASE_URL;
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
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
          label="Username"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box textAlign="right" sx={{ mt: 1 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Link>
        </Box>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;