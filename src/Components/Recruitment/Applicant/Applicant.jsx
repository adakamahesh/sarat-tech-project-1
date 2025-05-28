import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const API_BASE_URL =
  "[http://192.168.1.49:8084/recruitment/applicant](http://192.168.1.49:8084/recruitment/applicant)";

// Helper function to create table data rows
function createData(applicant) {
  return {
    applicantId: applicant.applicantId,
    Employee: `${applicant.firstName} ${applicant.lastName}`,
    Email: applicant.email,
    Phone: applicant.mobileNumber,
    JonPosition: applicant.jonPosition || "N/A", // Display Job Title
    AlternateNumber: applicant.alternateNumber,
    DOB: applicant.dateOfBirth
      ? new Date(applicant.dateOfBirth).toLocaleDateString()
      : "",
    Gender: applicant.gender,
    Status: applicant.status,
    Address: applicant.address,
    EmergencyContactName: applicant.emergencyContactName,
    EmergencyContactNumber: applicant.emergencyContactNumber,
    MaritalStatus: applicant.maritalStatus,
    Qualification: applicant.qualification,
    firstName: applicant.firstName, // Include firstName
    lastName: applicant.lastName, // Include lastName
    jobId: applicant.jobId,
  };
}

export default function ApplicantTable() {
  const [applicants, setApplicants] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [jobFilter, setJobFilter] = React.useState("");
  const [editOpen, setEditOpen] = React.useState(false);
  const [editApplicant, setEditApplicant] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [newApplicant, setNewApplicant] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    alternateNumber: "",
    dateOfBirth: "",
    gender: "",
    jobId: "",
    address: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    maritalStatus: "",
    qualification: "",
    status: "",
  });
  const [jobPostings, setJobPostings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [addClose, setAddClose] = React.useState(false); // Added state for addClose

  const genderOptions = ["Male", "Female", "Other"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const qualificationOptions = ["High School", "Bachelor", "Master", "PhD"];
  const statusOptions = ["Applied", "Interviewed", "Hired", "Rejected"];

  // Fetch initial data (applicants and job postings)
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch applicants
        const applicantResponse = await axios.get(API_BASE_URL);
        setApplicants(
          applicantResponse.data.map((applicant) => createData(applicant))
        );

        // Fetch job postings
        const jobPostingResponse = await axios.get(
          "http://192.168.1.49:8084/recruitment/job_postings"
        );
        setJobPostings(jobPostingResponse.data);
      } catch (error) {
        setError(error.message);
        showSnackbar("Failed to fetch data. Please check your network.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to show snackbar messages
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Function to close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // --- CRUD Operations ---
  const handleAddSave = async () => {
    try {
      const job = jobPostings.find(
        (j) => j.jobId === parseInt(newApplicant.jobId)
      );
      const rawData = {
        ...newApplicant,
        jobId: { jobId: parseInt(newApplicant.jobId) },
        JonPosition: job ? job.jobTitle : "N/A",
      };
      await axios.post(API_BASE_URL, rawData);
      const response = await axios.get(API_BASE_URL); // Fetch updated data
      setApplicants(response.data.map((applicant) => createData(applicant)));
      setAddOpen(false);
      setAddClose(false); // Also reset the addClose state here
      setNewApplicant({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        alternateNumber: "",
        dateOfBirth: "",
        gender: "",
        jobId: "",
        status: "",
        address: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        maritalStatus: "",
        qualification: "",
      });
      showSnackbar("Applicant added successfully!");
    } catch (error) {
      setError(error.message);
      showSnackbar("Failed to add applicant.");
    }
  };

  const handleEditSave = async () => {
    try {
      const job = jobPostings.find(
        (j) => j.jobId === parseInt(editApplicant.jobId)
      );
      const rawData = {
        ...editApplicant,
        jobId: { jobId: parseInt(editApplicant.jobId) },
        JonPosition: job ? job.jobTitle : "N/A",
      };
      await axios.put(`${API_BASE_URL}/${editApplicant.applicantId}`, rawData);
      const response = await axios.get(API_BASE_URL); // Fetch updated data
      setApplicants(response.data.map((applicant) => createData(applicant)));
      setEditOpen(false);
      setEditApplicant(null);
      showSnackbar("Applicant updated successfully!");
    } catch (error) {
      setError(error.message);
      showSnackbar("Failed to update applicant.");
    }
  };

  const handleDelete = async (applicantId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${applicantId}`);
      const response = await axios.get(API_BASE_URL); // Fetch updated data
      setApplicants(response.data.map((applicant) => createData(applicant)));
      showSnackbar("Applicant deleted successfully!");
    } catch (error) {
      setError(error.message);
      showSnackbar("Failed to delete applicant.");
    }
  };

  // --- Handlers ---
  const handleSearch = (e) => setSearchText(e.target.value);
  const handleJobFilterChange = (e) => setJobFilter(e.target.value);
  const handleEditOpen = (applicant) => {
    setEditApplicant(createData(applicant)); // Ensure editApplicant has the correct structure
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditApplicant(null);
  };
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddClose(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditApplicant((prev) => ({ ...prev, [name]: value }));
  };

  // --- Helper Components ---
  const renderSelectField = (name, label, value, onChange, options) => (
    <FormControl fullWidth key={name}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderJonPositionField = (name, label, value, onChange) => (
    <FormControl fullWidth key={name}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        {jobPostings.map((job) => (
          <MenuItem key={job.jobId} value={job.jobId}>
            {job.jobTitle}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  // --- Main Render ---
  if (loading)
    return <div style={{ color: "white" }}>Loading applicants...</div>;
  if (error) return <div style={{ color: "white" }}>Error: {error}</div>;

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesName = applicant.Employee.toLowerCase().includes(
      searchText.toLowerCase()
    );
    const matchesJob = jobFilter === "" || applicant.JonPosition === jobFilter;
    return matchesName && matchesJob;
  });

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ whiteSpace: "nowrap", color: "white" }}
          >
            Applicants
          </Typography>
          <TextField
            label="Search by Applicant Name"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
            sx={{
              width: 300,
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          />
          <TextField
            select
            label="Filter by Job Position"
            variant="outlined"
            size="small"
            value={jobFilter}
            onChange={handleJobFilterChange}
            sx={{
              minWidth: 180,
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {jobPostings.map((job) => (
              <MenuItem key={job.jobId} value={job.jobTitle}>
                {job.jobTitle}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleAddOpen}>
            Add Applicant
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "ApplicantId",
                  "Applicant",
                  "Email",
                  "Phone",
                  "Job Position",
                  "Alternate Number",
                  "DOB",
                  "Gender",
                  "Address",
                  "Emergency Contact Name",
                  "Emergency Contact Number",
                  "Marital Status",
                  "Qualification",
                  "Status",
                  "Action",
                ].map((header, index) => (
                  <TableCell
                    key={header}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    <b>{header}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplicants.map((row) => (
                <TableRow key={row.applicantId}>
                  <TableCell sx={{ color: "white" }}>
                    {row.applicantId}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "white",
                      }}
                    >
                      <Avatar>{row.Employee[0]}</Avatar>
                      {row.Employee}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{row.Email}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.Phone}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.JonPosition}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.AlternateNumber}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{row.DOB}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.Gender}</TableCell>
                  <TableCell sx={{ color: "white" }}>{row.Address}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.EmergencyContactName}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.EmergencyContactNumber}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.MaritalStatus}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {row.Qualification}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{row.Status}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.applicantId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredApplicants.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={14}
                    align="center"
                    sx={{ color: "white" }}
                  >
                    No applicants found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Applicant Dialog */}
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            color: "white",
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Edit Applicant</DialogTitle>
        <DialogContent dividers>
          {editApplicant && (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
              }}
              noValidate
              autoComplete="off"
            >
              {[
                {
                  label: "First Name",
                  name: "firstName",
                  value: editApplicant.firstName,
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  value: editApplicant.lastName,
                },
                { label: "Email", name: "Email", value: editApplicant.Email },
                { label: "Phone", name: "Phone", value: editApplicant.Phone },
                {
                  label: "Alternate Number",
                  name: "AlternateNumber",
                  value: editApplicant.AlternateNumber,
                },
                {
                  label: "DOB",
                  name: "DOB",
                  value: editApplicant.DOB,
                  type: "date",
                },
                {
                  label: "Address",
                  name: "Address",
                  value: editApplicant.Address,
                },
                {
                  label: "Emergency Contact Name",
                  name: "EmergencyContactName",
                  value: editApplicant.EmergencyContactName,
                },
                {
                  label: "Emergency Contact Number",
                  name: "EmergencyContactNumber",
                  value: editApplicant.EmergencyContactNumber,
                },
              ].map(({ label, name, value, type = "text" }) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  value={value}
                  type={type}
                  onChange={handleEditChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
                  }}
                />
              ))}

              {renderJonPositionField(
                "jobId",
                "Job Position",
                editApplicant.jobId,
                handleEditChange
              )}

              {renderSelectField(
                "Gender",
                "Gender",
                editApplicant.Gender,
                handleEditChange,
                genderOptions,
                {
                  sx: {
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    ".MuiSvgIcon-root": { color: "white" },
                  },
                }
              )}
              {renderSelectField(
                "Status",
                "Status",
                editApplicant.Status,
                handleEditChange,
                statusOptions,
                { color: "white" }
              )}
              {renderSelectField(
                "MaritalStatus",
                "Marital Status",
                editApplicant.MaritalStatus,
                handleEditChange,
                maritalStatusOptions,
                { color: "white" }
              )}
              {renderSelectField(
                "Qualification",
                "Qualification",
                editApplicant.Qualification,
                handleEditChange,
                qualificationOptions,
                { color: "white" }
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Applicant Dialog */}
      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            color: "white",
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Add New Applicant</DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            noValidate
            autoComplete="off"
          >
            {[
              {
                label: "First Name",
                name: "firstName",
                value: newApplicant.firstName,
              },
              {
                label: "Last Name",
                name: "lastName",
                value: newApplicant.lastName,
              },
              { label: "Email", name: "email", value: newApplicant.email },
              {
                label: "Phone",
                name: "mobileNumber",
                value: newApplicant.mobileNumber,
              },
              {
                label: "Alternate Number",
                name: "alternateNumber",
                value: newApplicant.alternateNumber,
              },
              {
                label: "DOB",
                name: "dateOfBirth",
                value: newApplicant.dateOfBirth,
                type: "date",
              },
              {
                label: "Address",
                name: "address",
                value: newApplicant.address,
              },
              {
                label: "Emergency Contact Name",
                name: "emergencyContactName",
                value: newApplicant.emergencyContactName,
              },
              {
                label: "Emergency Contact Number",
                name: "emergencyContactNumber",
                value: newApplicant.emergencyContactNumber,
              },
            ].map(({ label, name, value, type = "text" }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={value}
                type={type}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                  },
                }}
              />
            ))}

            {renderJonPositionField(
              "jobId",
              "Job Position",
              newApplicant.jobId,
              handleInputChange
            )}

            {renderSelectField(
              "gender",
              "Gender",
              newApplicant.gender,
              handleInputChange,
              genderOptions,
              { color: "white" }
            )}
            {renderSelectField(
              "status",
              "Status",
              newApplicant.status,
              handleInputChange,
              statusOptions,
              { color: "white" }
            )}
            {renderSelectField(
              "maritalStatus",
              "Marital Status",
              newApplicant.maritalStatus,
              handleInputChange,
              maritalStatusOptions,
              { color: "white" }
            )}
            {renderSelectField(
              "qualification",
              "Qualification",
              newApplicant.qualification,
              handleInputChange,
              qualificationOptions,
              { color: "white" }
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddSave}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%",color:'white', }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}