"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Digit = ({ value, isAccent = false }: { value: string | number, isAccent?: boolean }) => {
  return (
    <div className="relative w-3 sm:w-4 flex items-center justify-center overflow-hidden h-6">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.23, 1, 0.32, 1] 
          }}
          className={`absolute text-sm sm:text-base font-bold tabular-nums tracking-tighter ${
            isAccent ? "text-[#00A8AB]" : "text-white/80"
          }`}
          style={{
            textShadow: isAccent 
              ? "0 0 12px rgba(0, 168, 171, 0.4)" 
              : "0 0 10px rgba(255,255,255,0.15)"
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const Separator = () => (
  <span className="text-white/40 text-xs sm:text-sm mx-0.5 mt-[-2px] animate-[pulse_2s_ease-in-out_Infinity]">:</span>
);

export default function FlipClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity">
      <div className="flex">
        <Digit value={hours[0]} />
        <Digit value={hours[1]} />
      </div>
      <Separator />
      <div className="flex">
        <Digit value={minutes[0]} />
        <Digit value={minutes[1]} />
      </div>
      <Separator />
      <div className="flex">
        <Digit value={seconds[0]} isAccent />
        <Digit value={seconds[1]} isAccent />
      </div>
    </div>
  );
}
