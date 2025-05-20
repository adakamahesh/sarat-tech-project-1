import React, { useRef, useState } from "react";
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
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RemoveIcon from "@mui/icons-material/Remove";
import logo from "../../../assets/images/st_logo.png";
import { Rows } from "lucide-react";

const Payslip = () => {
  const payslipRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const [allowances, setAllowances] = useState([
    { label: "Basic Pay", amount: 10000 },
  ]);
  const [deductions, setDeductions] = useState([
    { label: "Loss of Pay", amount: 0 },
    { label: "Federal Tax", amount: 0 },
    { label: "PAYE Upper Range", amount: 3030 },
  ]);

  const [openAllowanceDialog, setOpenAllowanceDialog] = useState(false);
  const [newAllowanceLabel, setNewAllowanceLabel] = useState("");
  const [newAllowanceAmount, setNewAllowanceAmount] = useState("");

  const [openDeductionDialog, setOpenDeductionDialog] = useState(false);
  const [newDeductionLabel, setNewDeductionLabel] = useState("");
  const [newDeductionAmount, setNewDeductionAmount] = useState("");

  const handleAddAllowance = () => {
    if (newAllowanceLabel && newAllowanceAmount) {
      setAllowances([
        ...allowances,
        { label: newAllowanceLabel, amount: parseFloat(newAllowanceAmount) },
      ]);
      setNewAllowanceLabel("");
      setNewAllowanceAmount("");
      setOpenAllowanceDialog(false);
    }
  };

  const handleAddDeduction = () => {
    if (newDeductionLabel && newDeductionAmount) {
      setDeductions([
        ...deductions,
        { label: newDeductionLabel, amount: parseFloat(newDeductionAmount) },
      ]);
      setNewDeductionLabel("");
      setNewDeductionAmount("");
      setOpenDeductionDialog(false);
    }
  };

  const handleRemoveAllowance = (label) => {
    const updatedAllowances = allowances.filter((item) => item.label !== label);
    setAllowances(updatedAllowances);
  };

  const handleRemoveDeduction = (label) => {
    const updatedDeductions = deductions.filter((item) => item.label !== label);
    setDeductions(updatedDeductions);
  };

  const summary = {
    actualBasic: 15000,
    paidDays: 16,
    lopDays: 0,
    updatedBasic: 10000,
    grossPay: allowances.reduce((sum, row) => sum + row.amount, 0),
    deductions: deductions.reduce((sum, row) => sum + row.amount, 0),
    netPay:
      allowances.reduce((sum, row) => sum + row.amount, 0) -
      deductions.reduce((sum, row) => sum + row.amount, 0),
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const input = payslipRef.current;

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const padding = 10;

        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.width / imgProps.height;
        const pdfRatio = (pageWidth - padding * 2) / (pageHeight - padding * 2);

        let imgWidth = pageWidth - padding * 2;
        let imgHeight = pageHeight - padding * 2;

        if (imgRatio > pdfRatio) {
          imgHeight = imgWidth / imgRatio;
        } else {
          imgWidth = imgHeight * imgRatio;
        }

        const x = padding + (pageWidth - padding * 2 - imgWidth) / 2;
        const y = padding;

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("payslip.pdf");

        setIsDownloading(false);
      });
    }, 100);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Payslip</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="primary" onClick={handleDownloadPDF}>
            <DownloadIcon />
          </IconButton>
          <TextField select size="small" defaultValue="Draft">
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Finalized">Finalized</MenuItem>
          </TextField>
        </Box>
      </Box>

      <div ref={payslipRef}>
        {/* Company Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Logo" style={{ height: 45 }} />
          </Box>
          <Box>
            <Typography variant="h6">Sarat Tech PVT LTD.</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Payslip of Apr. 10, 2025 to May. 9, 2025
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{ mb: 4, borderBottomWidth: 1, borderColor: "grey.600" }}
        />

        {/* Employee Info + Summary */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Employee Details
                </Typography>
                <Typography>
                  Employee ID: <strong>30</strong>
                </Typography>
                <Typography>
                  Employee Name: <strong>Mahesh Babu Adaka</strong>
                </Typography>
                <Typography>
                  Date of Birth: <strong>06-11-2002</strong>
                </Typography>
                <Typography>
                  Designation: <strong>Frontend Developer</strong>
                </Typography>
                <Typography>
                  Date of Joining: <strong>25-1-2025</strong>
                </Typography>
                <Typography>
                  Bank Acc No: <strong>-</strong>
                </Typography>
                <Typography>
                  Bank Name: <strong>-</strong>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Allowances + Deductions */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {/* Allowances */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1">Allowances</Typography>
                  {!isDownloading && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpenAllowanceDialog(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Label</TableCell>
                      <TableCell>Amount</TableCell>
                      {!isDownloading && <TableCell>Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allowances.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>₹ {row.amount.toFixed(2)}</TableCell>
                        {!isDownloading && (
                          <TableCell>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveAllowance(row.label)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                        )}
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

          {/* Deductions */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1">Deductions</Typography>
                  {!isDownloading && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpenDeductionDialog(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Label</TableCell>
                      <TableCell>Amount</TableCell>
                      {!isDownloading && <TableCell>Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deductions.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>₹ {row.amount.toFixed(2)}</TableCell>
                        {!isDownloading && (
                          <TableCell>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveDeduction(row.label)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                        )}
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

        {/* Net Pay Summary */}
        <Box
          mt={3}
          component={Paper}
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ border: "1px solid #ccc", borderRadius: 1 }}
        >
          <Typography variant="h6">Total Net Payable</Typography>
          <Typography variant="h5" color="primary">
            ₹ {summary.netPay.toFixed(2)}
          </Typography>
        </Box>
      </div>

      {/* Allowance Dialog */}
      <Dialog
        open={openAllowanceDialog}
        onClose={() => setOpenAllowanceDialog(false)}
      >
        <DialogTitle>Add New Allowance</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label"
            fullWidth
            value={newAllowanceLabel}
            onChange={(e) => setNewAllowanceLabel(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newAllowanceAmount}
            onChange={(e) => setNewAllowanceAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAllowanceDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddAllowance}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deduction Dialog */}
      <Dialog
        open={openDeductionDialog}
        onClose={() => setOpenDeductionDialog(false)}
      >
        <DialogTitle>Add New Deduction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label"
            fullWidth
            value={newDeductionLabel}
            onChange={(e) => setNewDeductionLabel(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newDeductionAmount}
            onChange={(e) => setNewDeductionAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeductionDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddDeduction}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payslip;
