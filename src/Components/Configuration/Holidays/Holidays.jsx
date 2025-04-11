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

function createData(id, HolidayName, StartDate, EndDate, Recurring) {
  return { id, HolidayName, StartDate, EndDate, Recurring };
}

const initialRows = [
  createData(1, "New Year", "2025-01-01", "2025-01-01", "Yes"),
  createData(2, "Christmas", "2024-12-25", "2024-12-25", "Yes"),
  createData(3, "Independence Day", "2024-07-04", "2024-07-04", "No"),
  createData(4, "Labor Day", "2024-09-02", "2024-09-02", "No"),
  createData(5, "Thanksgiving", "2024-11-28", "2024-11-28", "Yes"),
];

export default function HolidayTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newHolidayName, setNewHolidayName] = React.useState({
    HolidayName: "",
    StartDate: "",
    EndDate: "",
    Recurring: "",
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const handleSave = () => {
    setRows(rows.map((row) => (row.id === editId ? editData : row)));
    setEditId(null);
  };

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddHolidayName = () => {
    if (newHolidayName.HolidayName && newHolidayName.StartDate) {
      setRows([
        ...rows,
        createData(
          rows.length + 1,
          newHolidayName.HolidayName,
          newHolidayName.StartDate,
          newHolidayName.EndDate,
          newHolidayName.Recurring
        ),
      ]);
      setNewHolidayName({
        HolidayName: "",
        StartDate: "",
        EndDate: "",
        Recurring: "",
      });
      handleClose();
    }
  };

  const handleInputChange = (event) =>
    setNewHolidayName({
      ...newHolidayName,
      [event.target.name]: event.target.value,
    });

  const filteredRows = rows.filter(
    (row) =>
      row.HolidayName.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? row.StartDate === filter : true)
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(6px)",
          boxShadow: 6,
          borderRadius: 3,
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between", // or 'center', 'flex-start', etc.
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#1a237e",
              letterSpacing: 0.5,
            }}
          >
            Holiday
          </Typography>
          <TextField
            label="Search Holiday Name"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearch}
          />
          <TextField
            select
            label="Filter by Start Date"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleFilter}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.StartDate))].map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
              },
            }}
            onClick={handleOpen}
          >
            Create
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "HolidayName"}
                    direction={order}
                    onClick={() => handleRequestSort("HolidayName")}
                  >
                    Holiday Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  End Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Recurring
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.55)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                      },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                      }}
                    >
                      {row.HolidayName}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                      }}
                    >
                      {row.StartDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                      }}
                    >
                      {row.EndDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                      }}
                    >
                      {row.Recurring}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", whiteSpace: "nowrap" }}
                    >
                      {editId === row.id ? (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setEditId(row.id);
                              setEditData(row);
                            }}
                          >
                            <EditNoteIcon />
                          </IconButton>
                          <IconButton
                            color="error"
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Card
          sx={{
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(8px)",
            boxShadow: 10,
            borderRadius: 4,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Typography
              variant="h6"
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              Add Holiday
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                name="HolidayName"
                label="Holiday Name"
                variant="outlined"
                size="small"
                value={newHolidayName.HolidayName}
                onChange={handleInputChange}
              />
              <TextField
                name="StartDate"
                label="Start Date"
                variant="outlined"
                size="small"
                value={newHolidayName.StartDate}
                onChange={handleInputChange}
              />
              <TextField
                name="EndDate"
                label="End Date"
                variant="outlined"
                size="small"
                value={newHolidayName.EndDate}
                onChange={handleInputChange}
              />
              <TextField
                name="Recurring"
                label="Recurring"
                variant="outlined"
                size="small"
                value={newHolidayName.Recurring}
                onChange={handleInputChange}
              />
              <Button variant="contained" onClick={handleAddHolidayName}>
                Add Holiday
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}