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
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  { width: 50, label: 'S.No.', dataKey: 'serialNumber' },
  { width: 150, label: 'Employee', dataKey: 'employee' },
  { width: 100, label: 'Overtime', dataKey: 'overtime' },
  { width: 100, label: 'Action', dataKey: 'action' },
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
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

const ActionCell = ({ onApprove, onReject }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
    <IconButton
      aria-label="approve"
      sx={{
        backgroundColor: 'green',
        color: 'white',
        width: 50,
        height: 25,
        borderRadius: 1,
        '&:hover': { backgroundColor: 'darkgreen' },
      }}
      onClick={onApprove}
    >
      <CheckIcon />
    </IconButton>
    <IconButton
      aria-label="reject"
      sx={{
        backgroundColor: 'red',
        color: 'white',
        width: 50,
        height: 25,
        borderRadius: 1,
        '&:hover': { backgroundColor: 'darkred' },
      }}
      onClick={onReject}
    >
      <CloseIcon />
    </IconButton>
  </div>
);

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align={column.numeric ? 'right' : 'left'}>
          {column.dataKey === 'action' ? (
            <ActionCell
              onApprove={() => alert(`Approved overtime for ${row.employee}`)}
              onReject={() => alert(`Rejected overtime for ${row.employee}`)}
            />
          ) : (
            row[column.dataKey]
          )}
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
      .get("http://192.168.1.50:8084/attendance/today/overtime/employees")
      .then((response) => {
        const employeeData = response.data.map((employee, index) => ({
          serialNumber: index + 1,
          employee: `${employee.firstName} ${employee.lastName}`,
          overtime: employee.overtime,
          action: '',
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
    <Paper style={{ height: 450, width: '130%', padding:'10px',overflow: 'hidden' }}>
      <Typography sx={{ fontWeight: 'bold' }}> Overtime Employees </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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