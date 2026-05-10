"use client";

import { AnimatePresence, motion } from "framer-motion";
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
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function HeroTypographyLayer() {
  const [year, setYear] = useState("2025");

  useEffect(() => {
    const timer = setTimeout(() => setYear("2026"), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden select-none">
      {/* ── Large Year Text — static, GPU-composited ── */}
      <div
        className="absolute inset-0 flex items-center justify-center mix-blend-overlay z-10"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      >
        <div className="relative flex flex-row rotate-90 md:rotate-0 items-center justify-center w-full h-full font-sans tracking-tighter font-bold">
          <div
            className="absolute text-[80vh] md:text-[35vw] text-white/[0.06] transform-gpu"
            style={{ transform: "scaleY(1.1) translateZ(0)" }}
          >
            202
            <Digit value={year[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
