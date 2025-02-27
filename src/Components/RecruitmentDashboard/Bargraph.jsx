import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Sample Data: Employee Joining Per Month
const data = [
  { month: "Jan", Joined: 2 },
  { month: "Feb", Joined: 10 },
  { month: "Mar", Joined: 5 },
  { month: "Apr", Joined: 15 },
  { month: "May", Joined: 25 },
  { month: "Jun", Joined: 15 },
  { month: "Jul", Joined: 22 },
  { month: "Aug", Joined: 38 },
  { month: "Sep", Joined: 35 },
  { month: "Oct", Joined: 45 },
  { month: "Nov", Joined: 10 },
  { month: "Dec", Joined: 25 },
];

export default function EmployeeJoiningGraph() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Joining Per Month
      </Typography>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={440}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Joined" fill="#4caf50" name="Joined Employees" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}