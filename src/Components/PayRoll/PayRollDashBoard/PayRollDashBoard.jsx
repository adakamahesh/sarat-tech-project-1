import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PaidIcon from "@mui/icons-material/Paid";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TextField from "@mui/material/TextField"; // For DatePicker input
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Date adapter
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; // Localization provider
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // DatePicker component

// Base URL for your Spring Boot backend
const API_BASE_URL = "http://192.168.1.49:8084";

// Payslip Component - Moved into the same file for simplicity as requested
const Payslip = ({ payrollData, selectedStatus }) => {
  // Filter payroll data based on selectedStatus
  const filteredPayrollData = payrollData.filter((item) => {
    if (selectedStatus === null) {
      // If no status is selected, show all EXCEPT "Paid"
      return item.paymentStatus?.toLowerCase() !== "paid";
    } else {
      // If a specific status is selected, show only that status
      return item.paymentStatus?.toLowerCase() === selectedStatus.toLowerCase();
    }
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ color: "white" }}
      >
        Payroll Details{" "}
        {selectedStatus ? `(${selectedStatus} Status)` : "(All Except Paid)"}
      </Typography>
      {filteredPayrollData.length === 0 ? (
        <Typography variant="body1" sx={{ color: "white" }}>
          No payroll entries found for the selected status.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent paper
            backdropFilter: "blur(12px)", // Optional glassmorphism effect
            color: "white",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="payroll table">
            <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Payroll ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Employee ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Employee Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Basic Salary
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Total Addition
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Total Deduction
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Net Pay
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date of Calculation
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Payslip Of
                </TableCell>
                {/* Added Payslip Of column */}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Payment Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayrollData.map((row) => (
                <TableRow
                  key={row.payrollId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {row.payrollId}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.employeeId}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                  >{`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.basicSalary?.toFixed(2) || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.totalGross.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.totalDeduction.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.netPay.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {new Date(row.dateOfCalculation).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.payslipOf
                      ? new Date(row.payslipOf).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  {/* Display Payslip Of */}
                  <TableCell sx={{ color: "white" }}>
                    {row.paymentStatus}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)", // Transparent paper
                        backdropFilter: "blur(4px)", // Optional glassmorphism effect
                        color: "white",
                      }}
                    >
                      Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default function PayRollDashboard() {
  const [payrollData, setPayrollData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGeneratePayrollDialog, setShowGeneratePayrollDialog] =
    useState(false);
  const [employeesToGenerate, setEmployeesToGenerate] = useState([]);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateError, setGenerateError] = useState(null);
  const [generateSuccess, setGenerateSuccess] = useState(null);
  // New state to hold the selected payslip date for each employee in the dialog
  const [selectedPayslipDates, setSelectedPayslipDates] = useState({});

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const fetchPayrollData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/payroll`);
      setPayrollData(response.data);
    } catch (err) {
      console.error("Error fetching payroll data:", err);
      setError(
        "Failed to fetch payroll data. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if an employee has a 'Paid' payroll for the current month
  const hasPaidPayrollForCurrentMonth = (employeeId) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return payrollData.some((item) => {
      const payrollDate = new Date(item.dateOfCalculation);
      return (
        item.employeeId === employeeId &&
        item.paymentStatus?.toLowerCase() === "paid" &&
        payrollDate.getMonth() === currentMonth &&
        payrollDate.getFullYear() === currentYear
      );
    });
  };

  const handleCreatePayrollClick = async () => {
    setGenerateLoading(true);
    setGenerateError(null);
    setGenerateSuccess(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/employees/active`);
      const allEmployees = response.data;

      const filteredEmployees = allEmployees.filter(
        (employee) => !hasPaidPayrollForCurrentMonth(employee.employeeId)
      );
      setEmployeesToGenerate(filteredEmployees);

      // Initialize selectedPayslipDates for each eligible employee to the current date
      const initialPayslipDates = {};
      filteredEmployees.forEach((emp) => {
        initialPayslipDates[emp.employeeId] = new Date();
      });
      setSelectedPayslipDates(initialPayslipDates);

      setShowGeneratePayrollDialog(true);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setGenerateError(
        "Failed to fetch employee list. Please check the backend server."
      );
    } finally {
      setGenerateLoading(false);
    }
  };

  const handleGenerateSinglePayroll = async (employeeId) => {
    setGenerateLoading(true);
    setGenerateError(null);
    setGenerateSuccess(null);
    try {
      const payslipDate = selectedPayslipDates[employeeId];
      if (!payslipDate) {
        setGenerateError(
          "Please select a 'Payslip Of' date for this employee."
        );
        setGenerateLoading(false);
        return;
      }

      // Send the payslipOf date as an ISO string
      await axios.post(
        `${API_BASE_URL}/payroll/generate-single/${employeeId}`,
        {
          payslipOf: payslipDate.toISOString(),
        }
      );
      setGenerateSuccess(
        `Payroll generated successfully for employee ID: ${employeeId}`
      );
      await fetchPayrollData();
      setEmployeesToGenerate((prevEmployees) =>
        prevEmployees.filter((emp) => emp.employeeId !== employeeId)
      );
    } catch (err) {
      console.error("Error generating payroll:", err);
      setGenerateError(
        `Failed to generate payroll for employee ID: ${employeeId}. ${err.response?.data?.message || err.message}`
      );
    } finally {
      setGenerateLoading(false);
    }
  };

  const handleCloseGeneratePayrollDialog = () => {
    setShowGeneratePayrollDialog(false);
    setGenerateError(null);
    setGenerateSuccess(null);
    setSelectedPayslipDates({}); // Clear selected dates on close
  };

  // Function to handle date changes in the DatePicker for each employee
  const handlePayslipDateChange = (employeeId, newDate) => {
    setSelectedPayslipDates((prev) => ({
      ...prev,
      [employeeId]: newDate,
    }));
  };

  // Count function for each status
  const countByStatus = (status) => {
    return payrollData.filter(
      (item) => item.paymentStatus?.toLowerCase() === status.toLowerCase()
    ).length;
  };

  const cards = [
    {
      id: 1,
      icon: <PaidIcon />,
      title: "Paid",
      description: countByStatus("Paid"),
      backgroundColor: "#2196F3",
    },
    {
      id: 2,
      icon: <CheckCircleOutlineIcon />,
      title: "Confirmation",
      description: countByStatus("Confirmation"),
      backgroundColor: "#4CAF50",
    },
    {
      id: 3,
      icon: <DescriptionIcon />,
      title: "Draft",
      description: countByStatus("Draft"),
      backgroundColor: "#FF9800",
    },
    {
      id: 4,
      icon: <PendingActionsIcon />,
      title: "Pending",
      description: countByStatus("Pending"),
      backgroundColor: "#F44336",
    },
  ];

  const handleCardClick = (statusTitle) => {
    setSelectedStatus((prevStatus) =>
      prevStatus === statusTitle ? null : statusTitle
    );
  };

  return (
    <div className="p-4 font-inter">
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 3,
          mb: 4,
          backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
              color: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
              },
              border:
                selectedStatus === card.title ? "2px solid #FFEB3B" : "none",
            }}
          >
            <CardActionArea
              onClick={() => handleCardClick(card.title)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mb: 1,
                  "& .MuiSvgIcon-root": {
                    fontSize: "3rem",
                  },
                }}
              >
                {card.icon}
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {card.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          backgroundColor: "transparent",
        }}
      >
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleCreatePayrollClick}
          disabled={loading || generateLoading}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Create Payroll
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "white" }} />
          <Typography sx={{ ml: 2, color: "white" }}>
            Loading payroll data...
          </Typography>
        </Box>
      )}

      {error && (
        <Stack sx={{ width: "100%", mt: 4 }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      {!loading && !error && (
        <Payslip payrollData={payrollData} selectedStatus={selectedStatus} />
      )}

      {/* Generate Payroll Dialog */}
      <Dialog
        open={showGeneratePayrollDialog}
        onClose={handleCloseGeneratePayrollDialog}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.05)", // translucent white
            color: "white",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        {" "}
        {/* Increased maxWidth */}
        <DialogTitle
          sx={{
            backgroundColor: "transparent",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Generate Payroll for Employees
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          {generateLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} />
              <Typography sx={{ ml: 2 }}>Loading employees...</Typography>
            </Box>
          )}
          {generateError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {generateError}
            </Alert>
          )}
          {generateSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {generateSuccess}
            </Alert>
          )}

          {!generateLoading &&
            employeesToGenerate.length === 0 &&
            !generateError && (
              <Typography variant="body1" color="text.secondary">
                All employees have payroll generated for the current month, or
                no employees found.
              </Typography>
            )}

          {!generateLoading && employeesToGenerate.length > 0 && (
            <TableContainer
              component={Paper}
              elevation={1}
              sx={{
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "white",
                backdropFilter: "blur(6px)",
              }}
            >
              <Table size="small">
                <TableHead sx={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Sr. No.
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Employee ID
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Employee Name
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Payslip Of
                    </TableCell>
                    {/* New column for date selection */}
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeesToGenerate.map((employee, index) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {employee.employeeId}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white" }}
                      >{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            views={["year", "month"]} // Allow selecting year and month
                            label="Month & Year"
                            value={
                              selectedPayslipDates[employee.employeeId] || null
                            } // Use state for value
                            onChange={(newValue) =>
                              handlePayslipDateChange(
                                employee.employeeId,
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                sx={{
                                  width: "150px",
                                  input: {
                                    color: "white", // input text
                                  },
                                  label: {
                                    color: "white", // label text
                                  },
                                  ".MuiOutlinedInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.05)", // transparent bg
                                    backdropFilter: "blur(4px)",
                                    "& fieldset": {
                                      borderColor: "rgba(255,255,255,0.3)", // border color
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "white",
                                    },
                                  },
                                  ".MuiSvgIcon-root": {
                                    color: "white", // calendar icon
                                  },
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<PlayArrowIcon />}
                          onClick={() =>
                            handleGenerateSinglePayroll(employee.employeeId)
                          }
                          disabled={generateLoading}
                          sx={{
                            borderRadius: "6px",
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(12px)",
                            borderRadius: 2,
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                          }}
                        >
                          Generate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseGeneratePayrollDialog}
            variant="outlined"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
