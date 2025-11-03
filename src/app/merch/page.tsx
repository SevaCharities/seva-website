'use client';
import Image from "next/image";
import { MerchTile } from "../components/MerchTile";

export interface Merch {
  id: number;
  name: string;
  price: number;
  image: string[];
  buyLink: string;
}

const merch: Merch[] = [
  {
    id: 1,
    name: "Seva T-Shirt 2025-26",
    price: 10,
    image: ["/merch/seva_25-26_front.png", "/merch/seva_25-26_back.png"],
    buyLink: "https://docs.google.com/forms/d/e/1FAIpQLSfkOXisC53oePZDLO3pGhyPM_tUTFPKKfhFl-SEmT6x20ydXg/viewform?usp=dialog",
  },
  {
    id: 2,
    name: "Seva T-Shirt 2024-25",
    price: 10,
    image: ["/merch/seva_24-25_front.png", "/merch/seva_24-25_back.png"],
    buyLink: "https://docs.google.com/forms/d/e/1FAIpQLSdjDxsHj_O0DA8ab2lw3an6RsbMYxwlhIXO3b_Omdy0ZLQg6A/viewform?usp=header",
  },
  {
    id: 3,
    name: "Laptop Stickers 2025",
    price: 2,
    image: ["/merch/seva_24-25_sticker.png"],
    buyLink: "https://docs.google.com/forms/d/e/1FAIpQLSfGrXnh6rj82qzdI-U7ParOiRTz2ziD6r09c4I7xoRen_PMkw/viewform?usp=dialog",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white via-50% to-orange-100 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-2">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                Seva Merch
              </span>
            </h1>
            <div className="h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
          </div>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Wear your support with pride. Every purchase makes a difference. ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {merch.map((m: Merch) => (
            <MerchTile key={m.id} m={m} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 6s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% auto;
        }
        .bg-pos-100 {
          background-position: 100% 0;
        }
      `}</style>
    </div>
  );
};

export default Page;