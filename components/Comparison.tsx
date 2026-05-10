"use client";

import { motion } from "framer-motion";

const COMPARISON_DATA = [
  {
    feature: "Work Quality",
    cinmachRed: "Always great,",
    cinmachDark: " every time",
    inhouse: "Sometimes",
    agency: "Hit or miss",
  },
  {
    feature: "Planning for Growth",
    cinmachRed: "Included,",
    cinmachDark: " from day one",
    inhouse: "Depends on staff",
    agency: "Costs extra",
  },
  {
    feature: "Clear Deadlines",
    cinmachRed: "Always,",
    cinmachDark: " on time",
    inhouse: "Changes often",
    agency: "Often late",
  },
  {
    feature: "Consistent Style",
    cinmachRed: "Included,",
    cinmachDark: " every time",
    inhouse: "Rare",
    agency: "Different every time",
  },
  {
    feature: "Easy to Scale Up",
    cinmachRed: "Very easy,",
    cinmachDark: " anytime",
    inhouse: "Hard to do",
    agency: "Needs new contract",
  },
  {
    feature: "Start Date",
    cinmachRed: "Right away,",
    cinmachDark: " in 48 hours",
    inhouse: "Takes weeks",
    agency: "Takes days",
  },
  {
    feature: "Clear Pricing",
    cinmachRed: "Very clear,",
    cinmachDark: " no surprises",
    inhouse: "Salary + extras",
    agency: "Extra hidden costs",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <section data-theme="light" className="py-24 md:py-40 bg-white">
      <div className="container">
        <div className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <Reveal>
            <p className="text-[#B11226] font-mono tracking-[0.3em] uppercase text-[10px] font-bold mb-6">
              Most options look similar — until you look closer.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-black font-black leading-[0.95] tracking-tight uppercase"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
            >
              Most Agencies Just Film.<br />We Build Brands.
            </h2>
          </Reveal>
        </div>

        {/* The Matrix */}
        <div className="w-full relative bg-white hidden md:block">
          {/* Header Row */}
          <div className="grid grid-cols-[1.2fr_1.3fr_1fr_1fr] border-b border-[#EAEAEA] pb-5 mb-4">
            <div className="px-6 flex items-end">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black font-medium">Feature</span>
            </div>
            
            {/* Cinmach Header Column */}
            <div className="px-8 flex items-end">
              <span className="font-black text-[13px] tracking-[0.1em] uppercase text-black">Cinmach</span>
            </div>
            
            <div className="px-6 flex items-end">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A]">In-House Hire</span>
            </div>
            
            <div className="px-6 flex items-end">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A]">Typical Agency</span>
            </div>
          </div>

          {/* Data Rows */}
          <div className="flex flex-col">
            {COMPARISON_DATA.map((row, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
                className="grid grid-cols-[1.2fr_1.3fr_1fr_1fr] border-b border-[#EAEAEA] last:border-0 hover:bg-[#F7F7F7] transition-colors duration-300 group"
              >
                <div className="px-6 py-[26px] flex items-center">
                  <span className="font-medium text-black text-[14px]">
                    {row.feature}
                  </span>
                </div>
                
                {/* Cinmach Data Column */}
                <div className="relative px-8 py-[26px] flex items-center bg-[#FAFAFA] border-x border-black/[0.08] transition-transform duration-300 ease-out group-hover:scale-[1.01] group-hover:bg-white z-10">
                  <span className="font-semibold text-[14px] tracking-tight">
                    <span className="text-[#B11226] mr-2">✓</span>
                    <span className="text-[#B11226]">{row.cinmachRed}</span>
                    <span className="text-black">{row.cinmachDark}</span>
                  </span>
                </div>
                
                <div className="px-6 py-[26px] flex items-center">
                  <span className="font-normal text-[#8A8A8A] text-[13px]">
                    {row.inhouse}
                  </span>
                </div>
                
                <div className="px-6 py-[26px] flex items-center">
                  <span className="font-normal text-[#8A8A8A] text-[13px]">
                    {row.agency}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View (Compact Horizontal Matrix) */}
        <div className="md:hidden -mx-4 px-4 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="min-w-[640px] flex flex-col">
              {/* Header Row */}
              <div className="grid grid-cols-[1fr_1.4fr_1fr_1fr] border-b border-[#EAEAEA] pb-4 mb-2 px-2">
                <div className="flex items-end">
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-black/40">Feature</span>
                </div>
                <div className="flex items-end px-4">
                  <span className="font-black text-[11px] tracking-[0.1em] uppercase text-black">Cinmach</span>
                </div>
                <div className="flex items-end justify-center px-2">
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-black/40 text-center">In-House</span>
                </div>
                <div className="flex items-end justify-center px-2">
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-black/40 text-center">Agency</span>
                </div>
              </div>

              {/* Data Rows */}
              {COMPARISON_DATA.map((row, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="grid grid-cols-[1fr_1.4fr_1fr_1fr] border-b border-[#EAEAEA] last:border-0 py-4 items-center px-2">
                    <div className="pr-4">
                      <span className="font-medium text-black text-[13px] leading-tight block">
                        {row.feature}
                      </span>
                    </div>
                    
                    {/* Cinmach Column (Highlighted) */}
                    <div className="bg-[#FAFAFA] border-x border-black/[0.05] px-4 py-3">
                      <span className="font-bold text-[13px] leading-snug block">
                        <span className="text-[#B11226] mr-1">✓</span>
                        <span className="text-[#B11226]">{row.cinmachRed}</span>
                        <span className="text-black">{row.cinmachDark}</span>
                      </span>
                    </div>
                    
                    <div className="flex justify-center px-2">
                      <span className="font-normal text-[#8A8A8A] text-[12px] text-center leading-tight">
                        {row.inhouse}
                      </span>
                    </div>
                    
                    <div className="flex justify-center px-2">
                      <span className="font-normal text-[#8A8A8A] text-[12px] text-center leading-tight">
                        {row.agency}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          
          {/* Hint for scrolling */}
          <div className="flex justify-center mt-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full">
              <span className="w-1 h-1 bg-black/20 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-black/30">Scroll to compare</span>
              <span className="w-1 h-1 bg-black/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
