import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center", // centers the calendar horizontally
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#1976d2",
    fontSize: "28px",
    marginBottom: "20px",
  },
  selectedDate: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
  },
  calendarResponsive: `
    @media (max-width: 600px) {
      .react-calendar {
        width: 100% !important;
        font-size: 14px;
      }

      .header {
        font-size: 20px; /* Smaller header text on mobile */
      }

      .selectedDate {
        font-size: 14px; /* Smaller selected date text on mobile */
      }
    }

    .react-calendar {
      width: 100%;
      border: none;
    }

    .react-calendar__tile--active {
      background: #1976d2 !important;
      color: white !important;
    }

    .react-calendar__tile--now {
      background: #e3f2fd !important;
    }

    .sunday {
      color: red;
    }
  `,
};

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <style>{styles.calendarResponsive}</style>

      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.header}>Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date, view }) =>
              view === "month" && date.getDay() === 0 ? "sunday" : null
            }
          />
          <p style={styles.selectedDate}>
            Selected Date: {date.toDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default MyCalendar;