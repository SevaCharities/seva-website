'use client';
import { useState } from "react";
import { Merch } from "../merch/page";
import Image from "next/image";

export const MerchTile = ({ m }: { m: Merch }) => {
  const [isFront, setIsFront] = useState(true);

  return (
    <div
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg"
      onMouseEnter={() => setIsFront(false)}
      onMouseLeave={() => setIsFront(true)}
    >
      <div className="relative w-80 h-72">
        <Image
          src={m.image[0]}
          alt={m.name}
          fill
          className={` object-contain rounded-lg transition-opacity duration-300 ${
            isFront ? "opacity-100" : "opacity-0"
          }`}
        />
        <Image
          src={m.image.length > 1 ? m.image[1] : m.image[0]}
          alt={m.name}
          fill
          className={`object-contain rounded-lg transition-opacity duration-300 absolute top-0 left-0 ${
            isFront ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div
        className={`w-full flex items-center py-8 px-6 mt-4 rounded-lg ${
          isFront ? "bg-orange-2" : "bg-green-500"
        }`}
      >
        <h3 className="w-2/3 flex-wrap text-xl text-orange-0 font-sem">
          {m.name}
        </h3>
        <p className="w-1/3 text-orange-0 text-3xl font-black text-right">
          ${m.price}
        </p>
      </div>
    </div>
  );
};
