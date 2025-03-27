import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, TextField } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState("Day");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const data = {
    labels: ["On Time", "Late Come", "Early Out"],
    datasets: [
      {
        label: "S/W Dept",
        data: [0.2, 0.3, 0.8], // Example values
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, width: 400 }}>
      <Typography variant="h6" fontWeight="bold">Attendance Analytic</Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} size="small">
          <MenuItem value="Day">Day</MenuItem>
          <MenuItem value="Week">Week</MenuItem>
          <MenuItem value="Month">Month</MenuItem>
        </Select>

        <TextField
          type="date"
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 150 }}
        />
      </Box>

      <Box sx={{ height: "50%" }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Box>
    </Box>
  );
};

export default AttendanceAnalytics;