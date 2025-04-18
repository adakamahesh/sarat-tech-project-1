import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const API_URL = process.env.REACT_APP_BASE_URL;

export default function AccessibleTable() {
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}meeting-schedule`)
      .then((response) => {
        setMeetingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching meeting data:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table aria-label="meeting schedule table">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ padding: "16px 24px", backgroundColor: "#f5f5f5" }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                  Meeting Schedule
                </span>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow
            sx={{ borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" }}
          >
            <TableCell
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#1976d2",
              }}
            >
              Meeting Title
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#1976d2",
              }}
            >
              Meeting Date
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#1976d2",
              }}
            >
              Meeting Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetingData.map((row) => (
            <TableRow key={row.meetingId}>
              <TableCell component="th" scope="row">
                {row.meetingTitle}
              </TableCell>
              <TableCell align="center">{row.meetingDate}</TableCell>
              <TableCell align="center">{row.meetingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}