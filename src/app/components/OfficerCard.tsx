"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion"; 

export type OfficerProps = {
  name: string;
  role: string;
  bio: string;
};

const Card = ({ info }: { info: OfficerProps }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const nameParts = info.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <motion.div
      className="relative flex flex-col w-72 h-80 hover:cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative w-72 h-56">
        <Image
          src={`/officers/${info.name}.jpg`}
          alt={info.name}
          layout="fill"
          className="rounded-t-xl object-cover"
        />
      </div>

      <div className="bg-white rounded-b-xl shadow-md px-4 py-2 h-24 text-center flex flex-col items-center justify-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          {firstName} {lastName}
        </h3>
        <p className="text-sm sm:text-base text-orange-600 font-medium mt-1 leading-tight">
          {info.role}
        </p>
      </div>

      {isFlipped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 rounded-xl bg-white text-black w-full h-full flex justify-center items-center text-sm px-4 py-3 z-10 shadow-xl"
        >
          <div className="overflow-y-auto max-h-full">{info.bio}</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;