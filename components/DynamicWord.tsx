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
    <span className="inline-flex justify-center items-center font-bold text-white mx-1 sm:mx-2 min-h-[1.2em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-block border-b-2 sm:border-b-[3px] border-white/40 pb-0.5 sm:pb-1 whitespace-nowrap leading-none"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
