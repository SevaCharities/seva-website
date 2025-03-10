"use client";

import { useState, useEffect } from "react";

import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import ImageUpload from "./ImageUpload";
import CheckInModal from "./CheckInModal";

interface ProfileFormProps {
  session?: Session | null;
}

type Settings = {
  check_in_enabled: boolean;
  general_meeting: number;
};

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null); // auth
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [profilePicture, setProfilePicture] = useState<string>("/profile.jpg");
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [checkInImage, setCheckInImage] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (currentUser) {
          await getUserProfile(currentUser.id);
          await updateSettings();
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    const updateSettings = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("key, value")
        .in("key", ["check_in_enabled", "general_meeting"]);

      if (!error && data) {
        const settingsObj = {
          check_in_enabled: false,
          general_meeting: 0,
        };

        data.forEach((setting) => {
          if (setting.key === "check_in_enabled") {
            settingsObj.check_in_enabled = setting.value === true;
          } else if (setting.key === "general_meeting") {
            settingsObj.general_meeting = Number(setting.value);
          }
        });

        setSettings(settingsObj);
      }
    };

    initializeUser();
  }, []);

  async function getUserProfile(_id: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("name, profile_picture")
        .eq("id", _id)
        .single();

      if (error) throw error;
      if (data) {
        setName(data.name || "");
        setProfilePicture(data.profile_picture || "/profile.jpg");
      }
    } catch (error) {
      toast.error("Error loading profile");
      setProfilePicture("/profile.jpg");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        name,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  }

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      console.log("Checking in...");
      // Check if user has already checked in today
      const today = new Date().toISOString().split("T")[0];
      const { data: existingCheckIn, error: checkError } = await supabase
        .from("check_ins")
        .select()
        .eq("user_id", user?.id)
        .gte("created_at", today)
        .lt("created_at", today + "T23:59:59.999Z");

      if (checkError) throw checkError;

      if (existingCheckIn && existingCheckIn.length > 0) {
        toast("You have already checked in today!", {
          icon: "👏",
        });
        return;
      }

      // Open modal for image upload instead of immediate check-in
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
        name: name,
        email: user?.email,
        created_at: new Date().toISOString(),
        image_url: imageUrl,
      });

      if (error) throw error;
      setIsCheckedIn(true);
      setIsCheckInModalOpen(false);
      toast.success("Checked in successfully!");
    } catch (error) {
      toast.error("Error checking in");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (url: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No user found");
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          profile_picture: url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setProfilePicture(url);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error; // Re-throw to be handled by ImageUpload component
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-auto">
          {/* <Image
            src={profilePicture!}
            alt="Profile"
            width={300}
            height={300}
            className="rounded-lg object-cover w-full md:w-[400px] h-[400px]"
          /> */}
        </div>
        <div className="flex-1">
          <div className="relative flex-1">
            {isEditing ? (
              <EditProfile />
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-4xl font-semibold text-gray-900 mb-1">
                    {name || "Not set"}
                  </h2>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* check in */}
      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Check-In</h3>
            <p className="text-sm text-gray-500">
              {settings?.check_in_enabled
                ? `GM #${settings?.general_meeting}`
                : "Check-in is currently disabled"}
            </p>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={loading || !settings?.check_in_enabled}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 
              ${
                !settings?.check_in_enabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
          >
            Check In
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

const EditProfile = () => {
  return (
    <div>
      <div>
        <p>Edit Profile</p>
      </div>
      <ImageUpload onUploadSuccess={async () => {}} />
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        {/* <input
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter your full name"
        /> */}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        {/* <input
          type="text"
          disabled
          value={user?.email}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
        /> */}
      </div>

      {/* <button
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
      </button> */}
    </div>
  );
};
