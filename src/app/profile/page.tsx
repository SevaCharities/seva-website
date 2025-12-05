"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabaseClient";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import Profile from "../components/Profile";
import { Toaster, toast } from "react-hot-toast";
import Badges, { Badge } from "../components/Badges";
import MemberStatus from "../components/MemberStatus";

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

// Helper function to get the correct redirect URL based on environment
const getRedirectURL = () => {
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/profile';
  }
  
  // Use the environment variable for production/preview
  return process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:3000/profile';
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
        .eq("user_id", _user.id)  // <-- Changed from .eq("id", _user.id)
        .single();
  
      if (!existingProfile) {
        const { error } = await supabase.from("members").insert([
          {
            // Don't set id here - let Supabase auto-generate it
            user_id: _user.id,  // <-- ADD THIS: link to auth user
            name: _user.user_metadata?.full_name,
            email: _user.email,
            is_member: false,
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

  async function getUserProfile(_userId: string) {  // Renamed param for clarity
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("members")
        .select("id, name, updated_at, email, profile_picture, user_id")  // Add user_id
        .eq("user_id", _userId)  // <-- Changed from .eq("id", _userId)
        .single();
  
      if (error) throw error;
      if (data) {
        setUser({
          id: data.id,  // This is the member table ID
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

        // Set up auth state listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth event:', event);
          
          if (event === "SIGNED_IN" && session) {
            await createProfileIfNeeded(session.user);
            await getUserProfile(session.user.id);
            await getSettings();
          }
          
          if (event === "SIGNED_OUT") {
            setUserSession(null);
            setUser(undefined);
            setSettings(null);
          }
        });

        return () => {
          subscription.unsubscribe();
        };
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
  useEffect(() => {
    console.log("user", user);
    console.log("settings", settings);
    console.log("current redirect URL:", getRedirectURL());

    // // Redirect admin user to admin page
    // if (user && user.email === process.env.NEXT_PUBLIC_ADMIN) {
    //   window.location.href = "/admin";
    // }
  }, [user, settings]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      // Redirect to home page after sign out
      window.location.href = "/";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
              redirectTo={getRedirectURL()}
              queryParams={{
                prompt: "select_account",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="my-16 sm:my-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main content */}
              <div className="lg:col-span-3">
                <Profile user={user!} settings={settings!} />
                <Badges user={user!} />
                <button
                  onClick={handleSignOut}
                  className="mt-6 w-full py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-lg"
                >
                  Sign Out
                </button>
              </div>

              {/* Sidebar with member status */}
              <div className="lg:col-span-1">
                {user && <MemberStatus userId={user.id} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}