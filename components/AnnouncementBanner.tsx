"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnnouncementBanner() {
  return (
    <div className="relative w-full bg-black z-[101]" style={{ background: "#000" }}>
      <div className="max-w-[1400px] mx-auto px-6 py-2 md:py-2.5 flex items-center justify-center gap-4">
        {/* Premium Indicator Dot */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" />
        </div>
        
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 text-center leading-relaxed">
          Limited Client Slots Available for June
        </p>
      </div>
    </div>
  );
}
