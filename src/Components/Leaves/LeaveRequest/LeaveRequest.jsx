import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function TotalLeaves() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.49:8084/leave-requests"
      );
      const leaveRequestData = response.data.map((leaveRequest, index) => {
        let requestedDays = "N/A";
        if (leaveRequest.startDate && leaveRequest.endDate) {
          const startDateObj = new Date(leaveRequest.startDate);
          const endDateObj = new Date(leaveRequest.endDate);
          const timeDiff = Math.abs(
            endDateObj.getTime() - startDateObj.getTime()
          );
          requestedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        }
        return {
          id: index + 1,
          EmployeeId: leaveRequest?.employee || "N/A",
          Employee:
            `${leaveRequest.empFirstName} ${leaveRequest.empLastName}` || "N/A",
          LeaveType: leaveRequest?.leaveTypeName || "N/A",
          StartDate: leaveRequest.startDate
            ? new Date(leaveRequest.startDate).toLocaleDateString()
            : "N/A",
          EndDate: leaveRequest.endDate
            ? new Date(leaveRequest.endDate).toLocaleDateString()
            : "N/A",
          RequestedDays: requestedDays,
          Reason: leaveRequest.reason || "N/A",
          RequestedDate: leaveRequest.submissionDate
            ? new Date(leaveRequest.submissionDate).toLocaleDateString()
            : "N/A",
          ActionDate: leaveRequest.approvalDate
            ? new Date(leaveRequest.approvalDate).toLocaleDateString()
            : "N/A",
          Status: leaveRequest.status || "N/A",
        };
      });
      setRows(leaveRequestData);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const uniqueEmployees = [...new Set(rows.map((row) => row.Employee))];

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            mb: 2,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6">Leave Requests</Typography>
          <Autocomplete
            options={uniqueEmployees}
            value={search}
            onInputChange={(e, value) => setSearch(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Employee"
                variant="outlined"
                size="small"
              />
            )}
            sx={{ minWidth: 250 }}
            clearOnEscape
            freeSolo
          />
          <Typography sx={{ flexGrow: 1, minWidth: 180 }}>
            EmployeeId: 501
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderBottomWidth: 2 }} />
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1500 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Sr No
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  EmployeeId
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  <TableSortLabel
                    active={orderBy === "Employee"}
                    direction={order}
                    onClick={() => handleRequestSort("Employee")}
                  >
                    Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  LeaveType
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  StartDate
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  EndDate
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Requested Days
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Requested Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Reason
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Action Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: "center" }}>{row.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.EmployeeId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.Employee}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.LeaveType}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.StartDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.EndDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.RequestedDays}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.RequestedDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.Reason}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.ActionDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.Status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}