import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";

// Initial Leave Types
const initialLeaveTypes = [
  {
    code: "EL",
    name: "Earned Leave",
    payment: "Paid",
    days: 1,
    color: "#b2dfdb",
  },
  {
    code: "ML",
    name: "Maternity Leave",
    payment: "Paid",
    days: 90,
    color: "#ffe0b2",
  },
  {
    code: "SL",
    name: "Sick Leave",
    payment: "Paid",
    days: 10,
    color: "#81d4fa",
  },
  {
    code: "CL",
    name: "Casual Leave",
    payment: "Paid",
    days: 1,
    color: "#bcaaa4",
  },
  {
    code: "CT",
    name: "Compensatory Leave Type",
    payment: "Paid",
    days: 21,
    color: "#90a4ae",
  },
];

const LeaveTypesPage = () => {
  const [leaveTypes, setLeaveTypes] = useState(initialLeaveTypes);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [newLeave, setNewLeave] = useState({
    code: "",
    name: "",
    payment: "",
    days: "",
    color: "#e0e0e0",
  });

  // Filter Menu
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterSelect = (value) => {
    setFilterValue(value);
    setAnchorEl(null);
  };

  // Create Form
  const handleCreateClick = () => {
    setShowCreateCard(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = () => {
    setLeaveTypes((prev) => [
      ...prev,
      { ...newLeave, days: parseInt(newLeave.days) },
    ]);
    setNewLeave({
      code: "",
      name: "",
      payment: "",
      days: "",
      color: "#e0e0e0",
    });
    setShowCreateCard(false);
  };

  const handleCancelCreate = () => {
    setNewLeave({
      code: "",
      name: "",
      payment: "",
      days: "",
      color: "#e0e0e0",
    });
    setShowCreateCard(false);
  };

  // Search + Filter
  const filtered = leaveTypes.filter(
    (leave) =>
      leave.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterValue === "" || leave.payment === filterValue)
  );

  return (
    <Box p={3}>
      {/* Controls */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        {/* Header */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Leave Types
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterClick}
        >
          Filter
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleFilterSelect("")}>All</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Paid")}>Paid</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Unpaid")}>
            Unpaid
          </MenuItem>
        </Menu>

        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          onClick={handleCreateClick}
        >
          Create
        </Button>
      </Box>

      {/* Create Form Card */}
      {showCreateCard && (
        <Box mb={4} display="flex" justifyContent="center">
          <Card sx={{ width: 400, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create Leave Type
              </Typography>
              <TextField
                label="Code"
                name="code"
                fullWidth
                margin="dense"
                value={newLeave.code}
                onChange={handleInputChange}
              />
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="dense"
                value={newLeave.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Payment"
                name="payment"
                fullWidth
                margin="dense"
                value={newLeave.payment}
                onChange={handleInputChange}
              />
              <TextField
                label="Days"
                name="days"
                fullWidth
                margin="dense"
                type="number"
                value={newLeave.days}
                onChange={handleInputChange}
              />
              <TextField
                label="Color"
                name="color"
                fullWidth
                margin="dense"
                value={newLeave.color}
                onChange={handleInputChange}
              />
              <Box display="flex" gap={2} mt={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCreateSubmit}
                >
                  Save
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  onClick={handleCancelCreate}
                >
                  Cancel
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
      {/* Cards */}
      <Grid container spacing={2}>
        {filtered.length > 0 ? (
          filtered.map((leave, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      width={40}
                      height={40}
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor={leave.color}
                      fontWeight="bold"
                    >
                      {leave.code}
                    </Box>
                    <Box>
                      <Typography fontWeight="bold">{leave.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Payment: {leave.payment}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Total Days: {leave.days}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography ml={1}>No results found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default LeaveTypesPage;