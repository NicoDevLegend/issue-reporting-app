import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Calendar onChange={onChange} value={value} calendarType="US" />
    </div>
  );
}
