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

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          mb: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
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
          sx={{
            padding: "16px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Announcements
          </Typography>
        </Box>

        <TableContainer
          sx={{
            height: 500, // Fixed height
            overflowY: "auto", // Enables vertical scrolling
            overflowX: "hidden", // Avoids horizontal scrolling
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
                      fontSize: "20px",
                      fontWeight: "bold",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
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
                  <TableRow hover key={index}  sx={{ color: "white" }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ color: "white" }}>
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
    </>
  );
}