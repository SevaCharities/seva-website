import { BadgeInfo } from "@/app/admin/page";
import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    // Step 1: Get the member's badge_info array
    const { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("badge_info")
      .eq("id", params.memberId)
      .single();

    if (memberError) {
      console.error("Error fetching member:", memberError);
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // If the member has no badges
    if (!memberData.badge_info || memberData.badge_info.length === 0) {
      return NextResponse.json({ badges: [] });
    }

    const badgeIds = memberData.badge_info.map(
      (badge: BadgeInfo) => badge.badge_id
    );

    // Step 2: Get the badge details using the IN operator
    const { data: badges, error: badgesError } = await supabase
      .from("badges")
      .select("id, name, image, emoji, description, rarity")
      .in("id", badgeIds);

    if (badgesError) {
      console.error("Error fetching badges:", badgesError);
      return NextResponse.json(
        { error: "Failed to fetch badges" },
        { status: 500 }
      );
    }
    const badgesWithStatus = badges.map((badge) => ({
      ...badge,
      opened:
        memberData.badge_info.find((b: BadgeInfo) => b.badge_id === badge.id)
          ?.opened || false,
    }));

    // Sort badges by ID
    const sortedBadges = badgesWithStatus.sort((a, b) => a.id - b.id);

    return NextResponse.json({ badges: sortedBadges });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const { badge_id } = await request.json();

    // Get current badge_info
    const { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("badge_info")
      .eq("id", params.memberId)
      .single();

    if (memberError) {
      console.error("Error fetching member:", memberError);
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Update the opened status for the specific badge
    const updatedBadgeInfo = memberData.badge_info.map((badge: BadgeInfo) =>
      badge.badge_id === badge_id ? { ...badge, opened: true } : badge
    );

    console.log(updatedBadgeInfo);

    // Update the member's badge_info
    const { error: updateError } = await supabase
      .from("members")
      .update({ badge_info: updatedBadgeInfo })
      .eq("id", params.memberId);

    if (updateError) {
      console.error("Error updating badge status:", updateError);
      return NextResponse.json(
        { error: "Failed to update badge status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, badge_info: updatedBadgeInfo });
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
