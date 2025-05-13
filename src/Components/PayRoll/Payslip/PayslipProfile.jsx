import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";

const Payslip = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Payslip</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="primary" aria-label="send email">
            <EmailIcon />
          </IconButton>
          <IconButton color="primary" aria-label="download payslip">
            <DownloadIcon />
          </IconButton>
          <TextField select size="small" defaultValue="Draft">
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Finalized">Finalized</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Apr. 10, 2025 to May. 9, 2025
      </Typography>

      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Left: Employee Details */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Employee Details
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>
                    Employee ID: <strong>DNA0010</strong>
                  </Typography>
                  <Typography>
                    Employee Name: <strong>JATINDER SINGH MANJIT SINGH</strong>
                  </Typography>
                  <Typography>
                    Department: <strong>S/W Dept</strong>
                  </Typography>
                  <Typography>
                    Bank Acc./Cheque No: <strong>-</strong>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right: Net Pay */}
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{ bgcolor: "#f6fff4", borderLeft: "6px solid green" }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ color: "green" }}>
                ₦ 7070.00
              </Typography>
              <Typography variant="body2">Employee Net Pay</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>Actual Basic Pay: ₦15000.0</Typography>
              <Typography>Paid Days: 16.0</Typography>
              <Typography>LOP Days: 0.0</Typography>
              <Typography>Updated Basic Pay: ₦10000.0</Typography>
              <Typography sx={{ fontSize: 12, color: "#888" }}>
                The payslip is calculated based on the updated basic pay
              </Typography>
              <Typography sx={{ mt: 1 }}>Taxable Gross Pay: ₦10100.00</Typography>
              <Typography sx={{ fontSize: 12, color: "#888" }}>
                taxable amount
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Allowances and Deductions */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1">Allowances</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Basic Pay</TableCell>
                    <TableCell>₦10000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1">Deductions</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Loss of Pay</TableCell>
                    <TableCell>₦0.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Add Button */}
      <Fab
        color="error"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Payslip;