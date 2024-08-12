"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";

const images = [
  "/carousel/seva3.jpg",
  "/carousel/seva4.jpg",
  "/carousel/seva5.jpg",
  "/carousel/seva6.jpg",
  "/carousel/seva7.jpg",
  "/carousel/seva8.jpg",
];

const Carousel: React.FC = () => {
  return (
    <div className="banner w-full h-[350px] relative text-center overflow-hidden">
      <div
        className="slider absolute w-[320px] h-[220px] inset-0 m-auto "
        style={
          {
            transformStyle: "preserve-3d",
            transform: "perspective(2000px)",
            zIndex: 2,
            animation: "autoRun 50s linear infinite",
          } as React.CSSProperties
        }
      >
        {images.map((image, index) => {
          const rotation = (index - 1) * (360 / images.length);

          // Inline styles
          const style: React.CSSProperties = {
            position: "absolute",
            inset: "0 0 0 0",
            transform: `rotateY(${rotation}deg) translateZ(320px)`,
          };

          return (
            <div key={index} className="item absolute" style={style}>
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default Carousel;
