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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import axios from "axios";

export default function TotalLeaves() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: localStorage.getItem("employeeId"),
    empFirstName: "John",
    empLastName: "Doe",
    leaveType: "",
    leaveTypeId: 0,
    startDate: "",
    endDate: "",
    reason: "",
    requestedDays: "",
    requestedDate: "",
    actionDate: "",
  });
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    fetchLeaveRequests();
    fetchLeaveTypes();
  }, []);

  const employeeId = localStorage.getItem("employeeId");

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://192.168.1.49:8084/leave-requests/employee/${employeeId}`
      );

      if (!response.data) {
        setRows([]);
        return;
      }
      const leaveRequestData = response.data.map((leaveRequest, index) => {
        let requestedDays = "N/A";
        if (leaveRequest.startDate && leaveRequest.endDate) {
          const startDateObj = new Date(leaveRequest.startDate);
          const endDateObj = new Date(leaveRequest.endDate);
          const timeDiff = Math.abs(endDateObj - startDateObj);
          requestedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        }
        return {
          id: index + 1,
          Employee:
            leaveRequest.empFirstName + " " + leaveRequest.empLastName || "N/A",
          LeaveType: leaveRequest.leaveTypeName || "N/A",
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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      setError(null);
      const response = await axios.get("http://192.168.1.49:8084/leave_types");
      setLeaveTypes(response.data);
    } catch (error) {
      console.error("Error fetching leave types:", error);
      setError(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "leaveType") {
        const selectedLeaveType = leaveTypes.find(
          (lt) => lt.leaveTypeName === value
        );
        updated.leaveTypeId = selectedLeaveType?.leaveTypeId || 0;
        updated.leaveType = value;
      }

      if (updated.startDate && updated.endDate) {
        const start = new Date(updated.startDate);
        const end = new Date(updated.endDate);
        const diff = Math.ceil((end - start) / (1000 * 3600 * 24)) + 1;
        updated.requestedDays = diff > 0 ? diff : "";
      } else {
        updated.requestedDays = "";
      }

      return updated;
    });
  };

  const handleFormSubmit = async () => {
    try {
      setError(null);
      if (!formData.leaveTypeId) {
        setError(new Error("Please select a leave type."));
        return;
      }
      const response = await axios.post(
        "http://192.168.1.49:8084/leave-requests",
        {
          employee: formData.employeeId,
          leaveType: formData.leaveTypeId,
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason,
          submissionDate: formData.requestedDate || new Date().toISOString(),
          approvalDate: formData.actionDate || null,
          status: "Pending",
          requestedDays: formData.requestedDays,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setOpen(false);
        fetchLeaveRequests();
      } else {
        setError(new Error("Failed to create leave request."));
      }
    } catch (error) {
      console.error("Error creating leave request:", error);
      setError(error);
    }
  };

  const filteredRows = rows;

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
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            New Request
          </Button>
        </Box>

        <Divider sx={{ mb: 2, borderBottomWidth: 2 }} />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
        )}
        <TableContainer sx={{ overflowX: "auto" }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Table sx={{ minWidth: 1500 }}>
              <TableHead>
                <TableRow>
                  {[
                    "Sr No",
                    "Employee",
                    "LeaveType",
                    "StartDate",
                    "EndDate",
                    "Requested Days",
                    "Requested Date",
                    "Reason",
                    "Action Date",
                    "Status",
                  ].map((headCell) => (
                    <TableCell
                      key={headCell}
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {headCell === "Employee" ? (
                        <TableSortLabel
                          active={orderBy === "Employee"}
                          direction={order}
                          onClick={() => handleRequestSort("Employee")}
                        >
                          {headCell}
                        </TableSortLabel>
                      ) : (
                        headCell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ textAlign: "center" }}>{row.id}</TableCell>
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
          )}
        </TableContainer>
      </Paper>

      {/* Dialog for Create Leave Request */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Create Leave Request</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            name="employeeId"
            label="Employee ID"
            value={formData.employeeId}
            fullWidth
            disabled
          />
          <FormControl fullWidth error={!!(error && !formData.leaveType)}>
            <InputLabel id="leave-type-label">Leave Type</InputLabel>
            <Select
              labelId="leave-type-label"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleFormChange}
              label="Leave Type"
            >
              {leaveTypes.map((type) => (
                <MenuItem key={type.leaveTypeId} value={type.leaveTypeName}>
                  {type.leaveTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="startDate"
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            name="endDate"
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={formData.endDate}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            name="reason"
            label="Reason"
            value={formData.reason}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            name="requestedDays"
            label="Requested Days"
            type="number"
            value={formData.requestedDays}
            fullWidth
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            disabled={!formData.leaveType}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
