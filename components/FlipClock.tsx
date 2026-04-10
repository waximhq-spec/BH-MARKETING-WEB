"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Digit = ({ value }: { value: string | number }) => {
  return (
    <div className="relative w-6 h-8 sm:w-7 sm:h-9 bg-[#1a1a1a] rounded-[2px] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.23, 1, 0.32, 1] 
          }}
          className="text-[#353535] text-sm sm:text-base font-medium tracking-tighter"
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <div className="absolute inset-0 border-[0.5px] border-white/5 pointer-events-none rounded-[2px]" />
    </div>
  );
};

const Separator = () => (
  <span className="text-[#353535]/40 text-[10px] mx-0.5 animate-pulse">:</span>
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
    <div className="flex items-center gap-1 select-none pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
      <div className="flex gap-0.5">
        <Digit value={hours[0]} />
        <Digit value={hours[1]} />
      </div>
      <Separator />
      <div className="flex gap-0.5">
        <Digit value={minutes[0]} />
        <Digit value={minutes[1]} />
      </div>
      <Separator />
      <div className="flex gap-0.5">
        <Digit value={seconds[0]} />
        <Digit value={seconds[1]} />
      </div>
    </div>
  );
}
