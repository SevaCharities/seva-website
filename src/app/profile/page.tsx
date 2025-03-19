"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabaseClient";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import Profile from "../components/Profile";
import { Toaster, toast } from "react-hot-toast";

export type Settings = {
  check_in_enabled: boolean;
  general_meeting: number;
};

export type UserInterface = {
  id: string;
  name: string;
  email: string;
  updated_at: string;
  profile_picture: string;
};

export default function App() {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserInterface>();
  const [settings, setSettings] = useState<Settings | null>(null);

  const [loading, setLoading] = useState(true);

  const createProfileIfNeeded = async (_user: User) => {
    try {
      const { data: existingProfile } = await supabase
        .from("members")
        .select("id")
        .eq("id", _user.id)
        .single();

      if (!existingProfile) {
        const { error } = await supabase.from("members").insert([
          {
            id: _user.id,
            name: _user.user_metadata?.full_name,
            email: _user.email,
          },
        ]);
        if (error) {
          console.error("Error creating profile", error);
          toast.error("Error creating profile");
        } else {
          toast.success("Profile created successfully!");
        }
      }
    } catch (error) {
      toast.error("Error with profile setup");
    }
  };

  async function getUserProfile(_id: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("members")
        .select("id, name, updated_at, email, profile_picture")
        .eq("id", _id)
        .single();

      if (error) throw error;
      if (data) {
        setUser({
          id: _id,
          name: data.name,
          updated_at: new Date(data.updated_at).toISOString(),
          email: data.email,
          profile_picture: data.profile_picture || "/profile.jpg",
        });
      }
    } catch (error) {
      toast.error("Error loading profile");
    } finally {
      setLoading(false);
    }
  }

  const getSettings = async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("key, value")
      .in("key", ["check_in_enabled", "general_meeting"]);

    if (!error && data) {
      const settings = {
        check_in_enabled:
          data.find((s) => s.key === "check_in_enabled")?.value === true,
        general_meeting: Number(
          data.find((s) => s.key === "general_meeting")?.value
        ),
      };

      setSettings(settings);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First, get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUserSession(session);

        // If we have a session, check/create profile
        if (session) {
          const user = session.user;
          await createProfileIfNeeded(user);
          await getUserProfile(user.id);
          await getSettings();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        toast.error("Authentication error");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // TESTING
  // useEffect(() => {
  //   console.log("userSession", userSession);
  // }, [userSession]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Toaster position="top-center" />
      {!userSession ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Sign in to your account
            </h2>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    background: "#91fffb",
                    borderRadius: "0.5rem",
                    color: "#2b2b2b",
                  },
                },
              }}
              providers={["google"]}
              onlyThirdPartyProviders={true}
              // redirectTo="http://localhost:3000/profile"
              redirectTo="https://www.sevacharities.com/profile"
              queryParams={{
                access_type: "offline",
                prompt: "select_account",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="my-16 sm:my-24">
          <div className=" mx-auto">
            <Profile user={user!} settings={settings!} />
            <button
              onClick={handleSignOut}
              className="mt-6 w-full py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
