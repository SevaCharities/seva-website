"use client";
import { useEffect, useState } from "react";
import { EventItem } from "../api/route";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import Image from "next/image";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchEvents() {
      let year = currentDate.getFullYear();
      let monthIndex = currentDate.getMonth();
      const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
      //   console.log(calendarId, apiKey);
      const response = await fetch(
        `/api?year=${year}&monthIndex=${monthIndex}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
      //   console.log(data);
    }

    fetchEvents();
  }, [currentDate]);

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

    const startDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    // Get the number of days in the previous month
    const previousMonth = currentDate.getMonth() - 1;
    const previousYear =
      currentDate.getMonth() === 0
        ? currentDate.getFullYear() - 1
        : currentDate.getFullYear();
    const daysInPreviousMonth = daysInMonth(previousMonth, previousYear);

    // Fill in the days from the previous month
    for (let i = startDayOfMonth - 1; i >= 0; i--) {
      days.push(daysInPreviousMonth - i + "");
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
      days.push(i + "");
    }

    return days;
  };

  const prevMonth = () => {
    setEvents([]);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setEvents([]);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const days = generateDays();

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      let t = event.start.date || event.start.dateTime;
      const eventDate = new Date(t!);
      if (eventDate.getDate() != eventDate.getUTCDate()) {
        console.log(
          event.summary,
          event.start,
          eventDate,
          eventDate.getDate(),
          eventDate.getUTCDate(),
          eventDate.getHours(),
          eventDate.getUTCHours(),
          new Date()
        );
      }

      return eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        event.isAllDay
        ? eventDate.getUTCDate() === day
        : eventDate.getDate() === day;
    });
  };

  return (
    <div className=" w-full">
      <header className="flex items-center  justify-center sm:justify-between bg-teal-100 p-2 py-4 flex-wrap gap-2">
        <div className="flex items-center">
          <button onClick={prevMonth} className="text-4xl">
            <ArrowCircleLeft className="hover:text-orange-1" />
          </button>
          <button onClick={nextMonth} className="hidden sm:flex text-4xl">
            <ArrowCircleRight className="hover:text-orange-1" />
          </button>
          <h2 className=" text-center sm:text-left sm:pl-4 min-w-64 text-2xl">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="visible sm:hidden text-4xl">
            <ArrowCircleRight className="hover:text-orange-1" />
          </button>
        </div>
        <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md shadow-md text-sm">
          Google Calendar{" "}
          <Image
            className="shadow-sm shadow-blue-700"
            alt="google calendar"
            width={32}
            height={32}
            src="/google_calendar.png"
          />{" "}
        </button>
      </header>

      <div className="grid  grid-cols-7">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-teal-100 p-2 text-center">
            <strong>{day}</strong>
          </div>
        ))}
        {days.map((day, index) => {
          if (day) {
            if (typeof day == "number") {
              let eventsDay = getEventsForDay(day);
              return (
                <div
                  key={index}
                  className={`h-24 sm:h-32 flex flex-col border-small py-6  ${
                    eventsDay.length != 0 ? "bg-green-200 " : ""
                  }`}
                >
                  {
                    <>
                      <p className="px-6 pb-2">{day}</p>
                      {getEventsForDay(day).map((event) => (
                        <p
                          key={event.id}
                          className="block sm:p-2 text-xs text-green-800 overflow-hidden text-ellipsis whitespace-nowrap w-full bg-white"
                        >
                          {event.summary}
                        </p>
                      ))}
                    </>
                  }
                </div>
              );
            } else {
              return (
                <div key={index} className={`p-6 border-small  text-slate-400`}>
                  {
                    <>
                      <p>{day}</p>
                    </>
                  }
                </div>
              );
            }
          }
        })}
      </div>
      <div></div>
    </div>
  );
};
export default Calendar;
