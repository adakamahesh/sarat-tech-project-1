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
Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const API_BASE_URL = "[http://192.168.1.49:8084/recruitment/applicant](http://192.168.1.49:8084/recruitment/applicant)";

// Helper function to create table data rows
function createData(applicant) {
return {
applicantId: applicant.applicantId,
Employee: `${applicant.firstName} ${applicant.lastName}`,
Email: applicant.email,
Phone: applicant.mobileNumber,
JonPosition: applicant.jonPosition || "N/A", // Display Job Title
AlternateNumber: applicant.alternateNumber,
DOB: applicant.dateOfBirth ? new Date(applicant.dateOfBirth).toLocaleDateString() : "",
Gender: applicant.gender,
Status: applicant.status,
Address: applicant.address,
EmergencyContactName: applicant.emergencyContactName,
EmergencyContactNumber: applicant.emergencyContactNumber,
MaritalStatus: applicant.maritalStatus,
Qualification: applicant.qualification,
firstName: applicant.firstName,  // Include firstName
lastName: applicant.lastName,    // Include lastName
jobId: applicant.jobId
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
            setApplicants(applicantResponse.data.map((applicant) => createData(applicant)));

            // Fetch job postings
            const jobPostingResponse = await axios.get("http://192.168.1.49:8084/recruitment/job_postings");
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
        const job = jobPostings.find((j) => j.jobId === parseInt(newApplicant.jobId));
        const rawData = {
            ...newApplicant,
            jobId: { jobId: parseInt(newApplicant.jobId) },
            JonPosition: job ? job.jobTitle : "N/A",
        };
        await axios.post(API_BASE_URL, rawData);
        const response = await axios.get(API_BASE_URL);  // Fetch updated data
        setApplicants(response.data.map(applicant => createData(applicant)));
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
        const job = jobPostings.find((j) => j.jobId === parseInt(editApplicant.jobId));
        const rawData = {
            ...editApplicant,
            jobId: { jobId: parseInt(editApplicant.jobId) },
            JonPosition: job ? job.jobTitle : "N/A"
        };
        await axios.put(`${API_BASE_URL}/${editApplicant.applicantId}`, rawData);
        const response = await axios.get(API_BASE_URL);  // Fetch updated data
        setApplicants(response.data.map(applicant => createData(applicant)));
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
        const response = await axios.get(API_BASE_URL);  // Fetch updated data
        setApplicants(response.data.map(applicant => createData(applicant)));
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
if (loading) return <div>Loading applicants...</div>;
if (error) return <div>Error: {error}</div>;

const filteredApplicants = applicants.filter((applicant) => {
    const matchesName = applicant.Employee.toLowerCase().includes(searchText.toLowerCase());
    const matchesJob = jobFilter === "" || applicant.JonPosition === jobFilter;
    return matchesName && matchesJob;
});

return (
    <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
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
                <Typography variant="h6" gutterBottom sx={{ whiteSpace: "nowrap" }}>
                    Applicants
                </Typography>
                <TextField
                    label="Search by Applicant Name"
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={handleSearch}
                    sx={{ width: 300 }}
                />
                <TextField
                    select
                    label="Filter by Job Position"
                    variant="outlined"
                    size="small"
                    value={jobFilter}
                    onChange={handleJobFilterChange}
                    sx={{ minWidth: 180 }}
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
                                <TableCell key={header}>
                                    <b>{header}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredApplicants.map((row) => (
                            <TableRow key={row.applicantId}>
                                <TableCell>{row.applicantId}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar>{row.Employee[0]}</Avatar>
                                        {row.Employee}
                                    </Box>
                                </TableCell>
                                <TableCell>{row.Email}</TableCell>
                                <TableCell>{row.Phone}</TableCell>
                                <TableCell>{row.JonPosition}</TableCell>
                                <TableCell>{row.AlternateNumber}</TableCell>
                                <TableCell>{row.DOB}</TableCell>
                                <TableCell>{row.Gender}</TableCell>
                                <TableCell>{row.Address}</TableCell>
                                <TableCell>{row.EmergencyContactName}</TableCell>
                                <TableCell>{row.EmergencyContactNumber}</TableCell>
                                <TableCell>{row.MaritalStatus}</TableCell>
                                <TableCell>{row.Qualification}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditOpen(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(row.applicantId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredApplicants.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={14} align="center">
                                    No applicants found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>

        {/* Edit Applicant Dialog */}
        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Applicant</DialogTitle>
            <DialogContent dividers>
                {editApplicant && (
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={editApplicant.firstName}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={editApplicant.lastName}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="Email"
                            value={editApplicant.Email}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            name="Phone"
                            value={editApplicant.Phone}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        {renderJonPositionField("jobId", "Job Position", editApplicant.jobId, handleEditChange)}
                        <TextField
                            label="Alternate Number"
                            name="AlternateNumber"
                            value={editApplicant.AlternateNumber}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="DOB"
                            name="DOB"
                            type="date"
                            value={editApplicant.DOB}
                            onChange={handleEditChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        {renderSelectField("Gender", "Gender", editApplicant.Gender, handleEditChange, genderOptions)}
                        {renderSelectField("Status", "Status", editApplicant.Status, handleEditChange, statusOptions)}
                        <TextField
                            label="Address"
                            name="Address"
                            value={editApplicant.Address}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="Emergency Contact Name"
                            name="EmergencyContactName"
                            value={editApplicant.EmergencyContactName}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="Emergency Contact Number"
                            name="EmergencyContactNumber"
                            value={editApplicant.EmergencyContactNumber}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        {renderSelectField("MaritalStatus", "Marital Status", editApplicant.MaritalStatus, handleEditChange, maritalStatusOptions)}
                        {renderSelectField("Qualification", "Qualification", editApplicant.Qualification, handleEditChange, qualificationOptions)}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button variant="contained" onClick={handleEditSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>

        {/* Add Applicant Dialog */}
        <Dialog open={addOpen} onClose={handleAddClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Applicant</DialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={newApplicant.firstName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={newApplicant.lastName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={newApplicant.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Phone"
                        name="mobileNumber"
                        value={newApplicant.mobileNumber}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    {renderJonPositionField("jobId", "Job Position", newApplicant.jobId, handleInputChange)}
                    <TextField
                        label="Alternate Number"
                        name="alternateNumber"
                        value={newApplicant.alternateNumber}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="DOB"
                        name="dateOfBirth"
                        type="date"
                        value={newApplicant.dateOfBirth}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {renderSelectField("gender", "Gender", newApplicant.gender, handleInputChange, genderOptions)}
                    {renderSelectField("status", "Status", newApplicant.status, handleInputChange, statusOptions)}
                    <TextField
                        label="Address"
                        name="address"
                        value={newApplicant.address}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Emergency Contact Name"
                        name="emergencyContactName"
                        value={newApplicant.emergencyContactName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Emergency Contact Number"
                        name="emergencyContactNumber"
                        value={newApplicant.emergencyContactNumber}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    {renderSelectField("maritalStatus", "Marital Status", newApplicant.maritalStatus, handleInputChange, maritalStatusOptions)}
                    {renderSelectField("qualification", "Qualification", newApplicant.qualification, handleInputChange, qualificationOptions)}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddClose}>Cancel</Button>
                <Button variant="contained" onClick={handleAddSave}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleSnackbarClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </Box>
);

}