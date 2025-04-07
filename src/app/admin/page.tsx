"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Badge } from "../components/Badges";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [assignLoading, setAssignLoading] = useState(false);
  const [createBadgeLoading, setCreateBadgeLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [checkInEnabled, setCheckInEnabled] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [members, setMembers] = useState<any[]>([]);

  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  const [memberSearchTerm, setMemberSearchTerm] = useState<string>("");
  const [newBadge, setNewBadge] = useState<Partial<Badge>>({
    name: "",
    emoji: "",
    image: "/test.png", // Default image
    description: "",
  });
  const router = useRouter();

  // Filter members based on search term
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(memberSearchTerm.toLowerCase())
  );

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();

      if (
        error ||
        !data.user ||
        data.user.email !== process.env.NEXT_PUBLIC_ADMIN
      ) {
        toast.error("Unauthorized access");
        router.push("/profile");
        return;
      }

      setUser(data.user);
      await fetchData();
    }

    checkAuth();
  }, [router]);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch members
      const { data: membersData, error: membersError } = await supabase
        .from("members")
        .select("id, name, email, badge_ids");

      if (membersError) throw membersError;
      setMembers(membersData || []);

      // Fetch badges
      const { data: badgesData, error: badgesError } = await supabase
        .from("badges")
        .select("id, name, image, emoji, description");

      if (badgesError) throw badgesError;
      setBadges(badgesData || []);

      // Fetch check-in status
      const { data: settingsData, error: settingsError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "check_in_enabled")
        .single();

      if (settingsError && settingsError.code !== "PGRST116") {
        // PGRST116 is "not found" error, which is fine - we'll initialize the setting
        console.error("Error fetching settings:", settingsError);
      } else if (settingsData) {
        setCheckInEnabled(settingsData.value === true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function uploadImageToCloudinary(file: File) {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_BADGES_PRESET!
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setNewBadge({ ...newBadge, image: data.secure_url });
        toast.success("Image uploaded successfully!");
        return data.secure_url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setUploadingImage(false);
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    await uploadImageToCloudinary(file);
  };

  async function createBadge() {
    // Validate inputs
    if (!newBadge.name || !newBadge.emoji || !newBadge.description) {
      toast.error("Please fill in all badge fields");
      return;
    }

    setCreateBadgeLoading(true);
    try {
      // Insert the new badge
      const { data, error } = await supabase
        .from("badges")
        .insert([
          {
            name: newBadge.name,
            emoji: newBadge.emoji,
            image: newBadge.image,
            description: newBadge.description,
          },
        ])
        .select();

      if (error) throw error;

      toast.success("Badge created successfully!");
      // Reset form
      setNewBadge({
        name: "",
        emoji: "",
        image: "/blur.png",
        description: "",
      });
      await fetchData(); // Refresh badges list
    } catch (error) {
      console.error("Error creating badge:", error);
      toast.error("Failed to create badge");
    } finally {
      setCreateBadgeLoading(false);
    }
  }

  async function assignBadge() {
    if (selectedMembers.length === 0 || !selectedBadge) {
      toast.error("Please select at least one member and a badge");
      return;
    }

    setAssignLoading(true);
    const badgeId = parseInt(selectedBadge);
    let successCount = 0;
    let alreadyAssignedCount = 0;
    let errorCount = 0;

    try {
      // Process each selected member
      for (const memberId of selectedMembers) {
        try {
          // Get current badge_ids
          const { data: memberData, error: memberError } = await supabase
            .from("members")
            .select("badge_ids")
            .eq("id", memberId)
            .single();

          if (memberError) {
            errorCount++;
            continue;
          }

          // Create updated badge array
          const currentBadges = memberData.badge_ids || [];

          if (currentBadges.includes(badgeId)) {
            alreadyAssignedCount++;
            continue;
          }

          const updatedBadges = [...currentBadges, badgeId];

          // Update the member
          const { error: updateError } = await supabase
            .from("members")
            .update({ badge_ids: updatedBadges })
            .eq("id", memberId);

          if (updateError) {
            errorCount++;
          } else {
            successCount++;
          }
        } catch (err) {
          errorCount++;
        }
      }

      // Show appropriate toast based on results
      if (successCount > 0) {
        toast.success(
          `Badge assigned to ${successCount} member${
            successCount > 1 ? "s" : ""
          }`
        );
      }
      if (alreadyAssignedCount > 0) {
        toast(
          `${alreadyAssignedCount} member${
            alreadyAssignedCount > 1 ? "s" : ""
          } already had this badge`,
          {
            icon: "ℹ️",
          }
        );
      }
      if (errorCount > 0) {
        toast.error(
          `Failed to assign badge to ${errorCount} member${
            errorCount > 1 ? "s" : ""
          }`
        );
      }

      // Reset selections on success
      if (successCount > 0) {
        setSelectedMembers([]);
        setSelectedBadge("");
      }

      await fetchData(); // Refresh data
    } catch (error) {
      console.error("Error assigning badge:", error);
      toast.error("Failed to assign badge");
    } finally {
      setAssignLoading(false);
    }
  }

  function clearMemberSelection() {
    setSelectedMembers([]);
  }

  async function toggleCheckIn() {
    setToggleLoading(true);
    try {
      const newStatus = !checkInEnabled;

      // Check if setting already exists
      const { data: existingData, error: checkError } = await supabase
        .from("settings")
        .select("id")
        .eq("key", "check_in_enabled")
        .single();

      let updateError;

      if (checkError && checkError.code === "PGRST116") {
        // Setting doesn't exist, create it
        const { error } = await supabase
          .from("settings")
          .insert([{ key: "check_in_enabled", value: String(newStatus) }]);
        updateError = error;
      } else {
        // Setting exists, update it
        const { error } = await supabase
          .from("settings")
          .update({ value: newStatus })
          .eq("key", "check_in_enabled");
        updateError = error;
      }

      if (updateError) throw updateError;

      setCheckInEnabled(newStatus);
      toast.success(
        `Check-in ${newStatus ? "enabled" : "disabled"} successfully`
      );
    } catch (error) {
      console.error("Error toggling check-in status:", error);
      toast.error("Failed to update check-in status");
    } finally {
      setToggleLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="my-16 sm:my-24 container mx-auto p-4 max-w-4xl">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Check-in Toggle Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">Allow members to check in to GM</p>
          </div>

          <div className="flex items-center">
            <span className="mr-3 text-sm font-medium text-gray-900">
              {checkInEnabled ? "Enabled" : "Disabled"}
            </span>
            <button
              onClick={toggleCheckIn}
              disabled={toggleLoading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                checkInEnabled
                  ? "bg-green-500 focus:ring-green-500"
                  : "bg-gray-300 focus:ring-gray-500"
              }`}
              role="switch"
              aria-checked={checkInEnabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  checkInEnabled ? "translate-x-6" : "translate-x-1"
                } ${toggleLoading ? "opacity-60" : ""}`}
              />
              {toggleLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>

        <div
          className={`mt-4 p-3 rounded ${
            checkInEnabled
              ? "bg-green-50 text-green-800"
              : "bg-yellow-50 text-yellow-800"
          }`}
        >
          <p className="text-sm">
            {checkInEnabled
              ? "Members can currently check in to GM."
              : "Check-in is currently disabled. Enable this when you want members to be able to check in to GM."}
          </p>
        </div>
      </div>

      {/* Create Badge Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Badge</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Name
              </label>
              <input
                type="text"
                value={newBadge.name}
                onChange={(e) =>
                  setNewBadge({ ...newBadge, name: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="e.g. First Event"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emoji
              </label>
              <input
                type="text"
                value={newBadge.emoji}
                onChange={(e) =>
                  setNewBadge({ ...newBadge, emoji: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="e.g. 🎉"
                maxLength={2}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <label
                    className={`bg-blue-50 text-blue-600 px-3 py-2 text-sm rounded border border-blue-200 hover:bg-blue-100 transition-colors ${
                      uploadingImage
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } flex items-center gap-1`}
                  >
                    {uploadingImage ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        Upload Image
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newBadge.description}
                onChange={(e) =>
                  setNewBadge({ ...newBadge, description: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Describe what this badge represents..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Badge Preview</h3>
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={newBadge.image || "/blur.png"}
                alt="Badge Preview"
                fill
                className="object-cover rounded-md filter brightness-50"
              />
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {newBadge.emoji}
              </div>
            </div>
            <p className="text-lg font-semibold mb-1">
              {newBadge.name || "Badge Name"}
            </p>
            <p className="text-sm text-gray-600 text-center">
              {newBadge.description || "Badge description will appear here"}
            </p>
          </div>
        </div>

        <button
          onClick={createBadge}
          disabled={createBadgeLoading}
          className="w-full mt-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
        >
          {createBadgeLoading ? "Creating..." : "Create Badge"}
        </button>
      </div>

      {/* Current Badges Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Badges</h2>

        {badges.length === 0 ? (
          <p className="text-gray-500 italic">No badges created yet.</p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Total badges: {badges.length}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge: any) => (
                <div
                  key={badge.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={badge.image || "/blur.png"}
                        alt={badge.name}
                        fill
                        className="object-cover rounded-md filter brightness-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-3xl">
                        {badge.emoji}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{badge.name}</h3>
                      <p className="text-xs text-gray-500">ID: {badge.id}</p>
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Assign Badge Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Assign Badge to Members</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Members
          </label>
          <div className="relative">
            <input
              type="text"
              value={memberSearchTerm}
              onChange={(e) => setMemberSearchTerm(e.target.value)}
              className="w-full p-2 pl-3 pr-10 border rounded-md"
              placeholder="Search by name or email"
            />
            {memberSearchTerm && (
              <button
                onClick={() => setMemberSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {memberSearchTerm && (
            <p className="text-xs text-gray-500 mt-1">
              Showing {filteredMembers.length} of {members.length} members
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Members
          </label>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() =>
                setSelectedMembers(filteredMembers.map((member) => member.id))
              }
              className="text-xs py-1 px-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Select All Filtered
            </button>

            <button
              onClick={clearMemberSelection}
              className="text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Clear
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto border rounded-md p-2">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center py-1 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMembers([...selectedMembers, member.id]);
                    } else {
                      setSelectedMembers(
                        selectedMembers.filter((id) => id !== member.id)
                      );
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <label
                  htmlFor={`member-${member.id}`}
                  className="ml-2 block text-sm text-gray-900 cursor-pointer"
                >
                  {member.name}
                </label>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {selectedMembers.length} member
            {selectedMembers.length !== 1 ? "s" : ""} selected
            {memberSearchTerm && filteredMembers.length !== members.length && (
              <span>
                {" "}
                (filtering {filteredMembers.length} of {members.length} members)
              </span>
            )}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Badge
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedBadge}
            onChange={(e) => setSelectedBadge(e.target.value)}
          >
            <option value="">-- Select Badge --</option>
            {badges.map((badge: any) => (
              <option key={badge.id} value={badge.id}>
                {badge.name} {badge.emoji}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={assignBadge}
          disabled={assignLoading}
          className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
        >
          {assignLoading ? "Assigning..." : "Assign Badge to Selected Members"}
        </button>
      </div>

      {/* Member List Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Member List</h2>

        <div className="overflow-x-auto text-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Badges
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => {
                // Get the actual badge objects this member has
                const memberBadges = badges.filter(
                  (badge) =>
                    member.badge_ids && member.badge_ids.includes(badge.id)
                );

                return (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.name}
                    </td>
                    <td className="px-6 py-4">
                      {memberBadges.length === 0 ? (
                        <span className="text-gray-400 italic">No badges</span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {memberBadges.map((badge) => (
                            <div
                              key={badge.id}
                              className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1"
                              title={badge.description}
                            >
                              <span>{badge.emoji}</span>
                              <span className="text-xs">{badge.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
