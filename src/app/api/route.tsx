import { NextResponse } from "next/server";

export interface EventItem {
  id: string;
  summary: string;
  isAllDay: boolean;
  start: {
    date?: string;
    dateTime?: string;
  };
}

export async function GET(req: Request) {
  // Parse query parameters from URL
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const monthIndex = searchParams.get("monthIndex");

  if (!year || !monthIndex) {
    return NextResponse.json(
      { error: "Missing year or monthIndex" },
      { status: 400 }
    );
  }

  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  console.log(calendarId, apiKey);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return NextResponse.json({ error: "No events found" }, { status: 404 });
    }

    const events = data.items.filter((event: EventItem) => {
      let t =  event.start.dateTime;
      let eventDate = new Date(t!);
      event.isAllDay = false;

      if (event.start.date) {
        event.isAllDay = true;
      }

      return (
        eventDate.getFullYear() === parseInt(year) &&
        eventDate.getMonth() === parseInt(monthIndex)
      );
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
