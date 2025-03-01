import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableHead, TableRow, TableCell, Avatar, Box, Typography, Button } from "@mui/material";

export default function AccessibleTable() {
  // Define employee object
  const employee = {
    name: "Mahesh Babu",
    profileImage: "/default-profile.png",
    role:"UI/UX Design Team",
    employeeid:"Employee ID :501",
    dateofjoin:"Date of Join : 27-01-2025",
    Phone:"+91 9248184693",
    email:"amb@gmail.com",
    birthday:"06-09-2002",
    address:"100 Terminal, Fort Lauderdale, Miami 33315, United States",
    gender:"Male",
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={5} sx={{ fontSize: "25px" }}>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>    
            <Box>
              <Box> 
                <Typography variant="h6">Personal Information</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Profile Image */}
                <Avatar
                  src={employee.profileImage}
                  alt={employee.name}
                  sx={{ width: 60, height: 60 }}
                />
                {/* Name & Info */}
                <Box>
                  <Typography variant="h5">{employee.name}</Typography>
                  <Typography variant="h5" color="textSecondary">{employee.role}</Typography>
                  <Typography variant="body2">{employee.employeeid}</Typography>
                  <Typography variant="body2" color="textSecondary">{employee.dateofjoin}</Typography>
                </Box>
              </Box>
              <Box  sx={{ ml: "10%" }}>
                <Button variant="contained" color="primary" sx={{mt:3}}>Send Message</Button>
              </Box>
            </Box>
            <Box>
                <Typography variant="h6">Phone:</Typography>
                <Typography variant="body2">{employee.Phone}</Typography>
                <Typography variant="h6">Email:</Typography>
                <Typography variant="body2">{employee.email}</Typography>
                <Typography variant="h6">Birthday:</Typography>
                <Typography variant="body2">{employee.birthday}</Typography>
                <Typography variant="h6">Address:</Typography>  
                <Typography variant="body2">{employee.address}</Typography>  
                <Typography variant="h6">Gender:</Typography>
                <Typography variant="body2">{employee.gender}</Typography>
            </Box>
            </Box>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}