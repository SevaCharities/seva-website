"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
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
  "👀",
  "👍",
  "👏",
  "💩",
  "👌",
  "👊",
  "🤖",
  "🫦",
  "🙈",
  "🦄",
  "🍀",
  "🥑",
  "🍆",
  "🍑",
  "🍒",
  "⚽️",
  "🍇",
  "🏏",
  "🍌",
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
export const rarityThemes = {
  epic: {
    bg: "from-purple-900/80 to-indigo-800",
    accent: "from-purple-500 to-fuchsia-500",
    accent2: "oklch(66.7% 0.295 322.15)",
  },
  rare: {
    bg: "from-orange-500/80 to-red-400",
    accent: "from-blue-500 to-cyan-500",
    accent2: "oklch(76.9% 0.188 70.08)",
  },
  legendary: {
    bg: "from-sky-300/80 to-blue-500",
    accent: "from-amber-500 to-yellow-500",
    accent2: "oklch(78.9% 0.154 211.53)",
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

      <div
        className="flex flex-wrap justify-center
       gap-4 bg-yellow-100 p-4"
      >
        🤫🙅‍♂️
        {/* {badges.length === 0 ? (
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
        )} */}
      </div>

      {/* Badge Reveal Modal */}
      {showingReveal && selectedBadge && (
        <BadgeReveal
          badge={selectedBadge}
          onComplete={async () => {
            // Update the badge status in the database
            try {
              const response = await fetch(`/api/member-badges/${user.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ badge_id: selectedBadge.id }),
              });

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
  const theme = rarityThemes[badge.rarity as keyof typeof rarityThemes];

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
        {badge.opened && (
          <div
            className={`absolute inset-0 rounded-md mix-blend-overlay  bg-gradient-to-br ${
              rarityThemes[badge.rarity as keyof typeof rarityThemes].bg
            }`}
          />
        )}
      </div>
    </div>
  );
}

export function RarityTag({ rarity, size }: { rarity: string; size?: string }) {
  const theme = rarityThemes[rarity as keyof typeof rarityThemes];

  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], { clamp: false });
  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, ${theme.accent2},#fff, ${theme.accent2})`;
  });
  return (
    <div className="relative w-fit">
      <motion.div
        className={`relative z-10 text-xs text-white bg-gradient-to-r  ${
          theme.bg
        }  ${
          size === "xs" ? "px-2 py-1" : "px-6 py-1.5 uppercase tracking-wider"
        } rounded-full font-bold text-center uppercase`}
      >
        {rarity}
      </motion.div>
      {size !== "xs" && (
        <motion.div
          className="absolute -inset-1 rounded-full"
          style={{
            background: rotatingBg,
          }}
        ></motion.div>
      )}
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
  const [tap, setTap] = useState(false);
  const animationFrameId = useRef<number>();

  const triggerSnow = (theme: any) => {
    let skew = 1;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    (function frame() {
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 2,
        startVelocity: 0,
        ticks: 300,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff", "#f5d889"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.5, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      animationFrameId.current = requestAnimationFrame(frame);
    })();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (badge.rarity === "legendary") {
      triggerSnow(theme);
    } else {
      triggerConfetti();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

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
        bounce: 0.5,
        duration: 1,
      }}
    >
      <div
        className="bg-white backdrop-blur-xl rounded-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-gray-200">
          <div className="p-4 text-center flex flex-col justify-center items-center">
            <motion.h3
              className="text-2xl font-semibold "
              layoutId="badge-name"
            >
              {badge.name}
            </motion.h3>
          </div>
        </div>

        <div className="p-6 flex justify-center">
          <motion.div
            className="relative w-72 h-72 md:w-96 md:h-96"
            layoutId="badge-image"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              setTap(!tap);
              triggerConfetti();
            }}
          >
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
              {tap ? badge.emoji : ""}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="px-6 pb-8 flex flex-col items-center gap-4 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-center">{badge.description}</p>
          <RarityTag rarity={badge.rarity} />
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
            <div
              className={`w-48 h-48 mx-auto bg-gradient-to-br ${
                rarityThemes[badge.rarity as keyof typeof rarityThemes].bg
              } backdrop-blur-sm  rounded-xl flex items-center justify-center`}
            >
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
                <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-6">
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
