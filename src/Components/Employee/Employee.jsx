import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import EmployeeNameInput from './EmployeeName';
import { Divider } from '@mui/material';

function createData(id, Employee, Email, Phone, BadgeId, JobPosition,Department,shift,WorkType,ReportingManager, Company,WorkEmail,DatofJoining) {
  return {
    id,
    Employee,
    Email,
    Phone,
    BadgeId,
    JobPosition,
    Department,
    shift,
    WorkType,
    ReportingManager,
    Company,
    WorkEmail,
    
  };
}

const rows = [
  createData(1, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 501,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(2, 'vasu', 'vasu@gmail.com',9700784065, 502,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(3, 'praveen', 'praveen@gmail.com',9700784065, 503,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(4, 'ganesh', 'ganesh@gmail.com',9700784065, 504,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(5, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 505,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(6, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 506,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(7, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 507,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(8, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 508,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(9, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 509,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(10, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 510,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(11, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 511,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(12, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 512,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(13, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 513,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(14, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 514,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(15, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 515,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
  createData(16, 'Mahesh', 'adakamahesh@gmail.com',9700784065, 516,"FrontEnd Developer",'IT Dept',"Day Shift","Office",'Mahii','Sarat Tech',"amb@gamil.com","28-1-2025"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'Employee',
    numeric: false,
    disablePadding: true,
    label: 'Employee',
  },
  {
    id: 'Email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'Phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'Badgeid',
    numeric: false,
    disablePadding: true,
    label: 'Badgeid',
  },
  {
    id: 'JobPosition',
    numeric: false,
    disablePadding: true,
    label: 'JobPosition',
  },
  {
    id: 'Department',
    numeric: false,
    disablePadding: true,
    label: 'Department',
  },{
    id: 'Shift',
    numeric: false,
    disablePadding: true,
    label: 'Shift',
  },{
    id: 'WorkType',
    numeric: false,
    disablePadding: true,
    label: 'WorkType',
  },{
    id: 'ReportingManager',
    numeric: false,
    disablePadding: true,
    label: 'ReportingManager',
  },{
    id: 'Company',
    numeric: false,
    disablePadding: true,
    label: 'Company',
  },{
    id: 'WorkEmail',
    numeric: false,
    disablePadding: true,
    label: 'WorkEmail',
  },{
    id: 'DateOfJoining',
    numeric: true,
    disablePadding: true,
    label: 'DateOfJoining',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: "flex",
          flexDirection: "column", 
          alignItems: "flex-start",
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Employee
        </Typography>
      )}
      <Divider />
      <Box sx={{ mt: 2 }}>
       <EmployeeNameInput/>
      </Box>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.Employee}
                    </TableCell>
                    <TableCell align="center">{row.Email}</TableCell>
                    <TableCell align="center">{row.Phone}</TableCell>
                    <TableCell align="center">{row.BadgeId}</TableCell>
                    <TableCell align="centert">{row.JobPosition}</TableCell>
                    <TableCell align="centert">{row.Department}</TableCell>
                    <TableCell align="centert">{row.shift}</TableCell>
                    <TableCell align="centert">{row.WorkType}</TableCell>
                    <TableCell align="centert">{row.ReportingManager}</TableCell>
                    <TableCell align="centert">{row.Company}</TableCell>
                    <TableCell align="centert">{row.WorkEmail}</TableCell>
                    <TableCell align="centert">{row.DateOfJoining}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={14} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}