"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserInterface } from "../profile/page";
import confetti from "canvas-confetti";

export interface Badge {
  id: number;
  name: string;
  image: string;
  emoji: string;
  description: string;
  rarity: string;
}

interface BadgeWithStatus extends Badge {
  opened: boolean;
}

const badgeData: Badge[] = [
  {
    name: "First Event",
    image: "/blur.png", // Path to your badge image
    emoji: "🎉",
    description: "Awarded for attending your first Seva event.",
    id: 1,
    rarity: "epic",
  },
  {
    name: "LeBron James",
    image: "/test/lebron.jpg",
    emoji: "🍆",
    description: "I'm thinking bout the man on the lakers!",
    id: 2,
    rarity: "rare",
  },
  {
    name: "Fundraising Hero",
    image: "/blur.png",
    emoji: "💰",
    description: "Awarded for helping raise over $100 for Akshaya Patra.",
    id: 3,
    rarity: "legendary",
  },
  // Add more badges as needed
];

interface BadgeRevealProps {
  badge: BadgeWithStatus;
  onComplete: () => void;
  onClose: () => void;
}

const badgeEmojis = [
  "🎉",
  "😪",
  "💰",
  "🐘",
  "💫",
  "⭐️",
  "🎁",
  "🤯",
  "💪",
  "💖",
  "🤓",
];
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#34eb64",
  "#e67c19",
  "#1927e6",
  "#c074e3",
];

// Move rarityThemes outside of components so it can be shared
const rarityThemes = {
  epic: {
    bg: "from-purple-800/95 ",
    accent: "purple-200",
    glow: "0 0 100px rgba(147, 51, 234, 0.3)",
  },
  rare: {
    bg: "from-orange-600/95 ",
    accent: "blue-500",
    glow: "0 0 100px rgba(59, 130, 246, 0.3)",
  },
  legendary: {
    bg: "from-blue-400/95 ",
    accent: "blue-500",
    glow: "0 0 100px rgba(234, 179, 8, 0.3)",
  },
};

