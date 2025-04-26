import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Button 
    variant="contained" 
    sx={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: "#1976D2",  // Custom color
      color: "#ffffff",            // Text color for the button
      "&:hover": {
        backgroundColor: "#1976D2", // Hover effect color
      },
    }}
    onClick={handleLogout}
  >
    Logout
  </Button>  
  );
};

export default Logout;