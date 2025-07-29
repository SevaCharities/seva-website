'use client';

import React from "react";
import { GMProps } from "../general-meetings/page";

const gradients = [
  "bg-gradient-to-br from-orange-300 to-pink-400",
  "bg-gradient-to-br from-cyan-300 to-blue-500",
  "bg-gradient-to-br from-green-300 to-teal-500",
  "bg-gradient-to-br from-yellow-300 to-orange-500",
  "bg-gradient-to-br from-purple-300 to-fuchsia-500",
];

const GMCard = ({ meeting, slides, date, upcoming }: GMProps) => {
  const gradientClass = gradients[(meeting - 1) % gradients.length];

  return (
    <div
      className={`relative flex-shrink-0 w-80 sm:w-[22rem] rounded-xl p-6 shadow-lg text-gray-900 ${gradientClass} ${
        upcoming ? "animate-pulse ring-4 ring-orange-300" : ""
      }`}
      style={{
        opacity: upcoming ? 0.85 : 1,
        height: "60vh",
        maxHeight: "720px",
      }}
    >
      <div className="pointer-events-none absolute bottom-4 right-4 text-8xl opacity-25 select-none">
        🐘
      </div>

      <div className="flex flex-col justify-between h-full relative z-10">
        <span className="inline-block bg-orange-600 text-white px-5 py-2 rounded-full text-3xl shadow mb-6">
          GM {meeting}
        </span>

        <h1 className="text-5xl mb-6 text-gray-900">
          General Meeting <span className="text-gray-900">#{meeting}</span>
        </h1>

        {slides && (
          <div className="flex justify-center m-12">
            <a
              href={slides}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-cyan-500 transition"
            >
              View Slides
            </a>
          </div>
        )}

        <div className="mt-auto border-l-4 border-orange-500 pl-4">
          <p className="text-sm font-bold">{date[0]}</p>
          <p className="text-sm text-gray-900">{date[1]}</p>
          {date[2] && <p className="text-sm text-gray-800">{date[2]}</p>}
          {upcoming && (
            <p className="text-sm font-semibold text-red-600 mt-2">Upcoming</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GMCard;
