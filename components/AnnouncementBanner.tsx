"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  {
    desktop: "Limited client spots remaining for June",
    mobile: "June spots limited"
  },
  {
    desktop: "Creative direction & brand films for elite brands",
    mobile: "Cinematic brand films"
  },
  {
    desktop: "Now accepting inquiries for Q3 2026",
    mobile: "Accepting Q3 bookings"
  }
];

export default function AnnouncementBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-[#050505] border-b border-white/[0.06] z-[101]">
      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-center gap-3">
        {/* Glow pulsing red dot */}
        <div className="relative flex h-2 w-2 items-center justify-center flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9A0E1F]/50 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9A0E1F]"></span>
        </div>

        {/* Text Container with overflow hidden for transition height containment */}
        <div className="relative h-4 overflow-hidden flex items-center justify-center min-w-[300px] md:min-w-[450px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-[9px] md:text-[10px] font-mono tracking-[0.25em] uppercase text-white/90 text-center leading-none whitespace-nowrap"
            >
              <span className="hidden md:inline">{MESSAGES[index].desktop}</span>
              <span className="inline md:hidden">{MESSAGES[index].mobile}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
