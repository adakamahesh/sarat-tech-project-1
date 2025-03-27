import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'startDate', label: 'Start Date', minWidth: 100 },
  {
    id: 'endDate',
    label: 'EndDate',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'center',
  },
];

function createData(title, startDate, endDate, description) {
  return { title,startDate, endDate, description};
}

const rows = [
  createData('Annual Company Retreat', 'Jan 10,2024', "Jun 15,2024", 'A week-long retreat for team building and strategy sessions.'),
  createData('Client Appreciation Event', 'Nov 05, 2024', 'Nov 05, 2024','Event to show appreciation for our valued clients.'),
  createData('Employee Training Program', 'Sep 05, 2024', 'Sep 10, 2024','Intensive training sessions for new employees.'),
  createData('End of Year Gala', 'Dec 20, 2024', 'Dec 20, 2024','Celebration event to close out the year.'),
  createData('End of Year Gala', 'Dec 20, 2024', 'Dec 20, 2024', 'Celebration event to close out the year.'),
  createData('Health and Wellness Fair', 'Sep 20, 2024','Sep 20, 2024', 'An event focused on promoting health and wellness among employees.'),
  createData('Mid-Year Performance Review', 'Jul 15, 2024','Jul 16, 2024','Review of employee performance for the first half of the year.'),
  createData('Product Launch', 'Aug 15, 2024','Aug 15, 2024', 'Official launch event for the new product line.'),
  createData('Quarterly Business Review', 'Jul 01, 2024','Jul 02, 2024','Review of business performance for the past quarter.'),
  createData('Team Building Workshop', 'Oct 12, 2024', 'Oct 13, 2024', 'Workshop aimed at improving team collaboration and communication skills.'),
  createData('Technology Update Seminar	', 'Aug 22, 2024', 'Aug 22, 2024', 'Seminar to discuss the latest updates and trends in technology.'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" p={1}>
        Announcement
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
  );
}