"use client";

import React from "react";
import { FiX, FiCalendar, FiInfo } from "react-icons/fi";

export type EventsProps = {
  title: string;
  category: number;
  date: string[];
  description: string;
};

interface EventModalProps {
  event: EventsProps;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-medium text-gray-900">{event.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {getCategoryLabel(event.category)}
            </span>
          </div>
          <div className="flex items-start mb-4">
            <FiCalendar className="mr-3 mt-1 text-gray-500" />
            <div>
              <p className="font-medium">{event.date[0]}</p>
              <p className="text-gray-500 text-sm">{event.date[1]}</p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <FiInfo className="mr-3 mt-1 text-gray-500" />
            <p className="text-gray-700">{event.description}</p>
          </div>
          <div className="flex space-x-3">
            <button
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              RSVP
            </button>
            <button
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}