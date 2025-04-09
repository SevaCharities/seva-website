"use client";

import React from "react";
// Define EventsProps locally rather than importing
// @ts-ignore
export type EventsProps = {
  title: string;
  category: number;
  date: string[];
  description: string;
};

import { useRouter } from "next/navigation";

export default function EventsCard(props: EventsProps) {
  const router = useRouter();
  const { title, category, date, description } = props;
  
  const getCategoryLabel = (category: number) => {
    switch (category) {
      case 1:
        return "Social";
      case 2:
        return "Professional";
      case 3:
        return "Service";
      default:
        return "Other";
    }
  };
  
  return (
    <div className="border-b border-gray-200 py-8 px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          <div className="flex items-center mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {getCategoryLabel(category)}
            </span>
            <span className="ml-3 text-sm text-gray-500">{date[0]}</span>
          </div>
          <p className="text-gray-700 max-w-2xl">{description}</p>
        </div>
        <div className="flex flex-col space-y-3 sm:mt-0 mt-4">
          <button
            onClick={() => {}}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            RSVP
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}