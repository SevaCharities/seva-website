'use client'
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const WelcomeWeekPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const hasShownRef = useRef(false);

    useEffect(() => {
        if (hasShownRef.current) return;

        const popupAlreadySeen = window.sessionStorage.getItem("seva-welcome-popup-seen") === "true";
        if (popupAlreadySeen) {
            hasShownRef.current = true;
            return;
        }

        hasShownRef.current = true;
        window.sessionStorage.setItem("seva-welcome-popup-seen", "true");

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

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
                fixed inset-0 bg-[#102A43]/80 backdrop-blur-sm z-50
                flex items-center justify-center p-4
                transition-all duration-300
                ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}
            `}
            onClick={handleClose}
        >
            <div
                className={`
                    relative bg-[#FFF9F0] font-serif text-[#17324D]
                    rounded-[2rem] max-w-3xl w-full max-h-[95vh] overflow-y-auto
                    shadow-[0_25px_80px_rgba(16,42,67,0.4)] transition-all duration-300
                    ${isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F2B880]/25 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#78B8B0]/20 rounded-full blur-3xl"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 bg-[#17324D]/10 hover:bg-[#17324D]/20 text-[#17324D] rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Close popup"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <div className="relative z-10 p-6 sm:p-10">
                    <div className="text-center mb-6">
                        <p className="font-sans text-[#C94C35] font-bold text-xs uppercase tracking-[0.2em] mb-3">UT Seva Charities</p>
                        <h2 className="text-[#17324D] font-bold text-4xl sm:text-6xl tracking-tight">Welcome to Seva!</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#17324D] mb-8 font-sans">
                        <div className="bg-[#FCE7DE] rounded-xl p-4 border border-[#E8B3A5] hover:bg-[#F9DDD1] transition-all">
                            <p className="text-[#A63D2D] font-bold text-xs uppercase tracking-wide mb-1">Second Interest Meeting</p>
                            <p className="text-xl sm:text-2xl font-bold">9/8/26 - UTC 4.102</p>
                        </div>

                        <div className="bg-[#E1F1EE] rounded-xl p-4 border border-[#A8D1CA] hover:bg-[#D6EBE7] transition-all">
                            <p className="text-[#176B63] font-bold text-xs uppercase tracking-wide mb-1">Get Involved</p>
                            <p className="text-lg sm:text-xl font-bold">Click the links to learn more</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center mb-8">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfHdrEjMVr3dkT2GrtEZUsvdvHJoDoKTY9TGVTahRHJn4RN1g/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#C94C35] text-white font-sans font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-[#A63D2D] transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            Seva Interest Form
                        </a>

                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSd2OZ_HJCtpOtAZdp6giL9IneGougQuR2RaSnG9ZnsaXYO79A/viewform?usp=header"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#17324D] text-white font-sans font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-[#102A43] transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            Seva Membership Form
                        </a>

                        <button
                            onClick={handleClose}
                            type="button"
                            className="bg-white/80 text-[#17324D] font-sans font-semibold text-lg px-8 py-4 rounded-full border-2 border-[#17324D]/20 hover:bg-white transition-all duration-300 w-full sm:w-auto"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeWeekPopup;
