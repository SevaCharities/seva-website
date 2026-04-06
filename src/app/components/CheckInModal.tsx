"use client";
import { useState } from "react";

interface CheckInModalProps {
  onClose: () => void;
  onSubmit: (data: CheckInData) => Promise<void>;
}

export interface CheckInData {
  secretCode: string;
}

export default function CheckInModal({ onClose, onSubmit }: CheckInModalProps) {
  const [secretCode, setSecretCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [feedbackFormUrl, setFeedbackFormUrl] = useState<string | null>(null);
  const [codeError, setCodeError] = useState("");
  const [checkingCode, setCheckingCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleUnlock = async () => {
    if (!secretCode.trim()) {
      setCodeError("Enter the code from the whiteboard.");
      return;
    }
    setCheckingCode(true);
    try {
      const res = await fetch("/api/check-ins/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret_code: secretCode.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setCodeError("Wrong code — check the whiteboard and try again.");
      } else {
        setFeedbackFormUrl(json.feedback_form_url ?? null);
        setUnlocked(true);
        setCodeError("");
      }
    } catch {
      setCodeError("Something went wrong. Try again.");
    } finally {
      setCheckingCode(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {!unlocked ? (
          <>
            <h2 className="text-xl font-semibold mb-1">Check In</h2>
            <p className="text-sm text-gray-500 mb-5">
              Enter the code on the whiteboard to check in.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value={secretCode}
                onChange={(e) => {
                  setSecretCode(e.target.value);
                  setCodeError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="Enter code"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                maxLength={50}
                autoFocus
              />
              {codeError && (
                <p className="text-red-500 text-xs mt-1">{codeError}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlock}
                disabled={checkingCode}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {checkingCode ? "Checking..." : "Unlock"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-1">You're checked in!</h2>
            <p className="text-sm text-gray-500 mb-5">
              {feedbackFormUrl
                ? "Fill out the feedback form while you're here — it only takes a minute."
                : "Thanks for coming!"}
            </p>
            {feedbackFormUrl && (
              <a
                href={feedbackFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-3"
              >
                Open Feedback Form
              </a>
            )}
            <button
              onClick={async () => {
                setSubmitting(true);
                try {
                  await onSubmit({ secretCode: secretCode.trim() });
                } finally {
                  setSubmitting(false);
                }
              }}
              disabled={submitting}
              className="w-full px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Done"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}