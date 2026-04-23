"use client";

import { motion } from "framer-motion";

const COMPARISON_DATA = [
  {
    feature: "Senior-Level Execution",
    cinmachRed: "Every time,",
    cinmachDark: " no exceptions",
    inhouse: "Sometimes",
    agency: "Rarely",
  },
  {
    feature: "Strategic Thinking",
    cinmachRed: "Built-in,",
    cinmachDark: " from day one",
    inhouse: "Depends on hire",
    agency: "Add-on cost",
  },
  {
    feature: "Timeline Transparency",
    cinmachRed: "Transparent,",
    cinmachDark: " strictly scoped",
    inhouse: "Varies",
    agency: "Often vague",
  },
  {
    feature: "Scalable Brand Systems",
    cinmachRed: "Standard,",
    cinmachDark: " baseline offering",
    inhouse: "Uncommon",
    agency: "Project-by-project",
  },
  {
    feature: "Flexible Engagement",
    cinmachRed: "Fluid,",
    cinmachDark: " scales instantly",
    inhouse: "Salary-locked",
    agency: "Contract-locked",
  },
  {
    feature: "Start Date",
    cinmachRed: "Immediate,",
    cinmachDark: " within 48 hours",
    inhouse: "Weeks to hire",
    agency: "Days to onboard",
  },
  {
    feature: "Cost Structure",
    cinmachRed: "Clear,",
    cinmachDark: " fully scoped",
    inhouse: "Salary + benefits",
    agency: "Retainer + overages",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <section data-theme="light" className="py-24 md:py-40 bg-white">
      <div className="container max-w-6xl">
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
              Most Agencies Execute.<br />We Engineer Outcomes.
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
                <div className="relative px-8 py-[26px] flex items-center bg-[#FAFAFA] border-x border-black/[0.08] transition-transform duration-300 ease-out group-hover:scale-[1.01] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(0,0,0,0.03)] z-10">
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

        {/* Mobile View (Cards) */}
        <div className="md:hidden flex flex-col gap-6">
          {COMPARISON_DATA.map((row, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-white border border-[#EAEAEA] p-6 flex flex-col gap-6 relative shadow-sm">
                <h3 className="font-medium text-black text-lg">{row.feature}</h3>
                
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5 p-4 bg-[#FAFAFA] border-l-2 border-[#B11226]">
                    <span className="text-[10px] font-black tracking-[0.1em] uppercase text-black">Cinmach</span>
                    <span className="font-semibold text-[14px]">
                      <span className="text-[#B11226] mr-2">✓</span>
                      <span className="text-[#B11226]">{row.cinmachRed}</span>
                      <span className="text-black">{row.cinmachDark}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#8A8A8A]">In-House Hire</span>
                    <span className="font-normal text-[#8A8A8A] text-[13px]">{row.inhouse}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#8A8A8A]">Typical Agency</span>
                    <span className="font-normal text-[#8A8A8A] text-[13px]">{row.agency}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
      </div>
    </section>
  );
}
