import * as React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
    TableSortLabel, Paper, TextField, MenuItem, Typography, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

export default function PayslipTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [search, setSearch] = useState('');
    const [monthFilter, setMonthFilter] = useState(null);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeId = localStorage.getItem("employeeId");
                const [employeeRes, payrollRes] = await Promise.all([
                    
                    axios.get(`http://192.168.1.49:8084/api/employees/${employeeId}`),
                    axios.get('http://192.168.1.49:8084/payroll')
                ]);

                const activeEmployees = employeeRes.data;
                const payrolls = payrollRes.data;

                const combinedData = activeEmployees.map((employee, index) => {
                    const employeePayroll = payrolls.find(p => p.employeeId === employee.employeeId);

                    return {
                        id: index + 1,
                        EmployeeId: employee.employeeId,
                        Employee: `${employee.firstName} ${employee.lastName}`,
                        Date: employeePayroll?.dateOfCalculation
                            ? new Date(employeePayroll.dateOfCalculation).toLocaleDateString()
                            : 'N/A',
                        Allowance: employeePayroll?.totalGross
                            ? `INR ${employeePayroll.totalGross.toFixed(2)}`
                            : 'INR 0.00',
                        Deduction: employeePayroll?.totalDeduction
                            ? `INR ${employeePayroll.totalDeduction.toFixed(2)}`
                            : 'INR 0.00',
                        NetPay: employeePayroll?.netPay
                            ? `INR ${employeePayroll.netPay.toFixed(2)}`
                            : 'INR 0.00',
                        Status: employeePayroll?.paymentStatus || 'N/A'
                    };
                });

                setRows(combinedData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtering logic
    const filteredRows = rows.filter((row) => {
        const matchesSearch = (row.Employee || '').toLowerCase().includes(search.toLowerCase());

        const matchesMonth = monthFilter
            ? row.Date !== 'N/A' &&
              format(new Date(row.Date), 'yyyy-MM') === format(monthFilter, 'yyyy-MM')
            : true;

        return matchesSearch && matchesMonth;
    });

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>Error: {error.message}</div>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
                <Box sx={{ display: 'flex', gap: 4, mb: 2, alignItems: 'center' }}>
                    <Typography variant="h6">Payslip</Typography>
                    <TextField label="Search Employee" variant="outlined" size="small" value={search} onChange={handleSearch} />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year', 'month']}
                            label="Filter by Month"
                            value={monthFilter}
                            onChange={(newValue) => setMonthFilter(newValue)}
                            renderInput={(params) => <TextField size="small" {...params} />}
                            clearable
                        />
                    </LocalizationProvider>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EmployeeId</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    <TableSortLabel active={orderBy === 'Employee'} direction={order} onClick={() => handleRequestSort('Employee')}>
                                        Employee
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Allowance</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Deduction</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>NetPay</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', position: 'sticky', right: 0, background: 'white', zIndex: 2 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.EmployeeId}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.Employee}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.Date}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.Allowance}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.Deduction}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.NetPay}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{row.Status}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', position: 'sticky', right: 0, background: 'white', zIndex: 2 }}>
                                        {editId === row.id ? (
                                            <Typography variant="body2" color="textSecondary">Editing...</Typography>
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
        </Box>
    );
}