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

    // Optional: Sort badges to match the order in badge_info
    const sortedBadges = badgesWithStatus.sort((a, b) => {
      const aIndex = memberData.badge_info.findIndex(
        (badge: BadgeInfo) => badge.badge_id === a.id
      );
      const bIndex = memberData.badge_info.findIndex(
        (badge: BadgeInfo) => badge.badge_id === b.id
      );
      return aIndex - bIndex;
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
