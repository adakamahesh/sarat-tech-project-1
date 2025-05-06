import React, { useEffect, useState } from "react";
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
    Typography,
    Divider,
} from "@mui/material";
import axios from "axios";

export default function TotalLeaves() {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [rows, setRows] = useState([]);

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
            const response = await axios.get("http://192.168.1.49:8084/leave-requests");
            const leaveRequestData = response.data.map((leaveRequest, index) => {
                let requestedDays = "N/A";
                if (leaveRequest.startDate && leaveRequest.endDate) {
                    const startDateObj = new Date(leaveRequest.startDate);
                    const endDateObj = new Date(leaveRequest.endDate);
                    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
                    requestedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                }
                return {
                    id: index + 1,
                    EmployeeId: leaveRequest?.employee || "N/A",
                    Employee: `${leaveRequest.empFirstName} ${leaveRequest.lastName }`|| "N/A",
                    LeaveType: leaveRequest?.leaveTypeName || "N/A",
                    StartDate: leaveRequest.startDate ? new Date(leaveRequest.startDate).toLocaleDateString() : "N/A",
                    EndDate: leaveRequest.endDate ? new Date(leaveRequest.endDate).toLocaleDateString() : "N/A",
                    RequestedDays: requestedDays,
                    Reason: leaveRequest.reason || "N/A",
                    Status: leaveRequest.status || "N/A",

                };
            });
            setRows(leaveRequestData);
        } catch (error) {
            console.error("Error fetching leave requests:", error);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        mb: 2,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">Leave Requests</Typography>
                </Box>
                <Divider sx={{ mb: 2, borderBottomWidth: 2 }} />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Sr No</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>EmployeeId</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                                    <TableSortLabel
                                        active={orderBy === "Employee"}
                                        direction={order}
                                        onClick={() => handleRequestSort("Employee")}
                                    >
                                        Employee
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>LeaveType</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>StartDate</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>EndDate</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Requested Days</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Reason</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ textAlign: "center" }}>{row.id}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.EmployeeId}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.Employee}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.LeaveType}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.StartDate}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.EndDate}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.RequestedDays}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.Reason}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{row.Status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}