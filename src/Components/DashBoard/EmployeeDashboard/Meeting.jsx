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
    <TableContainer
      component={Paper}
      sx={{
        mb: 3,
        height: 500, // Fixed height for the container
        overflowY: "auto", // Enables vertical scrolling
        overflowX: "hidden", // Prevents horizontal scroll
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <Table
        stickyHeader
        aria-label="meeting schedule table"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          color: "white",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{
                padding: "16px 24px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <span
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Meeting Schedule
                </span>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              color: "white",
            }}
          >
            <TableCell
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "white",
                fontWeight:'bold',
              }}
            >
              Meeting Title
            </TableCell>
            <TableCell
              align="center"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "white",
                fontWeight:'bold',
              }}
            >
              Meeting Date
            </TableCell>
            <TableCell
              align="center"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "white",
                fontWeight:'bold',
              }}
            >
              Meeting Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetingData.map((row) => (
            <TableRow key={row.meetingId} sx={{ color: "white" }}>
              <TableCell component="th" scope="row" sx={{ color: "white" }}>
                {row.meetingTitle}
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                {row.meetingDate}
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                {row.meetingTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
