"use client";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const startDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const generateDays = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );

    for (let i = 0; i < startDayOfMonth; i++) {
      days.push(null);
    }

    let lastDayOfMonth = -1;
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      days.push(day);
      lastDayOfMonth = day;
    }

    const remainingDays =
      6 -
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        lastDayOfMonth
      ).getDay();

    for (let i = 1; i <= remainingDays; i++) {
      days.push(null);
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const days = generateDays();

  return (
    <div className=" w-full">
      <header>
        <button onClick={prevMonth}>Previous</button>
        <p>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </p>
        <button onClick={nextMonth}>Next</button>
      </header>

      <div className="grid  grid-cols-7">
        {daysOfWeek.map((day) => (
          <div key={day}>
            <strong>{day}</strong>
          </div>
        ))}
        {days.map((day, index) => (
          <div key={index} className="p-6 border-small">
            {day ? day : ""}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
