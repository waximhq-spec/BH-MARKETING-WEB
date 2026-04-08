"use client";

import { useState, useEffect } from "react";

const timeZones = [
  { label: "AMERICA", zone: "America/New_York" },
  { label: "EUROPE", zone: "Europe/London" },
  { label: "GULF", zone: "Asia/Dubai" },
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
          hour12: true
        });
        newTimes[zone] = formatter.format(new Date());
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000 * 60); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by waiting for first tick, or return static loading state
  if (Object.keys(times).length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-20 opacity-0 relative z-30">
        {timeZones.map(({ label }) => (
          <div key={label} className="w-[120px] h-[50px]"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-16 sm:mt-24 relative z-30">
      {timeZones.map(({ label, zone }) => (
        <div key={label} className="flex flex-col items-center group">
          <div className="px-5 py-2.5 border border-white/20 bg-white/5 backdrop-blur-md rounded-md mb-3 text-white font-medium tracking-widest text-xs sm:text-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all group-hover:bg-white/10 group-hover:border-white/30">
            {times[zone] || "--:--"}
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.25em] text-white/50 group-hover:text-gold-500 transition-colors">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
