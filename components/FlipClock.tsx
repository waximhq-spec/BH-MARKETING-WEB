"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Digit = memo(({ value, isAccent = false }: { value: string | number, isAccent?: boolean }) => {
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
            isAccent ? "text-[#D91616]" : "text-white/80"
          }`}
          style={{
            textShadow: isAccent 
              ? "0 0 12px rgba(217, 22, 22, 0.4)" 
              : "0 0 10px rgba(255,255,255,0.15)"
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

Digit.displayName = "Digit";

const Separator = memo(() => (
  <span className="text-white/40 text-xs sm:text-sm mx-0.5 mt-[-2px] animate-[pulse_2s_ease-in-out_Infinity]">:</span>
));

Separator.displayName = "Separator";

const ClockSkeleton = memo(() => (
  <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] opacity-40">
    <div className="w-8 h-6 bg-white/5 rounded-sm animate-pulse" />
    <span className="text-white/20 text-xs mx-0.5">:</span>
    <div className="w-8 h-6 bg-white/5 rounded-sm animate-pulse" />
    <span className="text-white/20 text-xs mx-0.5">:</span>
    <div className="w-8 h-6 bg-[#D91616]/10 rounded-sm animate-pulse" />
  </div>
));

ClockSkeleton.displayName = "ClockSkeleton";

export default memo(function FlipClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <ClockSkeleton />;

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] opacity-80 hover:opacity-100 transition-opacity">
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
});
