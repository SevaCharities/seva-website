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

  if (!calendarId || !apiKey) {
    console.error("Missing Google Calendar credentials");
    return NextResponse.json(
      { error: "Missing Google Calendar credentials" },
      { status: 500 }
    );
  }

  console.log("Fetching events for", year, monthIndex);

  // Create date range for the requested month
  const startOfMonth = new Date(parseInt(year), parseInt(monthIndex), 1);
  const endOfMonth = new Date(parseInt(year), parseInt(monthIndex) + 1, 0);
  
  const timeMin = startOfMonth.toISOString();
  const timeMax = new Date(endOfMonth.getTime() + 24 * 60 * 60 * 1000).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Calendar API error:", response.status, errorData);
      return NextResponse.json(
        { error: `Google Calendar API error: ${errorData.error?.message}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.log("No events found for the requested month");
      return NextResponse.json([], { status: 200 });
    }

    const events = data.items.map((event: any) => {
      const isAllDay = !!event.start.date;
      let eventDate: Date;
      
      if (isAllDay) {
        eventDate = new Date(event.start.date);
      } else {
        eventDate = new Date(event.start.dateTime);
      }

      return {
        id: event.id,
        summary: event.summary,
        isAllDay,
        start: event.start,
      };
    });

    console.log(`Found ${events.length} events`);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events from Google Calendar" },
      { status: 500 }
    );
  }
}
