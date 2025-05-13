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

const DeductionTypesPage = () => {
  const [deductions, setDeductions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [editDeduction, setEditDeduction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ deduction: "", amount: "" });

  // Fetch all deductions
  const fetchDeductions = async () => {
    try {
      const res = await axios.get("http://192.168.1.49:8084/deduction");
      const dataWithColors = res.data.map((item) => ({
        ...item,
        color: randomColor(),
      }));
      setDeductions(dataWithColors);
    } catch (error) {
      console.error("Failed to fetch deductions", error);
    }
  };

  useEffect(() => {
    fetchDeductions();
  }, []);

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);

  const handleFilterSelect = (value) => {
    setFilterValue(value);
    setAnchorEl(null);
  };

  const handleOpenDialog = (deduction = null) => {
    setEditDeduction(deduction);
    setFormData(
      deduction ? { deduction: deduction.deduction, amount: deduction.amount } : { deduction: "", amount: "" }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ deduction: "", amount: "" });
    setEditDeduction(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editDeduction) {
        await axios.put(`http://192.168.1.49:8084/deduction/${editDeduction.deductionId}`, formData);
      } else {
        await axios.post("http://192.168.1.49:8084/deduction", formData);
      }
      fetchDeductions();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save deduction", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.49:8084/deduction/${id}`);
      fetchDeductions();
    } catch (error) {
      console.error("Failed to delete deduction", error);
    }
  };

  const handleMenuOpen = (index, event) => {
    setMenuAnchorEl({ [index]: event.currentTarget });
  };

  const handleMenuClose = (index) => {
    setMenuAnchorEl({ [index]: null });
  };

  const filteredDeductions = deductions.filter(
    (item) =>
      item.deduction.toLowerCase().includes(search.toLowerCase()) &&
      (filterValue === "" || String(item.amount) === filterValue)
  );

  return (
    <Box p={3} sx={{ backgroundColor: "transparent", color: "white" }}>
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "white" }}>
          Deductions
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
          PaperProps={{ sx: { backgroundColor: "rgba(0,0,0,0.8)", color: "white" } }}
        >
          <MenuItem onClick={() => handleFilterSelect("")}>All</MenuItem>
          {[...new Set(deductions.map((d) => d.amount))].map((amt) => (
            <MenuItem key={amt} onClick={() => handleFilterSelect(String(amt))}>
              {amt}
            </MenuItem>
          ))}
        </Menu>
        <Button
          variant="contained"
          color="error"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Create
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredDeductions.length > 0 ? (
          filteredDeductions.map((deduct, index) => (
            <Grid item xs={12} sm={6} md={4} key={deduct.deductionId}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  border: "1px solid white",
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
                        bgcolor={deduct.color}
                      >
                        {deduct.deduction?.[0] || "-"}
                      </Box>
                      <Box>
                        <Typography fontWeight="bold" sx={{ color: "white" }}>
                          {deduct.deduction}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                          Amount: {deduct.amount}
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
                          sx: { backgroundColor: "rgba(0,0,0,0.8)", color: "white" },
                        }}
                      >
                        <MenuItem onClick={() => handleOpenDialog(deduct)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDelete(deduct.deductionId)}>
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

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
            color: "white",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>
          {editDeduction ? "Edit Deduction" : "Create Deduction"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="deduction"
            fullWidth
            margin="dense"
            value={formData.deduction}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            margin="dense"
            value={formData.amount}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeductionTypesPage;