import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const API_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  { width: 50, label: 'S.No.', dataKey: 'serialNumber' },
  { width: 100, label: 'Employee ID', dataKey: 'employeeId' },
  { width: 100, label: 'First Name', dataKey: 'firstName' },
  { width: 100, label: 'Last Name', dataKey: 'lastName' },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          sx={{
            width: column.width,
            backgroundColor: '#f5f5f5', // Light gray background
            fontWeight: 'bold',
            fontSize: { xs: '16px', sm: '20px' }, // Responsive font size
            padding: { xs: '6px', sm: '12px' },
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
          align={column.numeric ? 'right' : 'left'}
          sx={{
            fontSize: { xs: '12px', sm: '14px' },
            padding: { xs: '6px', sm: '12px' },
            wordWrap: 'break-word',
            whiteSpace: 'nowrap',
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
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
        }));
        setEmployees(employeeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching present employee data:", error);
        setError("Failed to load employees");
        setLoading(false);
      });
  }, []);

  return (
    <Paper
      sx={{
        height: { xs: 'auto', sm: 450 },
        width: '100%',
        padding: { xs: 1, sm: 2 },
        overflow: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <Typography
       align="left"
       colSpan={5}
       sx={{
         fontSize: '25px',
         backgroundColor: '#1976d2',  // Add background color for the title row
         color: 'white',  // White text for contrast
       }}
      >
        Total Presents
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: 2,
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