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
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

export default function MyAttendances() {
  const [attendanceData, setAttendanceData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [loggedInEmployeeName, setLoggedInEmployeeName] = React.useState("");
  const [loggedInEmployeeId, setLoggedInEmployeeId] = React.useState(null);

  React.useEffect(() => {
    const fetchLoggedInEmployeeInfo = async () => {
      const employeeIdFromLocalStorage = localStorage.getItem("employeeId");

      if (employeeIdFromLocalStorage) {
        setLoggedInEmployeeId(parseInt(employeeIdFromLocalStorage, 10));
        try {
          // Fetch employee name from your backend API
          const employeeResponse = await fetch(
            `http://192.168.1.49:8084/api/employees/${employeeIdFromLocalStorage}`
          ); // Adjust the URL
          if (!employeeResponse.ok) {
            throw new Error(
              `Failed to fetch employee name: ${employeeResponse.status}`
            );
          }
          const employeeData = await employeeResponse.json();
          setLoggedInEmployeeName(
            employeeData.firstName + " " + employeeData.lastName
          ); // Adjust how you get the name
        } catch (error) {
          console.error("Error fetching employee name:", error);
          setError(
            "Failed to fetch employee name. Please check your connection."
          );
          setLoading(false);
          return;
        }
      } else {
        setError("Employee ID not found. Please log in.");
        setLoading(false);
        return;
      }
    };

    fetchLoggedInEmployeeInfo();
  }, []);

  React.useEffect(() => {
    if (loggedInEmployeeId) {
      fetchAttendanceData(selectedDate, loggedInEmployeeId);
    }
  }, [selectedDate, loggedInEmployeeId]);

  const fetchAttendanceData = async (date, employeeId) => {
    setLoading(true);
    setError(null);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    try {
      const response = await fetch(
        `http://192.168.1.49:8084/attendance/by-month?year=${year}&month=${month}&employeeId=${employeeId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAttendanceData(data);
    } catch (e) {
      setError(e.message);
      setAttendanceData([]);
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
        <CircularProgress sx={{ color: "white" }} />
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
          backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent
          backdropFilter: "blur(12px)", // optional blur effect
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
            sx={{ flexGrow: 1, minWidth: 200, color: "white" }}
          >
            My Attendance
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ minWidth: 200, textAlign: "right", color: "white" }}
          >
            Employee Name: {loggedInEmployeeName}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ minWidth: 150, textAlign: "right", color: "white" }}
          >
            Employee ID:{" "}
            {loggedInEmployeeId !== null ? loggedInEmployeeId : "N/A"}
          </Typography>

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
                    svg: { color: "white" }, // calendar icon
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

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>SL.NO</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Check In</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Check Out</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.attendanceId}>
                    <TableCell sx={{ color: 'white' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ color: 'white' }}> 
                      {format(new Date(row.attendanceDate), "dd-MM-yy")}
                    </TableCell>
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
              {attendanceData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", color:'white' }}>
                    No attendance data found for the selected month.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={attendanceData.length}
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