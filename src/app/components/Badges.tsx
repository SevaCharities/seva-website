"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserInterface } from "../profile/page";

// Assume your badge type includes these properties
export interface Badge {
  id?: number;
  name: string;
  image: string;
  emoji: string;
  description: string; // Make sure this exists in your badge data
}

const badgeData: Badge[] = [
  {
    name: "First Event",
    image: "/blur.png", // Path to your badge image
    emoji: "🎉",
    description: "Awarded for attending your first Seva event.",
  },
  {
    name: "LeBron James",
    image: "/test/lebron.jpg",
    emoji: "🍆",
    description: "I'm thinking bout the man on the lakers!",
  },
  {
    name: "Fundraising Hero",
    image: "/blur.png",
    emoji: "💰",
    description: "Awarded for helping raise over $100 for Akshaya Patra.",
  },
  // Add more badges as needed
];

export default function Badges({ user }: { user: UserInterface }) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  useEffect(() => {

    // Define the function outside the if block to fix the strict mode error
    async function loadBadges() {
      setLoading(true);
      try {
        const badgeData = await fetchMemberBadges(user.id);
        setBadges(badgeData);
      } catch (err) {
        console.error("Error loading badges:", err);
        setError("Failed to load badges");
      } finally {
        setLoading(false);
      }
    }

    // Only fetch badges if user exists and there are no initial badges provided
    if (user?.id) {
        loadBadges();
    }
  }, [user?.id]);

  const openBadgeModal = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function fetchMemberBadges(memberId: string) {
    const response = await fetch(`/api/member-badges/${memberId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch badges");
    }

    const data = await response.json();
    console.log(data);
    return data.badges; // Array of badge objects
  }

  if (loading) return <div className="p-4">Loading badges...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full my-4">
      <h3 className="text-2xl font-bold bg-yellow-100 w-fit px-4 py-3 ">
        Badges
      </h3>

      <div className="flex flex-wrap gap-4 bg-yellow-100 p-4">
        {badges.length === 0 ? (
          <p className="text-gray-600 italic p-4">No badges earned yet</p>
        ) : (
          badges.map((badge) => (
            <BadgeCard
              key={badge.name}
              badge={badge}
              openBadgeModal={openBadgeModal}
            />
          ))
        )}
      </div>

      {/* Improved Modal with blur effect */}
      <AnimatePresence>
        {isModalOpen && selectedBadge && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="relative border-b border-gray-100">
                <button
                  onClick={closeModal}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-semibold p-4">
                  {selectedBadge.name}
                </h3>
              </div>

              {/* Badge image and emoji */}
              <div className="p-6 flex justify-center">
                <div className="relative w-72 h-72">
                  {selectedBadge.image && (
                    <Image
                      src={selectedBadge.image}
                      alt={selectedBadge.name}
                      fill
                      className="object-cover filter brightness-50"
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {selectedBadge.emoji}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="px-6 pb-8">
                <p className="text-gray-700 text-lg text-center">
                  {selectedBadge.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BadgeCard({
  badge,
  openBadgeModal,
}: {
  badge: Badge;
  openBadgeModal: (badge: Badge) => void;
}) {
  return (
    <div
      key={badge.name}
      className="bg-white p-6 rounded-lg relative cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => openBadgeModal(badge)}
    >
      <div className="relative w-[160px] h-[160px]">
        <Image
          src={badge.image}
          alt={badge.name}
          fill
          className="object-cover rounded-md filter brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {badge.emoji}
        </div>
      </div>
    </div>
  );
}
