import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { format } from 'date-fns';

// Function to generate columns dynamically
const generateColumns = (daysInMonth, selectedDate) => {
    let columns = [{ field: "employeeName", headerName: "Employee", width: 200 }];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        const dayOfWeek = date.getDay();

        columns.push({
            field: `day${day}`,
            headerName: `${day}`,
            width: 50,
            editable: false,
            cellClassName: (params) => {
                const cellValue = params.value;
                if (cellValue === "P") {
                    return "present-style";
                } else if (cellValue === "A") {
                    return "absent-style";
                } else if (dayOfWeek === 0) {
                    return "sunday";
                } else if (dayOfWeek === 6) {
                    return "saturday";
                }
                return "";
            },
        });
    }
    return columns;
};

const WorkRecords = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [employeeRecords, setEmployeeRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const daysInMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
    ).getDate();
    const columns = generateColumns(daysInMonth, selectedDate);

    // Fetch attendance and employee data
    useEffect(() => {
        const fetchAttendanceData = async () => {
            setLoading(true);
            try {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth() + 1;
                const attendanceResponse = await axios.get(
                    `http://192.168.1.49:8084/attendance/by-month?year=${year}&month=${month}` // Corrected URL
                );

                const employeeResponse = await axios.get(
                    "http://192.168.1.49:8084/api/employees/active"
                );

                const attendanceData = attendanceResponse.data;
                const employeesData = employeeResponse.data;
                // Combine and structure the data
                const employeeMap = new Map(employeesData.map(emp => [emp.employeeId, emp]));
                const processedData = employeesData.map(employee => {
                    const row = {
                        id: employee.employeeId,
                        employeeName: `${employee.firstName} ${employee.lastName} (${employee.employeeId})`,
                    };
                    for (let day = 1; day <= daysInMonth; day++) {
                        row[`day${day}`] = ""; // Default to empty
                    }

                    // Populate with attendance data
                    attendanceData.filter(record => record.employeeId === employee.employeeId).forEach(record => {
                        const recordDate = new Date(record.attendanceDate);
                        const day = recordDate.getDate();
                        if (day >= 1 && day <= daysInMonth) {
                            row[`day${day}`] = record.status;
                        }
                    });
                    return row;
                });
                setEmployeeRecords(processedData);

            } catch (error) {
                console.error("Error fetching data:", error);
                setEmployeeRecords([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [selectedDate, daysInMonth]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ height: 600, width: "100%", padding: 2 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                >
                    <Typography variant="h5">
                        Work Records - {format(selectedDate, 'MMMM')}
                    </Typography>
                    <DatePicker
                        views={["year", "month"]}
                        value={selectedDate}
                        onChange={(newDate) => newDate && setSelectedDate(newDate)}
                        renderInput={({ inputRef, inputProps, InputProps }) => (
                            <IconButton ref={inputRef} {...inputProps}>
                                <CalendarMonthIcon />
                                {InputProps?.endAdornment}
                            </IconButton>
                        )}
                    />
                </Box>

                <DataGrid
                    rows={employeeRecords}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    getRowId={(row) => row.id}
                    sx={{
                        "& .present-style": {
                            backgroundColor: "#90ee90",
                            color: "black",
                            fontWeight: "bold",
                        },
                        "& .absent-style": {
                            backgroundColor: "#ffb347",
                            color: "black",
                            fontWeight: "bold",
                        },
                        "& .sunday": {
                            backgroundColor: "#ff4d4d",
                            color: "white",
                            fontWeight: "bold",
                        },
                        "& .saturday": {
                            backgroundColor: "#f5c6cb",
                            color: "black",
                            fontWeight: "bold",
                        },
                    }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    disableColumnMenu
                />
            </Box>
        </LocalizationProvider>
    );
};

export default WorkRecords;