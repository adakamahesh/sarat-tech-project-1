import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function EmployeeJoiningGraph() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch data from backend when component mounts
  React.useEffect(() => {
    fetch("http://192.168.1.49:8084/recruitment/applicant/joining-count-per-month")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Failed to load data</Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        padding: { xs: 1, sm: 2 },
        mt: { xs: 2, sm: 4 },
        boxShadow: { xs: "none", sm: 3 },
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "16px", sm: "20px" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Employee Joining Per Month
      </Typography>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Joined" fill="#4caf50" name="Joined Employees" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}