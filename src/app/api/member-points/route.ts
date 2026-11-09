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
    if (!memberName) {
      return NextResponse.json(
        { error: "Your profile needs a name before points can be matched." },
        { status: 404 }
      );
    }

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
    const totalColumn = headers.indexOf("total");

    if (nameColumn < 0 || totalColumn < 0) {
      throw new Error("Points sheet is missing a required header");
    }

    const [namesResponse, totalsResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${columnLetter(nameColumn)}2:${columnLetter(nameColumn)}`,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!${columnLetter(totalColumn)}2:${columnLetter(totalColumn)}`,
      }),
    ]);

    const names = namesResponse.data.values?.map((row) =>
      String(row[0] ?? "").trim().replace(/\s+/g, " ").toLowerCase()
    ) ?? [];
    const totals = totalsResponse.data.values?.map((row) => row[0]) ?? [];
    const matchingRows = names.flatMap((name, index) =>
      name === memberName ? [index] : []
    );

    if (matchingRows.length !== 1) {
      return NextResponse.json(
        {
          error: matchingRows.length
            ? "Your name matches multiple rows in the points sheet. Please contact a site administrator."
            : "No points record matches your profile name. Check that the name on the sheet matches your SEVA profile name.",
        },
        { status: matchingRows.length ? 409 : 404 }
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
