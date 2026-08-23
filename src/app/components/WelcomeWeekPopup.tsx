'use client'
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const WelcomeWeekPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
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
                fixed inset-0 bg-[#0B1D3A]/75 backdrop-blur-sm z-50
                flex items-center justify-center p-4
                transition-all duration-300
                ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}
            `}
            onClick={handleClose}
        >
            <div
                className={`
                    relative bg-gradient-to-br from-[#F4F0EA] via-[#F9E7D0] to-[#F7F3EE]
                    rounded-[2rem] max-w-3xl w-full max-h-[95vh] overflow-y-auto
                    shadow-[0_25px_80px_rgba(11,29,58,0.35)] transition-all duration-300
                    ${isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#D6A75D]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#BF5700]/20 rounded-full blur-3xl"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 bg-[#0B1D3A]/10 hover:bg-[#0B1D3A]/15 text-[#0B1D3A] rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Close popup"
                >
                    <X size={24} strokeWidth={3} />
                </button>

                <div className="relative z-10 p-6 sm:p-10">
                    <div className="text-center mb-6">
                        <h2 className="text-[#0B1D3A] font-black text-3xl sm:text-5xl tracking-tight">Welcome to Seva!</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#0B1D3A] mb-8">
                        <div className="bg-[#BF5700]/10 backdrop-blur-sm rounded-xl p-4 border border-[#BF5700]/25 hover:bg-[#BF5700]/15 transition-all">
                            <p className="text-[#BF5700] font-semibold text-xs uppercase tracking-wide mb-1">First General Meeting</p>
                            <p className="text-xl sm:text-2xl font-bold">8/31/26</p>
                        </div>

                        <div className="bg-[#0B1D3A]/5 backdrop-blur-sm rounded-xl p-4 border border-[#0B1D3A]/15 hover:bg-[#0B1D3A]/10 transition-all">
                            <p className="text-[#0B1D3A] font-semibold text-xs uppercase tracking-wide mb-1">Get Involved</p>
                            <p className="text-lg sm:text-xl font-bold">First week kickoff</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center mb-8">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfHdrEjMVr3dkT2GrtEZUsvdvHJoDoKTY9TGVTahRHJn4RN1g/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#BF5700] text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-[#A64A00] transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            Seva Interest Form
                        </a>

                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSeBCrT9Hq87pmHwejdbGOn8QK-Gm6cUa_mbn1P1vOlCEBh03Q/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0B1D3A] text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-[#142F5E] transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            Seva Membership Form
                        </a>

                        <button
                            onClick={handleClose}
                            type="button"
                            className="bg-white/80 text-[#0B1D3A] font-semibold text-lg px-8 py-4 rounded-full border-2 border-[#0B1D3A]/15 hover:bg-white transition-all duration-300 w-full sm:w-auto"
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
