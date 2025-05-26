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
  Dialog,
  DialogContent,
  DialogTitle,
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
        updated.code = generateCodeFromName(value);
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
        headers: { "Content-Type": "application/json" },
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
          setNewLeave({ code: "", name: "", payment: "Paid", days: "" });
        })
        .catch((error) => console.error("Error updating leave type:", error));
    } else {
      fetch("http://192.168.1.49:8084/leave_types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setLeaveTypes([
            ...leaveTypes,
            { ...data, code: newLeave.code, color: randomColor() },
          ]);
          setShowCreateCard(false);
          setNewLeave({ code: "", name: "", payment: "Paid", days: "" });
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
    <Box
      p={3}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        color: "white", // applies to children unless overridden
      }}
    >
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "white" }}
        >
          Leave Types
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          value={searchText}
          onChange={handleSearchChange}
          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiInputBase-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterClick}
          sx={{
            borderColor: "white",
            color: "white",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Filter
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
            },
          }}
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
          sx={{
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          Create
        </Button>
      </Box>

      <Dialog
        open={showCreateCard}
        onClose={handleCancelCreate}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
          },
        }}
      >
        <DialogTitle>
          {editIndex !== null ? "Edit Leave Type" : "Create Leave Type"}
        </DialogTitle>
        <DialogContent sx={{ color: "white" }}>
          <TextField
            label="Leave Type"
            name="name"
            fullWidth
            margin="dense"
            value={newLeave.name}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              },
            }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Payment</InputLabel>
            <Select
              label="Payment"
              name="payment"
              value={newLeave.payment}
              onChange={handleInputChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
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
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              },
            }}
          />
          <Box display="flex" gap={2} mt={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateSubmit}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              Save
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={handleCancelCreate}
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Grid container spacing={2}>
        {filteredLeaveTypes.length > 0 ? (
          filteredLeaveTypes.map((leave, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white", // Base text color
                }}
              >
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
                        color="white"
                      >
                        {leave.leaveTypeName?.[0] || "-"}
                      </Box>
                      <Box>
                        <Typography fontWeight="bold" sx={{ color: "white" }}>
                          {leave.leaveTypeName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          Payment: {leave.payment}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
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
                        PaperProps={{
                          sx: {
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(8px)",
                            color: "white",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          },
                        }}
                      >
                        <MenuItem onClick={() => handleEdit(index)} sx={{ color: "white" }}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(index)} sx={{ color: "white" }}>
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
