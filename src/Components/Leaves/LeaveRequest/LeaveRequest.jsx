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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function TotalLeaves() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "501",
    empFirstName: "John",
    empLastName: "Doe",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    requestedDays: "",
    requestedDate: "",
    actionDate: "",
  });

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
          const timeDiff = Math.abs(endDateObj - startDateObj);
          requestedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        }
        return {
          id: index + 1,
          EmployeeId: leaveRequest?.employee || "N/A",
          Employee: `${leaveRequest.empFirstName} ${leaveRequest.empLastName}` || "N/A",
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

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
      await axios.post("http://192.168.1.49:8084/leave-requests", {
        employee: formData.employeeId,
        empFirstName: formData.empFirstName,
        empLastName: formData.empLastName,
        leaveTypeName: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        submissionDate: formData.requestedDate || new Date().toISOString(),
        approvalDate: formData.actionDate || null,
        status: "Pending",
        requestedDays: formData.requestedDays,
      });
      setOpen(false);
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error creating leave request:", error);
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>EmployeeId: 501</Typography>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              New Request
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 2, borderBottomWidth: 2 }} />

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1500 }}>
            <TableHead>
              <TableRow>
                {[
                  "Sr No",
                  "EmployeeId",
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
                  <TableCell sx={{ textAlign: "center" }}>{row.EmployeeId}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.Employee}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.LeaveType}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.StartDate}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.EndDate}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.RequestedDays}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.RequestedDate}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.Reason}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.ActionDate}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog for Create Leave Request */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Create Leave Request</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            name="employeeId"
            label="Employee ID"
            value={formData.employeeId}
            onChange={handleFormChange}
            fullWidth
            disabled
          />
          <TextField
            name="empFirstName"
            label="First Name"
            value={formData.empFirstName}
            onChange={handleFormChange}
            fullWidth
            disabled
          />
          <TextField
            name="empLastName"
            label="Last Name"
            value={formData.empLastName}
            onChange={handleFormChange}
            fullWidth
            disabled
          />
          <TextField
            select
            name="leaveType"
            label="Leave Type"
            value={formData.leaveType}
            onChange={handleFormChange}
            fullWidth
          >
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
          </TextField>
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
          <Button variant="contained" onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}