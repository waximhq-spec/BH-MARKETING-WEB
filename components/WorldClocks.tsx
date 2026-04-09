"use client";

import { useState, useEffect } from "react";

const timeZones = [
  { label: "BAHRAIN", zone: "Asia/Bahrain" },
  { label: "AMERICA", zone: "America/New_York" },
  { label: "EUROPE", zone: "Europe/London" },
  { label: "JAPAN", zone: "Asia/Tokyo" }
];

export default function WorldClocks() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      timeZones.forEach(({ zone }) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        newTimes[zone] = formatter.format(new Date());
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by waiting for first tick, or return static loading state
  if (Object.keys(times).length === 0) {
    return (
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mt-12 sm:mt-20 opacity-0 relative z-30 w-full sm:w-auto px-4 sm:px-0">
        {timeZones.map(({ label }) => (
          <div key={label} className="w-full sm:w-[120px] h-[40px] sm:h-[50px]"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-y-6 gap-x-4 sm:gap-6 md:gap-10 mt-12 sm:mt-16 md:mt-24 relative z-30 w-full sm:w-auto px-4 sm:px-0">
      {timeZones.map(({ label, zone }) => (
        <div key={label} className="flex flex-col items-center group w-full sm:w-auto">
          <div className="w-full sm:w-auto text-center px-4 sm:px-5 py-2 sm:py-2.5 border border-white/20 bg-white/5 backdrop-blur-md rounded-md mb-2.5 sm:mb-3 text-white font-medium tracking-widest text-[10px] sm:text-xs md:text-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all group-hover:bg-white/10 group-hover:border-white/30 whitespace-nowrap">
            {times[zone] || "--:--"}
          </div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white/50 group-hover:text-[#39ff14] transition-colors">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
