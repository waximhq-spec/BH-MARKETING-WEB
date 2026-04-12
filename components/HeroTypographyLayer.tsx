"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Digit = ({ value }: { value: string | number }) => {
  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden h-[1.1em]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function HeroTypographyLayer() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState("2025");

  useEffect(() => {
    setMounted(true);
    // Transition from 2025 to 2026 shortly after mount
    const timer = setTimeout(() => {
      setYear("2026");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const scatteredChars = [
    { char: "C", top: "15%", left: "8%" },
    { char: "X", top: "25%", left: "88%" },
    { char: "/", top: "65%", left: "12%" },
    { char: "2", top: "80%", left: "82%" },
    { char: "0", top: "42%", left: "92%" },
    { char: "—", top: "10%", left: "65%" },
    { char: "*", top: "85%", left: "18%" },
    { char: "+", top: "35%", left: "4%" },
    { char: "M", top: "52%", left: "8%" },
  ];

  return (
    <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden select-none">
      {/* ── Top white gradient wash ──────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-white/[0.03] to-transparent mix-blend-overlay z-0" />
      
      {/* ── Large Year Text Layers ───────────────────── */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], x: [-3, 3, -3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center mix-blend-overlay z-10"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      >
        <div className="relative flex flex-row rotate-90 md:rotate-0 items-center justify-center w-full h-full font-sans tracking-tighter font-bold">
          
          {/* Layer 1: Sharpest/Primary */}
          <div className="absolute text-[80vh] md:text-[35vw] text-white/[0.08] blur-[3px]" style={{ transform: "scaleY(1.1)" }}>
            202
            <Digit value={year[3]} />
          </div>

          {/* Layer 2: Deeply blurred atmospheric glow */}
          <div className="absolute text-[80vh] md:text-[35vw] text-[#D91616]/[0.1] blur-[10px] translate-x-4 translate-y-2 opacity-60" style={{ transform: "scaleY(1.1)" }}>
            202
            <Digit value={year[3]} />
          </div>

        </div>
      </motion.div>

      {/* ── Scattered Tiny Characters ────────────────── */}
      {mounted && scatteredChars.map((item, index) => (
        <motion.span
          key={index}
          className="absolute text-[10px] md:text-xs font-mono text-white/[0.12] blur-[0.5px] mix-blend-overlay z-10"
          style={{ top: item.top, left: item.left }}
          animate={shouldReduceMotion ? {} : { 
            y: [0, -8, 0], 
            opacity: [0.1, 0.25, 0.1] 
          }}
          transition={{ 
            duration: 10 + (index % 5), 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.3
          }}
        >
          {item.char}
        </motion.span>
      ))}
    </div>
  );
}
