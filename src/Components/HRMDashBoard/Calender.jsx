import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { enUS } from '@mui/x-date-pickers/locales';

export default function DateRangeCalendarCalendarsProp() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}>
      <Box>
        <Typography>1 calendar</Typography>
        <DateRangeCalendar calendars={1} />
      </Box>
    </LocalizationProvider>
  );
}