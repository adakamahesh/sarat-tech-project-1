import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  Paper,TextField,MenuItem,Button,Card,CardContent,Typography,Dialog,IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from "@mui/icons-material/EditNote";

function createData(id,Deduction, SpecificEmployee, ExcludedEmployees, IsPretax ,IsConditionBased, Condition, IsFixed, Amount, BasedOn, Rate) {
    return { id,Deduction, SpecificEmployee, ExcludedEmployees, IsPretax ,IsConditionBased, Condition, IsFixed,Amount, BasedOn, Rate };
  }
  
  // Define table columns dynamically
const columns = [
    { id: 'Deduction', label: 'Deduction', sticky: true },
    { id: 'SpecificEmployee', label: 'Specific Employee' },
    { id: 'ExcludedEmployees', label: 'Excluded Employees' },
    { id: 'IsPretax', label: 'Is Pretax' },
    { id: 'IsConditionBased', label: 'Is Condition Based' },
    { id: 'Condition', label: 'Condition' },
    { id: 'IsFixed', label: 'IsFixed' },
    { id: 'Amount', label: 'Amount' },
    { id: 'BasedOn', label: 'BasedOn' },
    { id: 'Rate', label: 'Rate' },
    { id: 'Action', label: 'Action', sticky: true }, // Sticky column for better visibility
  ];

  const initialRows = [
    createData(1,'Test', '', 'Aiden Murphy(PEP25)', 'No', 'No','','No',"","",""),
    createData(2,'Monthly', 'Mahesh Babu(501)', '', 'Yes', 'No','','No',"","","50.0"),
    createData(3,'Pension', '', '', 'Yes', 'No','','No',"","Taxable Gross Pay",""),
    createData(4,'', '', '', 'No', 'No','','No',"","","50.0"),
    createData(5,'Basic pay', '', '', 'Yes', 'No','','No',"","",""),
    createData(6,'iioo', '', '', 'No', 'No','','No',"","","50.0"),
  ];
  
export default function HolidayTable() {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newSpecificEmployee, setNewSpecificEmployee] = React.useState({
    Deduction:'',SpecificEmployee: '', ExcludedEmployees: '',IsPretax:'',IsConditionBased:'',Condition:'', IsFixed:'',Amount:'',BasedOn:'',Rate:''
  });

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

  const handleAddSpecificEmployee = () => {
    if (newSpecificEmployee.Deduction&& newSpecificEmployee.ExcludedEmployees) {
      setRows([...rows, createData(rows.length + 1, newSpecificEmployee.Deduction, newSpecificEmployee.ExcludedEmployees, newSpecificEmployee.IsPretax,newSpecificEmployee.IsConditionBased,newSpecificEmployee.Condition, newSpecificEmployee.IsFixed,newSpecificEmployee.Amount,newSpecificEmployee.BasedOn,newSpecificEmployee.Rate, rows.length + 500)]);
      setNewSpecificEmployee({ SpecificEmployee: '', ExcludedEmployees: '', IsPretax: '',IsConditionBased:'',Condition:'',IsFixed:'',Amount:'',BasedOn:'',Rate:''});
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewSpecificEmployee({ ...newSpecificEmployee, [event.target.name]: event.target.value });

  const filteredRows = rows.filter((row) =>
    row.Deduction.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.ExcludedEmployees === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
          <Typography variant="h6">Deduction</Typography>
          <TextField label="Search Specific Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField select label="Filter by Start Date" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.ExcludedEmployees))].map((job) => (
              <MenuItem key={job} value={job}>{job}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleOpen}>Create</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id} // Unique key for each column
                    sx={{
                        fontWeight: 'bold', // Bold text for column headers
                        textAlign: 'center', // Center-align text
                        position: column.sticky ? 'sticky' : 'static', // Make "Conformation" column sticky
                        right: column.sticky ? 0 : 'auto', // Stick to the right if marked as sticky
                        background: column.sticky ? 'white' : 'inherit', // Ensure sticky column has a background
                        zIndex: column.sticky ? 2 : 'auto', // Adjust stacking order for sticky column
                    }}
                    >
                        {column.label} {/* Display column label */}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Deduction}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.SpecificEmployee}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.ExcludedEmployees}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.IsPretax}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.IsConditionBased}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Condition}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.IsFixed}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Amount}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.BasedOn}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.Rate}</TableCell>
                  <TableCell sx={{  textAlign: 'center',position: 'sticky', right: 0,background: 'white',zIndex: 1, whiteSpace: 'nowrap'  }}>
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
            <Typography variant="h6">Add SpecificEmployee</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField name="Deduction" label="Deduction" variant="outlined" size="small" value={newSpecificEmployee.Deduction} onChange={handleInputChange} />
              <TextField name="SpecificEmployee" label="SpecificEmployee" variant="outlined" size="small" value={newSpecificEmployee.SpecificEmployee} onChange={handleInputChange} />
              <TextField name="ExcludedEmployees" label="Excluded Employees" variant="outlined" size="small" value={newSpecificEmployee.ExcludedEmployees} onChange={handleInputChange} />
              <TextField name="IsPretax" label="IsPretax" variant="outlined" size="small" value={newSpecificEmployee.IsPretax} onChange={handleInputChange} />
              <TextField name="IsConditionBased" label="Is Condition Based" variant="outlined" size="small" value={newSpecificEmployee.IsConditionBased} onChange={handleInputChange} />
              <TextField name="RequestedDays" label="RequestedDays" variant="outlined" size="small" value={newSpecificEmployee.RequestedDays} onChange={handleInputChange} />
              <TextField name="Status" label="Status" variant="outlined" size="small" value={newSpecificEmployee.Status} onChange={handleInputChange} />
              <Button variant="contained" onClick={handleAddSpecificEmployee}>Add Deduction</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}