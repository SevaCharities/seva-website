"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";

export type OfficerProps = {
  name: string;
  role: string;
  bio: string;
};

const Card = ({ info }: { info: OfficerProps }) => {
  const name = info.name.split(" ");
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <motion.div className="relative flex flex-col w-72 h-72 hover:cursor-pointer">
      <div className="relative w-72 h-full">
        <Image
          src={`/officers/${info.name}.jpg`}
          alt={info.name}
          layout="fill"
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className=" bg-white rounded-b-xl shadow-md p-4 h-20 text-center flex flex-col items-center justify-center">
        <h3 className="sm:py-1 text-base sm:text-xl">
          {name[0]} {name[1]}
        </h3>
        <p className=" text-base text-orange-2 font-semibold">{info.role}</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className=" rounded-xl absolute bg-white text-black w-full h-full flex justify-center items-center text-xs p-4"
      >
        <div>{info.bio}</div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
