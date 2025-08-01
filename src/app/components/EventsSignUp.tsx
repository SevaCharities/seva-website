import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-hot-toast";

export default function EventSignUp({ userId }: { userId: string }) {
  const [events, setEvents] = useState<any[]>([]);
  const [signedUp, setSignedUp] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        toast.error("Error fetching events");
      } else {
        setEvents(data || []);
      }
    };

    const fetchSignups = async () => {
      const { data } = await supabase
        .from("event_signups")
        .select("event_id")
        .eq("user_id", userId);
      setSignedUp(data?.map((d) => d.event_id) || []);
    };

    fetchEvents();
    fetchSignups();
  }, [userId]);

  const signUp = async (event_id: string) => {
    const { error } = await supabase.from("event_signups").insert({
      user_id: userId,
      event_id,
    });

    if (error) {
      toast.error("Already signed up or error occurred.");
    } else {
      setSignedUp((prev) => [...prev, event_id]);
      toast.success("Signed up successfully!");
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Events</h3>
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{event.name}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
            <button
              onClick={() => signUp(event.id)}
              disabled={signedUp.includes(event.id)}
              className={`px-4 py-2 rounded-lg text-white ${
                signedUp.includes(event.id)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {signedUp.includes(event.id) ? "Signed Up" : "Sign Up"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
