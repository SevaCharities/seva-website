'use client'
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const SevaSipsPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Lock body scroll when popup is open.
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close on Esc key.
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
            return () => window.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsAnimatingOut(false);
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div
            className={`
                fixed inset-0 bg-black/70 backdrop-blur-sm z-50 
                flex items-center justify-center p-4
                transition-all duration-300
                ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}
            `}
            onClick={handleClose}
        >
            <div
                className={`
                    relative bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200
                    rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto 
                    shadow-2xl transition-all duration-300
                    ${isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300 rounded-full opacity-20 blur-3xl"></div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 bg-orange-800/20 hover:bg-orange-800/30 text-orange-900 rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Close popup"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-10">
                    {/* Flyer Image */}
                    <div className="rounded-2xl overflow-hidden shadow-xl mb-6 border-4 border-orange-300/60">
                        <img
                            src="/seva-sips-flyer.jpg"
                            alt="Seva Sips Pop-Up Flyer"
                            className="w-full object-cover"
                        />
                    </div>

                    {/* Description */}
                    <div className="bg-orange-800/10 backdrop-blur-sm rounded-2xl p-5 border-2 border-orange-300/40 mb-6">
                        <p className="text-orange-900 text-base sm:text-lg font-medium leading-relaxed text-center">
                            Come sip, snack, and support a good cause! ☕🍵 
                            All proceeds benefit <span className="font-bold">Akshaya Patra</span> — 
                            join us for our first-ever pop-up fundraiser!
                        </p>
                    </div>

                    {/* Event Details */}
                    <div className="flex flex-col sm:flex-row gap-4 text-orange-900 mb-8">
                        <div className="bg-orange-800/10 backdrop-blur-sm rounded-xl p-4 flex-1 border border-orange-300/50 hover:bg-orange-800/20 transition-all">
                            <p className="text-orange-700 font-semibold text-xs uppercase tracking-wide mb-1">📅 Date</p>
                            <p className="text-xl sm:text-2xl font-bold">March 8th</p>
                        </div>

                        <div className="bg-orange-800/10 backdrop-blur-sm rounded-xl p-4 flex-1 border border-orange-300/50 hover:bg-orange-800/20 transition-all">
                            <p className="text-orange-700 font-semibold text-xs uppercase tracking-wide mb-1">⏰ Time</p>
                            <p className="text-xl sm:text-2xl font-bold">10am – 2pm</p>
                        </div>

                        <div className="bg-orange-800/10 backdrop-blur-sm rounded-xl p-4 flex-1 border border-orange-300/50 hover:bg-orange-800/20 transition-all">
                            <p className="text-orange-700 font-semibold text-xs uppercase tracking-wide mb-1">💚 Benefiting</p>
                            <p className="text-lg sm:text-xl font-bold">Akshaya Patra</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://partiful.com/e/Q1tWijpbJP6pQlFurV95"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-orange-700 text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:bg-orange-800 transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            RSVP Now! 🎟️
                        </a>

                        <button
                            onClick={handleClose}
                            type="button"
                            className="bg-orange-800/10 text-orange-900 font-semibold text-lg px-8 py-4 rounded-full border-2 border-orange-400/40 hover:bg-orange-800/20 transition-all duration-300 w-full sm:w-auto"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SevaSipsPopup;