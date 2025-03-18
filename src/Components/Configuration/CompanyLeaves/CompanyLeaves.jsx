import * as React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
  TableSortLabel,Paper,TextField,MenuItem,Button,Card,CardContent,Typography,Dialog,IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from "@mui/icons-material/EditNote";

function createData(id, BasedOnWeek, BasedOnWeekDay) {
    return { id,BasedOnWeek , BasedOnWeekDay };
  }
  
  const initialRows = [
    createData(1,'All',"Saturday"),
    createData(2,'All',"SunDay"),
  ];
  
export default function CompanyLeavesTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [newBasedOnWeek, setNewBasedOnWeek] = React.useState({
    BasedOnWeek: '', BasedOnWeekDay: ''
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

  const handleAddBasedOnWeek = () => {
    if (newBasedOnWeek.BasedOnWeek && newBasedOnWeek.BasedOnWeekDay) {
      setRows([...rows, createData(rows.length + 1, newBasedOnWeek.BasedOnWeek, newBasedOnWeek.BasedOnWeekDay, rows.length + 500)]);
      setNewBasedOnWeek({BasedOnWeek: '', BasedOnWeekDay: ''});
      handleClose();
    }
  };

  const handleInputChange = (event) => setNewBasedOnWeek({ ...newBasedOnWeek, [event.target.name]: event.target.value });

  const filteredRows = rows.filter((row) =>
    row.BasedOnWeek.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? row.BasedOnWeekDay === filter : true)
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap:10, mb: 2 }}>
          <Typography variant="h6">Company Leaves</Typography>
          <TextField label="Search BasedOnWeek" variant="outlined" size="small" value={search} onChange={handleSearch} />
          <TextField select label="Filter by WeekDay" variant="outlined" size="small" value={filter} onChange={handleFilter}>
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.BasedOnWeekDay))].map((job) => (
              <MenuItem key={job} value={job}>{job}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleOpen}>Create</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableSortLabel active={orderBy === 'BasedOnWeek'} direction={order} onClick={() => handleRequestSort('BasedOnWeek')}>
                  Based On Week
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Based On WeekDay</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.BasedOnWeek}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.BasedOnWeekDay}</TableCell>
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
            <Typography variant="h6">Add Company Leaves</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField name="BasedOnWeek" label="Based On Week" variant="outlined" size="small" value={newBasedOnWeek.BasedOnWeek} onChange={handleInputChange} />
              <TextField name="BasedOnWeekDay" label="Based On WeekDay" variant="outlined" size="small" value={newBasedOnWeek.BasedOnWeekDay} onChange={handleInputChange} />
              <Button variant="contained" onClick={handleAddBasedOnWeek}>Add Based On Week</Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}