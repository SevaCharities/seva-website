"use client";

import React from "react";

export type InstagramProps = {
    id: number;
    url: string;
    memberName: string;
    major: string;
}

const Card = ({ id, url, memberName, major }: InstagramProps) => {
    return (
        <div className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">

            {/* Member info */}
            <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 border-t-4 border-orange-500">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🐘</span>
                    <p className="text-2xl font-bold text-gray-900">{memberName}</p>
                    <span className="text-2xl">🐘</span>
                </div>
                <p className="text-gray-700 font-medium text-base text-center">
                    {major}
                </p>
            </div>
            
            {/* Instagram Post Embed */}
            <div className="relative w-full aspect-square bg-gray-100">
                <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{
                        background: "#FFF",
                        border: "0",
                        borderRadius: "0",
                        margin: "0",
                        padding: "0",
                        width: "100%",
                    }}
                />
            </div>

            {/* Instagram-style action bar */}
            <div className="px-4 pb-4 pt-3 bg-white flex items-center justify-center gap-4 border-t border-gray-100">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 text-sm font-bold transition flex items-center gap-1"
                >
                    View Full Spotlight →
                </a>
            </div>
        </div>
    );
};

export default Card;