"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecurityLayer() {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    // 1. Disable Right-Click Globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setIsTriggered(true);
      console.warn("Protected by Cinmach Productions");
    };

    // 2. Detect DevTools and View Source Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Keys to block
      const isF12 = e.key === "F12";
      const isDevTools = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "C" || e.key === "c" || e.key === "J" || e.key === "j");
      const isViewSource = (e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u");
      const isSave = (e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s");

      if (isF12 || isDevTools || isViewSource || isSave) {
        e.preventDefault();
        setIsTriggered(true);
        console.warn("Protected by Cinmach Productions");
      }
    };

    // 3. Add Listeners
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // 4. Handle Body Scroll when triggered
    if (isTriggered) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isTriggered]);

  return (
    <AnimatePresence>
      {isTriggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-[15px] select-none cursor-pointer"
          onContextMenu={(e) => e.preventDefault()}
          onClick={() => setIsTriggered(false)}
        >
          <div className="max-w-2xl px-8 text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-white mb-6"
            >
              Content Protected by Copyright
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-white/70 font-light tracking-wide leading-relaxed mb-12"
            >
              Unauthorized downloading, reproduction, or recreation is strictly prohibited.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-semibold"
            >
              © Cinmach Productions 2026
            </motion.div>
          </div>

          {/* Optional: Subtle pulse effect to indicate active protection */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 animate-pulse"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
