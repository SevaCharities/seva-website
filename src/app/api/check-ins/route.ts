import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

interface CheckIn {
  activity_id: string;
  activity_name: string;
  created_at: string;
  data: {
    image_url: string;
    id: string;
  };
  name: string;
  user_id: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activityName = searchParams.get("activity_name");

    if (!activityName) {
      return new Response("activity_name is required", { status: 400 });
    }

    // Get all check-ins for the activity
    const { data: checkIns, error: checkInsError } = await supabase
      .from("check_ins")
      .select("*")
      .eq("activity_name", activityName)
      .order("created_at", { ascending: false });

    if (checkInsError) throw checkInsError;

    return NextResponse.json({ checkIns: checkIns });
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    return NextResponse.json(
      { error: "Failed to fetch check-ins" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
