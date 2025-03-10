"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import ProfileForm from "../components/ProfileForm";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract the profile creation logic into a separate function
  const createProfileIfNeeded = async (user: any) => {
    try {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        const { error } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name: user.user_metadata?.full_name || "",
            email: user.email,
          },
        ]);
        console.log("Profile created successfully!");
        console.log(error);
        if (error) {
          toast.error("Error creating profile");
        } else {
          toast.success("Profile created successfully!");
        }
      }
    } catch (error) {
      console.error("Error checking/creating profile:", error);
      toast.error("Error with profile setup");
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First, get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        // If we have a session, check/create profile
        if (session?.user) {
          await createProfileIfNeeded(session.user);
        }

        // Set up auth state change listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
          setSession(session);

          if (_event === "SIGNED_IN") {
            toast.success("Successfully signed in!");
            if (session?.user) {
              await createProfileIfNeeded(session.user);
            }
          }
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Auth initialization error:", error);
        toast.error("Authentication error");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
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
      {!session ? (
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
            <ProfileForm />
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
