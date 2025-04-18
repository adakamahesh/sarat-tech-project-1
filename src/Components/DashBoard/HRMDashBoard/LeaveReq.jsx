import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const API_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  { width: 50, label: "S.No.", dataKey: "serialNumber" },
  { width: 100, label: "Employee ID", dataKey: "employeeId" },
  { width: 100, label: "First Name", dataKey: "firstName" },
  { width: 100, label: "Last Name", dataKey: "lastName" },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        overflowX: "auto",
        "@media (max-width: 600px)": {
          marginX: "-8px",
        },
      }}
      {...props}
      ref={ref}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
        minWidth: "100%",
      }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          sx={{
            width: column.width,
            backgroundColor: "#A7B0CA",
            color: "#fff",
            fontWeight: "bold",
            fontSize: { xs: "14px", sm: "18px" },
            padding: { xs: "6px", sm: "12px" },
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            padding: { xs: "6px", sm: "12px" },
            wordWrap: "break-word",
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_URL}attendance/today/present/employees`)
      .then((response) => {
        const employeeData = response.data.map((employee, index) => ({
          serialNumber: index + 1,
          employee: `${employee.firstName} ${employee.lastName}`,
          overtime: employee.overtime,
          action: "",
        }));
        setEmployees(employeeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching overtime employee data:", error);
        setError("Failed to load employees");
        setLoading(false);
      });
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        padding: { xs: 1, sm: 2 },
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "18px", sm: "25px" },
          backgroundColor: "#F5F5F5",
          fontWeight: "bold",
          p: 1,
          textAlign: "left",
        }}
      >
        Leave Request
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          sx={{
            height: { xs: 400, sm: 450 }, // 👈 This is important for mobile rendering!
          }}
        >
          <TableVirtuoso
            data={employees}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Box>
      )}
    </Paper>
  );
}