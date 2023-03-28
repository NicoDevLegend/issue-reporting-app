import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="d-grid vh-100">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
