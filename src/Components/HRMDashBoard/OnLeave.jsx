import * as React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TableVirtuoso } from 'react-virtuoso';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';



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

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align={column.numeric ? 'right' : 'left'}>
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
      .get("http://192.168.1.50:8084/attendance/today/leave/employees")
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
  //   <TableContainer component={Paper}>
  //     <Table aria-label="caption table">
  //       <TableHead>
  //           <TableRow>
  //               <TableCell align="left" colSpan={5} sx={{ fontSize: '25px' }}>
  //                   On Leave
  //               </TableCell>
  //           </TableRow>
  //       </TableHead>
  //     </Table>
  //   </TableContainer>
  // );

  <Paper style={{overflow: 'hidden', width: '100%' }}>
  <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
            <TableRow>
                <TableCell align="left" colSpan={5} sx={{ fontSize: '25px' }}>
                    On Leave
                </TableCell>
            </TableRow>
        </TableHead>
      </Table>
    </TableContainer>


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