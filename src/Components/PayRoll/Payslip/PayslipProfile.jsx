import React, { useEffect, useRef, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RemoveIcon from "@mui/icons-material/Remove";
import logo from "./../../../assets/images/st_logo.png"; // Adjust path as needed

// Define your backend API base URL.
// It's good practice to use an environment variable for this.
// For local development, you might hardcode it like 'http://localhost:8084'
// or 'http://192.168.1.49:8084' if you're using a specific local IP.
const API_BASE_URL = "http://192.168.1.49:8084"; // Replace with your actual backend URL

const Payslip = () => {
  const [employee, setEmployee] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    bankDetailId: null,
    bankName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    bankCode: "",
    bankAddress: "",
    country: "",
    accountType: "",
  });
  const [payrollData, setPayrollData] = useState(null); // State to store payroll data
  const [isPaid, setIsPaid] = useState(false); // State to track if payroll is paid

  const payslipRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // State to hold salary additions fetched from the backend, including their backend ID
  const [allowances, setAllowances] = useState([]);
  // State to hold all available allowance types from the backend (for the dropdown)
  const [allAvailableAllowances, setAllAvailableAllowances] = useState([]);

  // State for the "Add New Allowance" dialog
  const [openAllowanceDialog, setOpenAllowanceDialog] = useState(false);
  const [selectedAllowanceId, setSelectedAllowanceId] = useState(""); // Stores the ID of the selected allowance type (initialized to empty string)
  const [selectedAllowanceAmount, setSelectedAllowanceAmount] = useState(0); // Stores the amount of the selected allowance type

  // Deductions are now connected to backend
  const [deductions, setDeductions] = useState([]);
  const [allAvailableDeductions, setAllAvailableDeductions] = useState([]);

  const [openDeductionDialog, setOpenDeductionDialog] = useState(false);
  const [selectedDeductionId, setSelectedDeductionId] = useState("");
  const [selectedDeductionAmount, setSelectedDeductionAmount] = useState(0); // Initialized to 0 (number)

  // --- Data Fetching useEffect ---
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) {
      console.warn("Employee ID not found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch Employee Details
        const employeeResponse = await fetch(`${API_BASE_URL}/api/employees/${employeeId}`);
        const employeeData = await employeeResponse.json();
        setEmployee({
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          employeeId: employeeData.employeeId,
          profileImage: "/default-profile.png",
          designation: employeeData.designation,
          phoneNumber: employeeData.phoneNumber,
          alternateNumber: employeeData.alternateNumber || "",
          emailId: employeeData.emailId,
          dob: employeeData.dob,
          dateOfJoining: employeeData.dateOfJoining,
          salary: employeeData.salary,
        });

        // Fetch Bank Details
        const bankResponse = await fetch(`${API_BASE_URL}/bank-details`);
        const bankDetailsList = await bankResponse.json();
        const employeeBankDetails = bankDetailsList.find((item) => item.employeeId === +employeeId);
        if (employeeBankDetails) {
          setBankDetails(employeeBankDetails);
        }

        // Fetch all available Allowance types
        const allAllowancesResponse = await fetch(`${API_BASE_URL}/api/allowances`);
        const allAllowancesData = await allAllowancesResponse.json();
        setAllAvailableAllowances(allAllowancesData);

        // Fetch Salary Additions (Allowances linked to this employee)
        const salaryAdditionsResponse = await fetch(`${API_BASE_URL}/salary-addition`);
        const salaryAdditionsData = await salaryAdditionsResponse.json();

        // Filter salary additions for the current employee and map to frontend format
        const employeeAllowances = salaryAdditionsData
          .filter(sa => sa.employeeId === +employeeId)
          .map((sa) => ({
            salaryAdditionId: sa.salaryAdditionId, // Keep this for deletion
            allowanceId: sa.allowanceId, // Keep this for sending back to backend
            label: sa.allowanceLabel,
            amount: sa.allowanceAmount,
          }));
        setAllowances(employeeAllowances);

        // Fetch all available Deduction types (Assuming /api/deductions endpoint)
        const allDeductionsResponse = await fetch(`${API_BASE_URL}/deduction`);
        const allDeductionsData = await allDeductionsResponse.json();
        setAllAvailableDeductions(allDeductionsData);

        // Fetch Salary Deductions (Deductions linked to this employee)
        const salaryDeductionsResponse = await fetch(`${API_BASE_URL}/salary-deduction`);
        const salaryDeductionsData = await salaryDeductionsResponse.json();

        // Filter salary deductions for the current employee and map to frontend format
        const employeeDeductions = salaryDeductionsData
          .filter(sd => sd.employeeId === +employeeId)
          .map((sd) => ({
            salaryDeductionId: sd.salaryDeductionId, // Keep this for deletion
            deductionId: sd.deductionId, // Keep this for sending back to backend
            label: sd.deductionLabel, // Corrected to use deductionLabel from DTO
            amount: sd.deductionAmount, // Corrected to use deductionAmount from DTO
          }));
        setDeductions(employeeDeductions);

        // Fetch Payroll Data for the current employee and current month/year
        const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed
        const currentYear = new Date().getFullYear();

        const payrollResponse = await fetch(`${API_BASE_URL}/payroll`);
        if (payrollResponse.ok) {
          const allPayrolls = await payrollResponse.json();
          const employeePayroll = allPayrolls.find(
            (p) => p.employeeId === +employeeId && p.month === currentMonth && p.year === currentYear
          );

          if (employeePayroll) {
            setPayrollData(employeePayroll);
            setIsPaid(employeePayroll.status === 'Paid');
          } else {
            console.warn("No payroll found for this employee for the current month/year.");
            // Optionally, trigger payroll generation here if needed, or set a default state
            // For now, if no payroll is found, payrollData remains null and editing is enabled by default.
          }
        } else {
          console.error("Failed to fetch payroll data:", payrollResponse.statusText);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Allowance Handlers ---
  const handleAllowanceDialogClose = () => {
    setOpenAllowanceDialog(false);
    setSelectedAllowanceId("");
    setSelectedAllowanceAmount(0);
  };

  const handleAllowanceSelectChange = (event) => {
    const id = event.target.value;
    setSelectedAllowanceId(id);
    const selected = allAvailableAllowances.find(
      (allowance) => allowance.allowanceId === id
    );
    if (selected) {
      setSelectedAllowanceAmount(selected.amount);
    } else {
      setSelectedAllowanceAmount(0);
    }
  };

  const handleAddAllowance = async () => {
    if (!selectedAllowanceId || !employee?.employeeId) {
      console.error("Allowance not selected or Employee ID missing.");
      return;
    }

    try {
      const newSalaryAddition = {
        employeeId: employee.employeeId,
        allowanceId: selectedAllowanceId,
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      };

      const response = await fetch(`${API_BASE_URL}/salary-addition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSalaryAddition),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedSalaryAddition = await response.json();
      console.log("Added Salary Addition:", addedSalaryAddition);

      // Re-fetch all salary additions to update the list with the new entry and correct data
      const salaryAdditionsResponse = await fetch(`${API_BASE_URL}/salary-addition`);
      const salaryAdditionsData = await salaryAdditionsResponse.json();
      const employeeAllowances = salaryAdditionsData
        .filter(sa => sa.employeeId === +employee.employeeId)
        .map((sa) => ({
          salaryAdditionId: sa.salaryAdditionId,
          allowanceId: sa.allowanceId,
          label: sa.allowanceLabel,
          amount: sa.allowanceAmount,
        }));
      setAllowances(employeeAllowances);

      handleAllowanceDialogClose(); // Close dialog and reset state
    } catch (error) {
      console.error("Error adding allowance:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleRemoveAllowance = async (salaryAdditionIdToRemove) => {
    try {
      const response = await fetch(`${API_BASE_URL}/salary-addition/${salaryAdditionIdToRemove}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Allowance with ID ${salaryAdditionIdToRemove} deleted.`);

      // Re-fetch all salary additions to update the list
      const salaryAdditionsResponse = await fetch(`${API_BASE_URL}/salary-addition`);
      const salaryAdditionsData = await salaryAdditionsResponse.json();
      const employeeAllowances = salaryAdditionsData
        .filter(sa => sa.employeeId === +employee.employeeId)
        .map((sa) => ({
          salaryAdditionId: sa.salaryAdditionId,
          allowanceId: sa.allowanceId,
          label: sa.allowanceLabel,
          amount: sa.allowanceAmount,
        }));
      setAllowances(employeeAllowances);

    } catch (error) {
      console.error("Error removing allowance:", error);
      // You might want to show an error message to the user here
    }
  };

  // --- Deduction Handlers ---
  const handleDeductionDialogClose = () => {
    setOpenDeductionDialog(false);
    setSelectedDeductionId("");
    setSelectedDeductionAmount(0); // Reset to 0 (number)
  };

  const handleDeductionSelectChange = (event) => {
    const id = event.target.value;
    setSelectedDeductionId(id);
    const selected = allAvailableDeductions.find(
      (deduction) => deduction.deductionId === id
    );
    if (selected) {
      setSelectedDeductionAmount(selected.amount);
    } else {
      setSelectedDeductionAmount(0);
    }
  };

  const handleAddDeduction = async () => {
    if (!selectedDeductionId || !employee?.employeeId) {
      console.error("Deduction not selected or Employee ID missing.");
      return;
    }

    try {
      const newSalaryDeduction = {
        employeeId: employee.employeeId,
        deductionId: selectedDeductionId,
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      };

      const response = await fetch(`${API_BASE_URL}/salary-deduction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSalaryDeduction),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedSalaryDeduction = await response.json();
      console.log("Added Salary Deduction:", addedSalaryDeduction);

      // Re-fetch all salary deductions to update the list with the new entry and correct data
      const salaryDeductionsResponse = await fetch(`${API_BASE_URL}/salary-deduction`);
      const salaryDeductionsData = await salaryDeductionsResponse.json();
      const employeeDeductions = salaryDeductionsData
        .filter(sd => sd.employeeId === +employee.employeeId)
        .map((sd) => ({
          salaryDeductionId: sd.salaryDeductionId,
          deductionId: sd.deductionId,
          label: sd.deductionLabel, // Corrected to use deductionLabel from DTO
          amount: sd.deductionAmount, // Corrected to use deductionAmount from DTO
        }));
      setDeductions(employeeDeductions);

      handleDeductionDialogClose(); // Close dialog and reset state
    } catch (error) {
      console.error("Error adding deduction:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleRemoveDeduction = async (salaryDeductionIdToRemove) => {
    try {
      const response = await fetch(`${API_BASE_URL}/salary-deduction/${salaryDeductionIdToRemove}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Deduction with ID ${salaryDeductionIdToRemove} deleted.`);

      // Re-fetch all salary deductions to update the list
      const salaryDeductionsResponse = await fetch(`${API_BASE_URL}/salary-deduction`);
      const salaryDeductionsData = await salaryDeductionsResponse.json();
      const employeeDeductions = salaryDeductionsData
        .filter(sd => sd.employeeId === +employee.employeeId)
        .map((sd) => ({
          salaryDeductionId: sd.salaryDeductionId,
          deductionId: sd.deductionId,
          label: sd.deductionLabel,
          amount: sd.deductionAmount,
        }));
      setDeductions(employeeDeductions);

    } catch (error) {
      console.error("Error removing deduction:", error);
      // You might want to show an error message to the user here
    }
  };

  // --- Status Change Handler ---
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    if (!payrollData || !payrollData.payrollId) {
      console.error("Payroll data not available to update status.");
      return;
    }

    try {
      const updatedPayroll = { ...payrollData, status: newStatus };
      const response = await fetch(`${API_BASE_URL}/payroll/${payrollData.payrollId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPayroll),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPayrollData(result); // Update local state with the new payroll data
      setIsPaid(result.status === 'Paid'); // Update isPaid state
      console.log("Payroll status updated successfully:", result);
    } catch (error) {
      console.error("Error updating payroll status:", error);
      // Show error message to user
    }
  };

  // --- Summary Calculation ---
  const summary = {
    actualBasic: employee?.salary || 0, // Use employee's actual salary
    paidDays: 16, // Static for now, can be dynamic
    lopDays: 0, // Static for now, can be dynamic
    updatedBasic: employee?.salary || 0, // Static for now, can be dynamic
    grossPay: allowances.reduce((sum, row) => sum + row.amount, 0) + (employee?.salary || 0), // Gross pay includes basic salary
    deductions: deductions.reduce((sum, row) => sum + row.amount, 0),
    netPay:
      (employee?.salary || 0) + // Start with basic salary
      allowances.reduce((sum, row) => sum + row.amount, 0) - // Add allowances
      deductions.reduce((sum, row) => sum + row.amount, 0), // Subtract deductions
  };

  // --- PDF Download Handler ---
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Payslip...</Typography>
      </Box>
    );
  }

  // Format the payslip date
  const payslipDate = payrollData ?
    new Date(payrollData.year, payrollData.month - 1).toLocaleString('en-US', { month: 'short', year: 'numeric' }) :
    'N/A';

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Payslip</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="primary" onClick={handleDownloadPDF}>
            <DownloadIcon />
          </IconButton>
          <TextField
            select
            size="small"
            value={payrollData?.status || "Pending"} // Use payrollData.status or default to "Pending"
            onChange={handleStatusChange} // Handle status change
            disabled={isPaid} // Disable if paid
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Confirmation">Confirmation</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
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
              Payslip of: {payslipDate}
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
                  <span style={{ color: "gray", fontWeight: "bold" }}>EmployeeId:</span> {employee?.employeeId}
                </Typography>
                <Typography>
                  Employee Name: <strong>{employee?.firstName + " " + employee?.lastName}</strong>
                </Typography>
                <Typography>
                  Date of Birth: <strong>{employee?.dob}</strong>
                </Typography>
                <Typography>
                  Designation: <strong>{employee?.designation}</strong>
                </Typography>
                <Typography>
                  Date of Joining: <strong>{employee?.dateOfJoining}</strong>
                </Typography>
                <Typography>
                  Bank Acc No: <strong>{bankDetails.accountNumber}</strong>
                </Typography>
                <Typography>
                  Bank Name: <strong>{bankDetails.bankName}</strong>
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
                  {!isDownloading && !isPaid && ( // Disable if paid
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
                      {!isDownloading && !isPaid && <TableCell>Action</TableCell>} {/* Disable if paid */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allowances.map((row) => (
                      <TableRow key={row.salaryAdditionId}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>₹ {row.amount.toFixed(2)}</TableCell>
                        {!isDownloading && !isPaid && ( // Disable if paid
                          <TableCell>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveAllowance(row.salaryAdditionId)}
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
                      <TableCell></TableCell> {/* Empty cell for alignment */}
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
                  {!isDownloading && !isPaid && ( // Disable if paid
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
                      {!isDownloading && !isPaid && <TableCell>Action</TableCell>} {/* Disable if paid */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deductions.map((row) => (
                      <TableRow key={row.salaryDeductionId}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>₹ {row.amount.toFixed(2)}</TableCell>
                        {!isDownloading && !isPaid && ( // Disable if paid
                          <TableCell>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveDeduction(row.salaryDeductionId)}
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
                      <TableCell></TableCell> {/* Empty cell for alignment */}
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
        onClose={handleAllowanceDialogClose}
      >
        <DialogTitle>Add New Allowance</DialogTitle>
        <DialogContent>
          <TextField
            select
            autoFocus
            margin="dense"
            label="Select Allowance Type"
            fullWidth
            value={selectedAllowanceId}
            onChange={handleAllowanceSelectChange}
          >
            {allAvailableAllowances.map((allowance) => (
              <MenuItem key={allowance.allowanceId} value={allowance.allowanceId}>
                {allowance.allowance} (₹{allowance.amount.toFixed(2)})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={selectedAllowanceAmount.toFixed(2)}
            InputProps={{
              readOnly: true, // Amount is derived from selected allowance
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllowanceDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddAllowance}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deduction Dialog */}
      <Dialog
        open={openDeductionDialog}
        onClose={handleDeductionDialogClose}
      >
        <DialogTitle>Add New Deduction</DialogTitle>
        <DialogContent>
          <TextField
            select
            autoFocus
            margin="dense"
            label="Select Deduction Type"
            fullWidth
            value={selectedDeductionId}
            onChange={handleDeductionSelectChange}
          >
            {allAvailableDeductions.map((deduction) => (
              <MenuItem key={deduction.deductionId} value={deduction.deductionId}>
                {deduction.deduction} (₹{deduction.amount.toFixed(2)})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={selectedDeductionAmount.toFixed(2)}
            InputProps={{
              readOnly: true, // Amount is derived from selected Deduction
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeductionDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddDeduction}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payslip;