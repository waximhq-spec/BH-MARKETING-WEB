"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TECH_ITEMS = [
  "Color graded in DaVinci Resolve",
  "Shot in Log · S-Log3",
  "Precision motion graphics",
  "4K / 6K RAW capture",
  "HDR mastering pipeline",
  "Cinematic audio design",
  "RED & BMPCC camera systems",
  "Anamorphic lens sets",
  "Professional gimbal rigs",
  "Drone cinematography · GCAA certified",
];

export default function TechStrip() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0a0202] py-5 select-none">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#0a0202] to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#0a0202] to-transparent pointer-events-none" />

      {/* Scrolling ticker */}
      <div
        className="flex items-center"
        style={{
          animation: "ticker-scroll 35s linear infinite",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 whitespace-nowrap"
          >
            <span
              className="text-white/35 hover:text-white/60 transition-colors duration-300"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#D91616]/60 mx-4 shrink-0" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
