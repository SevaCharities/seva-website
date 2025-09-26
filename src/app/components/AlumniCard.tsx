"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion"; 

export type AlumniProps = {
    name: string;
    email: string;
    phone?: string;
    gradYear: number;
    bio: string;
    link?: string;
};

const Card = ({ info }: { info: AlumniProps }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const nameParts = info.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    
    const handleInteraction = () => setIsFlipped(!isFlipped);
    
    return (
        <motion.div
            className="relative flex flex-col w-64 sm:w-72 h-[400px] sm:h-[420px] hover:cursor-pointer"
            onClick={handleInteraction}
        >
            <div className="relative w-full h-48 sm:h-56">
                <Image
                    src={`/alumni/${info.name}.jpeg`}
                    alt={info.name}
                    layout="fill"
                    className="rounded-t-xl object-cover"
                />
            </div>
      
            <div className="bg-white rounded-b-xl shadow-md px-4 py-3 flex-1 text-center flex flex-col items-center justify-start space-y-1">
                <h2 className="text-xl sm:text-3xl font-semibold text-orange-600">
                    {firstName} {lastName}
                </h2>
                <p className="text-lg text-gray-900 font-medium">
                    🎓 Class of {info.gradYear}
                </p>
                <p className="text-base sm:text-md text-orange-600 font-medium leading-tight">
                    📧 {info.email}
                </p>
                {info.phone && (
                    <p className="text-base text-gray-900">
                        📱 {info.phone}
                    </p>
                )}
                {info.link && (
                    <a 
                        href={info.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => e.stopPropagation()}
                        onMouseLeave={(e) => e.stopPropagation()}
                    >
                        <Image 
                            src="/linkedin_logo.png"
                            alt="Linkedin Logo"
                            height={56}
                            width={56}
                        />
                    </a>
                )}
                <div className="mt-2 pt-2 border-t-2 border-dashed border-orange-600 w-full">
                    <p className="text-sm text-gray-900 font-medium">
                        Click here to read the bio! 🤘
                    </p>
                </div>
            </div>
      
            {isFlipped && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 rounded-xl bg-white text-black w-full h-full flex justify-center items-center text-xs sm:text-sm px-4 py-3 z-10 shadow-xl"
                >
                    <div className="overflow-y-auto max-h-full text-center">
                        {info.bio}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default Card;