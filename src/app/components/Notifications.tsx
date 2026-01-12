"use client";

import { Bell } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export type Notification = {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  link?: string | null;
};

export default function Notifications() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Member status
  useEffect(() => {
    let cancelled = false;

    const fetchStatus = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const userId = data.session?.user?.id;

        if (!userId) {
          if (!cancelled) setIsMember(false);
          return;
        }

        const res = await fetch(`/api/member-status?userId=${userId}`);
        if (!res.ok) {
          if (!cancelled) setIsMember(false);
          return;
        }

        const json = await res.json();
        if (!cancelled) setIsMember(Boolean(json.is_member));
      } catch (err) {
        console.error("Member fetch error:", err);
        if (!cancelled) setIsMember(false);
      }
    };

    fetchStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (isMember !== true) return;

    const fetchNotifications = async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user?.id;
      if (!userId) return;

      const { data: notifs, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch notifications error:", error);
        return;
      }

      const arr = (notifs ?? []) as Notification[];
      setNotifications(arr);
      setUnreadCount(arr.filter((n) => !n.read).length);
    };

    fetchNotifications();
  }, [isMember]);

  // Click outside closes dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((v) => !v);

  const markOneAsRead = async (notifId: string) => {
    const notif = notifications.find((n) => n.id === notifId);
    if (!notif || notif.read) return;

    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));

    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notifId)
      .eq("user_id", userId);

    if (error) {
      console.error("markOneAsRead DB error:", error);
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      const arr = (notifs ?? []) as Notification[];
      setNotifications(arr);
      setUnreadCount(arr.filter((n) => !n.read).length);
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);

    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);

    if (error) {
      console.error("markAllAsRead DB error:", error);
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      const arr = (notifs ?? []) as Notification[];
      setNotifications(arr);
      setUnreadCount(arr.filter((n) => !n.read).length);
    }
  };

  const deleteNotification = async (notifId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const wasUnread = notifications.find((n) => n.id === notifId)?.read === false;
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    if (wasUnread) {
      setUnreadCount((c) => Math.max(0, c - 1));
    }

    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notifId)
      .eq("user_id", userId);

    if (error) {
      console.error("deleteNotification DB error:", error);
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      const arr = (notifs ?? []) as Notification[];
      setNotifications(arr);
      setUnreadCount(arr.filter((n) => !n.read).length);
    }
  };

  const clearAllNotifications = async () => {
    setNotifications([]);
    setUnreadCount(0);

    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("clearAllNotifications DB error:", error);
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      const arr = (notifs ?? []) as Notification[];
      setNotifications(arr);
      setUnreadCount(arr.filter((n) => !n.read).length);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);

    const diffMs = now.getTime() - then.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return then.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  };

  if (isMember !== true) return null;

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="relative cursor-pointer hover:opacity-80 transition-opacity py-2"
          aria-label="Notifications"
        >
          <Bell size={24} color="white" weight="bold" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <h5 className="font-semibold text-gray-800">Notifications</h5>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowClearDialog(true);
                    }}
                    className="text-xs text-red-600 hover:text-red-800 hover:underline font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {notifications.length > 0 ? (
                notifications.map((notif) => {
                  const rowClass = `p-3 transition-colors ${
                    notif.read 
                      ? "hover:bg-gray-50" 
                      : "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500"
                  }`;

                  if (notif.link) {
                    return (
                      <div key={notif.id} className="relative group">
                        <Link
                          href={notif.link}
                          onClick={async (e) => {
                            e.preventDefault();
                            await markOneAsRead(notif.id);
                            setIsOpen(false);
                            router.push(notif.link as string);
                          }}
                        >
                          <div className={`${rowClass} cursor-pointer pr-8`}>
                            <div className="flex items-start justify-between">
                              <h6 className={`text-sm ${notif.read ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}>
                                {notif.title}
                              </h6>
                              {!notif.read && (
                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{formatTimestamp(notif.created_at)}</p>
                          </div>
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => deleteNotification(notif.id, e)}
                          className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                          aria-label="Delete notification"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={notif.id} className="relative group">
                      <div
                        className={`${rowClass} cursor-pointer pr-8`}
                        onClick={() => markOneAsRead(notif.id)}
                      >
                        <div className="flex items-start justify-between">
                          <h6 className={`text-sm ${notif.read ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}>
                            {notif.title}
                          </h6>
                          {!notif.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{formatTimestamp(notif.created_at)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => deleteNotification(notif.id, e)}
                        className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                        aria-label="Delete notification"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p className="text-sm">No notifications</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Custom Clear All Dialog */}
      {showClearDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]"
          onClick={() => setShowClearDialog(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Clear All Notifications?
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              This will permanently delete all <span className="font-semibold">{notifications.length}</span> notification{notifications.length !== 1 ? 's' : ''}. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowClearDialog(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAllNotifications();
                  setShowClearDialog(false);
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}