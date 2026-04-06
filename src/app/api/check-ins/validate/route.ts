import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { secret_code } = await request.json();

    if (!secret_code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const { data: activity, error } = await supabase
      .from("activities")
      .select("id, feedback_form_url")
      .eq("secret_code", secret_code)
      .single();

    if (error || !activity) {
      return NextResponse.json({ error: "Invalid code" }, { status: 401 });
    }

    return NextResponse.json({
      valid: true,
      feedback_form_url: activity.feedback_form_url ?? null,
    });
  } catch (error) {
    console.error("Error validating code:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}