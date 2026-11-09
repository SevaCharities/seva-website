import { google } from "googleapis";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SPREADSHEET_ID = "1GW4-26g51B_VuwQ9lyuc5TNiLUFOhQ8SheLy5fq8hig";
const SHEET_NAME = "Master";
const SHEETS_READONLY_SCOPE =
  "https://www.googleapis.com/auth/spreadsheets.readonly";

function columnLetter(index: number) {
  let column = "";
  let remaining = index + 1;

  while (remaining > 0) {
    const remainder = (remaining - 1) % 26;
    column = String.fromCharCode(65 + remainder) + column;
    remaining = Math.floor((remaining - 1) / 26);
  }

  return column;
}

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration is missing");
    }

    const authenticatedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    const {
      data: { user },
      error: authError,
    } = await authenticatedSupabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { data: member, error: memberError } = await authenticatedSupabase
      .from("members")
      .select("name")
      .eq("user_id", user.id)
      .single();

    if (memberError) throw memberError;
    const memberName = member.name?.trim().replace(/\s+/g, " ").toLowerCase();

    const serviceAccountEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    );

    if (!serviceAccountEmail || !privateKey) {
      console.error(
        "Google Sheets service account credentials are not configured"
      );
      return NextResponse.json(
        {
          error:
            "Points are not configured yet. Please contact a site administrator.",
        },
        { status: 503 }
      );
    }

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: [SHEETS_READONLY_SCOPE],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!1:1`,
    });
    const headers = headerResponse.data.values?.[0]?.map((header) =>
      String(header).trim().toLowerCase()
    );

    if (!headers) throw new Error("Points sheet header row is empty");

    const nameColumn = headers.indexOf("name");
    const emailColumn = headers.indexOf("email");
    const totalColumn = headers.indexOf("total");

    if (nameColumn < 0 || emailColumn < 0 || totalColumn < 0) {
      throw new Error("Points sheet is missing a required header");
    }

    const [namesResponse, emailsResponse, totalsResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${columnLetter(nameColumn)}2:${columnLetter(nameColumn)}`,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${columnLetter(emailColumn)}2:${columnLetter(emailColumn)}`,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${columnLetter(totalColumn)}2:${columnLetter(totalColumn)}`,
      }),
    ]);

    const names = namesResponse.data.values?.map((row) =>
      String(row[0] ?? "").trim().replace(/\s+/g, " ").toLowerCase()
    ) ?? [];
    const emails = emailsResponse.data.values?.map((row) =>
      String(row[0] ?? "").trim().toLowerCase()
    ) ?? [];
    const totals = totalsResponse.data.values?.map((row) => row[0]) ?? [];
    const nameMatches = memberName
      ? names.flatMap((name, index) => (name === memberName ? [index] : []))
      : [];

    if (nameMatches.length > 1) {
      return NextResponse.json(
        {
          error:
            "Your name matches multiple rows in the points sheet. Please contact a site administrator.",
        },
        { status: 409 }
      );
    }

    const email = user.email?.trim().toLowerCase();
    const emailMatches = nameMatches.length === 0 && email
      ? emails.flatMap((sheetEmail, index) =>
          sheetEmail === email ? [index] : []
        )
      : [];

    if (emailMatches.length > 1) {
      return NextResponse.json(
        {
          error:
            "Your email matches multiple rows in the points sheet. Please contact a site administrator.",
        },
        { status: 409 }
      );
    }

    const matchingRows = nameMatches.length === 1 ? nameMatches : emailMatches;

    if (matchingRows.length === 0) {
      return NextResponse.json(
        {
          error:
            "No points record matches your profile name or login email.",
        },
        { status: 404 }
      );
    }

    const totalValue = totals[matchingRows[0]];
    const total = typeof totalValue === "number" ? totalValue : Number(totalValue);

    if (
      totalValue === undefined ||
      totalValue === null ||
      String(totalValue).trim() === "" ||
      !Number.isFinite(total)
    ) {
      throw new Error("Member points total is not a valid number");
    }

    return NextResponse.json({ total });
  } catch (error) {
    console.error("Error loading points from master sheet:", error);
    return NextResponse.json(
      { error: "Unable to load points" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
