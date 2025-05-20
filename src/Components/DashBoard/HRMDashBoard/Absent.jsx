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
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
      {...props}
      ref={ref}
      sx={{
        maxHeight: { xs: 300, sm: 450 },
        overflowX: "auto",
      }}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
        minWidth: { xs: 500, sm: 600 }, // min width for scroll
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
          align="left"
          sx={{
            width: column.width,
            color: "#fff",
            fontWeight: "bold",
            fontSize: { xs: "12px", sm: "14px" },
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
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
          sx={{
            fontSize: { xs: "11px", sm: "13px" },
            padding: { xs: "6px", sm: "12px" },
            whiteSpace: "nowrap",
            wordBreak: "break-word",
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

export default function ReactVirtualizedTable() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_URL}attendance/today/absent/employees`)
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
      sx={{
        height: { xs: "auto", sm: 450 },
        width: "100%",
        padding: { xs: 1, sm: 2 },
        overflowX: "auto",
        boxSizing: "border-box",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <Typography
        align="left"
        sx={{
          fontSize: { xs: "16px", sm: "24px" },
          fontWeight: "bold",
          color: "white",
          padding: 1,
          mb: 1,
        }}
      >
        Absent Employees
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          sx={{
            height: { xs: 300, sm: 350 },
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
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
