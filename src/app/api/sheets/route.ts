// app/api/sheets/route.ts

import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { values } = body;
    if (!values || !Array.isArray(values)) {
      return NextResponse.json(
        { error: 'Missing or invalid "values" in request body' },
        { status: 400 }
      );
    }

    // Build the path to your service account key file.
    // Ensure that the file is stored securely and is not committed to version control.
    const keyFilePath = path.join(
      process.cwd(),
      "config",
      "service-account-key.json"
    );

    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const authClient = await auth.getClient();

    // Initialize the Sheets API client with auth
    const sheets = google.sheets({ version: "v4" });

    // Retrieve the spreadsheet ID from environment variables.
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Spreadsheet ID not set in environment variables");
    }

    // Define the target range in your spreadsheet (adjust as needed).
    const range = "Sheet1!A1";

    // Append the data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error: any) {
    console.error("Error exporting to Google Sheets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
