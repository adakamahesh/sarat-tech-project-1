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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialApplicants = [
  {
    applicantId: 1,
    Employee: "John Doe",
    Email: "john@example.com",
    Phone: "1234567890",
    JobPosition: "Software Engineer",
    AlternateNumber: "0987654321",
    DOB: "1990-01-01",
    Gender: "Male",
    Status: "Applied",
    Address: "123 Street, City",
    EmergencyContactName: "Jane Doe",
    EmergencyContactNumber: "1112223333",
    MaritalStatus: "Single",
    Qualification: "Bachelor",
  },
  {
    applicantId: 2,
    Employee: "Alice Smith",
    Email: "alice@example.com",
    Phone: "2233445566",
    JobPosition: "Designer",
    AlternateNumber: "6677889900",
    DOB: "1992-05-15",
    Gender: "Female",
    Status: "Interviewed",
    Address: "456 Avenue, Town",
    EmergencyContactName: "Bob Smith",
    EmergencyContactNumber: "4445556666",
    MaritalStatus: "Married",
    Qualification: "Master",
  },
];

export default function ApplicantTable() {
  const [applicants, setApplicants] = React.useState(initialApplicants);
  const [searchText, setSearchText] = React.useState("");
  const [jobFilter, setJobFilter] = React.useState("");
  const [editOpen, setEditOpen] = React.useState(false);
  const [editApplicant, setEditApplicant] = React.useState(null);
  const [inlineEditId, setInlineEditId] = React.useState(null);
  const [inlineEditField, setInlineEditField] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);

  const jobPositions = Array.from(new Set(applicants.map((a) => a.JobPosition)));

  const genderOptions = ["Male", "Female", "Other"];
  const statusOptions = ["Applied", "Interviewed", "Hired", "Rejected"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const qualificationOptions = ["High School", "Bachelor", "Master", "PhD"];

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesName = applicant.Employee.toLowerCase().includes(searchText.toLowerCase());
    const matchesJob = jobFilter === "" || applicant.JobPosition === jobFilter;
    return matchesName && matchesJob;
  });

  const handleEditOpen = (applicant) => {
    setEditApplicant(applicant);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditApplicant(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setApplicants((prev) =>
      prev.map((app) => (app.applicantId === editApplicant.applicantId ? editApplicant : app))
    );
    handleEditClose();
  };

  const handleDelete = (applicantId) => {
    setApplicants((prev) => prev.filter((a) => a.applicantId !== applicantId));
  };

  const handleInlineChange = (id, field, value) => {
    setApplicants((prev) =>
      prev.map((app) => (app.applicantId === id ? { ...app, [field]: value } : app))
    );
  };

  const startInlineEdit = (id, field) => {
    setInlineEditId(id);
    setInlineEditField(field);
  };

  const stopInlineEdit = () => {
    setInlineEditId(null);
    setInlineEditField(null);
  };

  // --- Add Applicant Dialog Logic ---
  const [newApplicant, setNewApplicant] = React.useState({
    Employee: "",
    Email: "",
    Phone: "",
    JobPosition: "",
    AlternateNumber: "",
    DOB: "",
    Gender: "",
    Status: "",
    Address: "",
    EmergencyContactName: "",
    EmergencyContactNumber: "",
    MaritalStatus: "",
    Qualification: "",
  });

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOpen = () => {
    setNewApplicant({
      Employee: "",
      Email: "",
      Phone: "",
      JobPosition: "",
      AlternateNumber: "",
      DOB: "",
      Gender: "",
      Status: "",
      Address: "",
      EmergencyContactName: "",
      EmergencyContactNumber: "",
      MaritalStatus: "",
      Qualification: "",
    });
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddSave = () => {
    const newId = applicants.length > 0 ? Math.max(...applicants.map((a) => a.applicantId)) + 1 : 1;
    setApplicants((prev) => [...prev, { applicantId: newId, ...newApplicant }]);
    setAddOpen(false);
  };

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
            onChange={(e) => setSearchText(e.target.value)}
          />

          <TextField
            select
            label="Filter by Job Position"
            variant="outlined"
            size="small"
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            {jobPositions.map((position) => (
              <MenuItem key={position} value={position}>
                {position}
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
                  "Applicant ID",
                  "Applicant",
                  "Email",
                  "Phone",
                  "Job Position",
                  "Alternate Number",
                  "DOB",
                  "Gender",
                  "Status",
                  "Address",
                  "Emergency Contact Name",
                  "Emergency Contact Number",
                  "Marital Status",
                  "Qualification",
                ].map((header) => (
                  <TableCell key={header}>
                    <b>{header}</b>
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    position: "sticky",
                    right: 0,
                    backgroundColor: "#fff",
                    zIndex: 2,
                    top: 0,
                  }}
                >
                  <b>Action</b>
                </TableCell>
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

                  {/* Inline editable Email */}
                  <TableCell>
                    {inlineEditId === row.applicantId && inlineEditField === "Email" ? (
                      <TextField
                        value={row.Email}
                        onChange={(e) => handleInlineChange(row.applicantId, "Email", e.target.value)}
                        size="small"
                        onBlur={stopInlineEdit}
                        autoFocus
                      />
                    ) : (
                      <Box
                        onClick={() => startInlineEdit(row.applicantId, "Email")}
                        sx={{ cursor: "pointer" }}
                        title="Click to edit"
                      >
                        {row.Email}
                      </Box>
                    )}
                  </TableCell>

                  {/* Inline editable Phone */}
                  <TableCell>
                    {inlineEditId === row.applicantId && inlineEditField === "Phone" ? (
                      <TextField
                        value={row.Phone}
                        onChange={(e) => handleInlineChange(row.applicantId, "Phone", e.target.value)}
                        size="small"
                        onBlur={stopInlineEdit}
                        autoFocus
                      />
                    ) : (
                      <Box
                        onClick={() => startInlineEdit(row.applicantId, "Phone")}
                        sx={{ cursor: "pointer" }}
                        title="Click to edit"
                      >
                        {row.Phone}
                      </Box>
                    )}
                  </TableCell>

                  <TableCell>{row.JobPosition}</TableCell>
                  <TableCell>{row.AlternateNumber}</TableCell>
                  <TableCell>{row.DOB}</TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>{row.Status}</TableCell>
                  <TableCell>{row.Address}</TableCell>
                  <TableCell>{row.EmergencyContactName}</TableCell>
                  <TableCell>{row.EmergencyContactNumber}</TableCell>
                  <TableCell>{row.MaritalStatus}</TableCell>
                  <TableCell>{row.Qualification}</TableCell>

                  <TableCell
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
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
                  <TableCell colSpan={15} align="center">
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
                label="Applicant"
                name="Employee"
                value={editApplicant.Employee}
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
              <TextField
                label="Job Position"
                name="JobPosition"
                value={editApplicant.JobPosition}
                onChange={handleEditChange}
                fullWidth
              />
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
              <TextField
                select
                label="Gender"
                name="Gender"
                value={editApplicant.Gender}
                onChange={handleEditChange}
                fullWidth
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Status"
                name="Status"
                value={editApplicant.Status}
                onChange={handleEditChange}
                fullWidth
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
              <TextField
                select
                label="Marital Status"
                name="MaritalStatus"
                value={editApplicant.MaritalStatus}
                onChange={handleEditChange}
                fullWidth
              >
                {maritalStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Qualification"
                name="Qualification"
                value={editApplicant.Qualification}
                onChange={handleEditChange}
                fullWidth
              >
                {qualificationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
              label="Applicant"
              name="Employee"
              value={newApplicant.Employee}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="Email"
              value={newApplicant.Email}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="Phone"
              value={newApplicant.Phone}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="Job Position"
              name="JobPosition"
              value={newApplicant.JobPosition}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="Alternate Number"
              name="AlternateNumber"
              value={newApplicant.AlternateNumber}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="DOB"
              name="DOB"
              type="date"
              value={newApplicant.DOB}
              onChange={handleAddChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Gender"
              name="Gender"
              value={newApplicant.Gender}
              onChange={handleAddChange}
              fullWidth
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              name="Status"
              value={newApplicant.Status}
              onChange={handleAddChange}
              fullWidth
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Address"
              name="Address"
              value={newApplicant.Address}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="Emergency Contact Name"
              name="EmergencyContactName"
              value={newApplicant.EmergencyContactName}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              label="Emergency Contact Number"
              name="EmergencyContactNumber"
              value={newApplicant.EmergencyContactNumber}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              select
              label="Marital Status"
              name="MaritalStatus"
              value={newApplicant.MaritalStatus}
              onChange={handleAddChange}
              fullWidth
            >
              {maritalStatusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Qualification"
              name="Qualification"
              value={newApplicant.Qualification}
              onChange={handleAddChange}
              fullWidth
            >
              {qualificationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSave}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}