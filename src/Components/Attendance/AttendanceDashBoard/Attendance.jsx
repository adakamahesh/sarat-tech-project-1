import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

const columns = [
  { id: "SLNO", label: "SL.NO", minWidth: 100 },
  { id: "EmpId", label: "EmpId", minWidth: 100 },
  { id: "Employee", label: "Employee", minWidth: 170 },
  { id: "Date", label: "Date", minWidth: 100 },
  { id: "check-in", label: "Check-in", minWidth: 100 },
  { id: "check-out", label: "Check-out", minWidth: 100 },
  { id: "Shift", label: "Shift", minWidth: 100 },
  { id: "Action", label: "Action", align: "center", minWidth: 100 },
];

const rows = [
  { Employee: "Mason Diaz", Overtime: "01:00" },
  { Employee: "Riley Taylor", Overtime: "01:00" },
  { Employee: "Sofia Howard", Overtime: "01:00" },
  { Employee: "William Hughes", Overtime: "01:00" },
  { Employee: "Adam Luis", Overtime: "01:00" },
];

const ActionCell = ({ onCheckIn, onCheckOut }) => (
  <Box
    sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}
  >
    <IconButton
      aria-label="check-in"
      sx={{
        backgroundColor: "green",
        color: "white",
        width: { xs: 80, sm: 100 },
        height: 30,
        borderRadius: 1,
        fontSize: "12px",
        "&:hover": { backgroundColor: "darkgreen" },
      }}
      onClick={onCheckIn}
    >
      Check-In
    </IconButton>
    <IconButton
      aria-label="check-out"
      sx={{
        backgroundColor: "orange",
        color: "white",
        width: { xs: 80, sm: 100 },
        height: 30,
        borderRadius: 1,
        fontSize: "12px",
        "&:hover": { backgroundColor: "darkorange" },
      }}
      onClick={onCheckOut}
    >
      Check-Out
    </IconButton>
  </Box>
);

export default function StickyHeadTable() {
  const handleApprove = () => {
    alert("Approved overtime successfully");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        Attendance
      </Typography>
      <hr />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: "bold", // Make the header text bold
                    background: "white",
                    position: column.id === "Employee" ? "sticky" : "static",
                    left: column.id === "Employee" ? 0 : "auto",
                    zIndex: column.id === "Employee" ? 1100 : "auto",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        ...(column.id === "Employee" && {
                          position: "sticky",
                          left: 0,
                          background: "white",
                          zIndex: 1000,
                        }),
                        ...(column.id === "Action" && {
                          position: "sticky",
                          right: 0,
                          background: "white",
                          zIndex: 1000,
                        }),
                      }}
                    >
                      {column.id === "Action" ? (
                        <ActionCell onApprove={handleApprove} />
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
