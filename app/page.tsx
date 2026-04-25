"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import ProcessSection from "@/components/ProcessSection";
import SmartVideo from "@/components/SmartVideo";
import Comparison from "@/components/Comparison";
import PricingSection from "@/components/PricingSection";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal
   ─────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services Table Component (Interactive Accordion)
   ─────────────────────────────────────────────────────────── */
const SERVICES_DATA = [
  {
    num: "01",
    title: "Real Estate Films",
    desc: "Cinematic property visuals that sell the lifestyle, not just the space.",
    sub: ["Interior Shoots", "Exterior Cinematics", "Drone Coverage"],
  },
  {
    num: "02",
    title: "Brand Commercials",
    desc: "High-end brand stories that make your audience feel — not just watch.",
    sub: ["Creative Direction", "Storyboarding", "Production"],
  },
  {
    num: "03",
    title: "Social Media Ads",
    desc: "Scroll-stopping vertical content engineered for maximum retention.",
    sub: ["Short-form Content", "Reels / TikTok Ads", "Campaign Content"],
  },
  {
    num: "04",
    title: "Video Editing",
    desc: "Precision post-production — colour, sound, and cut to a premium standard.",
    sub: ["Color Grading", "Sound Design", "Motion Graphics"],
  },
];


/* ─────────────────────────────────────────────────────────────
   Local Time Component
   ─────────────────────────────────────────────────────────── */
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata', // Based on the screenshot's IST reference
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <p className="text-black font-black text-lg md:text-xl tracking-tight uppercase">
        {time || "00:00:00 AM"} IST
      </p>
    </div>
  );
}

