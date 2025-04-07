"use client";

import { useState, useEffect, useRef } from "react";

import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
import CheckInModal from "./CheckInModal";
import { FiSettings } from "react-icons/fi";
import { Settings, UserInterface } from "../profile/page";

export type Activity = {
  id: string;
  name: string;
};

export default function Profile({
  user,
  settings,
}: {
  user: UserInterface;
  settings: Settings;
}) {
  const activityRef = useRef<Activity | null>(null);

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);

  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(false);

  useEffect(() => {
    if (settings && user) {
      setCanCheckIn(settings?.check_in_enabled);
      checkInToday();
    }
  }, [settings, user]);

  const checkInToday = async () => {
    const activity_name = `GM ${settings?.general_meeting}`;
    const activity_id = await getActivityId(activity_name);
    activityRef.current = { name: activity_name, id: activity_id };

    const { data: existingCheckIn, error: checkError } = await supabase
      .from("check_ins")
      .select()
      .eq("user_id", user?.id)
      .eq("activity_id", activity_id);

    if (checkError) throw checkError;

    // already checked in for event / check-in is disabled
    setAlreadyCheckedIn(existingCheckIn.length > 0);
  };

  const getActivityId = async (_name: string) => {
    const { data: activity, error: activityError } = await supabase
      .from("activities")
      .select("id")
      .eq("name", _name);

    if (activityError) throw activityError;

    return activity[0].id;
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      setIsCheckInModalOpen(true);
    } catch (error) {
      toast.error("Error checking in");
    } finally {
      setLoading(false);
    }
  };

  const submitCheckIn = async (imageUrl: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("check_ins").insert({
        user_id: user?.id,
        activity_id: activityRef.current?.id,
        name: user?.name,
        activity_name: activityRef.current?.name,
        created_at: new Date().toISOString(),
        data: { image_url: imageUrl },
      });

      if (error) throw error;

      setIsCheckInModalOpen(false);
      toast.success("Checked in successfully!");
    } catch (error) {
      toast.error("Error checking in");
    } finally {
      setLoading(false);
      checkInToday();
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-auto">
          <Image
            src={user.profile_picture}
            alt="Profile"
            width={300}
            height={300}
            sizes="(max-width: 768px) 100vw, 400px" // Add sizes prop
            className="rounded-lg object-cover w-full md:w-[400px] h-[400px]"
          />
        </div>
        <div className="flex-1">
          <div className="relative flex-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              aria-label={isEditing ? "Close settings" : "Open settings"}
            >
              <FiSettings size={24} />
            </button>

            {isEditing ? <Edit user={user} /> : <View user={user} />}
          </div>
        </div>
      </div>

      {/* check in */}
      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Check-In</h3>
            <p className="text-sm text-gray-500">
              {canCheckIn && !alreadyCheckedIn
                ? `GM #${settings?.general_meeting}`
                : alreadyCheckedIn
                ? "You've already checked in"
                : "Check-in is currently disabled"}
            </p>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={loading || !canCheckIn || alreadyCheckedIn}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 
              ${
                canCheckIn && !alreadyCheckedIn
                  ? "bg-green-500 hover:bg-green-600"
                  : alreadyCheckedIn
                  ? "bg-yellow-500 cursor-not-allowed"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {alreadyCheckedIn ? "You are in! 😃" : "Check In"}
          </button>
        </div>
      </div>

      {isCheckInModalOpen && (
        <CheckInModal
          onClose={() => setIsCheckInModalOpen(false)}
          onSubmit={submitCheckIn}
          loading={loading}
        />
      )}
    </div>
  );
}

const View = ({ user }: { user: UserInterface }) => {
  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-1">{user.name}</h2>
      <p className="text-gray-600 text-sm">{user.email}</p>

      {user.email === "sevacharities@gmail.com" && (
        <a
          href="/admin"
          className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Admin Dashboard
        </a>
      )}
    </div>
  );
};

const Edit = ({ user }: { user: UserInterface }) => {
  const [userEdit, setUserEdit] = useState<UserInterface>(user);
  const [loading, setLoading] = useState(false);

  async function updateProfile() {
    try {
      setLoading(true);
      setUserEdit((prev) => ({
        ...prev,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("members").upsert(userEdit);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-lg font-medium">Edit Profile</p>
      </div>

      <div className="flex flex-col gap-4">
        <ImageUpload
          onUploadSuccess={async (url) => {
            setUserEdit((prev) => ({ ...prev, profile_picture: url }));
          }}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={userEdit.name}
            onChange={(e) =>
              setUserEdit((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="text"
            disabled
            value={userEdit.email}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
          />
        </div>
        <button
          onClick={updateProfile}
          disabled={loading}
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Saving Changes...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};
