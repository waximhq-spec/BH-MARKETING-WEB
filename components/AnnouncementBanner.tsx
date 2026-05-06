"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnnouncementBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative w-full overflow-hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.05] z-[101]"
        >
          {/* Subtle red ambient glow - softened for white bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9A0E1F]/5 to-transparent pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-6 py-2 md:py-2.5 flex items-center justify-center gap-4">
            {/* Premium Indicator Dot */}
            <div className="relative flex items-center justify-center flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] shadow-[0_0_8px_rgba(154,14,31,0.4)]" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-ping opacity-20" />
            </div>
            
            <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase text-black/60 text-center leading-relaxed">
              Limited Client Slots Available for May
            </p>
            
            {/* Subtle Accent Line */}
            <div className="hidden sm:block w-6 h-[1px] bg-gradient-to-r from-black/10 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
