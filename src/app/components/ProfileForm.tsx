"use client";

import { useState, useEffect } from "react";

import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import Image from "next/image";

interface ProfileFormProps {
  session?: Session | null;
}

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        setUser(currentUser);

        if (currentUser) {
          await getProfile(currentUser.id);
          await checkCheckInStatus();
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    const checkCheckInStatus = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "check_in_enabled")
        .single();

      if (!error && data) {
        console.log("CHECK IN STATUS: ", data.value);
        setCanCheckIn(data.value === true);
      }
    };

    initializeUser();
  }, []);

  async function getProfile(_id: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", _id)
        .single();

      console.log("USER ID: ", _id);
      if (error) throw error;
      if (data) setName(data.name || "");
    } catch (error) {
      toast.error("Error loading profile");
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
      const { error } = await supabase.from("check_ins").insert({
        user_id: user?.id,
        name: name,
        email: user?.email,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
      setIsCheckedIn(true);
      toast.success("Checked in successfully!");
    } catch (error) {
      toast.error("Error checking in");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    const data = {
      values: [
        ["Name", "Email"],
        ["Alice", "alice@example.com"],
        ["Bob", "bob@example.com"],
      ],
    };

    const res = await fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log("Data exported successfully!");
    } else {
      const errorData = await res.json();
      console.log(`Error: ${errorData.error}`);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex gap-8 flex-grow">
        {/* <button onClick={handleExport}>Export</button> */}

        <div>
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={300}
            height={300}
            className="rounded-lg object-cover w-[400px] h-[400px]"
          />
        </div>
        <div className="flex-1">
          <div className="relative  flex-1  ">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute right-0 top-0 p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {isEditing ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.email}
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
              </>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-900 text-4xl">{name || "Not set"}</p>

                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Check-In</h3>
            <p className="text-sm text-gray-500">
              {canCheckIn
                ? "Check in for today's event"
                : "Check-in is currently disabled"}
            </p>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={loading || !canCheckIn || isCheckedIn}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 
              ${
                !canCheckIn || isCheckedIn
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {isCheckedIn ? "Already Checked In" : "Check In"}
          </button>
        </div>
      </div>
    </div>
  );
}
