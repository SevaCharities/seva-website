import { supabase } from "../lib/supabaseClient";

// Join a group for an event
export async function joinEventGroup(eventId: string, userId: string) {
  // Find groups for event with open spots
  const { data: groups, error } = await supabase
    .from("groups")
    .select("id, max_size")
    .eq("event_id", eventId);

  if (error) throw error;

  for (const group of groups ?? []) {
    const { data: members } = await supabase
      .from("group_members")
      .select("*")
      .eq("group_id", group.id);

    if (members && members.length < group.max_size) {
      // Join this group
      const { error: joinError } = await supabase.from("group_members").insert({
        group_id: group.id,
        user_id: userId,
      });
      if (joinError) throw joinError;
      return;
    }
  }

  // No group with space → create new group + join
  const { data: newGroup, error: newGroupError } = await supabase
    .from("groups")
    .insert({
      event_id: eventId,
      name: `Group for ${eventId} by ${userId.substring(0, 5)}`,
      created_by: userId,
    })
    .select()
    .single();

  if (newGroupError) throw newGroupError;

  const { error: joinNewError } = await supabase.from("group_members").insert({
    group_id: newGroup.id,
    user_id: userId,
  });
  if (joinNewError) throw joinNewError;
}

// Leave a group for an event
export async function leaveEventGroup(eventId: string, userId: string) {
  // Find memberships for this user/event
  const { data: memberships, error } = await supabase
    .from("group_members")
    .select("id, group_id")
    .eq("user_id", userId);

  if (error) throw error;

  if (!memberships || memberships.length === 0) return;

  for (const membership of memberships) {
    // Check if membership group matches event
    const { data: group } = await supabase
      .from("groups")
      .select("event_id")
      .eq("id", membership.group_id)
      .single();

    if (group?.event_id === eventId) {
      // Delete membership
      const { error: delError } = await supabase
        .from("group_members")
        .delete()
        .eq("id", membership.id);

      if (delError) throw delError;

      // Delete group if empty
      const { data: remainingMembers } = await supabase
        .from("group_members")
        .select("*")
        .eq("group_id", membership.group_id);

      if (!remainingMembers || remainingMembers.length === 0) {
        await supabase.from("groups").delete().eq("id", membership.group_id);
      }
      return;
    }
  }
}
