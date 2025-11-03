'use client';
import { useState } from "react";
import { Merch } from "../merch/page";
import Image from "next/image";

export const MerchTile = ({ m }: { m: Merch }) => {
  const [isFront, setIsFront] = useState(true);

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-100/50 hover:-translate-y-2">
      <div
        className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50/30 cursor-pointer"
        onMouseEnter={() => setIsFront(false)}
        onMouseLeave={() => setIsFront(true)}
      >
        <Image
          src={m.image[0]}
          alt={`${m.name} - Front`}
          fill
          className={`object-contain p-8 transition-all duration-700 ${
            isFront ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
        <Image
          src={m.image.length > 1 ? m.image[1] : m.image[0]}
          alt={`${m.name} - Back`}
          fill
          className={`object-contain p-8 transition-all duration-700 absolute inset-0 ${
            isFront ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        />
        {m.image.length > 1 && (
          <div className={`absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity duration-300 ${
            isFront ? "opacity-100" : "opacity-0"
          }`}>
            ✨ Hover me
          </div>
        )}
      </div>
      
      <div className="flex flex-col p-7 flex-grow space-y-4">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors duration-300">
            {m.name}
          </h3>
          <div className="inline-flex items-baseline space-x-1">
            <span className="text-4xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              ${m.price}
            </span>
            <span className="text-sm font-medium text-gray-500">USD</span>
          </div>
        </div>
        
        <a
          href={m.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-size-200 hover:bg-pos-100 text-white font-bold py-4 px-6 rounded-2xl text-center transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>Buy Now</span>
            <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        </a>
      </div>
    </div>
  );
};