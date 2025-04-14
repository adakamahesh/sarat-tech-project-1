import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "startDate", label: "Start Date", minWidth: 100 },
  { id: "endDate", label: "End Date", minWidth: 170, align: "center" },
  { id: "description", label: "Description", minWidth: 170, align: "center" },
];

function createData(title, startDate, endDate, description) {
  return { title, startDate, endDate, description };
}

const rows = [
  createData(
    "Annual Company Retreat",
    "Jan 10,2024",
    "Jun 15,2024",
    "A week-long retreat for team building and strategy sessions."
  ),
  createData(
    "Client Appreciation Event",
    "Nov 05, 2024",
    "Nov 05, 2024",
    "Event to show appreciation for our valued clients."
  ),
  createData(
    "Employee Training Program",
    "Sep 05, 2024",
    "Sep 10, 2024",
    "Intensive training sessions for new employees."
  ),
  createData(
    "End of Year Gala",
    "Dec 20, 2024",
    "Dec 20, 2024",
    "Celebration event to close out the year."
  ),
  createData(
    "Health and Wellness Fair",
    "Sep 20, 2024",
    "Sep 20, 2024",
    "Promoting health and wellness among employees."
  ),
  createData(
    "Mid-Year Performance Review",
    "Jul 15, 2024",
    "Jul 16, 2024",
    "Review of employee performance."
  ),
  createData(
    "Product Launch",
    "Aug 15, 2024",
    "Aug 15, 2024",
    "Official launch for new product line."
  ),
  createData(
    "Quarterly Business Review",
    "Jul 01, 2024",
    "Jul 02, 2024",
    "Review of past quarter business performance."
  ),
  createData(
    "Team Building Workshop",
    "Oct 12, 2024",
    "Oct 13, 2024",
    "Improving team collaboration."
  ),
  createData(
    "Technology Update Seminar",
    "Aug 22, 2024",
    "Aug 22, 2024",
    "Discussing latest tech trends."
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: isMobile ? 1 : 3,
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                colSpan={5}
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1201,
                  fontSize: "25px",
                  backgroundColor: "#1976d2",
                  color: "white",
                }}
              >
                Announcement
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    position: "sticky",
                    top: 53, // matches height of Announcement row
                    zIndex: 1200,
                    minWidth: column.minWidth,
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                    fontSize: isMobile ? "0.8rem" : "1rem",
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
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ fontSize: isMobile ? "0.75rem" : "0.95rem" }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
      />
    </Paper>
  );
}