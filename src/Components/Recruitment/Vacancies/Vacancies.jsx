import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Card, CardContent, Typography, Dialog,
  MenuItem, Select, InputLabel, FormControl
} from "@mui/material";

export default function VacanciesTable() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    jobDescription: "",
    closingDate: "",
    salaryRange: "",
    status: "Open",
    jobVacancy: "",
    employmentType: "Full-time",
    jobLocation: "",
  });

  const BASE_URL = "http://192.168.1.49:8084/recruitment/job_postings";

  const fetchJobs = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setRows(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSave = async () => {
    try {
      await axios.post(`${BASE_URL}/save`, newJob);
      fetchJobs();
      setNewJob({
        jobTitle: "",
        jobDescription: "",
        closingDate: "",
        salaryRange: "",
        status: "Open",
        jobVacancy: "",
        employmentType: "Full-time",
        jobLocation: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${BASE_URL}/${jobId}`);
      fetchJobs();
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const filteredRows = rows.filter((row) =>
    row.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const headers = [
    "Job ID", "Job Title", "Job Description", "Closing Date",
    "Salary Range", "Status", "Vacancies", "Employment Type", "Job Location", "Action",
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Typography variant="h5">Job Vacancies</Typography>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Job
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((head) => (
                  <TableCell key={head} align="center"
                    sx={{ fontWeight: "bold", backgroundColor: "#93A0B4", color: "#fff" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.jobId}>
                  <TableCell align="center">{row.jobId}</TableCell>
                  <TableCell align="center">{row.jobTitle}</TableCell>
                  <TableCell align="center">{row.jobDescription}</TableCell>
                  <TableCell align="center">{row.closingDate}</TableCell>
                  <TableCell align="center">{row.salaryRange}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.jobVacancy}</TableCell>
                  <TableCell align="center">{row.employmentType}</TableCell>
                  <TableCell align="center">{row.jobLocation}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="error" size="small"
                      onClick={() => handleDelete(row.jobId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Card sx={{ p: 3, minWidth: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Add Job</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {["jobTitle", "jobDescription", "closingDate", "salaryRange", "jobVacancy", "jobLocation"].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  type={field.includes("Date") ? "date" : (field === "jobVacancy" ? "number" : "text")}
                  value={newJob[field]}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Employment Type</InputLabel>
                <Select
                  name="employmentType"
                  value={newJob.employmentType}
                  onChange={handleChange}
                  label="Employment Type"
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={newJob.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
              Save
            </Button>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}