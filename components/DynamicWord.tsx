"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "brands", "علامات تجارية",
  "hotels", "فنادق",
  "restaurants", "مطاعم",
  "cafes", "مقاهي",
  "businesses", "أعمال"
];

export default function DynamicWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex flex-col items-center justify-center relative px-2 min-w-[120px] sm:min-w-[150px] md:min-w-[200px]" style={{ perspective: "1000px" }}>
      <div className="relative h-[1.2em] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ rotateX: 90, opacity: 0, y: 10 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: -90, opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block whitespace-nowrap leading-none font-bold text-white origin-center translate-z-0"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      
      {/* Steady, detached underline */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] sm:h-[3px] bg-white/30 rounded-full shadow-[0_4px_12px_rgba(255,255,255,0.1)]" />
    </span>
  );
}
