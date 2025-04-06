import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    // Step 1: Get the member's badge_ids array
    const { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("badge_ids")
      .eq("id", params.memberId)
      .single();

    if (memberError) {
      console.error("Error fetching member:", memberError);
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // If the member has no badges
    if (!memberData.badge_ids || memberData.badge_ids.length === 0) {
      return NextResponse.json({ badges: [] });
    }

    // Step 2: Get the badge details using the IN operator
    const { data: badges, error: badgesError } = await supabase
      .from("badges")
      .select("id, name, image, emoji, description")
      .in("id", memberData.badge_ids);

    if (badgesError) {
      console.error("Error fetching badges:", badgesError);
      return NextResponse.json(
        { error: "Failed to fetch badges" },
        { status: 500 }
      );
    }

    // Optional: Sort badges to match the order in badge_ids
    const sortedBadges = badges.sort((a, b) => {
      return (
        memberData.badge_ids.indexOf(a.id) - memberData.badge_ids.indexOf(b.id)
      );
    });

    return NextResponse.json({ badges: sortedBadges });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Configure cache behavior
export const dynamic = "force-dynamic"; // Disable caching for this route
