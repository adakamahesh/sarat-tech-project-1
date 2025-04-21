import React, { useState, useEffect } from "react";
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
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { Add, FilterList, MoreVert } from "@mui/icons-material";

const LeaveTypeList = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredLeaveTypes, setFilteredLeaveTypes] = useState([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [newLeave, setNewLeave] = useState({
    code: "",
    name: "",
    payment: "Paid",
    days: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.49:8084/leave_types")
      .then((res) => res.json())
      .then((data) =>
        setLeaveTypes(
          data.map((lt) => ({
            ...lt,
            color: randomColor(),
          }))
        )
      )
      .catch((error) => console.error("Error fetching leave types:", error));
  }, []);

  const randomColor = () => {
    const colors = ["#FFD700", "#ADFF2F", "#87CEEB", "#FF69B4", "#FFA07A"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const filtered = leaveTypes.filter(
      (leave) =>
        leave.leaveTypeName.toLowerCase().includes(searchText.toLowerCase()) ||
        leave.payment.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredLeaveTypes(filtered);
  }, [searchText, leaveTypes]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleFilterSelect = (value) => {
    setSearchText(value);
    setAnchorEl(null);
  };

  const handleMenuOpen = (index, event) => {
    const updated = [...menuAnchorEl];
    updated[index] = event.currentTarget;
    setMenuAnchorEl(updated);
  };

  const handleMenuClose = (index) => {
    const updated = [...menuAnchorEl];
    updated[index] = null;
    setMenuAnchorEl(updated);
  };

  const handleCreateClick = () => {
    setShowCreateCard(true);
    setEditIndex(null);
    setNewLeave({
      code: "",
      name: "",
      payment: "Paid",
      days: "",
    });
  };

  const generateCodeFromName = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "name") {
        updated.code = generateCodeFromName(value); // Generate code based on name
      }
      return updated;
    });
  };

  const handleCancelCreate = () => {
    setShowCreateCard(false);
    setEditIndex(null);
    setNewLeave({
      code: "",
      name: "",
      payment: "Paid",
      days: "",
    });
  };

  const handleCreateSubmit = () => {
    const payload = {
      code: newLeave.code,
      leaveTypeName: newLeave.name,
      payment: newLeave.payment,
      totalDays: parseInt(newLeave.days),
    };

    if (editIndex !== null) {
      const id = leaveTypes[editIndex].leaveTypeId;
      fetch(`http://192.168.1.49:8084/leave_types/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedList = [...leaveTypes];
          updatedList[editIndex] = {
            ...data,
            code: newLeave.code,
            color: leaveTypes[editIndex].color,
          };
          setLeaveTypes(updatedList);
          setShowCreateCard(false);
          setEditIndex(null);
          setNewLeave({
            code: "",
            name: "",
            payment: "Paid",
            days: "",
          });
        })
        .catch((error) => console.error("Error updating leave type:", error));
    } else {
      fetch("http://192.168.1.49:8084/leave_types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setLeaveTypes([...leaveTypes, { ...data, code: newLeave.code, color: randomColor() }]);
          setShowCreateCard(false);
          setNewLeave({
            code: "",
            name: "",
            payment: "Paid",
            days: "",
          });
        })
        .catch((error) => console.error("Error creating leave type:", error));
    }
  };

  const handleEdit = (index) => {
    const leave = leaveTypes[index];
    setNewLeave({
      code: leave.code || "",
      name: leave.leaveTypeName,
      payment: leave.payment,
      days: leave.totalDays,
    });
    setShowCreateCard(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const id = leaveTypes[index].leaveTypeId;
    fetch(`http://192.168.1.49:8084/leave_types/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updated = leaveTypes.filter((_, i) => i !== index);
        setLeaveTypes(updated);
      })
      .catch((error) => console.error("Error deleting leave type:", error));
  };

  return (
    <Box p={3}>
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Leave Types
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          value={searchText}
          onChange={handleSearchChange}
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

      {showCreateCard && (
        <Box mb={4} display="flex" justifyContent="center">
          <Card sx={{ width: 400, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {editIndex !== null ? "Edit Leave Type" : "Create Leave Type"}
              </Typography>
              <TextField
                label="Code"
                name="code"
                fullWidth
                margin="dense"
                value={newLeave.code} // Display auto-generated code here
                disabled
              />
              <TextField
                label="Leave Type"
                name="name"
                fullWidth
                margin="dense"
                value={newLeave.name}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Payment</InputLabel>
                <Select
                  label="Payment"
                  name="payment"
                  value={newLeave.payment}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Days"
                name="days"
                fullWidth
                margin="dense"
                type="number"
                value={newLeave.days}
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

      <Grid container spacing={2}>
        {filteredLeaveTypes.length > 0 ? (
          filteredLeaveTypes.map((leave, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
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
                        <Typography fontWeight="bold">
                          {leave.leaveTypeName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Payment: {leave.payment}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Days: {leave.totalDays}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={(e) => handleMenuOpen(index, e)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchorEl[index]}
                        open={Boolean(menuAnchorEl[index])}
                        onClose={() => handleMenuClose(index)}
                      >
                        <MenuItem onClick={() => handleEdit(index)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(index)}>
                          Delete
                        </MenuItem>
                      </Menu>
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

export default LeaveTypeList;