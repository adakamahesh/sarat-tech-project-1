import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Button,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const API_BASE_URL = "http://192.168.1.49:8084/recruitment/applicant/hired";
const JOB_POSTING_API_URL = "http://192.168.1.49:8084/recruitment/applicant";

function createData(applicant) {
  return {
    id: applicant.applicantId,
    Employee:
      `${applicant.firstName || ""} ${applicant.lastName || ""}`.trim() || "-",
    Email: applicant.email || "-",
    CandidateId: applicant.applicantId || "-",
    JobPosition: applicant.jonPosition || "-",
    DateOfJoining: applicant.dateOfJoining
      ? dayjs(applicant.dateOfJoining).format("YYYY-MM-DD")
      : null,
    OfferLetter: applicant.offerLetterStatus || "-",
    ProbationEnds: applicant.probationends
      ? dayjs(applicant.probationends).format("YYYY-MM-DD")
      : null,
    firstName: applicant.firstName || "",
    lastName: applicant.lastName || "",
    jobId: applicant.jobId || null,
  };
}

export default function CandidateViewTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("DateOfJoining");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // 👈 For delete confirmation

  useEffect(() => {
    fetchApplicants();
    fetchJobPostings();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setRows(response.data.map((applicant) => createData(applicant)));
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobPostings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(JOB_POSTING_API_URL);
      setJobPostings(response.data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setEditData({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.Email,
      DateOfJoining: row.DateOfJoining,
      OfferLetter: row.OfferLetter,
      ProbationEnds: row.ProbationEnds,
      JobPosition: row.JobPosition,
      jobId: row.jobId,
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "DateOfJoining" && value) {
      setEditData((prevData) => ({
        ...prevData,
        ProbationEnds: dayjs(value).add(6, "month").format("YYYY-MM-DD"),
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, DateOfJoining, ProbationEnds, OfferLetter } = editData;

      await axios.patch(
        `http://192.168.1.49:8084/recruitment/applicant/update-joining-details/${id}`,
        {
          dateOfJoining: DateOfJoining
            ? new Date(DateOfJoining).getTime()
            : null,
          probationends: ProbationEnds
            ? new Date(ProbationEnds).getTime()
            : null,
          offerLetterStatus: OfferLetter,
        }
      );

      setEditId(null);
      setEditData({});
      fetchApplicants();
    } catch (error) {
      console.error("Error updating applicant:", error);
    }
  };

  const handleDateChange = (name, newDate) => {
    const formatted = newDate ? newDate.format("YYYY-MM-DD") : null;
    setEditData((prevData) => ({
      ...prevData,
      [name]: formatted,
      ...(name === "DateOfJoining" && formatted
        ? {
            ProbationEnds: dayjs(formatted)
              .add(6, "month")
              .format("YYYY-MM-DD"),
          }
        : {}),
    }));
  };

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${JOB_POSTING_API_URL}/${id}`);
      fetchApplicants();
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.Employee.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? row.JobPosition === filter : true)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            p: 2,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Applicant Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Search Candidate"
                value={search}
                onChange={handleSearch}
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <TextField
                select
                label="Filter by Job"
                value={filter}
                onChange={handleFilter}
                size="small"
                sx={{
                  width: "100%",
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    color: "white",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                    "& svg": {
                      color: "white", // Dropdown icon color
                    },
                  },
                  "& .MuiMenuItem-root": {
                    backgroundColor: "#333",
                    color: "white",
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {[...new Set(rows.map((row) => row.JobPosition))]
                  .sort()
                  .map((job) => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
          </Box>

          <TableContainer
            sx={{
              maxHeight: 400,
              overflow: "auto",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 2,
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  }}
                >
                  <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Candidate Id</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Candidate</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Date of Joining</TableCell>
                  <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Probation Ends</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Position</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Offer Letter</TableCell>
                  <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: "white" }}>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: "white" }}>
                      No candidates found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center" sx={{ color: "white" }}>{row.CandidateId}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ bgcolor: "#555", color: "white" }}>{row.Employee.charAt(0)}</Avatar>
                          {row.Employee}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>{row.Email}</TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {editId === row.id ? (
                          <DatePicker
                            value={dayjs(editData.DateOfJoining)}
                            onChange={(newDate) =>
                              handleDateChange("DateOfJoining", newDate)
                            }
                            format="YYYY-MM-DD"
                          />
                        ) : (
                          row.DateOfJoining
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {editId === row.id ? (
                          <DatePicker
                            value={dayjs(editData.ProbationEnds)}
                            onChange={(newDate) =>
                              handleDateChange("ProbationEnds", newDate)
                            }
                            format="YYYY-MM-DD"
                          />
                        ) : (
                          row.ProbationEnds
                        )}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>{row.JobPosition}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {editId === row.id ? (
                          <TextField
                            select
                            name="OfferLetter"
                            value={editData.OfferLetter}
                            onChange={handleEditChange}
                            size="small"
                            sx={{
                              input: { color: "white" },
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "transparent",
                                color: "white",
                                "& fieldset": {
                                  borderColor: "white",
                                },
                                "&:hover fieldset": {
                                  borderColor: "white",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "white",
                                },
                                "& svg": {
                                  color: "white",
                                },
                              },
                            }}
                          >
                            {["Sent", "Pending", "Cancel"].map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          row.OfferLetter
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {editId === row.id ? (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={handleUpdate}
                          >
                            Update
                          </Button>
                        ) : (
                          <>
                            <Box display="flex" justifyContent="center" gap={1}>
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => setConfirmDeleteId(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Delete confirmation dialog */}
        <Dialog
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this applicant?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(confirmDeleteId);
                setConfirmDeleteId(null);
              }}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}
