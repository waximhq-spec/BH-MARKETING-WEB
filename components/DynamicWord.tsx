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
    }, 2200); // Shorter cycle for better flow
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      layout
      className="inline-flex flex-col items-center justify-center relative px-1 sm:px-2 mx-1 shadow-sm"
      style={{ perspective: "1200px" }}
    >
      <div className="relative h-[1.2em] flex items-center justify-center overflow-visible">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            layout
            initial={{ rotateX: 90, opacity: 0, scale: 0.95, y: 10 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }} // Smooth fade out only, no flip
            transition={{ 
              duration: 0.5, 
              ease: [0.23, 1, 0.32, 1], // Slicker entry
              opacity: { 
                duration: 0.7, 
                ease: "easeOut" 
              }
            }}
            className="inline-block whitespace-nowrap leading-none font-bold text-white origin-center translate-z-0 font-[var(--font-outfit)]"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      
      {/* Dynamic, steady underline that adjusts width with the text */}
      <motion.div 
        layout
        className="absolute bottom-[-2px] sm:bottom-[-4px] left-0 right-0 h-[2px] sm:h-[3px] bg-white/40 rounded-full"
        initial={false}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.div>
  );
}
