// fetch events matching year and monthIndex from Seva Google Calendar use API
function fetchEvents(year, monthIndex) {
    const calendarId = "arpv0efrirrmml4rkp26rf21rg@group.calendar.google.com";
    const apiKey = "AIzaSyAiUOYrTsSgf4E_PkOwaskREek3KMQusBs";
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const events = data.items.filter((event) => {
                const eventDate = new Date(
                    event.start.date || event.start.dateTime
                );
                return (
                    eventDate.getFullYear() === year &&
                    eventDate.getMonth() === monthIndex
                );
            });
            console.log(year, monthIndex, events);
            renderEvents(events);
        })
        .catch((error) => {
            console.error("Error fetching events:", error);
        });
}

// render fetched events onto calendar, handling single and multi day events
function renderEvents(events) {
    const daysContainer = document.querySelector(".days");
    const days = daysContainer.querySelectorAll(".cur-month");

    let dayToEvents = {};

    days.forEach((dayElement) => {
        const children = dayElement.querySelectorAll("*");
        if (children.length > 0) {
            for (let child of children) {
                dayElement.removeChild(child);
            }
        }
    });

    events.forEach((event) => {
        let eventDateStart, eventDateEnd;
        // MULTI DAY : start, end diff
        if (event.start.date) {
            eventDateStart = new Date(event.start.date + "T18:30:00");
            eventDateEnd = new Date(event.end.date + "T00:00:00-01:00");

            days.forEach((dayElement) => {
                const day = parseInt(dayElement.textContent);
                if (
                    eventDateStart.getDate() == eventDateEnd.getDate() &&
                    day === eventDateStart.getDate()
                ) {
                    if (!dayToEvents[day]) {
                        dayToEvents[day] = [];
                    }
                    dayToEvents[day].push(event);
                    const eventElement = document.createElement("div");
                    eventElement.textContent = event.summary;
                    eventElement.classList.add("event");
                    dayElement.appendChild(eventElement);
                }
            });
        }
        // SINGLE DAY
        else {
            eventDateStart = new Date(event.start.dateTime);
            eventDateEnd = eventDateStart;

            days.forEach((dayElement) => {
                const day = parseInt(dayElement.textContent);
                if (day === eventDateStart.getDate()) {
                    if (!dayToEvents[day]) {
                        dayToEvents[day] = [];
                    }
                    dayToEvents[day].push(event);
                    const eventElement = document.createElement("div");
                    eventElement.textContent = event.summary;
                    eventElement.classList.add("event");
                    dayElement.appendChild(eventElement);
                }
            });
        }
    });

    events.forEach((event) => {
        let eventDateStart, eventDateEnd;
        // MULTI DAY : start, end same
        if (event.start.date) {
            eventDateStart = new Date(event.start.date + "T18:30:00");
            eventDateEnd = new Date(event.end.date + "T00:00:00-01:00");
            days.forEach((dayElement) => {
                const day = parseInt(dayElement.textContent);
                if (
                    eventDateStart.getDate() !== eventDateEnd.getDate() &&
                    day >= eventDateStart.getDate() &&
                    day <= eventDateEnd.getDate()
                ) {
                    if (!dayToEvents[day]) {
                        dayToEvents[day] = [];
                    }
                    dayToEvents[day].push(event);
                    const eventElement = document.createElement("div");
                    eventElement.textContent = event.summary;
                    eventElement.classList.add("event", "m");
                    dayElement.appendChild(eventElement);
                }
            });
        }
    });

    const allDays = daysContainer.querySelectorAll(".day");
    allDays.forEach((dayElement) => {
        const dayNumber = parseInt(dayElement.textContent);
        if (dayNumber in dayToEvents) {
            dayElement.addEventListener("click", () => {
                const children = dayElement.querySelectorAll("*");
                const popup = document.getElementById("popup");
                const eventInfo = dayToEvents[dayNumber];

                // Clear previous content
                popup.innerHTML = "";
                const popupContentNew = document.createElement("div");

                popupContentNew.classList.add("popup-content");
                // Generate the popup content for each event
                for (let i in eventInfo) {
                    const popupItem = document.createElement("div");
                    const t = new Date(
                        eventInfo[i].start.dateTime || eventInfo[i].start.date
                    );
                    const e = new Date(eventInfo[i].end.date || "");
                    console.log(eventInfo[i]);

                    popupItem.innerHTML = `
                        <div class="d-flex flex-wrap  gap-3 py-2">
                        <div class="d-flex flex-grow-1 justify-content-between gap-3 py-2 align-items-start ">

                        <div class="d-flex  gap-2">   

                        <div class="${
                            children[i].classList.contains("m")
                                ? "mTag"
                                : "sTag"
                        }"></div>
                        
                         <h2>${eventInfo[i].summary}</h2>  </div>
                         
                         ${
                             i == 0
                                 ? `
                        <button class="flex-1 closePopup btn btn-primary" id="closePopup">&times;</button>
                     `
                                 : ""
                         }
                         </div>
                      
                        <h6>${eventInfo[i].description || ""}</h6>

                        <!-- Handle datetime output for single vs multi day events -->
                        <div class="d-flex gap-5">
                        ${
                            eventInfo[i].start.dateTime
                                ? `<p>
                                    <strong>Time:</strong> 
                                    ${t.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>`
                                : ""
                        }
                        <p><strong>Date:</strong> 
                        ${t.toDateString().replace(/\s\d{4}$/, "")} 
                        ${
                            eventInfo[i].start.dateTime
                                ? ""
                                : " to " +
                                  e.toDateString().replace(/\s\d{4}$/, "")
                        } </p>
                       
                        </div>
                        
                    `;
                    popupContentNew.appendChild(popupItem);
                }
                popup.appendChild(popupContentNew);
                popup.style.display = "block";
            });
        }
    });
}

// Calendar navigation
document.addEventListener("DOMContentLoaded", function () {
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const todayBtn = document.getElementById("todayBtn");
    const currentMonth = document.getElementById("currentMonth");
    const daysContainer = document.querySelector(".days");

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonthIndex = currentDate.getMonth();
    let currentDay = currentDate.getDate();

    renderCalendar(currentYear, currentMonthIndex);

    prevMonthBtn.addEventListener("click", () => {
        currentMonthIndex--;
        if (currentMonthIndex < 0) {
            currentMonthIndex = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonthIndex);
    });

    nextMonthBtn.addEventListener("click", () => {
        currentMonthIndex++;
        if (currentMonthIndex > 11) {
            currentMonthIndex = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonthIndex);
    });

    todayBtn.addEventListener("click", () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonthIndex = currentDate.getMonth();
        renderCalendar(currentYear, currentMonthIndex);
    });

    // Renders empty calendar
    function renderCalendar(year, monthIndex) {
        // Display the current month and year
        currentMonth.textContent = new Date(
            year,
            monthIndex
        ).toLocaleDateString("default", { month: "long", year: "numeric" });

        // Clear the existing calendar content
        daysContainer.innerHTML = "";

        // Calculate the number of days in the month
        // console.log(monthIndex, year);
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        // Calculate the number of days from the previous month to display
        const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
        const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;

        // Calculate the number of days from the next month to display
        const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDay();
        const daysFromNextMonth = lastDayOfMonth === 6 ? 0 : 6 - lastDayOfMonth;

        // Render days from the previous month
        for (let i = daysFromPrevMonth; i > 0; i--) {
            const prevMonthDayElement = document.createElement("div");
            prevMonthDayElement.textContent = new Date(
                year,
                monthIndex,
                -i + 1
            ).getDate();
            prevMonthDayElement.classList.add("day", "prev-month");
            daysContainer.appendChild(prevMonthDayElement);
        }

        // Render days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            dayElement.classList.add("day", "cur-month");
            dayElement.setAttribute("data-day", day);
            if (
                day === currentDay &&
                year === currentDate.getFullYear() &&
                monthIndex === currentDate.getMonth()
            ) {
                dayElement.classList.add("today");
            }
            daysContainer.appendChild(dayElement);
        }

        // Render days from the next month
        for (let i = 1; i <= daysFromNextMonth; i++) {
            const nextMonthDayElement = document.createElement("div");
            nextMonthDayElement.textContent = i;
            nextMonthDayElement.classList.add("day", "next-month");
            daysContainer.appendChild(nextMonthDayElement);
        }

        // Fetch and render events after rendering calendar

        fetchEvents(year, monthIndex);
    }
});

// Popup handler
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("click", function (event) {
        const popup = document.getElementById("popup");
        if (event.target === popup) {
            popup.style.display = "none";
        }
        const closePopupButton = document.getElementById("closePopup");
        closePopupButton.addEventListener("click", () => {
            popup.style.display = "none";
        });
    });
});
