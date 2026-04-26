"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecurityLayer() {
  const [isVisible, setIsVisible] = useState(false);

  const triggerOverlay = (e?: Event) => {
    if (e) e.preventDefault();
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    // 1. Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      triggerOverlay(e);
    };

    // 2. Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      
      // Ctrl+C (Copy), Ctrl+U (Source), Ctrl+Shift+I (DevTools), Ctrl+Shift+C (Inspect), F12 (DevTools)
      if (
        (isCmdOrCtrl && e.key === "c") || 
        (isCmdOrCtrl && e.key === "u") || 
        (isCmdOrCtrl && e.shiftKey && e.key === "I") ||
        (isCmdOrCtrl && e.shiftKey && e.key === "C") ||
        e.key === "F12"
      ) {
        triggerOverlay(e);
      }
    };

    // 3. Image/Video Drag
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        triggerOverlay(e);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
          {/* Backdrop Blur Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          
          {/* Content Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-black border border-white/10 p-12 md:p-16 flex flex-col items-center text-center max-w-sm mx-4 shadow-2xl"
          >
            {/* Minimal Logo/Icon */}
            <div className="w-12 h-px bg-[#B11226] mb-10" />
            
            <h2 className="text-white font-black text-2xl tracking-tighter uppercase mb-4">
              This content is protected.
            </h2>
            
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.4em] leading-relaxed">
              Crafted, not copied.
            </p>
            
            <div className="mt-12 flex flex-col items-center">
              <p className="text-white/20 text-[11px] font-light italic mb-2">
                If you like what you see...
              </p>
              <p className="text-white text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                Let&apos;s build yours.
              </p>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-px bg-gradient-to-tr from-[#B11226]/20 via-transparent to-transparent opacity-30 pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
