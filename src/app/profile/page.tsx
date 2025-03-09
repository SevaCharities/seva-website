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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (_event === "SIGNED_IN") {
        toast.success("Successfully signed in!");
        const user = session?.user;

        if (user) {
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

            if (error) {
              toast.error("Error creating profile");
            } else {
              toast.success("Profile created successfully!");
            }
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
    }
  };

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
              redirectTo="http://localhost:3000/profile"
            />
          </div>
        </div>
      ) : (
        <div className="my-16 sm:my-24">
          <div className=" mx-auto">
            <ProfileForm  />
            <button
              onClick={handleSignOut}
              className="mt-6 w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
