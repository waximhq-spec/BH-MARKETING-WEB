"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/SmoothScroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          onClick={handleClick}
          aria-label="Back to top"
          className="flex fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[50] w-10 h-10 md:w-12 md:h-12 rounded-full 
            items-center justify-center
            bg-black/60 border border-white/10 backdrop-blur-md
            text-white/60 hover:text-white hover:border-white/30
            hover:shadow-[0_0_20px_rgba(217,22,22,0.2)]
            transition-all duration-300 group back-to-top-btn"
          style={{ willChange: "transform, opacity" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
