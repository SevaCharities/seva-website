import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: activities, error } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
