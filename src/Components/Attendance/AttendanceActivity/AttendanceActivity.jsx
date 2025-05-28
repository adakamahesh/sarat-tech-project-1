import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

export default function AttendanceActivity() {
  const [attendanceData, setAttendanceData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [uniqueEmployees, setUniqueEmployees] = React.useState([]);

  React.useEffect(() => {
    fetchAttendanceData(selectedDate);
  }, [selectedDate]);

  const fetchAttendanceData = async (date) => {
    setLoading(true);
    setError(null);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed in JavaScript
    try {
      const response = await fetch(
        `http://192.168.1.49:8084/attendance/by-month?year=${year}&month=${month}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAttendanceData(data);
      const employees = [
        ...new Set(data.map((item) => `${item.firstName} ${item.lastName}`)),
      ];
      setUniqueEmployees(employees);
    } catch (e) {
      setError(e.message);
      setAttendanceData([]);
      setUniqueEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredAttendance = search
    ? attendanceData.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : attendanceData;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent white
          backdropFilter: "blur(12px)",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, minWidth: 180, color: "white" }}
          >
            Attendance Activity
          </Typography>

          {/* Searchable Dropdown */}
          <Autocomplete
            options={uniqueEmployees}
            value={search}
            onInputChange={(e, value) => setSearch(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Employee"
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 250,
                  color: "white",
                  input: { color: "white" },
                  label: { color: "white" },
                  svg: { color: "white" },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
            )}
            sx={{ minWidth: 250 }}
            clearOnEscape
            freeSolo
          />

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Select Month and Year"
              inputFormat="MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{
                    color: "white",
                    input: { color: "white" },
                    label: { color: "white" },
                    svg: { color: "white" },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }}
                />
              )}
              views={["year", "month"]}
            />
          </LocalizationProvider>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>SL.NO</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Check In</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Check Out</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white'}}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.attendanceId}>
                    <TableCell sx={{ color: 'white' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {format(new Date(row.attendanceDate), "dd-MM-yy")}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{`${row.firstName} ${row.lastName}`}</TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {row.clockInTime
                        ? format(
                            new Date(`2000-01-01T${row.clockInTime}`),
                            "hh:mm a"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {row.clockOutTime
                        ? format(
                            new Date(`2000-01-01T${row.clockOutTime}`),
                            "hh:mm a"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.status}</TableCell>
                  </TableRow>
                ))}
              {filteredAttendance.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", color:'white' }}>
                    No attendance data found for the selected month.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAttendance.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: 'white',
            '.MuiSvgIcon-root': { color: 'white' },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              color: 'white',
            },
            '.MuiSelect-icon': {
              color: 'white',
            },
          }}
        />
      </Paper>
    </Box>
  );
}
