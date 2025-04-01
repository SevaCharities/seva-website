import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const query = supabase
      .from("check_ins")
      .select("*")
      .order("created_at", { ascending: true });

    if (startDate) {
      query.gte("created_at", startDate);
    }
    if (endDate) {
      query.lt("created_at", endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Convert to CSV format
    const csv = [
      ["Name", "Email", "Check-in Time"],
      ...data.map((row) => [
        row.name,
        row.email,
        new Date(row.created_at).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=check-ins.csv",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to export check-ins" },
      { status: 500 }
    );
  }
}
