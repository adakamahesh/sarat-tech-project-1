import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  MenuItem,
  Button,
  Typography,
  Dialog,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateEmployee from "./CreateEmployee";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function EmployeeTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("DateOfJoining");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}api/employees/active`);
      const formatted = data.map((emp, index) => ({
        id: index + 1,
        Employee: `${emp.firstName} ${emp.lastName}`,
        Email: emp.emailId,
        Phone: emp.phoneNumber,
        EmployeeId: emp.employeeId,
        JobPosition: emp.designation,
        Department: emp.departmentName || "—",
        shift: emp.shiftType
          ? `${emp.shiftType} (${emp.shiftStartTime} - ${emp.shiftEndTime})`
          : "—",
        DateOfJoining: emp.dateOfJoining,
      }));
      setRows(formatted);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (employeeId) => {
    localStorage.setItem("newEmyID", employeeId);
    navigate(`/Employee/ProfileUser`);
  };

  const filteredRows = rows
    .filter(
      (row) =>
        row.Employee.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? row.JobPosition === filter : true)
    )
    .sort((a, b) => {
      if (orderBy === "DateOfJoining") {
        return order === "asc"
          ? new Date(a.DateOfJoining) - new Date(b.DateOfJoining)
          : new Date(b.DateOfJoining) - new Date(a.DateOfJoining);
      }
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 10,
            mb: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Employee List
          </Typography>
          <TextField
            label="Search Employee"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "white" },
              ".MuiOutlinedInput-root": {
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
            }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            select
            label="Filter by Job Position"
            sx={{
              width: "30%",
              mb: 2,
              input: { color: "white" }, // input text color
              label: { color: "white" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
              ".MuiSvgIcon-root": {
                color: "white", // dropdown arrow
              },
            }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.JobPosition))].map((job) => (
              <MenuItem key={job} value={job}>
                {job}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            Create
          </Button>
        </Box>

        <TableContainer
          component={Box}
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Employee ID",
                  "Employee",
                  "Email",
                  "Phone",
                  "Job Position",
                  "Department",
                  "Shift",
                  "Date of Joining",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {header === "Employee" ? (
                      <TableSortLabel
                        active={orderBy === "Employee"}
                        direction={order}
                        onClick={() => handleRequestSort("Employee")}
                        sx={{ color: "white"}}
                      >
                        {header}
                      </TableSortLabel>
                    ) : header === "Date of Joining" ? (
                      <TableSortLabel
                        active={orderBy === "DateOfJoining"}
                        direction={order}
                        onClick={() => handleRequestSort("DateOfJoining")}
                        sx={{
                          color: "white",
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },
                          "&.MuiTableSortLabel-root": {
                            color: "white",
                          },
                          "&.Mui-active": {
                            color: "white",
                            "& .MuiTableSortLabel-icon": {
                              color: "white",
                            },
                          },
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
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => handleRowClick(row.EmployeeId)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.EmployeeId}
                    </TableCell>
                    <TableCell align="left" sx={{ color: "white" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar>{row.Employee[0]}</Avatar>
                        {row.Employee}
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.Email}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.Phone}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.JobPosition}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.Department}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.shift}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.DateOfJoining}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ color: "white" }}>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          fetchEmployees();
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            color: "white",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            borderRadius: 2,
            p: 3,
          },
        }}
      >
        <CreateEmployee
          onClose={() => {
            setOpen(false);
            fetchEmployees();
          }}
        />
      </Dialog>
    </Box>
  );
}