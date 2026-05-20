"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnnouncementBanner() {
  return (
    <div className="relative w-full bg-white z-[101]">
      <div className="max-w-[1400px] mx-auto px-6 py-1 flex items-center justify-center gap-3">
        {/* Premium Indicator Dot */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-pulse" />
        </div>
        
        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-black text-center leading-none">
          Limited Client Slots Available for June
        </p>
      </div>
    </div>
  );
}
