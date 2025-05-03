import React, { useEffect, useState } from "react";
import { Box, Typography, MenuItem, Select, TextField } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import axios from "axios";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState("Day");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [presentCount, setPresentCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    fetchAttendanceData();
  }, [date, timeRange]);

  const fetchAttendanceData = async () => {
    try {
      const [presentRes, lateRes, absentRes] = await Promise.all([
        axios.get("http://192.168.1.49:8084/attendance/today/present"),
        axios.get("http://192.168.1.49:8084/attendance/today/late"),
        axios.get("http://192.168.1.49:8084/attendance/today/absent"),
      ]);

      setPresentCount(presentRes.data);
      setLateCount(lateRes.data);
      setAbsentCount(absentRes.data);
    } catch (error) {
      console.error("Error fetching attendance data", error);
    }
  };

  const total = presentCount + absentCount;
  const onTimePercentage =
    total > 0 ? (((presentCount - lateCount) / total) * 100).toFixed(1) : 0;
  const latePercentage =
    total > 0 ? ((lateCount / total) * 100).toFixed(1) : 0;
  const absentPercentage =
    total > 0 ? ((absentCount / total) * 100).toFixed(1) : 0;

  const data = {
    labels: ["On Time", "Late Come", "Absent"],
    datasets: [
      {
        label: "Attendance %",
        data: [onTimePercentage, latePercentage, absentPercentage],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, width: 400 }}>
      <Typography variant="h6" fontWeight="bold">
        Attendance Analytic
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          size="small"
        >
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

      <Box sx={{ height: 300, mt: 2 }}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default AttendanceAnalytics;