import * as React from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
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

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNewAnnouncementClick = () => setShowForm(!showForm);

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
      <Paper sx={{ width: "100%", overflow: "hidden", mb: 3 }}>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          p={2}
          gap={isMobile ? 1 : 0}
          sx={{
            padding: "16px 24px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "18px", sm: "25px" },
              fontWeight: "bold",
            }}
          >
            Announcements
          </Typography>
          <Button
            variant="contained"
            color="#93A0B4"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
              mt: isMobile ? 1 : 0,
            }}
            onClick={handleNewAnnouncementClick}
            size="small"
          >
            {showForm ? "Close Form" : "New Announcement"}
          </Button>
        </Box>

        <TableContainer
          sx={{
            maxHeight: 440,
            overflowX: "auto",
            [theme.breakpoints.down("sm")]: {
              maxWidth: "100%",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      fontSize: { xs: "12px", sm: "16px" },
                      fontWeight: "bold",
                      color: "#fff",
                      backgroundColor: "#93A0B4",
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            padding: { xs: "6px", sm: "10px" },
                            whiteSpace: "nowrap",
                          }}
                        >
                          {column.id === "date"
                            ? new Date(value).toDateString()
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {showForm && (
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: { xs: 2, sm: 3 },
            mb: 4,
            boxShadow: 4,
            borderRadius: 2,
            [theme.breakpoints.down("sm")]: {
              mx: 1,
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Create New Announcement
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
              />
              <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                gap={2}
                mt={2}
              >
                <Button type="submit" variant="contained" fullWidth>
                  Submit Announcement
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseForm}
                  fullWidth
                >
                  Close
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}