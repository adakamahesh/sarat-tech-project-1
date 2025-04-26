import React, { useState, useEffect } from "react";
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
  Button,
  Typography,
  Dialog,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateEmployee from "./CreateEmployee"; // Employee creation form

export default function EmployeeTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("DateOfJoining");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.49:8084/api/employees/active"
      );
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
    localStorage.setItem('newEmyID',employeeId)
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
      {/* Employee Table */}
      <Paper sx={{ width: "100%", mb: 2, p: 2, backgroundColor: "#f5f5f5" }}>
        <Box
          sx={{
            display: "flex",
            gap: 10,
            mb: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Employee List</Typography>
          <TextField
            label="Search Employee"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            select
            label="Filter by Job Position"
            sx={{ width: "30%" }}
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
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Employee ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "Employee"}
                    direction={order}
                    onClick={() => handleRequestSort("Employee")}
                  >
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Job Position
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Department
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Shift
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Date of Joining
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      onClick={() => handleRowClick(row.EmployeeId)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="center">{row.EmployeeId}</TableCell>
                      <TableCell align="left">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar>{row.Employee[0]}</Avatar>
                          {row.Employee}
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.Email}</TableCell>
                      <TableCell align="center">{row.Phone}</TableCell>
                      <TableCell align="center">{row.JobPosition}</TableCell>
                      <TableCell align="center">{row.Department}</TableCell>
                      <TableCell align="center">{row.shift}</TableCell>
                      <TableCell align="center">{row.DateOfJoining}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{
            "& .MuiTablePagination-root": {
              color: "black", // Change color of all content to black
            },
            "& .MuiTablePagination-select, .MuiTablePagination-actions, .MuiTablePagination-caption, .MuiTablePagination-selectLabel, .MuiTablePagination-input": {
              color: "black", // Change text color of all pagination content to black
            },
          }}
        />
      </Paper>

      {/* Employee Creation Form (Dialog) */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          fetchEmployees();
        }}
        maxWidth="md"
        fullWidth
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
