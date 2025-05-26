import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import dayjs from "dayjs";

const columns = [
  { id: "SLNO", label: "SL.NO", minWidth: 80 },
  { id: "EmpId", label: "EmpId", minWidth: 100 },
  { id: "Employee", label: "Employee", minWidth: 170 },
  { id: "Date", label: "Date", minWidth: 150 },
  { id: "checkIn", label: "Check-in", minWidth: 150 },
  { id: "checkOut", label: "Check-out", minWidth: 150 },
  { id: "Status", label: "Status", minWidth: 120 },
  { id: "Action", label: "Action", align: "center", minWidth: 180 },
];

const ActionCell = ({ row, onCheckIn, onCheckOut, onAbsent }) => {
  const [checkInTime, setCheckInTime] = useState(row.checkIn || "");
  const [checkOutTime, setCheckOutTime] = useState(row.checkOut || "");
  const [status, setStatus] = useState(row.Status);
  const [isCheckInDisabled, setIsCheckInDisabled] = useState(!!row.checkIn);
  const [isCheckOutDisabled, setIsCheckOutDisabled] = useState(!!row.checkOut);
  const [isAbsentDisabled, setIsAbsentDisabled] = useState(
    row.Status === "Absent"
  );

  const handleCheckInClick = async () => {
    const now = dayjs();
    const tenThirty = now.clone().hour(10).minute(30).second(0);
    const statusValue = now.isBefore(tenThirty) ? "Present" : "Late";
    const currentTime = now.format("HH:mm");
    setCheckInTime(currentTime);
    setStatus(statusValue);
    setIsCheckInDisabled(true);
    setIsAbsentDisabled(true);

    try {
      const response = await axios.post("http://192.168.1.49:8084/attendance", {
        employeeId: row.EmpId,
        attendanceDate: now.format("YYYY-MM-DD"),
        clockInTime: now.format("HH:mm:ss"),
        status: statusValue,
        shiftId: 1,
      });
      if (response.status !== 200) throw new Error("Failed to CheckIn");
      onCheckIn(row.EmpId, currentTime, statusValue);
    } catch (error) {
      console.error("Error during CheckIn", error);
      alert("Failed to CheckIn");
    }
  };

  const handleCheckOutClick = async () => {
    const now = dayjs();
    const currentTime = now.format("HH:mm");
    setCheckOutTime(currentTime);
    setIsCheckOutDisabled(true);
    try {
      const response = await axios.post("http://192.168.1.49:8084/attendance", {
        employeeId: row.EmpId,
        attendanceDate: now.format("YYYY-MM-DD"),
        clockOutTime: now.format("HH:mm:ss"),
      });
      if (response.status !== 200) throw new Error("Failed to CheckOut");
      onCheckOut(row.EmpId, currentTime);
    } catch (error) {
      console.error("Error during CheckOut", error);
      alert("Failed to CheckOut");
    }
  };

  const handleAbsentClick = async () => {
    setStatus("Absent");
    setIsAbsentDisabled(true);
    setIsCheckInDisabled(true);
    try {
      const response = await axios.post("http://192.168.1.49:8084/attendance", {
        employeeId: row.EmpId,
        attendanceDate: dayjs().format("YYYY-MM-DD"),
        status: "Absent",
      });
      if (response.status !== 200) throw new Error("Failed to mark Absent");
      onAbsent(row.EmpId, "Absent");
    } catch (error) {
      console.error("Error marking Absent", error);
      alert("Failed to mark Absent");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <IconButton
        sx={{
          backgroundColor: "green",
          color: "white",
          width: { xs: 80, sm: 100 },
          height: 30,
          borderRadius: 1,
          fontSize: "12px",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
        onClick={handleCheckInClick}
        disabled={isCheckInDisabled}
      >
        Check-In
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: "orange",
          color: "white",
          width: { xs: 80, sm: 100 },
          height: 30,
          borderRadius: 1,
          fontSize: "12px",
          "&:hover": { backgroundColor: "darkorange" },
        }}
        onClick={handleCheckOutClick}
        disabled={isCheckOutDisabled}
      >
        Check-Out
      </IconButton>
      <IconButton
        sx={{
          backgroundColor: "red",
          color: "white",
          width: { xs: 80, sm: 100 },
          height: 30,
          borderRadius: 1,
          fontSize: "12px",
          "&:hover": { backgroundColor: "darkred" },
        }}
        onClick={handleAbsentClick}
        disabled={isAbsentDisabled}
      >
        Absent
      </IconButton>
    </Box>
  );
};

export default function AttendanceTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActiveEmployees();
  }, []);

  const fetchActiveEmployees = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.49:8084/api/employees/active"
      );
      const employeeData = response.data;
      const today = dayjs().format("YYYY-MM-DD");
      const initialRows = employeeData.map((emp, index) => ({
        SLNO: index + 1,
        EmpId: emp.employeeId,
        Employee: emp.firstName + " " + emp.lastName,
        Date: today,
        checkIn: "",
        checkOut: "",
        Status: "-",
      }));
      setRows(initialRows);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching active employees: ", error);
    }
  };

  const handleCheckIn = (employeeId, checkInTime, status) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.EmpId === employeeId
          ? { ...row, checkIn: checkInTime, Status: status }
          : row
      )
    );
  };

  const handleCheckOut = (employeeId, checkOutTime) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.EmpId === employeeId ? { ...row, checkOut: checkOutTime } : row
      )
    );
  };

  const handleAbsent = (employeeId, status) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.EmpId === employeeId
          ? { ...row, Status: status, checkIn: "", checkOut: "" }
          : row
      )
    );
  };

  const handleFieldChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  if (loading) return <div style={{ color: "white" }}>Loading...</div>;
  if (error) return <div style={{ color: "white" }}>Error: {error.message}</div>;

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent paper
        backdropFilter: "blur(12px)",
        color: "white",
      }}
    >
      <Typography variant="h5" sx={{ p: 2, color: "white" }}>
        Attendance
      </Typography>
      <hr style={{ borderColor: "rgba(255,255,255,0.2)" }}/>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    position: "sticky",
                    top: 0,
                    zIndex:
                      column.id === "Employee" || column.id === "Action"
                        ? 1200
                        : 1100,
                    left: column.id === "Employee" ? 0 : undefined,
                    right: column.id === "Action" ? 0 : undefined,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        background:
                          column.id === "Employee" || column.id === "Action"
                            ?  "rgba(255,255,255,0.08)"
                            : "transparent",
                            color: "white",
                        position:
                          column.id === "Employee"
                            ? "sticky"
                            : column.id === "Action"
                              ? "sticky"
                              : undefined,
                        left: column.id === "Employee" ? 0 : undefined,
                        right: column.id === "Action" ? 0 : undefined,
                        zIndex:
                          column.id === "Employee" || column.id === "Action"
                            ? 1000
                            : undefined,
                      }}
                    >
                      {column.id === "Action" ? (
                        <ActionCell
                          row={row}
                          onCheckIn={handleCheckIn}
                          onCheckOut={handleCheckOut}
                          onAbsent={handleAbsent}
                        />
                      ) : column.id === "Date" ? (
                        dayjs().format("YYYY-MM-DD")
                      ) : column.id === "checkIn" ||
                        column.id === "checkOut" ? (
                        <TextField
                          type="time"
                          value={value}
                          size="small"
                          onChange={(e) =>
                            handleFieldChange(index, column.id, e.target.value)
                          }
                          sx={{
                            input: { color: "white" },
                            "& .MuiInputBase-root": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                          InputLabelProps={{ style: { color: "white" } }}
                        />
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
