import React, { useRef } from "react";
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
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../assets/images/st_logo.png";

const Payslip = () => {
  const payslipRef = useRef();

  const handleDownloadPDF = () => {
    const input = payslipRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10; // padding on all sides
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.width / imgProps.height;
      const pdfRatio = availableWidth / availableHeight;

      let imgWidth = availableWidth;
      let imgHeight = availableHeight;

      if (imgRatio > pdfRatio) {
        // image is wider
        imgHeight = availableWidth / imgRatio;
      } else {
        // image is taller
        imgWidth = availableHeight * imgRatio;
      }

      const x = margin + (availableWidth - imgWidth) / 2;
      const y = margin + (availableHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save("payslip.pdf");
    });
  };

  const summary = {
    netPay: 7070,
    actualBasic: 15000,
    paidDays: 16,
    lopDays: 0,
    updatedBasic: 10000,
    grossPay: 10100,
    deductions: 3030,
  };

  const allowances = [{ label: "Basic Pay", amount: 10000 }];

  const deductions = [
    { label: "Loss of Pay", amount: 0 },
    { label: "Federal Tax", amount: 0 },
    { label: "PAYE Upper Range", amount: 3030 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Payslip</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="primary" aria-label="send email">
            <EmailIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="download payslip"
            onClick={handleDownloadPDF}
          >
            <DownloadIcon />
          </IconButton>
          <TextField select size="small" defaultValue="Draft">
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Finalized">Finalized</MenuItem>
          </TextField>
        </Box>
      </Box>

      <div ref={payslipRef}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {/* Left side: Logo + Company name */}
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Logo" style={{ height: 32 }} />
          </Box>

          {/* Right side: Date */}
          <Box>
          <Typography variant="h6">Sarat Tech PVT LTD.</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Payslip of Apr. 10, 2025 to May. 9, 2025
          </Typography>
          </Box>
        </Box>

        <Divider
          sx={{ mb: 4, borderBottomWidth: 3, borderColor: "grey.600" }}
        />

        {/* Main Content */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ borderTop: "6px solid red" }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Employee Details
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{ bgcolor: "#f6fff4", borderLeft: "6px solid green" }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ color: "green" }}>
                  ₹ {summary.netPay.toFixed(2)}
                </Typography>
                <Typography variant="body2">Employee Net Pay</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                  Actual Basic Pay: ₹{summary.actualBasic}
                </Typography>
                <Typography>Paid Days: {summary.paidDays}</Typography>
                <Typography>LOP Days: {summary.lopDays}</Typography>
                <Typography>
                  Updated Basic Pay: ₹{summary.updatedBasic}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#888" }}>
                  The payslip is calculated based on the updated basic pay
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Taxable Gross Pay: ₹{summary.grossPay.toFixed(2)}
                </Typography>
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
                      <TableCell>Label</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allowances.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>₹ {row.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <b>Total Gross Pay</b>
                      </TableCell>
                      <TableCell>
                        <b>₹ {summary.grossPay.toFixed(2)}</b>
                      </TableCell>
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
                      <TableCell>Label</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deductions.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>₹ {row.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <b>Total Deductions</b>
                      </TableCell>
                      <TableCell>
                        <b>₹ {summary.deductions.toFixed(2)}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Total Net Payable */}
        <Box
          mt={3}
          component={Paper}
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Total Net Payable</Typography>
          <Typography variant="h5" color="primary">
            ₹ {summary.netPay.toFixed(2)}
          </Typography>
        </Box>
      </div>

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
