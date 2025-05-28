import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function HiringPipelineTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.49:8084/recruitment/applicant/pipeline-summary")
      .then((response) => setRows(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Paper
      sx={{
        padding: { xs: 1, sm: 2 },
        mt: { xs: 2, sm: 4 },
        boxShadow: { xs: "none", sm: 3 },
        borderRadius: 2,
        overflowX: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        color: "white",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
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
        Current Hiring Pipeline
      </Typography>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="pipeline table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#fff",
                  zIndex: 1000,
                  fontSize: { xs: "12px", sm: "14px" },
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                }}
              >
                Job Position
              </TableCell>
              {["Applied", "Test", "Interview", "Hired", "Cancelled"].map(
                (header) => (
                  <TableCell
                    key={header}
                    align="center"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 999,
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "white",
                  }}
                >
                  {row.JobPosition}
                </TableCell>
                {["Applied", "Test", "Interview", "Hired", "Cancelled"].map(
                  (status, idx) => (
                    <TableCell
                      key={idx}
                      align="center"
                      sx={{ fontSize: { xs: "12px", sm: "14px" },color: "white", }}
                    >
                      {row[status]}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}