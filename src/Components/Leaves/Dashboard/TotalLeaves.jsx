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
} from "@mui/material";
import axios from "axios";

export default function TotalLeaves() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setLoading(true);
      setError(null);
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

        const status = leaveRequest.status || "Pending";
        const isDisabled = status === "Approved" || status === "Rejected";

        return {
          id: index + 1,
          leaveRequestId: leaveRequest.leaveRequestId,
          EmployeeId: leaveRequest.employee || "N/A", // Access nested employee
          Employee:
            `${leaveRequest.empFirstName || "N/A"} ${
              leaveRequest.empLastName || "N/A"
            }` || "N/A", // Access nested employee
          LeaveType: leaveRequest.leaveTypeName || "N/A", // Access nested leaveType
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
            : "-",
          Status: status,
          disableActions: isDisabled,
          startDateObj: leaveRequest.startDate
            ? new Date(leaveRequest.startDate)
            : null, // Store date objects
          endDateObj: leaveRequest.endDate
            ? new Date(leaveRequest.endDate)
            : null, // for comparisons
        };
      });
      setRows(leaveRequestData);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (row) => {
    try {
      setError(null);
      setLoading(true);
      const updatedLeaveRequest = {
        ...row,
        Status: "Rejected",
        ActionDate: new Date().toISOString(),
      };

      const response = await axios.put(
        `http://192.168.1.49:8084/leave-requests/${row.leaveRequestId}`,
        {
          status: "Rejected",
          approvalDate: updatedLeaveRequest.ActionDate,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const updatedRows = rows.map((r) =>
          r.leaveRequestId === row.leaveRequestId
            ? { ...updatedLeaveRequest, disableActions: true }
            : r
        );
        setRows(updatedRows);
      } else {
        setError(new Error("Failed to reject leave request"));
      }
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (row) => {
    try {
      setError(null);
      setLoading(true);
      const updatedLeaveRequest = {
        ...row,
        Status: "Approved",
        ActionDate: new Date().toISOString(),
      };
      const response = await axios.put(
        `http://192.168.1.49:8084/leave-requests/${row.leaveRequestId}`,
        {
          status: "Approved",
          approvalDate: updatedLeaveRequest.ActionDate,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const updatedRows = rows.map((r) =>
          r.leaveRequestId === row.leaveRequestId
            ? { ...updatedLeaveRequest, disableActions: true }
            : r
        );
        setRows(updatedRows);
      } else {
        setError(new Error("Failed to Approve Leave Request"));
      }
    } catch (error) {
      console.error("Error accepting leave request:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Paper
        sx={{
          width: "100%",
          p: 2,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            mb: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Leave Requests
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderBottomWidth: 2, color: "white" }} />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}
        <TableContainer sx={{ overflowX: "auto" }}>
          {loading ? (
            <Typography sx={{ color: "white" }}>Loading...</Typography>
          ) : (
            <Table sx={{ minWidth: 1500 }}>
              <TableHead>
                <TableRow
                  sx={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 2,
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Sr No
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Leave Request ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    EmployeeId
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
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
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    LeaveType
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    StartDate
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    EndDate
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Requested Days
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Requested Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Reason
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Action Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      position: "sticky",
                      right: 0,
                      zIndex: 2,
                      color: "white",
                      textAlign: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.leaveRequestId}>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.leaveRequestId}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.EmployeeId}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Employee}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.LeaveType}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.StartDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.EndDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.RequestedDays}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.RequestedDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Reason}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.ActionDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", color: "white" }}>
                      {row.Status}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        position: "sticky",
                        right: 0,
                        background: "white",
                        zIndex: 1,
                        whiteSpace: "nowrap",
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(12px)",
                        borderRadius: 2,
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "green", color: "white", mx: 1 }}
                        disabled={row.disableActions}
                        onClick={() => handleAccept(row)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "red", color: "white", mx: 1 }}
                        disabled={row.disableActions}
                        onClick={() => handleReject(row)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
}
