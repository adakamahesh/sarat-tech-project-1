import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Button,Card,CardContent,Typography,Dialog,IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from "@mui/icons-material/EditNote";

function createData(id,EmployeeId  , Employee, StartDate, EndDate, Batch, GrossPay, Deduction, NetPay, Status) {
    return { id,EmployeeId, Employee, StartDate, EndDate,Batch,GrossPay, Deduction ,NetPay ,Status};
  }
  
  const initialRows = [
    createData(1,'1', 'Mahesh Babu', 'sep.30,2024', 'Dec. 30,2024', 'None','INR 214002.00','INR 22470.21','INR 191331.79','Draft'),
    createData(2,'2', 'Vasu', 'sep.30,2024', 'Dec. 30,2024', 'None','INR 214002.00','INR 22470.21','INR 191331.79','Draft'),
    createData(3,'3', 'Praveen', 'sep.30,2024', 'Dec. 30,2024', 'None','INR 214002.00','INR 22470.21','INR 191331.79','Draft'),
    createData(4,'4', 'Ganesh', 'sep.30,2024', 'Dec. 30,2024', 'None','INR 214002.00','INR 22470.21','INR 191331.79','Draft'),
    createData(5,'5', 'Siva', 'sep.30,2024', 'Dec. 30,2024', 'None','INR 214002.00','INR 22470.21','INR 191331.79','Draft'),
    createData(6,'6', 'Naveen', 'sep.30,2024', 'Dec. 30,2024', 'None','INR 214002.00','INR 22470.21','INR 191331.79','Draft'),
  ];
  
export default function PayslipTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newEmployee, setNewEmployee] = React.useState({
    Employee: '', StartDate: '',EndDate:'',Batch:'',GrossPay:'', Deduction:'',NetPay:'',Status:''
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEmployee = () => {
    if (newEmployee.Employee && newEmployee.StartDate) {
      setRows([...rows, createData(rows.length + 1, newEmployee.Employee, newEmployee.StartDate, newEmployee.EndDate,newEmployee.Batch,newEmployee.GrossPay, newEmployee.Deduction,newEmployee.NetPay,newEmployee.Status, rows.length + 500)]);
      setNewEmployee({ Employee: '', StartDate: '', EndDate: '',Batch:'',GrossPay:'', Deduction:'',NetPay:'',Status:''});
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });

  const filteredRows = rows.filter((row) =>
    row.Employee.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.StartDate === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
          <Typography variant="h6">Payslip</Typography>
          <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField select label="Filter by Start Date" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.StartDate))].map((job) => (
              <MenuItem key={job} value={job}>{job}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleOpen}>Create</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EmployeeId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                  Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>StartDate</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EndDate</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Batch</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>GrossPay</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Deduction</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>NetPay</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', position: 'sticky',right: 0,background: 'white',zIndex: 2 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.EmployeeId}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Employee}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.StartDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.EndDate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Batch}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.GrossPay}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Deduction}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.NetPay}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Status}</TableCell>
                  <TableCell sx={{  textAlign: 'center',position: 'sticky', right: 0,background: 'white',zIndex: 2, whiteSpace: 'nowrap'  }}>
                    {editId === row.id ? (
                      <Button variant="contained" color="success" size="small" onClick={handleSave}>Save</Button>
                    ) : (
                      <>
                        <IconButton color="primary" onClick={() => { setEditId(row.id); setEditData(row); }}>
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(row.id)}>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}  maxWidth="sm" fullWidth>
        <Card sx={{ p: 2, minWidth: 300 }}>
          <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Typography variant="h6">Add Employee</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField name="EmployeeId" label="EmployeeId" variant="outlined" size="small" value={newEmployee.EmployeeId} onChange={handleInputChange} />
              <TextField name="Employee" label="Employee" variant="outlined" size="small" value={newEmployee.Employee} onChange={handleInputChange} />
              <TextField name="StartDate" label="StartDate" variant="outlined" size="small" value={newEmployee.StartDate} onChange={handleInputChange} />
              <TextField name="EndDate" label="EndDate" variant="outlined" size="small" value={newEmployee.EndDate} onChange={handleInputChange} />
              <TextField name="Batch" label="Batch" variant="outlined" size="small" value={newEmployee.Batch} onChange={handleInputChange} />
              <TextField name="GrossPay" label="GrossPay" variant="outlined" size="small" value={newEmployee.GrossPay} onChange={handleInputChange} />
              <TextField name="Deduction" label="Deduction" variant="outlined" size="small" value={newEmployee.Deduction} onChange={handleInputChange} />
              <TextField name="NetPay" label="NetPay" variant="outlined" size="small" value={newEmployee.NetPay} onChange={handleInputChange} />
              <TextField name="Status" label="Status" variant="outlined" size="small" value={newEmployee.Status} onChange={handleInputChange}/>
              <Button variant="contained" onClick={handleAddEmployee}>Add Payslip</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}