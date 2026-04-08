"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "brands",
  "hotels",
  "restaurants",
  "cafes",
  "businesses",
  "علامات تجارية",
  "فنادق",
  "مطاعم",
  "مقاهي"
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
    <span className="inline-grid [grid-template-areas:'content'] justify-center font-bold text-white mx-1.5 md:mx-2 border-b-[3px] border-white/40 pb-1 leading-none align-bottom overflow-hidden transition-[width] duration-300">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="[grid-area:content] inline-block whitespace-nowrap text-center pt-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
