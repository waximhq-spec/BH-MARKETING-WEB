"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";
  const bgClass = isHome && !isScrolled ? "bg-transparent border-b border-white/10" : "bg-[#050505] border-b border-white/[0.06]";

  return (
    <div className={`relative w-full transition-colors duration-300 z-[101] ${bgClass}`}>
      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-center">
        {/* Text Container with overflow hidden for transition height containment */}
        <div className="relative h-4 overflow-hidden flex items-center justify-center min-w-[300px] md:min-w-[450px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ y: 15 }}
              animate={{ y: 0 }}
              exit={{ y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-[9px] md:text-[10px] font-mono tracking-[0.25em] uppercase text-white/90 leading-none whitespace-nowrap flex items-center justify-center gap-2"
            >
              {/* Glow pulsing red dot */}
              <span className="relative flex h-2 w-2 items-center justify-center flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9A0E1F]/50 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9A0E1F]"></span>
              </span>
              <span>
                <span className="hidden md:inline">{MESSAGES[index].desktop}</span>
                <span className="inline md:hidden">{MESSAGES[index].mobile}</span>
              </span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

