"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-5 md:bottom-10 md:right-10 z-[998] transform-gpu"
          aria-label="Back to top"
          style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
        >
          <div className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/90 border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.6)] active:scale-[0.92] transition-transform duration-200">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
