import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|divider).js",
  ],
  theme: {
    extend: {
      transform: {
        "preserve-3d": "transform-style: preserve-3d",
      },
      perspective: {
        "1000": "1000px",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
        "x-180": "rotateX(180deg)",
      },
      backfaceVisibility: {
        hidden: "backface-visibility: hidden",
      },
      colors: {
        orange: {
          0: "#F5F1EA",
          1: "#F7A23B",
          2: "#F4623A",
        },
        yellow: {
          0: "#fef3c7",
        },
        green: {
          0: "#A0C1B8",
          1: "#4F6D65",
          2: "#44E660",
        },
      },
    },
  },
  plugins: [
    nextui(),
    function ({ addUtilities }) {
      addUtilities({
        ".perspective": { perspective: "1000px" },
        ".transform-style-preserve-3d": { transformStyle: "preserve-3d" },
        ".backface-hidden": { backfaceVisibility: "hidden" },
        ".rotate-y-180": { transform: "rotateY(180deg)" },
        ".rotate-x-180": { transform: "rotateX(180deg)" },
      });
    },
  ],
};
export default config;
