import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { TableVirtuoso } from "react-virtuoso";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  { width: 100, label: "SL.No", dataKey: "serialNumber" },
  { width: 150, label: "Employee ID", dataKey: "employeeId" },
  { width: 150, label: "First Name", dataKey: "firstName" },
  { width: 150, label: "Last Name", dataKey: "lastName" },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
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
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#93A0B4",
            px: 2, // horizontal padding (space inside)
            py: 1, // vertical padding
            "@media (max-width: 600px)": {
              fontSize: "12px",
              padding: "8px",
            },
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
          align={column.numeric ? "right" : "left"}
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            padding: { xs: "8px", sm: "12px" },
            "@media (max-width: 600px)": {
              fontSize: "10px",
              padding: "6px",
            },
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function AccessibleTable() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_URL}attendance/today/leave/employees`)
      .then((response) => {
        const employeeData = response.data.map((employee, index) => ({
          serialNumber: index + 1,
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
        }));
        setEmployees(employeeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching absent employee data:", error);
        setError("Failed to load employees");
        setLoading(false);
      });
  }, []);

  return (
    <Paper
      style={{
        overflow: "hidden",
        width: "100%",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Typography variant="h5">On Leave</Typography>
      </TableContainer>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableVirtuoso
          data={employees}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      )}
    </Paper>
  );
}
