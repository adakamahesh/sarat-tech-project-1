import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

function createData(id, BasedOnWeek, BasedOnWeekDay) {
  return { id, BasedOnWeek, BasedOnWeekDay };
}

const initialRows = [
  createData(1, "All", "Saturday"),
  createData(2, "All", "Sunday"),
];

export default function CompanyLeavesTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [rows, setRows] = React.useState(initialRows);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newBasedOnWeek, setNewBasedOnWeek] = React.useState({
    BasedOnWeek: "",
    BasedOnWeekDay: "",
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBasedOnWeek = () => {
    if (newBasedOnWeek.BasedOnWeek && newBasedOnWeek.BasedOnWeekDay) {
      setRows([
        ...rows,
        createData(
          rows.length + 1,
          newBasedOnWeek.BasedOnWeek,
          newBasedOnWeek.BasedOnWeekDay
        ),
      ]);
      setNewBasedOnWeek({ BasedOnWeek: "", BasedOnWeekDay: "" });
      handleClose();
    }
  };

  const handleInputChange = (event) =>
    setNewBasedOnWeek({
      ...newBasedOnWeek,
      [event.target.name]: event.target.value,
    });

  const filteredRows = rows.filter(
    (row) =>
      row.BasedOnWeek.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? row.BasedOnWeekDay === filter : true)
  );

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "stretch",
            },
          })}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "white", letterSpacing: 0.5 }}
          >
            Company Leaves
          </Typography>

          <TextField
            label="Search BasedOnWeek"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{
              minWidth: 200,
              "& .MuiInputBase-input": {
                color: "white", // text color
              },
              "& .MuiInputLabel-root": {
                color: "white", // label color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
            }}
          />
          <TextField
            select
            label="Filter by WeekDay"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleFilter}
            sx={{
              minWidth: 200,
              "& .MuiInputBase-input": {
                color: "white", // text color
              },
              "& .MuiInputLabel-root": {
                color: "white", // label color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // focused border
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.BasedOnWeekDay))].map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            Create
          </Button>
        </Box>

        <TableContainer>
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
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    py: 2,
                    color: "white",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "BasedOnWeek"}
                    direction={order}
                    onClick={() => handleRequestSort("BasedOnWeek")}
                    sx={{ color: "white" }}
                  >
                    Based On Week
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    py: 2,
                    color: "white",
                  }}
                >
                  Based On WeekDay
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    py: 2,
                    color: "white",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: "center", color: "white" }}>
                    {row.BasedOnWeek}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", color: "white" }}>
                    {row.BasedOnWeekDay}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {editId === row.id ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          textAlign: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          backdropFilter: "blur(12px)",
                          borderRadius: 2,
                          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                          color: "white",
                        }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => {
                            setEditId(row.id);
                            setEditData(row);
                          }}
                        >
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "white" }}
                          color="white"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent white
            backdropFilter: "blur(10px)", // blur effect
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <Card
          sx={{
            p: 3,
            m: 2,
            borderRadius: 3,
            boxShadow: 6,
            backgroundColor: "transparent",
          }}
        >
          <CardContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
              Add Company Leaves
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                name="BasedOnWeek"
                label="Based On Week"
                variant="outlined"
                size="small"
                value={newBasedOnWeek.BasedOnWeek}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white", // input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // label color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // border color
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // focused border color
                    },
                  },
                }}
              />
              <TextField
                name="BasedOnWeekDay"
                label="Based On WeekDay"
                variant="outlined"
                size="small"
                value={newBasedOnWeek.BasedOnWeekDay}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white", // input text color
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // label color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // border color
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // focused border color
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddBasedOnWeek}
                sx={{
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                }}
              >
                Add Based On Week
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}