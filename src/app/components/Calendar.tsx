"use client";
import { useEffect, useState } from "react";
import { EventItem } from "../api/route";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ADD_CALENDAR =
  "https://calendar.google.com/calendar/u/0?cid=YXJwdjBlZnJpcnJtbWw0cmtwMjZyZjIxcmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ";

const Calendar = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchEvents() {
      try {
        let year = currentDate.getFullYear();
        let monthIndex = currentDate.getMonth();
        const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
        //   console.log(calendarId, apiKey);
        const response = await fetch(
          `/api?year=${year}&monthIndex=${monthIndex}`
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Failed to fetch events:", response.status, errorData);
          setEvents([]);
          return;
        }
        const data = await response.json();
        setEvents(data);
        //   console.log(data);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
        setEvents([]);
      }
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
        (event.isAllDay
          ? eventDate.getUTCDate() === day
          : eventDate.getDate() === day);
    });
  };

  return (
    <div className=" w-full">
      <header className="flex items-center  justify-center sm:justify-between bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 p-2 py-6 flex-wrap gap-4 shadow-lg">
        <div className="flex items-center">
          <button onClick={prevMonth} className="text-4xl text-white hover:text-white hover:scale-110 transition-all duration-300">
            <ArrowCircleLeft weight="fill" />
          </button>
          <button onClick={nextMonth} className="hidden sm:flex text-4xl text-white hover:text-white hover:scale-110 transition-all duration-300">
            <ArrowCircleRight weight="fill" />
          </button>
          <h2 className=" text-center sm:text-left sm:pl-4 min-w-64 text-3xl font-bold text-white drop-shadow-md">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="visible sm:hidden text-4xl text-white hover:text-white hover:scale-110 transition-all duration-300">
            <ArrowCircleRight weight="fill" />
          </button>
        </div>
        <Link
          href={ADD_CALENDAR}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm"
        >
          Google Calendar{" "}
          <Image
            className="drop-shadow-md"
            alt="google calendar"
            width={32}
            height={32}
            src="/google_calendar.png"
          />{" "}
        </Link>
      </header>

      <div className="grid  grid-cols-7">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-gradient-to-b from-teal-200 to-cyan-100 p-3 text-center font-bold text-teal-800 shadow-sm">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (day) {
            if (typeof day == "number") {
              let eventsDay = getEventsForDay(day);
              return (
                <div
                  key={index}
                  className={`h-24 sm:h-32 flex flex-col border border-gray-200 py-4 px-3 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:z-10 ${
                    eventsDay.length != 0 ? "bg-gradient-to-br from-emerald-100 to-green-200 shadow-md" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {
                    <>
                      <p className={`font-bold pb-1 ${
                        eventsDay.length != 0 ? "text-green-900" : "text-gray-600"
                      }`}>{day}</p>
                      <div className="flex flex-col gap-1 overflow-y-auto">
                        {getEventsForDay(day).map((event) => (
                          <p
                            key={event.id}
                            className="block text-xs text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded px-2 py-1 shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 cursor-pointer"
                            title={event.summary}
                          >
                            {event.summary}
                          </p>
                        ))}
                      </div>
                    </>
                  }
                </div>
              );
            } else {
              return (
                <div key={index} className={`p-4 border border-gray-100 text-slate-300 bg-gray-50 hover:bg-gray-100 transition-all duration-300`}>
                  {
                    <>
                      <p className="text-sm font-medium">{day}</p>
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