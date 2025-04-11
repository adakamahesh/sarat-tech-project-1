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
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

function createData(
  id,
  EmployeeId,
  Employee,
  StartDate,
  EndDate,
  Batch,
  GrossPay,
  Deduction,
  NetPay,
  Status
) {
  return {
    id,
    EmployeeId,
    Employee,
    StartDate,
    EndDate,
    Batch,
    GrossPay,
    Deduction,
    NetPay,
    Status,
  };
}

const initialRows = [
  createData(
    1,
    "1",
    "Mahesh Babu",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    2,
    "2",
    "Vasu",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    3,
    "3",
    "Praveen",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    4,
    "4",
    "Ganesh",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    5,
    "5",
    "Siva",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    6,
    "6",
    "Naveen",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    7,
    "7",
    "Ganesh",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    8,
    "8",
    "Siva",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
  createData(
    9,
    "9",
    "Naveen",
    "Sep. 30, 2024",
    "Dec. 30, 2024",
    "None",
    "INR 214002.00",
    "INR 22470.21",
    "INR 191331.79",
    "Draft"
  ),
];

export default function PayslipTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [rows, setRows] = React.useState(initialRows);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Payslip
        </Typography>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "EmployeeId",
                  "Employee",
                  "StartDate",
                  "EndDate",
                  "Batch",
                  "GrossPay",
                  "Deduction",
                  "NetPay",
                  "Status",
                ].map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    {col === "Employee" ? (
                      <TableSortLabel
                        active={orderBy === "Employee"}
                        direction={order}
                        onClick={() => handleRequestSort("Employee")}
                      >
                        {col}
                      </TableSortLabel>
                    ) : (
                      col
                    )}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    zIndex: 2,
                  }}
                >
                  Action
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
                    {row.StartDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.EndDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.Batch}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.GrossPay}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.Deduction}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.NetPay}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.Status}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      position: "sticky",
                      right: 0,
                      background: "#fff",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {editId === row.id ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setEditId(row.id);
                            setEditData(row);
                          }}
                        >
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
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