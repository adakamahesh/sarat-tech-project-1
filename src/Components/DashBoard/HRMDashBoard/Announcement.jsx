import * as React from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const API_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100, align: "center" },
  { id: "description", label: "Description", minWidth: 200, align: "center" },
];

export default function StickyHeadTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    date: "",
    description: "",
  });

  React.useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios
      .get(`${API_URL}announcement`)
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  };

  const handleNewAnnouncementClick = () => setShowForm(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}announcement`, formData)
      .then(() => {
        fetchAnnouncements();
        setFormData({ title: "", date: "", description: "" });
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error creating announcement:", error);
      });
  };

  const handleCloseForm = () => {
    setFormData({ title: "", date: "", description: "" });
    setShowForm(false);
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          mb: 3,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          p={2}
          gap={isMobile ? 1 : 0}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "18px", sm: "25px" }, fontWeight: "bold", color: "white" }}
          >
            Announcements
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
              mt: isMobile ? 1 : 0,
              backgroundColor:"rgba(255, 255, 255, 0.15)",
            }}
            onClick={handleNewAnnouncementClick}
            size="small"
          >
            New Announcement
          </Button>
        </Box>

        <TableContainer
          sx={{
            height: 400,
            overflowY: "auto",
            overflowX: "auto",
            [theme.breakpoints.down("sm")]: {
              maxWidth: "100%",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      fontSize: { xs: "12px", sm: "16px" },
                      fontWeight: "bold",
                      color: "#fff",
                      backgroundColor:"rgba(255, 255, 255, 0.15)",
                      padding: { xs: "6px", sm: "10px" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow hover key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ fontSize: { xs: "12px", sm: "14px" }, padding: { xs: "6px", sm: "10px" },color:'white' }}
                      >
                        {column.id === "date" ? new Date(value).toDateString() : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Popup Dialog for Form */}
      <Dialog open={showForm} onClose={handleCloseForm} maxWidth="sm" fullWidth >
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleInputChange} required />
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            Submit Announcement
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}