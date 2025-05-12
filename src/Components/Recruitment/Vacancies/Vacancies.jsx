import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function VacanciesTable() {
  const [rows, setRows] = React.useState([
    {
      jobId: 1,
      jobTitle: "Software Engineer",
      jobDescription: "Develop and maintain software.",
      jobPosition: "Developer",
      postingDate: "2025-05-01",
      closingDate: "2025-05-31",
      salaryRange: "60000-80000",
      status: "Open",
      jobVacancies: 2,
      employmentType: "Full-time",
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [newJob, setNewJob] = React.useState({
    jobTitle: "",
    jobDescription: "",
    jobPosition: "",
    postingDate: "",
    closingDate: "",
    salaryRange: "",
    status: "",
    jobVacancies: "",
    employmentType: "Full-time",
  });

  const handleSave = () => {
    const newId = rows.length ? Math.max(...rows.map((r) => r.jobId)) + 1 : 1;
    setRows([...rows, { ...newJob, jobId: newId }]);
    setNewJob({
      jobTitle: "",
      jobDescription: "",
      jobPosition: "",
      postingDate: "",
      closingDate: "",
      salaryRange: "",
      status: "",
      jobVacancies: "",
      employmentType: "Full-time",
    });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const filteredRows = rows.filter((row) =>
    row.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const headers = [
    "Job ID",
    "Job Title",
    "Job Description",
    "Job Position",
    "Posting Date",
    "Closing Date",
    "Salary Range",
    "Status",
    "Vacancies",
    "Employment Type",
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

        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow>
                  {headers.map((head) => (
                    <TableCell
                      key={head}
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#93A0B4",
                        color: "#fff",
                      }}
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
                    <TableCell align="center">{row.jobPosition}</TableCell>
                    <TableCell align="center">{row.postingDate}</TableCell>
                    <TableCell align="center">{row.closingDate}</TableCell>
                    <TableCell align="center">{row.salaryRange}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.jobVacancies}</TableCell>
                    <TableCell align="center">{row.employmentType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* Add Job Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Card sx={{ p: 3, minWidth: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Job
            </Typography>

            {/* Two Inputs Per Row */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Object.entries(newJob).map(([key, value]) => {
                if (key === "employmentType") return null;
                return (
                  <Box
                    key={key}
                    sx={{
                      flex: "1 1 calc(50% - 8px)",
                      minWidth: "200px",
                    }}
                  >
                    <TextField
                      fullWidth
                      name={key}
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      type={
                        key.includes("Date")
                          ? "date"
                          : key === "jobVacancies"
                          ? "number"
                          : "text"
                      }
                      value={value}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="employment-type-label">
                  Employment Type
                </InputLabel>
                <Select
                  labelId="employment-type-label"
                  id="employment-type"
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