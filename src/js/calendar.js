const API_KEY = "AIzaSyAiUOYrTsSgf4E_PkOwaskREek3KMQusBs";
// https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}

// Array of month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthHeading = document.getElementById("month");
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let firstDayOfMonth = new Date(currentYear, currentMonth, 1);
let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
let daysInMonth = lastDayOfMonth.getDate();
const prevMonthBtn = document.getElementById("prev");
const nextMonthBtn = document.getElementById("next");

async function updateCalendar() {
  monthHeading.textContent = monthNames[currentMonth] + currentYear;
  firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  daysInMonth = lastDayOfMonth.getDate();
  await generateCalendar();
}

function setUp() {
  updateCalendar();
}

prevMonthBtn.addEventListener("click", async () => {
  currentMonth--;
  if (currentMonth === -1) {
    currentMonth = 11;
    currentYear--;
  }
  await updateCalendar();
});

nextMonthBtn.addEventListener("click", async () => {
  currentMonth++;
  if (currentMonth === 12) {
    currentMonth = 0;
    currentYear++;
  }
  await updateCalendar();
});

// Function to generate calendar
async function generateCalendar() {
  const calendarId = "arpv0efrirrmml4rkp26rf21rg%40group.calendar.google.com"; // Replace with your public calendar ID
  const timeMin = firstDayOfMonth.toISOString();
  const timeMax = lastDayOfMonth.toISOString();
  let events = [];

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=True&orderBy=startTime`;

  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        events = data.items;
      });
  } catch {
    console.log("OOPS");
  }

  const calendarBody = document.getElementById("calendar-body");

  // Clear existing calendar
  calendarBody.innerHTML = "";

  let date = 1;
  let prevMonthDays = firstDayOfMonth.getDay(); // Number of days from previous month
  let nextMonthDays = 6 - lastDayOfMonth.getDay(); // Number of days from next month

  // Loop through weeks
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    // Loop through days
    for (let j = 0; j < 7; j++) {
      const day_div = document.createElement("td");
      const day = document.createElement("p");
      const event = document.createElement("p");
      day.classList.add("cell");

      if (i === 0 && j < prevMonthDays) {
        // Days from previous month
        const prevMonthDate = new Date(
          currentYear,
          currentMonth,
          -prevMonthDays + j + 1
        );
        day.textContent = prevMonthDate.getDate();
        day.classList.add("dull");
      } else if (date > daysInMonth) {
        // Days from next month
        const nextMonthDate = new Date(
          currentYear,
          currentMonth + 1,
          date - daysInMonth
        );
        day.textContent = nextMonthDate.getDate();
        day.classList.add("dull");
        date++;
      } else {
        // Days from current month
        day.textContent = date;
        let d;
        if (events.length > 0) {
          d = new Date(events[0].date || events[0].start.dateTime);
          if (
            date === d.getDate() &&
            currentYear === d.getFullYear() &&
            currentMonth === d.getMonth()
          ) {
            event.textContent = events[0].summary;
            events.shift();
          }
        }

        if (
          date === today.getDate() &&
          currentYear === today.getFullYear() &&
          currentMonth === today.getMonth()
        ) {
          day.classList.add("today");
        }
        date++;
      }
      day_div.appendChild(day);
      day_div.appendChild(event);
      row.appendChild(day_div);
    }

    calendarBody.appendChild(row);
  }
}

// Call the function to fetch calendar events when the page loads
window.onload = setUp;

// Function to fetch public calendar events using the Google Calendar API
async function fetchCalendarEvents() {
  const calendarId = "arpv0efrirrmml4rkp26rf21rg%40group.calendar.google.com"; // Replace with your public calendar ID
  const timeMin = firstDayOfMonth.toISOString();
  const timeMax = lastDayOfMonth.toISOString();
  let events = [];

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=True&orderBy=startTime`;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      events = data.items;
    });
}
