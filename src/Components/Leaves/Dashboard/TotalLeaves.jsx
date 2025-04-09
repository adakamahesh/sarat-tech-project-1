import * as React from "react";
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
  Typography,
} from "@mui/material";
import { Divider } from "@mui/material"; // make sure this is imported

function createData(
  id,
  EmployeeId,
  Employee,
  LeaveType,
  StartDate,
  EndDate,
  RequestedDays,
  Status
) {
  return {
    id,
    EmployeeId,
    Employee,
    LeaveType,
    StartDate,
    EndDate,
    RequestedDays,
    Status,
  };
}

const initialRows = [
  createData(
    1,
    "1",
    "Mahesh Babu",
    "Half Day Leave",
    "Dec. 30,2024",
    "Feb. 28,2024",
    "0.5",
    "Approved"
  ),
  createData(
    2,
    "2",
    "Vasu",
    "Half Day Leave",
    "Dec. 30,2024",
    "Feb. 28,2024",
    "1.0",
    "Approved"
  ),
  createData(
    3,
    "3",
    "Praveen",
    "Half Day Leave",
    "Dec. 30,2024",
    "Feb. 28,2024",
    "1.0",
    "Approved"
  ),
  createData(
    4,
    "4",
    "Ganesh",
    "Half Day Leave",
    "Dec. 30,2024",
    "Feb. 28,2024",
    "1.0",
    "Approved"
  ),
  createData(
    5,
    "5",
    "Siva",
    "Half Day Leave",
    "Dec. 30,2024",
    "Feb. 28,2024",
    "1.0",
    "Approved"
  ),
  createData(
    6,
    "6",
    "Naveen",
    "Half Day Leave",
    "Dec. 30,2024",
    "Feb. 28,2024",
    "1.0",
    "Approved"
  ),
];

export default function HolidayTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [rows] = React.useState(initialRows);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
          <Typography variant="h6">Total Leave Requests</Typography>
          <TextField
            label="Select Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Box>
        <Divider sx={{ mb: 2, borderBottomWidth: 2  }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
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
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
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