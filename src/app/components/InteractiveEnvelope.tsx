'use client';
import Link from "next/link";
import { useState } from "react";
import { UpcomingEventsProps } from "../upcoming/page";

const UpcomingEventsColors = [
  "",
  "bg-blue-200",
  "bg-green-200",
  "bg-red-200",
  "bg-yellow-200",
  "bg-indigo-400",
  "bg-sky-300",
  "bg-rose-400",
  "bg-gradient-to-r from-yellow-300 via-pink-400 via-purple-300 to-blue-500"
];

const InteractiveEnvelope = ({ title, category, date, description, link }: UpcomingEventsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  
  const handleEnvelopeClick = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      
      setTimeout(() => {
        setIsOpen(!isOpen);
        setTimeout(() => {
          setIsFlipping(false);
        }, 500);
      }, 100);
    }
  };

  return (
    <div 
      className="w-full h-full perspective-1000 cursor-pointer"
      onClick={handleEnvelopeClick}
    >
      <div 
        className={`
          relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d
          ${isFlipping ? 'scale-105' : 'scale-100'}
        `}
      >
        <div 
          className={`
            absolute w-full h-full backface-hidden rounded-lg border-2 border-gray-300
            bg-gradient-to-br from-amber-100 to-amber-200 shadow-md
            flex flex-col items-center justify-center 
            transition-opacity duration-500
            ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <div className="absolute top-0 left-0 w-full h-1/3 bg-amber-300 rounded-t-lg"
               style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)' }} />
          
          <div className="absolute top-1/3 left-0 w-1/4 h-2/3 bg-amber-200"
               style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%, 0 0)' }} />
          <div className="absolute top-1/3 right-0 w-1/4 h-2/3 bg-amber-200"
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }} />
          
          <div className="text-center z-10 px-4 py-2 mt-6">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-2xl font-bold text-orange-800 leading-tight">{title}</h3>
            <p className="mt-4 text-lg text-orange-700">Tap to open</p>
          </div>
        </div>

        <div 
          className={`
            absolute w-full h-full backface-hidden rounded-lg
            ${UpcomingEventsColors[category]} p-6
            transition-opacity duration-500
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          style={{ opacity: description && isOpen ? 0.85 : (isOpen ? 1 : 0) }}
        >
          <div className="flex flex-col space-y-3">
          <h1 className="text-3xl font-semibold leading-snug">
            {title}
          </h1>
            {description && (
              <p className="text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <div className="text-right text-lg space-y-1 mt-6">
            <p>{date[0]}</p>
            <p>{date[1]}</p>
            {date[2] && <p>{date[2]}</p>}
          </div>
          
          {link && link[1] && (
            <a
              href={link[0]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-4 text-xl inline-block bg-orange-500 text-white text-center font-semibold px-4 py-2 
              rounded-full hover:bg-orange-600 transition absolute left-1/2 -translate-x-1/2 bottom-12"
            >
              RSVP Now 
            </a>
          )}

          <button 
            className="absolute bottom-4 right-4 bg-white/60 hover:bg-white px-3 py-1 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              handleEnvelopeClick();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveEnvelope;