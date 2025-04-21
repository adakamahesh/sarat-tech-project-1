import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography, GlobalStyles } from '@mui/material';

const initialEvents = [
  { title: 'Mid-term Exams', start: '2024-03-15', end: '2024-03-20', classNames: ['event-type-exam'] },
  { title: 'Parent-Teacher Meeting', start: '2024-03-22', classNames: ['event-type-meeting'] },
  { title: 'Spring Break', start: '2024-03-25', end: '2024-04-05', classNames: ['event-type-holiday'] },
];

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState(initialEvents);

  const handleDateSelect = () => setOpen(true);
  const handleEventClick = (clickInfo) => {
    if (window.confirm('Delete this event?')) {
      clickInfo.event.remove();
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          '.fc-header-toolbar': {
            backgroundColor: '#93A0B4',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
          },
          '.fc-toolbar-title': {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '18px',
          },
          '.fc-button': {
            backgroundColor: '#93A0B4',
            color: '#fff',
            border: 'none',
          },
          '.fc-button:hover': {
            backgroundColor: '#93A0B4',
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          '@media (max-width: 600px)': {
            p: 1,
            gap: 1,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: { xs: '18px', sm: '24px' },
          }}
        >
          Calendar
        </Typography>

        {/* Calendar Box */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            p: 2,
            '@media (max-width: 600px)': {
              p: 1,
            },
          }}
        >
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable
            selectable
            selectMirror
            select={handleDateSelect}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CalendarPage;