export default function Badges({ user }: { user: UserInterface }) {
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState<BadgeWithStatus[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeWithStatus | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showingReveal, setShowingReveal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadBadges();
    }
  }, [user?.id]);

  async function loadBadges() {
    setLoading(true);
    try {
      const response = await fetch(`/api/member-badges/${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch badges");
      const data = await response.json();
      setBadges(data.badges);
    } catch (err) {
      console.error("Error loading badges:", err);
    } finally {
      setLoading(false);
    }
  }

  const openBadgeModal = (badge: BadgeWithStatus) => {
    if (!badge.opened) {
      setShowingReveal(true);
      setSelectedBadge(badge);
    } else {
      setSelectedBadge(badge);
      setIsModalOpen(true);
    }
  };

  if (loading) return <div className="p-4">Loading badges...</div>;

  return (
    <div className="w-full my-4">
      <h3 className="text-2xl font-bold bg-yellow-100 w-fit px-4 py-3">
        Badges
      </h3>

      <div className="flex flex-wrap gap-4 bg-yellow-100 p-4">
        {badges.length === 0 ? (
          <p className="text-gray-600 italic p-4">No badges earned yet</p>
        ) : (
          badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => openBadgeModal(badge)}
              className="relative"
            >
              <BadgeCard badge={badge} />
            </div>
          ))
        )}
      </div>

      {/* Badge Reveal Modal */}
      {showingReveal && selectedBadge && (
        <BadgeReveal
          badge={selectedBadge}
          onComplete={async () => {
            // Update the badge status in the database
            try {
              const response = await fetch(
                `/api/member-badges/${user.id}/open`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ badgeId: selectedBadge.id }),
                }
              );

              if (!response.ok)
                throw new Error("Failed to update badge status");

              // Update local state
              setBadges((prevBadges) =>
                prevBadges.map((b) =>
                  b.id === selectedBadge.id ? { ...b, opened: true } : b
                )
              );
            } catch (error) {
              console.error("Error updating badge status:", error);
            }
            setShowingReveal(false);
            setSelectedBadge(null);
          }}
          onClose={() => {
            setShowingReveal(false);
            setSelectedBadge(null);
          }}
        />
      )}

      {/* Regular Badge Modal */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedBadge && (
          <BadgeModal
            badge={selectedBadge}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedBadge(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeWithStatus }) {
  return (
    <div
      className={`
      bg-white p-6 rounded-lg relative cursor-pointer hover:shadow-lg transition-shadow
      ${!badge.opened ? "animate-pulse" : ""}
    `}
    >
      <div className="relative w-[160px] h-[160px]">
        <Image
          src={badge.opened ? badge.image : "/test/chest.jpg"}
          alt={badge.opened ? badge.name : "Mystery Badge"}
          fill
          className={`object-cover rounded-md filter ${
            !badge.opened ? "brightness-100" : "brightness-50"
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center text-8xl">
          {badge.opened ? badge.emoji : ""}
        </div>
      </div>
    </div>
  );
}

function RarityTag({ rarity }: { rarity: string }) {
  const rarityStyles = {
    epic: {
      bg: "bg-gradient-to-r from-purple-600 to-fuchsia-600",
      border: "border-purple-400",
      glow: "0 0 20px rgba(147, 51, 234, 0.6)",
      shadow: "0 2px 10px rgba(147, 51, 234, 0.4)",
      shine:
        "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
    },
    rare: {
      bg: "bg-gradient-to-r from-orange-600 to-orange-600",
      border: "border-orange-400",
      glow: "0 0 20px rgba(59, 130, 246, 0.6)",
      shadow: "0 2px 10px rgba(59, 130, 246, 0.4)",
      shine:
        "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
    },
    legendary: {
      bg: "bg-gradient-to-r from-blue-500 to-blue-500",
      border: "border-yellow-400",
      glow: "0 0 20px rgba(234, 179, 8, 0.6)",
      shadow: "0 2px 10px rgba(234, 179, 8, 0.4)",
      shine:
        "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
    },
  };

  const style = rarityStyles[rarity as keyof typeof rarityStyles];

  return (
    <div
      className={`
        relative
        inline-block
        px-4 py-1.5
        ${style.bg}
        border-2 ${style.border}
        rounded-full
        font-bold
        text-white
        text-sm
        uppercase
        tracking-wider
        transform
        hover:scale-105
        transition-transform
        duration-200
        ${style.shine}
        before:absolute
        before:inset-0
        before:w-full
        before:h-full
        before:animate-shine
        before:duration-1000
        overflow-hidden
        mt-2
      `}
      style={{
        boxShadow: `${style.glow}, ${style.shadow}`,
        textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
      }}
    >
      {rarity}
    </div>
  );
}

function BadgeModal({
  badge,
  onClose,
}: {
  badge: BadgeWithStatus;
  onClose: () => void;
}) {
  const theme = rarityThemes[badge.rarity as keyof typeof rarityThemes];

  return (
    <motion.div
      className={`fixed inset-0 bg-gradient-to-br ${theme.bg} backdrop-blur-sm flex items-center justify-center z-50`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      layoutId="modal"
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 0.6,
      }}
    >
      <div
        className="bg-white/10 backdrop-blur-xl rounded-xl max-w-md w-full mx-4 overflow-hidden"
        style={{
          boxShadow: theme.glow,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
          <div className="p-4 text-center">
            <motion.h3
              className="text-2xl font-semibold text-white"
              layoutId="badge-name"
            >
              {badge.name}
            </motion.h3>
            <motion.div layoutId="badge-rarity">
              <RarityTag rarity={badge.rarity} />
            </motion.div>
          </div>
        </div>

        <div className="p-6 flex justify-center">
          <motion.div className="relative w-72 h-72" layoutId="badge-image">
            <Image
              src={badge.image}
              alt={badge.name}
              fill
              className="object-cover rounded-xl filter brightness-90"
              priority
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-6xl"
              layoutId="badge-emoji"
            >
              {badge.emoji}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white/90 text-lg text-center">
            {badge.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function BadgeReveal({ badge, onComplete, onClose }: BadgeRevealProps) {
  const [stage, setStage] = useState<"tapping" | "revealing" | "revealed">(
    "tapping"
  );
  const [tapCount, setTapCount] = useState(0);
  const requiredTaps = 3; // Number of taps needed to open

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-lg mx-4">
        {stage === "tapping" && (
          <motion.div
            className="text-center"
            initial={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, -1, 1, -1, 0],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.div
              className="relative w-48 h-48 mx-auto mb-6 cursor-pointer"
              animate={{
                scale: 1 + tapCount * 0.5,
                rotate: (-1 * ((tapCount + 1) % 2) + 1) * 5,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
              onClick={() => {
                const newTapCount = tapCount + 1;
                setTapCount(newTapCount);

                // More dynamic confetti with each tap
                confetti({
                  particleCount: 30 + newTapCount * 10,
                  spread: 50 + newTapCount * 5,
                  origin: { y: 0.7 },
                  colors: colors,
                });

                // Shake animation on tap
                const element = document.querySelector(".badge-container");
                element?.classList.add("shake");
                setTimeout(() => element?.classList.remove("shake"), 500);

                if (newTapCount >= requiredTaps) {
                  setStage("revealing");
                  setTimeout(() => {
                    setStage("revealed");
                    triggerConfetti();
                  }, 1000);
                }
              }}
            >
              <motion.div
                className="badge-container rounded-xl shadow-2xl p-8 relative overflow-hidden"
                animate={{
                  backgroundColor: colors[tapCount % colors.length],
                  boxShadow: `0 0 ${20 + tapCount * 10}px ${
                    5 + tapCount * 2
                  }px rgba(255, 255, 255, 0.3)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br"
                  animate={{
                    background: `linear-gradient(to bottom right, 
                      ${colors[Math.floor(Math.random() * colors.length)]}, 
                      ${colors[Math.floor(Math.random() * colors.length)]}
                    )`,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="relative z-10 flex items-center justify-center h-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.5, 1],
                  }}
                >
                  <span className="text-6xl filter drop-shadow-lg">
                    {
                      badgeEmojis[
                        Math.floor(Math.random() * badgeEmojis.length)
                      ]
                    }
                  </span>
                </motion.div>
                {/* Enhanced glowing effect */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.5, 1],
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {stage === "revealing" && (
          <motion.div
            className="text-center"
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: [1, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 1 }}
          >
            <div className="w-48 h-48 mx-auto bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-6xl">✨</span>
            </div>
          </motion.div>
        )}

        {stage === "revealed" && (
          <motion.div
            className={`fixed inset-0 bg-gradient-to-br ${
              rarityThemes[badge.rarity as keyof typeof rarityThemes].bg
            } backdrop-blur-sm flex items-center justify-center z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-md w-full mx-4 text-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <Image
                    src={badge.image}
                    alt={badge.name}
                    fill
                    className="object-cover rounded-xl filter brightness-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-8xl">
                    {badge.emoji}
                  </div>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="sparkles" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {badge.name}
                </h2>
                <RarityTag rarity={badge.rarity} />
                <p className="text-white/90 mt-4 mb-6 max-w-sm">
                  {badge.description}
                </p>
                <button
                  onClick={() => {
                    onComplete();
                    onClose();
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-colors"
                >
                  Awesome!
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
