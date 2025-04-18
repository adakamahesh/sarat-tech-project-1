import * as React from "react";
import axios from "axios";
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

export default function HolidayTable() {
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("holidayName");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [newHoliday, setNewHoliday] = React.useState({
    holidayName: "",
    startDate: "",
    endDate: "",
  });

  const API_URL = process.env.REACT_APP_BASE_URL;

  const fetchHolidays = async () => {
    const response = await axios.get(`${API_URL}holiday`);
    setRows(response.data);
  };

  React.useEffect(() => {
    fetchHolidays();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}holiday/${id}`);
    fetchHolidays();
  };

  const handleSave = async () => {
    if (editId === null) {
      await axios.post(`${API_URL}holiday`, newHoliday);
      setNewHoliday({ holidayName: "", startDate: "", endDate: "" });
    } else {
      await axios.put(`${API_URL}holiday/${editId}`, editData);
      setEditId(null);
    }
    setOpen(false);
    fetchHolidays();
  };

  const handleAddHoliday = async () => {
    await axios.post(`${API_URL}holiday`, newHoliday);
    setNewHoliday({ holidayName: "", startDate: "", endDate: "" });
    setOpen(false);
    fetchHolidays();
  };

  const filteredRows = rows.filter(
    (row) =>
      row.holidayName.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? row.startDate === filter : true)
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          🗓️ Holidays
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <TextField
            select
            label="Filter by Start Date"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(rows.map((row) => row.startDate))].map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Holiday
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                    Holiday Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
                  }}
                >
                  End Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#93A0B4",
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
                  <TableRow key={row.holidayId}>
                    <TableCell align="center">
                      {editId === row.holidayId ? (
                        <TextField
                          value={editData.holidayName}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              holidayName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.holidayName
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === row.holidayId ? (
                        <TextField
                          type="date"
                          value={editData.startDate}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              startDate: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.startDate
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === row.holidayId ? (
                        <TextField
                          type="date"
                          value={editData.endDate}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              endDate: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.endDate
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === row.holidayId ? (
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
                            onClick={() => {
                              setEditId(row.holidayId);
                              setEditData(row);
                            }}
                          >
                            <EditNoteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(row.holidayId)}
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      {/* Dialog for adding/editing holiday */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">Add Holiday</Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                name="holidayName"
                label="Holiday Name"
                InputLabelProps={{ shrink: true }}
                value={newHoliday.holidayName}
                onChange={(e) =>
                  setNewHoliday({ ...newHoliday, holidayName: e.target.value })
                }
              />
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newHoliday.startDate}
                onChange={(e) =>
                  setNewHoliday({ ...newHoliday, startDate: e.target.value })
                }
              />
              <TextField
                name="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newHoliday.endDate}
                onChange={(e) =>
                  setNewHoliday({ ...newHoliday, endDate: e.target.value })
                }
              />
              <Button variant="contained" onClick={handleAddHoliday}>
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
    </Box>
  );
}