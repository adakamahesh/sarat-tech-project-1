import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Function to generate columns dynamically (weekends are colored but have no data)
const generateColumns = (daysInMonth, selectedDate) => {
  let columns = [{ field: "employee", headerName: "Employee", width: 200 }]; // Employee column

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    ); // Get full date for each day
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Check if it's Saturday (6) or Sunday (0)

    columns.push({
      field: `day${day}`,
      headerName: `${day}`,
      width: 50,
      editable: !isWeekend, // Disable editing for weekends
      cellClassName: isWeekend ? "weekend" : "", // Assign a class for weekend cells
    });
  }

  return columns;
};

// Function to remove weekend data but keep weekend columns
const filterEmployeeData = (employees, selectedDate) => {
  return employees.map((employee) => {
    let filteredData = { id: employee.id, employee: employee.employee }; // Keep ID and Employee name

    for (let day in employee) {
      if (day.startsWith("day")) {
        const dayNumber = parseInt(day.replace("day", ""), 10); // Extract day number
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          dayNumber
        );
        const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Check if it's a weekend

        filteredData[day] = isWeekend ? "" : employee[day]; // Hide data for weekends
      }
    }
    return filteredData;
  });
};

// Sample employee data
const employees = [
  {
    id: 1,
    employee: "Adam Luis (PEP00)",
    day1: "L",
    day2: "P",
    day3: "P",
    day6: "A",
    day7: "L",
  },
  {
    id: 2,
    employee: "Abigail Roberts (PEP15)",
    day1: "P",
    day2: "L",
    day3: "P",
    day6: "A",
    day7: "L",
  },
  {
    id: 3,
    employee: "Alexander Smith (PEP16)",
    day1: "P",
    day2: "P",
    day3: "A",
    day6: "A",
    day7: "L",
  },
];

const WorkRecords = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected month

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate(); // Get number of days in month
  const columns = generateColumns(daysInMonth, selectedDate); // Generate table columns
  const filteredEmployees = filterEmployeeData(employees, selectedDate); // Remove weekend data

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ height: 450, width: "100%", padding: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h5">
            Work Records -{" "}
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Typography>

          {/* Date Picker */}
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

        {/* Data Grid Table */}
        <DataGrid
          rows={filteredEmployees} // Filtered employee data
          columns={columns} // Column configuration
          pageSizeOptions={[5, 10]}
          getCellClassName={(params) =>
            params.colDef.cellClassName === "weekend" ? "weekend-style" : ""
          }
          sx={{
            "& .weekend-style": {
              backgroundColor: "#f5c6cb", // Light red for weekends
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default WorkRecords;