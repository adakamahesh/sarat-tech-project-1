import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export default function PayslipTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeRes, payrollRes] = await Promise.all([
          axios.get("http://192.168.1.49:8084/api/employees/active"),
          axios.get("http://192.168.1.49:8084/payroll"),
        ]);

        const activeEmployees = employeeRes.data;
        const payrolls = payrollRes.data;

        const combinedData = activeEmployees.map((employee, index) => {
          const employeePayroll = payrolls.find(
            (p) => p.employeeId === employee.employeeId
          );

          return {
            id: index + 1,
            EmployeeId: employee.employeeId,
            Employee: `${employee.firstName} ${employee.lastName}`,
            Date: employeePayroll?.dateOfCalculation
              ? new Date(employeePayroll.dateOfCalculation).toLocaleDateString()
              : "N/A",
            Allowance: employeePayroll?.totalGross
              ? `INR ${employeePayroll.totalGross.toFixed(2)}`
              : "INR 0.00",
            Deduction: employeePayroll?.totalDeduction
              ? `INR ${employeePayroll.totalDeduction.toFixed(2)}`
              : "INR 0.00",
            NetPay: employeePayroll?.netPay
              ? `INR ${employeePayroll.netPay.toFixed(2)}`
              : "INR 0.00",
            Status: employeePayroll?.paymentStatus || "Pending",
          };
        });

        setRows(combinedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  const handleSearch = (event) => setSearch(event.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtering logic
  const filteredRows = rows.filter((row) => {
    const matchesSearch = (row.Employee || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    // const matchesMonth = monthFilter
    //     ? row.Date !== 'N/A' &&
    //       format(new Date(row.Date), 'yyyy-MM') === format(monthFilter, 'yyyy-MM')
    //     : true;

    return matchesSearch; // && matchesMonth;
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", padding: "20px" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.05)", // transparent white tint
          backdropFilter: "blur(8px)",
          color: "white", // default text color inside Paper
        }}
      >
        <Box sx={{ display: "flex", gap: 4, mb: 2, alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            PaysRoll
          </Typography>
          <TextField
            label="Search Employee"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "S.No",
                  "EmployeeId",
                  "Employee",
                  "Date",
                  "Allowance",
                  "Deduction",
                  "NetPay",
                  "Status",
                  "Action",
                ].map((header, index) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      ...(header === "Action" && {
                        position: "sticky",
                        right: 0,
                        background: "rgba(255,255,255,0.1)",
                        zIndex: 2,
                      }),
                    }}
                  >
                    {header === "Employee" ? (
                      <TableSortLabel
                        active={orderBy === "Employee"}
                        direction={order}
                        onClick={() => handleRequestSort("Employee")}
                        sx={{
                          color: "white",
                          "&.Mui-active": { color: "white" },
                        }}
                      >
                        {header}
                      </TableSortLabel>
                    ) : (
                      header
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} sx={{ color: "white" }}>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.EmployeeId}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Employee}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Date}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Allowance}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Deduction}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.NetPay}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Status}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        position: "sticky",
                        right: 0,
                        background: "rgba(255,255,255,0.1)",
                        zIndex: 2,
                        color: "white",
                      }}
                    >
                      {editId === row.id ? (
                        <Typography variant="body2" sx={{ color: "lightgray" }}>
                          Editing...
                        </Typography>
                      ) : (
                        <>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setEditId(row.id);
                              setEditData(row);
                            }}
                          >
                            <EditNoteIcon sx={{ color: "white" }} />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(row.id)}
                          >
                            <DeleteIcon sx={{ color: "#f44336" }} />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: "white",
            ".MuiSelect-icon": { color: "white" },
            ".MuiInputBase-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}
