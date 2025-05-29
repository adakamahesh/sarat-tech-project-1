import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Attendance from "../../Attendance/MyAttendances/MyAttendances";

export default function AccessibleTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <Table
        aria-label="caption table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              colSpan={5}
              sx={{
                fontSize: {
                  xs: "16px", // small screens
                  sm: "18px", // medium screens
                  md: "22px", // large screens
                  lg: "25px", // extra large
                },
                fontWeight: "bold",
                color: "white",
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              Attendance & Leave
            </TableCell>
          </TableRow>
          <Attendance />
        </TableHead>
      </Table>
    </TableContainer>
  );
}