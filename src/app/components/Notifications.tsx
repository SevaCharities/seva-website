"use client";

import { Bell } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

export type NotificationsProps = {
    id: string;
    title: string;
    created_at: Date; // Changed from timestamp to created_at
    message: string;
    read: boolean;
    link?: Url;
};

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationsProps[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isMember, setIsMember] = useState<boolean | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ON MOUNT: Fetch user member status (similar to Navbar pattern)
    useEffect(() => {
        let cancelled = false;
        const fetchStatus = async () => {
          try {
            const {
              data: { session },
            } = await supabase.auth.getSession();
    
            const userId = session?.user?.id;
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
            console.error("Navbar member fetch error:", err);
            if (!cancelled) setIsMember(false);
          }
        };
    
        fetchStatus();
        return () => {
          cancelled = true;
        };
    }, []);

    // ON MOUNT: Fetch notifications from database/API
    useEffect(() => {
        if (isMember === null) {
            return; // Wait for member status.
        }
        if (!isMember) {
            return; // If non-member, no notif.
        }
        const fetchNotifications = async () => {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                const userId = session?.user?.id;
                console.log("🔍 YOUR USER ID:", userId);

                if (!userId) {
                    return;
                }

                const { data, error } = await supabase
                    .from("notifications")
                    .select("*")
                    .eq("user_id", userId)
                    .order("created_at", { ascending: false }); // Changed from timestamp to created_at
                
                if (error) {
                    console.error("Error fetching notifications:", error);
                    return;
                }
                
                if (data) {
                    setNotifications(data);
                    setUnreadCount(data.filter(n => !n.read).length);
                }

            } catch (err) {
                console.error("Notification fetch error:", err);
            }
        };
        fetchNotifications();
    }, [isMember]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(
                event.target as Node)) {
                    setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            markAllAsRead();
        }
    };

    const markAllAsRead = async () => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const userId = session?.user?.id;
            if (!userId) {
                return;
            }

        await supabase
            .from("notifications")
            .update({ read: true })
            .eq("user_id", userId)
            .eq("read", false );

        setNotifications(notifications.map(n => ({...n, read: true})));
        setUnreadCount(0);

        } catch (err) {
            console.error("Marking all as read error");
        }
    };

    const formatTimestamp = (timestamp: Date | string) => {
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
        
        return then.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        });
    };

    // Add this early return
    if (isMember === null || !isMember) {
        return null; // Don't render anything if not a member.
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button 
                onClick={toggleDropdown}
                className="relative cursor-pointer hover:opacity-80 transition-opacity py-2"
            >
                <Bell size={24} color="white" weight="bold" />
                
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>
    
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                    
                    <div className="p-3 border-b border-gray-200">
                        <h5 className="font-semibold text-gray-800">Notifications</h5>
                    </div>
    
                    <div className="divide-y divide-gray-100">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div key={notif.id}>
                                    {notif.link ? (
                                        <Link href={notif.link as string} onClick={() => setIsOpen(false)}>
                                            <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                                                <h6 className="font-medium text-gray-900 text-sm">{notif.title}</h6>
                                                <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                                                <p className="text-[10px] text-gray-400 mt-1">
                                                    {formatTimestamp(notif.created_at)}
                                                </p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="p-3 hover:bg-gray-50">
                                            <h6 className="font-medium text-gray-900 text-sm">{notif.title}</h6>
                                            <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {formatTimestamp(notif.created_at)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p className="text-sm">No notifications</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}