function ServicesTable() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Unified Grid to ensure exact column alignment for both headers and sub-services
  const gridLayout = "grid-cols-1 md:grid-cols-[60px_1.5fr_2fr_40px] lg:grid-cols-[80px_1fr_2fr_40px]";

  return (
    <div className="flex flex-col border-t border-black/10">
      {SERVICES_DATA.map((svc, i) => {
        const isOpen = openIndex === i;
        const isDimmed = openIndex !== null && !isOpen;

        return (
          <Reveal key={svc.num} delay={i * 0.05}>
            <div 
              className={`relative border-b border-black/10 transition-all duration-700 ease-[0.16,1,0.3,1] 
                ${isDimmed ? "opacity-50 saturate-0" : "opacity-100"}`}
            >
              {/* Active Left Accent Line */}
              <div 
                className={`absolute top-0 bottom-0 left-0 w-[3px] bg-[#8B0016] transition-transform duration-500 ease-out origin-top z-10
                  ${isOpen ? "scale-y-100 shadow-[2px_0_15px_rgba(139,0,22,0.2)]" : "scale-y-0"}`} 
              />
              
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`w-full text-left group grid items-start md:items-center py-8 md:py-10 gap-5 md:gap-8 transition-colors duration-500 px-5 md:px-8 lg:px-10
                  ${gridLayout} 
                  ${isOpen ? "bg-black/[0.015]" : "hover:bg-black/[0.03]"}`}
              >
                {/* Desktop Number */}
                <span className={`font-mono text-[11px] tracking-[0.3em] uppercase hidden md:block transition-colors duration-300 ${isOpen ? "text-[#8B0016]" : "text-black/40 group-hover:text-[#8B0016]"}`}>
                  {svc.num}
                </span>

                {/* Mobile Single Row (Hidden on Desktop) */}
                <div className="flex items-center justify-between w-full md:hidden">
                  <div className="flex items-center gap-5">
                    <span className="text-[#8B0016] font-mono text-[10px] tracking-[0.2em] uppercase shrink-0">
                      {svc.num}
                    </span>
                    <h3
                      className={`font-black flex-1 transition-all duration-300 ${isOpen ? "text-black" : "text-black/80 group-hover:text-black"}`}
                      style={{ fontSize: "1.35rem", letterSpacing: "-0.03em" }}
                    >
                      {svc.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? "bg-[#8B0016] border-[#8B0016] text-white" : "border-black/10 text-black/40 group-hover:bg-[#8B0016] group-hover:border-[#8B0016] group-hover:text-white"}`}>
                    <motion.div animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.4 }}>+</motion.div>
                  </div>
                </div>

                {/* Desktop Title */}
                <h3
                  className={`hidden md:block font-black transition-all duration-300 pr-4 lg:pr-8
                    ${isOpen ? "text-black" : "text-black/90 group-hover:text-black"}`}
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  {svc.title}
                </h3>
                
                {/* Description */}
                <p 
                  className={`text-sm md:text-base leading-relaxed transition-colors duration-500 
                    ${isOpen ? "text-black/90" : "text-black/60 group-hover:text-black/80"}`}
                >
                  {svc.desc}
                </p>
                
                {/* Desktop Action Icon */}
                <div className="hidden md:flex justify-end relative">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500 
                    ${isOpen ? "bg-[#8B0016] border-[#8B0016] text-white" : "border-black/10 text-black/30 group-hover:bg-[#8B0016] group-hover:border-[#8B0016] group-hover:text-white group-hover:translate-x-1"}`}
                  >
                     <motion.div
                       initial={false}
                       animate={{ rotate: isOpen ? 135 : 0 }}
                       transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                       className="pb-0.5 text-xl font-light"
                     >
                       +
                     </motion.div>
                  </div>
                </div>
              </button>

              {/* Sub-services Accordion Grid */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-black/[0.015]"
                  >
                    {/* Maps flawlessly to the same grid layout as the button above */}
                    <div className={`grid items-start gap-4 md:gap-8 px-5 md:px-8 lg:px-10 pb-12 ${gridLayout}`}>
                      
                      {/* Empty Col 1 (Offset Number) */}
                      <div className="hidden md:block" />

                      {/* Col 2: Sub-services strictly indented under the Title */}
                      <div className="flex flex-col gap-5 pt-6 md:border-t border-black/5 md:mt-[-1.5rem]">
                        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#8B0016] font-mono font-bold mb-1">
                          Scope of Work
                        </p>
                        <div className="flex flex-col gap-3.5">
                          {svc.sub.map((subItem, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: idx * 0.06 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              className="flex items-center gap-4 text-black/80 text-[14px] md:text-[15px] tracking-wide font-medium"
                            >
                              <div className="w-6 h-[1px] bg-black/10" />
                              {subItem}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Invisible divs to fill remaining structural columns on desktop */}
                      <div className="hidden md:block border-t border-black/5 mt-[-1.5rem]" /> 
                      <div className="hidden md:block border-t border-black/5 mt-[-1.5rem]" />

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}



/* ─────────────────────────────────────────────────────────────
   Home Page
   ─────────────────────────────────────────────────────────── */
export default function Home() {
  const { openProjectModal } = useModal();

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════════════════ */}
      <main className="relative bg-black min-h-screen">

        <section
          data-theme="red"
          className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden py-[100px] lg:py-[140px]"
        >
        {/* Background Video */}
        <SmartVideo
          src="https://www.pexels.com/download/video/8396974/"
          poster="https://images.pexels.com/photos/8396974/pexels-photo-8396974.jpeg"
          autoPlayViewport={true}
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

        {/* Content Wrapper */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col">
          
          <div className="w-full mb-6 md:mb-10 lg:mb-12">
            <p className="text-white font-mono tracking-[0.2em] uppercase text-[10px] md:text-[11px] anim-fade-up opacity-40">
              [ Cinmach Productions · Manama ]
            </p>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-[60px] xl:gap-[80px] items-start lg:items-center">
            
            {/* Left Column (60%) */}
            <div className="w-full lg:w-[60%] flex flex-col shrink-0">
              <h1
                className="text-white font-black leading-[0.9] tracking-tighter"
                style={{ fontSize: "clamp(40px, 10vw, 120px)" }}
              >
                <span className="block anim-fade-up anim-delay-1">CREATE</span>
                <span className="block anim-fade-up anim-delay-2">YOUR</span>
                <span className="block anim-fade-up anim-delay-3">PRESENCE.</span>
              </h1>
            </div>

            {/* Right Column (40%) */}
            <div className="w-full lg:w-[40%] flex flex-col items-start anim-fade-up anim-delay-3">
               <p 
                 className="text-white font-black leading-[1.1] tracking-tight mb-4 lg:mb-6"
                 style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
               >
                 We don’t shoot content.<br className="hidden lg:block lg:mb-1" /> We build perception.
               </p>
               <p
                 className="text-white/60 font-medium tracking-wide mb-10"
                 style={{ fontSize: "clamp(14px, 1.2vw, 16px)", lineHeight: 1.65 }}
               >
                 From strategy to final delivery, we create cinematic content that captures attention and positions you above the competition.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <Link
                    href="/work"
                    className="w-full sm:w-[180px] py-[18px] bg-[#B11226] text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center border border-[#B11226] hover:border-white"
                  >
                    View Work
                  </Link>
                  <button
                    onClick={openProjectModal}
                    type="button"
                    className="w-full sm:w-[180px] py-[18px] bg-transparent border border-white/20 text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center"
                  >
                    Start Project
                  </button>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2+3  ABOUT + SERVICES — WHITE (unified)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">



          {/* ── Divider + Services Label ── */}
          <Reveal>
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px flex-1 bg-black/10" />
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] shrink-0">Services</p>
            </div>
          </Reveal>

          {/* ── Interactive Service Table ── */}
          <ServicesTable />

          {/* CTA */}
          <Reveal className="mt-10 flex justify-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-black/40 font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black/20 pb-1 hover:text-[#8B0016] hover:border-[#8B0016] transition-all duration-300"
            >
              View All Services →
            </Link>
          </Reveal>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          §4  PROCESS — BLACK
      ══════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════
          §4  PROCESS — BLACK (PRCPTIV STYLE)
      ══════════════════════════════════════════════════════ */}
      <div data-theme="dark">
        <ProcessSection />
      </div>


      {/* ══════════════════════════════════════════════════════
          §5  FEATURED WORK — WHITE (EDITORIAL)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32 bg-white relative">
        <div className="container relative z-10">

          {/* Elevated Header */}
          <Reveal className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/5 pb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-px bg-[#8B0016]" />
                  <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[9px] font-bold">
                    Portfolio
                  </p>
                </div>
                <h2
                  className="text-black font-black leading-[0.9]"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
                >
                  SELECTED<br />WORK.
                </h2>
              </div>
              <div className="mt-8 md:mt-0 hidden md:block">
                <Link
                  href="/work"
                  className="group flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-black/10 relative overflow-hidden transition-all duration-700 hover:border-[#8B0016] shrink-0"
                >
                  <div className="absolute inset-0 bg-[#8B0016] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] rounded-full" />
                  <span className="relative z-10 text-black group-hover:text-white font-mono text-[9px] tracking-[0.3em] uppercase transition-colors duration-500 text-center">
                    Explore<br />Archive
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Master Grid containing Tier 1 and Tier 1.5 in a mixed layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-16">
            
            {/* Left Column (Vertical Reel + Tall Content) */}
            <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
              <Reveal delay={0.1}>
                {/* Automotive Showcase Vertical Reel */}
                <div className="group relative aspect-[9/16] bg-neutral-100 rounded-[8px] overflow-hidden cursor-pointer border border-black/5 shadow-sm">
                  <SmartVideo 
                    src="https://www.pexels.com/download/video/31588827/"
                    hoverPlay={true}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:translate-y-0 translate-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-white/50 font-mono text-[10px] tracking-[0.3em] border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">01</span>
                    </div>
                    <div>
                      <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.4em] uppercase mb-3 drop-shadow-md">Automotive</p>
                      <h4 className="text-white font-black text-2xl lg:text-3xl tracking-tight leading-tight">Speed &<br />Motion</h4>
                    </div>
                  </div>
                  {/* Subtle Red Frame on Hover */}
                  <div className="absolute inset-0 border-[3px] border-[#8B0016] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[8px] pointer-events-none" />
                </div>
              </Reveal>
              
              <Reveal delay={0.2} className="hidden lg:block">
                <div className="p-8 border border-black/5 bg-neutral-50 rounded-[8px]">
                  <p className="text-black/60 font-serif leading-relaxed text-lg italic">
                    "A curated selection of our most visceral, high-impact projects. Built to define luxury and power."
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column (Two 16:9s Stacked) */}
            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
              {[
                { label: "02", title: "Lee Heritage", cat: "Hospitality", vid: "https://www.pexels.com/download/video/3121459/" },
                { label: "03", title: "Heaven View Villa", cat: "Real Estate", vid: "https://www.pexels.com/download/video/8422238/" },
              ].map((video, idx) => (
                <Reveal key={video.label} delay={0.15 + (idx * 0.1)}>
                  <div className="group relative aspect-video overflow-hidden bg-black cursor-pointer rounded-[8px] shadow-sm">
                    <div className="absolute inset-0 pointer-events-none">
                      <SmartVideo
                        src={video.vid}
                        hoverPlay={true}
                        className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                      <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 group-hover:translate-y-0">
                         <span className="text-white/40 font-mono text-[10px] tracking-[0.2em]">{video.label}</span>
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                           <span className="text-white font-light text-xl">+</span>
                         </div>
                      </div>
                      
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.4em] uppercase mb-3">{video.cat}</p>
                        <h4 className="text-white font-black text-3xl md:text-5xl tracking-tighter leading-none">{video.title}</h4>
                      </div>
                    </div>
                    {/* Red Accent Line growing from left */}
                    <div className="absolute bottom-0 left-0 h-[4px] bg-[#8B0016] w-0 group-hover:w-full transition-all duration-[800ms] ease-[0.16,1,0.3,1] z-20 pointer-events-none" />
                  </div>
                </Reveal>
              ))}
            </div>

          </div>

          {/* Tier 2: Image Showcase (Small Square Highlights) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-black/5 pt-12">
            {[
              { label: "04", title: "Harbour Row",          cat: "Hospitality", driveId: "1LGbCekMBgMNNIyabVbFiTkVO6-brJgAe", bg: "bg-neutral-100" },
              { label: "05", title: "Ebrahim Identity",     cat: "Brand",       driveId: "1TZB5T-PnWl2-cePCrcC4tdsJAz2PSI3w", bg: "bg-neutral-200" },
              { label: "06", title: "Corporate Assets",     cat: "Corporate",   driveId: "1-b48lZJ5UFnpe6QG639kJAiB0O6yqGBI", bg: "bg-neutral-100" },
              { label: "07", title: "Brand Vision",         cat: "Identity",    driveId: "1Ex9QPsfx6VsIX8GhiDqmSNStOrg76OHp", bg: "bg-neutral-200" },
            ].map((project, idx) => (
              <Reveal key={project.label} delay={0.2 + (idx * 0.05)}>
                <motion.div
                  className={`group relative aspect-square overflow-hidden rounded-[8px] ${project.bg} cursor-pointer shadow-sm`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={`https://drive.google.com/thumbnail?sz=w1000&id=${project.driveId}`}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.12]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#8B0016] font-mono text-[8px] tracking-[0.3em] uppercase mb-2">{project.cat}</p>
                    <h4 className="text-white font-black text-xs md:text-sm tracking-tight leading-snug">{project.title}</h4>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Mobile-focused CTA below grid */}
          <Reveal delay={0.4} className="mt-12 flex justify-center">
            <Link
              href="/work"
              className="w-full md:w-auto px-12 py-5 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-4"
            >
              View All Projects <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <PricingSection />

      {/* ══════════════════════════════════════════════════════
          §6  ABOUT / POSITIONING — WHITE
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">
          <Reveal className="mb-12">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[9px] font-bold">About Us</p>
            </div>
          </Reveal>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">
            {/* Left Narrative */}
            <Reveal className="lg:w-1/2 shrink-0">
              <h2
                className="font-black text-black mb-10"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                CRAFTED IN<br />BAHRAIN.<br />
                <span className="text-black/30">BUILT FOR<br />THE WORLD.</span>
              </h2>
              <p className="text-black/70 max-w-md font-light" style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.8 }}>
                We are a boutique cinematic production studio rooted in Bahrain, creating high-end visual content for forward-thinking brands across the Gulf and beyond. We don't just fill space; we architect perception.
              </p>
            </Reveal>

            {/* Right Architectural Stats Grid */}
            <Reveal delay={0.2} className="w-full lg:w-[480px] shrink-0">
              <div className="grid grid-cols-1 border-t border-black/10">
                {[
                  { stat: "5+",  label: "Years of craft",     desc: "Visual storytelling refined into a precise, repeatable signature system." },
                  { stat: "40+", label: "Projects delivered", desc: "From intimate restaurants to large-scale real estate developments." },
                  { stat: "BH",  label: "Based in Bahrain",   desc: "Serving the GCC region and international brands with local precision." },
                ].map((item, idx) => (
                  <div key={item.stat} className="group relative border-b border-black/10 py-8 flex items-start gap-8 overflow-hidden transition-colors duration-500 hover:bg-white hover:px-6">
                    {/* Hover subtle red accent beam */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8B0016] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                    
                    <span 
                      className="text-[#8B0016] font-black shrink-0 transition-transform duration-500 group-hover:scale-105" 
                      style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                    >
                      {item.stat}
                    </span>
                    <div className="pt-1">
                      <p className="text-black font-black text-sm tracking-tight uppercase mb-2 group-hover:text-[#8B0016] transition-colors">{item.label}</p>
                      <p className="text-black/50 text-xs leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6a  COMPARISON MATRIX
      ══════════════════════════════════════════════════════ */}
      <Comparison />

      {/* ══════════════════════════════════════════════════════
          §6b  TRUSTED BY (SOCIAL PROOF)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-12 md:py-16 border-t border-b border-black/5 bg-white overflow-hidden flex flex-col items-center">
        <p className="text-black/30 font-mono text-[9px] tracking-[0.4em] uppercase mb-8 md:mb-12 text-center">Trusted by Industry Leaders</p>
        <div className="relative w-full flex overflow-hidden">
           <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
           <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
           
           <motion.div 
             className="flex gap-16 md:gap-32 items-center whitespace-nowrap px-8"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ ease: "linear", duration: 30, repeat: Infinity }}
           >
              {/* Duplicate the array to create identical infinite scroll */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 md:gap-32 items-center">
                  <span className="text-black/20 font-black text-2xl md:text-3xl tracking-tighter hover:text-black/80 transition-colors cursor-default">OMNI.</span>
                  <span className="text-black/20 font-sans font-bold text-xl md:text-2xl uppercase tracking-widest hover:text-black/80 transition-colors cursor-default">Zephyr</span>
                  <span className="text-black/20 font-serif italic text-2xl md:text-3xl hover:text-black/80 transition-colors cursor-default">Atelier</span>
                  <span className="text-black/20 font-black text-2xl md:text-4xl tracking-tighter hover:text-black/80 transition-colors cursor-default">NOVA</span>
                  <span className="text-black/20 font-mono text-xl md:text-2xl uppercase hover:text-black/80 transition-colors cursor-default">System</span>
                </div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6b  TESTIMONIALS — ELEVATED HIGH-DENSITY SYSTEM
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32 bg-white overflow-hidden relative">
        <div className="container max-w-7xl mb-12 flex justify-center">
          <Reveal className="text-center">
            <div className="flex items-center gap-3 justify-center">
              <span className="w-4 h-px bg-[#B11226]" />
              <p className="text-[#8A8A8A] font-mono tracking-[0.3em] uppercase text-[10px] font-bold">Client Feedback</p>
              <span className="w-4 h-px bg-[#B11226]" />
            </div>
          </Reveal>
        </div>

        <div className="relative w-full flex flex-col gap-6 select-none cursor-default">
           {/* Fading Edges for Marquee */}
           <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
           <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

           {/* Row 1 (Scrolls Left) */}
           <motion.div 
             className="flex gap-6 w-max"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ ease: "linear", duration: 40, repeat: Infinity }}
           >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-6 items-stretch shrink-0 pr-6">
                  {[
                    { quote: "The shift in our market positioning was immediate. Cinmach codified a visual DNA that moved us from a local player to a premium entity.", name: "Omar Rahman", role: "Director of Operations · Real Estate Firm" },
                    { quote: "They didn't just produce content; they engineered a perception of excellence that has redefined our entire brand authority.", name: "Sara Malik", role: "Marketing Director · Creative Agency" },
                    { quote: "Our brand perception underwent a total transformation. The cinematic ecosystem they built has positioned us as the default choice in our tier.", name: "Ahmed Khan", role: "Founder · Technology Brand" },
                    { quote: "The visual framework Cinmach established has shifted how stakeholders engage with our firm. We finally look as formidable as we are.", name: "Elena R.", role: "Managing Partner · Investment Group" },
                    { quote: "Cinematically, they are unmatched. They didn't just capture our projects; they built a visual standard that has elevated our entire portfolio.", name: "Fahad A.", role: "Head of Creative · Development Company" }
                  ].map((t, idx) => (
                    <div 
                      key={idx} 
                      className="w-[300px] md:w-[480px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-[6px] p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
                    >
                      <p className="text-black font-medium leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}>
                        "{t.quote}"
                      </p>
                      <div className="mt-auto flex items-center gap-3 pt-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B11226] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-black font-bold text-[13px]">{t.name}</span>
                          <span className="text-[#8A8A8A] text-[11px] uppercase tracking-wider mt-0.5">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
           </motion.div>

           {/* Row 2 (Scrolls Right) */}
           <motion.div 
             className="flex gap-6 w-max"
             animate={{ x: ["-50%", "0%"] }}
             transition={{ ease: "linear", duration: 45, repeat: Infinity }}
           >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-6 items-stretch shrink-0 pr-6">
                  {[
                    { quote: "Every frame is an intentional move toward more premium positioning. Our audience response has shifted from interest to total trust.", name: "Daniel Carter", role: "VP of Growth · Digital Venture" },
                    { quote: "The visual consistency across our assets has solidified a cohesive brand image that finally matches our high-end service standards.", name: "Aisha R.", role: "Marketing Manager · Hospitality Group" },
                    { quote: "The perception shift was palpable. By prioritizing cinematic visual identity, our brand now commands a much higher authority in the market.", name: "James C.", role: "CEO · Private Business" },
                    { quote: "They captured our exact essence and elevated it. Our brand identity now feels intentionally premium and globally competitive.", name: "Layla Noor", role: "Owner · Lifestyle Brand" },
                    { quote: "A complete overhaul of our visual perception. Cinmach turned our technical operations into a cinematic story of reliability and scale.", name: "Tariq Hassani", role: "General Manager · Logistics Firm" }
                  ].map((t, idx) => (
                    <div 
                      key={idx} 
                      className="w-[300px] md:w-[480px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-[6px] p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
                    >
                      <p className="text-black font-medium leading-relaxed" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}>
                        "{t.quote}"
                      </p>
                      <div className="mt-auto flex items-center gap-3 pt-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B11226] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-black font-bold text-[13px]">{t.name}</span>
                          <span className="text-[#8A8A8A] text-[11px] uppercase tracking-wider mt-0.5">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
           </motion.div>
        </div>
      </section>


      </main>
    </>
  );
}
