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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, FilterList, MoreVert } from "@mui/icons-material";
import axios from "axios";

const randomColor = () => {
  const colors = [
    "#b2dfdb",
    "#ffe0b2",
    "#81d4fa",
    "#bcaaa4",
    "#90a4ae",
    "#e1bee7",
    "#f8bbd0",
    "#dcedc8",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const AllowanceTypesPage = () => {
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [newAllowance, setNewAllowance] = useState({ name: "", payment: "" });
  const [openDialog, setOpenDialog] = useState(false);

  const backendUrl = "http://192.168.1.49:8084/allowance";

  // Fetch allowances from backend
  useEffect(() => {
    fetchAllowances();
  }, []);

  const fetchAllowances = async () => {
    try {
      const response = await axios.get(backendUrl);
      const allowancesWithColor = response.data.map((item) => ({
        id: item.allowanceId,
        name: item.allowance,
        payment: item.amount,
        color: randomColor(),
      }));
      setAllowanceTypes(allowancesWithColor);
    } catch (error) {
      console.error("Error fetching allowances:", error);
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterSelect = (value) => {
    setFilterValue(value);
    setAnchorEl(null);
  };

  const handleCreateClick = () => {
    setOpenDialog(true);
    setEditIndex(null);
    setNewAllowance({ name: "", payment: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAllowance((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const allowanceData = {
        allowance: newAllowance.name,
        amount: parseFloat(newAllowance.payment),
      };

      if (editIndex !== null) {
        const id = allowanceTypes[editIndex].id;
        await axios.put(`${backendUrl}/${id}`, allowanceData);
      } else {
        await axios.post(backendUrl, allowanceData);
      }

      fetchAllowances();
      setOpenDialog(false);
      setNewAllowance({ name: "", payment: "" });
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving allowance:", error);
    }
  };

  const handleMenuOpen = (index, event) => {
    setMenuAnchorEl({ [index]: event.currentTarget });
  };

  const handleMenuClose = (index) => {
    setMenuAnchorEl({ [index]: null });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewAllowance({
      name: allowanceTypes[index].name,
      payment: allowanceTypes[index].payment,
    });
    setOpenDialog(true);
    handleMenuClose(index);
  };

  const handleDelete = async (index) => {
    try {
      const id = allowanceTypes[index].id;
      await axios.delete(`${backendUrl}/${id}`);
      fetchAllowances();
    } catch (error) {
      console.error("Error deleting allowance:", error);
    }
    handleMenuClose(index);
  };

  const filtered = allowanceTypes.filter(
    (allowances) =>
      allowances.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterValue === "" || allowances.payment.toString() === filterValue)
  );

  return (
    <Box
      p={3}
      sx={{
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "white" }}
        >
          Allowances
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 200,
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterClick}
          sx={{ color: "white", borderColor: "white" }}
        >
          Filter
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: { backgroundColor: "rgba(0,0,0.8,0.8)", color: "white" },
          }}
        >
          <MenuItem onClick={() => handleFilterSelect("")}>All</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("1000")}>1000</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("2000")}>2000</MenuItem>
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

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            color: "white",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>
          {editIndex !== null ? "Edit Allowance Type" : "Create Allowance Type"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="dense"
            value={newAllowance.name}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          />
          <TextField
            label="Amount"
            name="payment"
            type="number"
            fullWidth
            margin="dense"
            value={newAllowance.payment}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {filtered.length > 0 ? (
          filtered.map((allowances, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
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
                        bgcolor={allowances.color}
                        fontWeight="bold"
                      >
                        {allowances.name?.[0] || "-"}
                      </Box>
                      <Box>
                        <Typography fontWeight="bold" sx={{ color: "white" }}>
                          {allowances.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          Amount: {allowances.payment}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        onClick={(e) => handleMenuOpen(index, e)}
                        sx={{ color: "white" }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchorEl[index]}
                        open={Boolean(menuAnchorEl[index])}
                        onClose={() => handleMenuClose(index)}
                        PaperProps={{
                          sx: {
                            backgroundColor: "rgba(0,0,0,0.8)",
                            color: "white",
                          },
                        }}
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
          <Typography ml={1} sx={{ color: "white" }}>
            No results found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AllowanceTypesPage;
