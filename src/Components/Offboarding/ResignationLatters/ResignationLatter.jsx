import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
} from "@mui/material";
import axios from "axios";

export default function ResignationTable() {
  const [search, setSearch] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [newEmployee, setNewEmployee] = React.useState({
    employeeId: "",
    employee: "",
    joinDate: "",
    reason: "",
    noticePeriodStart: "",
    lastWorkDay: "",
    projectStatus: "",
    status: "Pending",
  });

  const handleSearch = (event) => setSearch(event.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 🔗 Fetch resignations on component mount
  React.useEffect(() => {
    fetchResignations();
  }, []);

  const fetchResignations = async () => {
    try {
      const response = await axios.get("http://192.168.1.49:8084/resignation");
      const data = response.data.map((item, index) => ({
        id: index + 1,
        EmployeeId: item.employeeId,
        Employee: item.firstName + " " + item.lastName || "N/A", // since backend doesn't have employee name
        JoinDate: item.dateOfJoining
          ? new Date(item.dateOfJoining).toLocaleDateString("en-GB")
          : "N/A",
        Description: item.reason,
        NoticeStart: item.noticePeriodStart
          ? new Date(item.noticePeriodStart).toLocaleDateString("en-GB")
          : "N/A",
        LastWorkingDay: item.lastWorkDay
          ? new Date(item.lastWorkDay).toLocaleDateString("en-GB")
          : "N/A",
        ProjectStatus: item.projectStatus,
        Status: item.status,
      }));
      setRows(data);
    } catch (error) {
      console.error("Failed to fetch resignations", error);
    }
  };

  const handleAddEmployee = async () => {
    const {
      employeeId,
      reason,
      noticePeriodStart,
      lastWorkDay,
      projectStatus,
      status,
    } = newEmployee;

    if (employeeId && reason) {
      try {
        await axios.post("http://192.168.1.49:8084/resignation", {
          employeeId: Number(employeeId),
          reason,
          noticePeriodStart,
          lastWorkDay,
          projectStatus,
          status,
        });
        fetchResignations(); // refresh table
        setNewEmployee({
          employeeId: "",
          employee: "",
          joinDate: "",
          reason: "",
          noticePeriodStart: "",
          lastWorkDay: "",
          projectStatus: "",
          status: "Pending",
        });
        handleClose();
      } catch (error) {
        console.error("Failed to add resignation", error);
      }
    }
  };

  const handleInputChange = (event) =>
    setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://192.168.1.49:8084/resignation/${id}/status`,
        null,
        {
          params: { status },
        }
      );
      fetchResignations(); // refresh updated data
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Box sx={{ display: "flex", gap: 3, mb: 2, color: "white",justifyContent: "space-between", }}>
          <Typography variant="h6">Resignations</Typography>
          <TextField
            label="Search Employee"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{
              "& .MuiInputBase-input": {
                color: "white", // Text color
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border when focused
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              textAlign: "center",
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
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            backgroundColor: "transparent",
            "& .MuiTable-root": {
              backgroundColor: "transparent",
            },
            "& .MuiTableCell-root": {
              color: "white", // Text color
              backgroundColor: "transparent", // Cell background
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Optional: light white border
            },
            "& .MuiTableHead-root .MuiTableCell-root": {
              fontWeight: "bold",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly visible header
              backdropFilter: "blur(6px)",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Employee ID</TableCell>
                <TableCell align="center">Employee</TableCell>
                <TableCell align="center">Join Date</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">NoticePeried Start</TableCell>
                <TableCell align="center">Last Working Day</TableCell>
                <TableCell align="center">Project Status</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    position: "sticky",
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    backdropFilter: "blur(6px)",
                    zIndex: 2,
                  }}
                >
                  Confirmation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.EmployeeId}</TableCell>
                  <TableCell align="center">{row.Employee}</TableCell>
                  <TableCell align="center">{row.JoinDate}</TableCell>
                  <TableCell align="center">{row.Description}</TableCell>
                  <TableCell align="center">{row.NoticeStart}</TableCell>
                  <TableCell align="center">{row.LastWorkingDay}</TableCell>
                  <TableCell align="center">{row.ProjectStatus}</TableCell>
                  <TableCell align="center">{row.Status}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      backdropFilter: "blur(6px)",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "green", minWidth: 80 }}
                        onClick={() => handleStatusChange(row.id, "Approved")}
                        disabled={row.Status !== "Pending"}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "red", minWidth: 80 }}
                        onClick={() => handleStatusChange(row.id, "Rejected")}
                        disabled={row.Status !== "Pending"}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.05)", // Transparent glass effect
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          },
        }}
      >
        <Card  sx={{
            p: 2,
            background: "transparent",
            boxShadow: "none",
            color: "white",
          }}>
          <CardContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Typography variant="h6" sx={{ color: "white" }}>Add Resignation</Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                name="employeeId"
                label="Employee ID"
                value={newEmployee.employeeId}
                onChange={handleInputChange}
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <TextField
                name="reason"
                label="Reason"
                value={newEmployee.reason}
                onChange={handleInputChange}
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <TextField
                name="noticePeriodStart"
                label="Notice Period Start"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newEmployee.noticePeriodStart}
                onChange={handleInputChange}
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <TextField
                name="lastWorkDay"
                label="Last Working Day"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newEmployee.lastWorkDay}
                onChange={handleInputChange}
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <TextField
                name="projectStatus"
                label="Project Status"
                value={newEmployee.projectStatus}
                onChange={handleInputChange}
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
              <Button variant="contained" onClick={handleAddEmployee}>
                Add Resignation
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}
