'use client'
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const SaanjPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isDismissedForever, setIsDismissedForever] = useState(false);

    useEffect(() => {
        // Show the popup after 0.5 seconds if not permanently dismissed
        if (!isDismissedForever) {
            setTimeout(() => {
                setIsOpen(true);
            }, 500);
        }
    }, [isDismissedForever]);

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

    // Close on Esc key as well.
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

    if (!isOpen) {
        return null;
    }

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
                    relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 
                    rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto 
                    shadow-2xl transition-all duration-300
                    ${isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
                
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Close popup"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                {/* Content */}
                <div className="relative z-10 p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
                        <span className="text-4xl sm:text-5xl animate-bounce">💃🏽</span>
                        <h2 className="text-white font-bold text-3xl sm:text-5xl">Saanj 2025</h2>
                        <span className="text-4xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
                    </div>
                    
                    <h3 className="text-yellow-200 font-semibold text-xl sm:text-3xl mb-6 text-center sm:text-left">
                        Across the States!
                    </h3>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-white/30 mb-6">
                        <p className="text-white text-base sm:text-xl font-medium leading-relaxed">
                            Take a trip across the beautiful states of India! Watch amazing performances 
                            from UT performing arts teams and enjoy catered Indian food! Join us for our 
                            biggest and greatest event of the year!
                        </p>
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-white mb-8">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-1 border border-white/40 hover:bg-white/30 transition-all">
                            <p className="text-yellow-200 font-semibold text-sm uppercase tracking-wide mb-1">📅 Date</p>
                            <p className="text-xl sm:text-2xl font-bold">October 24th</p>
                        </div>
                        
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-1 border border-white/40 hover:bg-white/30 transition-all">
                            <p className="text-yellow-200 font-semibold text-sm uppercase tracking-wide mb-1">⏰ Time</p>
                            <p className="text-xl sm:text-2xl font-bold">5 - 8 P.M.</p>
                        </div>
                        
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-1 border border-white/40 hover:bg-white/30 transition-all">
                            <p className="text-yellow-200 font-semibold text-sm uppercase tracking-wide mb-1">📍 Location</p>
                            <p className="text-xl sm:text-2xl font-bold">WCP Ballroom</p>
                        </div>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="https://forms.gle/vFJ4KjtmJAkgbirL8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-orange-600 font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            Get Tickets Now! 🎫
                        </a>
                        
                        <button
                            onClick={handleClose}
                            type="button"
                            className="bg-white/20 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-full border-2 border-white/40 hover:bg-white/30 transition-all duration-300 w-full sm:w-auto"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );   
}

export default SaanjPopup;