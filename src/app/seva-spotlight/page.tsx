"use client";
import React, { useEffect } from "react";
import Card from "../components/InstagramCard";

// TypeScript declaration: Tell TypeScript that Instagram will add an 'instgrm' object to the browser's window
// This prevents TypeScript errors when we try to use window.instgrm later.
declare global {
    interface Window {
        instgrm?: { // ? means "optional" - it won't exist until Instagram's script loads.
            Embeds: {
                process: () => void; // The function Instagram provides to transform blockquotes into embeds.
            }
        }
    }
}

// Array of Instagram posts you want to display.
const instagramPosts = [
    { 
        id: 1, 
        url: "https://www.instagram.com/p/DUjNE6lkWk0/", 
        memberName: "Dhruv Srivastava", 
        major: "Aerospace Engineering"
    },
    { 
        id: 2, 
        url: "https://www.instagram.com/p/DIMWdx0uq8d/", 
        memberName: "Jay Kannam", 
        major: "Electrical & Computer Engineering"
    },
    { 
        id: 3, 
        url: "https://www.instagram.com/p/DHRCgL3Ob_b/", 
        memberName: "Kisha Patel", 
        major: "Public Health"
    },
    { 
        id: 4, 
        url: "https://www.instagram.com/p/DF2-y37uW8R/", 
        memberName: "Brianna Surti", 
        major: "Business"
    },
    { 
        id: 5, 
        url: "https://www.instagram.com/p/DFQetlMu1ml/", 
        memberName: "Nilay Surana", 
        major: "Neuroscience"
    },
]

export default function SevaSpotlight() {

    // useEffect runs AFTER the component first renders.
    // We use it to load Instagram's embed script and activate the embeds.
    useEffect(() => {
        
        // Create a new <script> element in memory (not on page yet), set the source to Instagram's embed JavaScript file.
        // This file contains the code that transforms blockquotes into Instagram posts, and load the script asynchronously (don't block page rendering),
        // then add the script tag to the page's <body>.
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        // When Instagram's script finishes loading, then check if its code successfully created the window.instgrm object.
        script.onload = () => {
            if (window.instgrm) {

                // Call Instagram's process() function. This finds all <blockquote class="instagram-media"> elements and replaces them with actual Instagram 
                // post embeds.
                window.instgrm.Embeds.process();
            }
        };

        // The cleanup function runs when the component unkounts, which means the user leaves the page.
        return () => {

            // Remove the Instagram script fromn the page to avoid memory leaks, and only remove if the script is still in the document.
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };

    }, []); // Empty array [] means "only run this once when component first loads".

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">

            {/* Page title and description */}
            <div className="text-center mb-12 mt-16 px-4">
                <div className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                    🌟 Seva Spotlight 🌟
                </div>
                <h1 className="text-5xl font-bold text-orange-500 mb-4">
                    Members of the Month
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Celebrating the incredible Seva members who go above and beyond 
                    to make a difference in our community.
                </p>
            </div>
            
            {/* Horizontal scrolling container for Instagram cards */}
            <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scroll-smooth">
                {instagramPosts.map((post) => (
                    <div className="snap-center">
                        <Card key={post.id} {...post} />
                    </div>
                ))}
            </div>

            {/* Member Spotlight Form */}
            <div className="text-center mt-16 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Know someone who deserves recognition?
                </h2>
                <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSenxWN6OuozjusZPuuJ604pI940ixJZyExUwDD0H27Q7OSTIg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition"
                >
                    Nominate a Member
                </a>
            </div>
        </div>
    );
}