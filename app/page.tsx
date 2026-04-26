"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={`will-change-[transform,opacity] ${className}`}
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
    title: "Food & Hospitality Content",
    desc: "Appetizing, high-converting cinematic visuals that drive footfall and build authority.",
    sub: ["Reels & Short-form Ads", "Menu & Food Cinematography", "Social Media Packages"],
  },
  {
    num: "02",
    title: "Real Estate & Spaces",
    desc: "Cinematic property visuals that sell the lifestyle, not just the space.",
    sub: ["Interior Shoots", "Exterior Cinematics", "Drone Coverage"],
  },
  {
    num: "03",
    title: "Brand Commercials",
    desc: "High-end brand stories that make your audience feel - not just watch.",
    sub: ["Creative Direction", "Storyboarding", "Production"],
  },
  {
    num: "04",
    title: "Post-Production",
    desc: "Precision editing - colour, sound, and cut to a premium standard.",
    sub: ["Color Grading", "Sound Design", "Motion Graphics"],
  },
];

function ServicesTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const featured = SERVICES_DATA[0];
  const secondary = SERVICES_DATA.slice(1);

  return (
    <div className="flex flex-col gap-0">

      {/* ── Featured Service: Food & Hospitality ── */}
      <Reveal>
        <div
          className="group relative overflow-hidden rounded-[4px] mb-3"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ minHeight: "320px" }}
        >
          {/* Cinematic food background video */}
          <img
            src="https://images.pexels.com/photos/33033789/pexels-photo-33033789.jpeg"
            alt="Food & Hospitality Content"
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
            loading="lazy"
            decoding="async"
          />
          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-700" />
          {/* Subtle upward gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-12 lg:p-14" style={{ minHeight: "320px" }}>
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-[#B11226] font-mono text-[10px] tracking-[0.4em] font-bold">Featured / 01</span>
              <div className="px-3 py-1 bg-[#B11226] text-white text-[8px] font-mono font-bold tracking-widest uppercase rounded-[2px]">High Retention</div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-white font-black leading-[0.9] tracking-tighter mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.04em" }}>
                  FOOD &<br />HOSPITALITY CONTENT
                </h3>
                <p className="text-white/70 text-base md:text-xl font-light leading-relaxed max-w-md">
                  Cinematic content that makes people choose your restaurant before they even arrive.
                </p>
              </div>
              <button type="button" className="group/btn flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#B11226] hover:text-white">
                View Work <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Secondary Services ── */}
      <div className="flex flex-col border-t border-white/10">
        {secondary.map((svc, i) => {
          const idx = i + 1;
          const isHovered = hoveredIndex === idx;
          const isOpen = openAccordion === idx;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
          return (
            <Reveal key={svc.num} delay={i * 0.06}>
              <div
                className={`group relative flex flex-col border-b border-white/10 transition-all duration-500
                  ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                {/* Left accent */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#B11226] origin-bottom transition-transform duration-500 ease-out z-10
                    ${isHovered || isOpen ? "scale-y-100" : "scale-y-0"}`}
                />

                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setOpenAccordion(isOpen ? null : idx)}
                  className="flex flex-row items-center justify-between gap-4 md:gap-8 py-7 md:py-8 px-2 cursor-pointer"
                >
                  {/* Number */}
                  <span className={`font-mono text-[10px] tracking-[0.4em] shrink-0 w-10 transition-colors duration-300 ${isOpen ? "text-[#B11226]" : "text-white/25 group-hover:text-[#B11226]"}`}>
                    {svc.num}
                  </span>

                  {/* Title */}
                  <h3
                    className={`flex-1 font-black transition-all duration-300 group-hover:translate-x-1 leading-tight ${isOpen ? "text-white translate-x-1" : "text-white/80 group-hover:text-white"}`}
                    style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", letterSpacing: "-0.03em" }}
                  >
                    {svc.title}
                  </h3>

                  {/* Desc */}
                  <p className="md:flex-1 text-sm text-white/45 leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300 max-w-sm hidden md:block">
                    {svc.desc}
                  </p>

                  {/* Toggle CTA */}
                  <div className="shrink-0 flex items-center justify-end w-8">
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-xl font-light transition-colors duration-300 ${isOpen || isHovered ? "text-[#B11226]" : "text-white/40"}`}
                    >
                      +
                    </motion.div>
                  </div>
                </div>

                {/* Dropdown body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 md:pl-[84px] pb-8 flex flex-col md:flex-row gap-6 md:gap-12 w-full items-start">
                        <div className="flex flex-col gap-3 flex-1">
                          <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#B11226] font-bold mb-1">Includes</p>
                          {svc.sub.map((subItem, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-3">
                              <span className="w-1 h-1 bg-[#B11226] rounded-full shrink-0" />
                              <span className="text-sm text-white/70">{subItem}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { openProjectModal } = useModal();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-1">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1: HERO
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="dark" className="relative h-screen min-h-[700px] w-full overflow-hidden flex flex-col">
          <SmartVideo 
            src="/bg-rest.mp4" 
            autoPlay={true}
            autoPlayViewport={true}
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-black/50 z-[1]" />
          <motion.div 
            className="absolute inset-0 bg-black z-[2]" 
            initial={{ scaleY: 1 }} 
            animate={{ scaleY: 0 }} 
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-[3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />
          {/* Architectural Grid Overlay */}
          <div className="absolute inset-0 z-[3] pointer-events-none">
            <div className="container h-full relative">
              {/* Vertical Lines */}
              <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0 opacity-[0.06]">
                {[...Array(13)].map((_, i) => (
                  <div key={i} className="border-r border-white h-full" />
                ))}
              </div>
              
              {/* Horizontal Lines */}
              <div className="absolute left-0 right-0 top-[15%] border-t border-white/10" />
              <div className="absolute left-0 right-0 bottom-[25%] border-t border-white/10" />
              <div className="absolute left-0 right-0 bottom-[10%] border-t border-white/10" />
            </div>
          </div>

          <div className="relative z-[4] flex flex-col h-full px-8 md:px-14 lg:px-24">
            <div className="flex items-center justify-between pt-12 md:pt-16 lg:pt-20 shrink-0">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-white/35 font-mono tracking-[0.3em] uppercase text-[9px]">[ Cinmach Productions · Manama ]</motion.p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B11226] rounded-full animate-pulse" />
                <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Now Booking — Limited Slots</span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center py-4">
              <Reveal delay={0.2}>
                <h1 className="text-white font-black leading-[0.88] tracking-tighter mb-4 lg:mb-6" style={{ fontSize: "clamp(3rem, 9vw, 6.8rem)", letterSpacing: "-0.04em" }}>
                  Cinematic<br />
                  content for<br />
                  <span className="text-[#B11226] uppercase">RESTAURANTS<br />&amp; CAFÉS.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.4} className="max-w-xl">
                <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed font-light">
                  We create high-end cinematic visuals that drive footfall, elevate perception, and turn views into real bookings — built specifically for hospitality brands in the GCC.
                </p>
              </Reveal>
            </div>

            <div className="pb-8 md:pb-12 lg:pb-16 shrink-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/5 pt-8">
                <div className="lg:col-span-9 flex flex-wrap items-center gap-8 md:gap-16">
                  <Reveal delay={0.5}>
                    <div className="flex flex-col">
                      <span className="text-white font-black text-3xl md:text-4xl tracking-tighter">40+</span>
                      <span className="text-white/30 font-mono text-[8px] uppercase tracking-widest mt-1">Restaurants</span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.6}>
                    <div className="flex flex-col">
                      <span className="text-white font-black text-3xl md:text-4xl tracking-tighter">3x</span>
                      <span className="text-white/30 font-mono text-[8px] uppercase tracking-widest mt-1">Engagement</span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.7}>
                    <div className="flex flex-col">
                      <span className="text-white font-black text-3xl md:text-4xl tracking-tighter">BH</span>
                      <span className="text-white/30 font-mono text-[8px] uppercase tracking-widest mt-1">Bahrain</span>
                    </div>
                  </Reveal>
                </div>

                <div className="lg:col-span-3 flex justify-end">
                  <button 
                    onClick={openProjectModal}
                    className="group relative flex items-center gap-6 px-10 py-5 bg-white text-black text-[10px] font-mono font-bold tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden whitespace-nowrap shadow-2xl"
                  >
                     {/* Subtle Red Brand Accent Line (Static) */}
                     <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B11226] z-20" />

                     <span className="relative z-10 transition-colors duration-500 flex items-center group-hover:text-white">
                       BOOK YOUR SHOOT <span className="ml-5 transform group-hover:translate-x-2 transition-transform duration-500 opacity-70 group-hover:opacity-100">→</span>
                     </span>
                     
                     <div className="absolute inset-0 bg-[#B11226] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 2: RESTAURANT IMPACT (WHITE THEME)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="light" className="py-32 md:py-32 bg-white text-black relative">
          <div className="container relative z-10">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-[#B11226]" />
                <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">For Restaurants &amp; Cafes</p>
              </div>
              <h2 className="text-black font-black leading-[0.9] tracking-tighter mb-12 lg:mb-16" style={{ fontSize: "clamp(2.2rem, 8vw, 4.5rem)", letterSpacing: "-0.04em" }}>
                CONTENT THAT MAKES<br /><span className="text-black/20">THEM CHOOSE YOU.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
              <Reveal delay={0.1}>
                <h3 className="font-bold text-xl md:text-2xl mb-6 leading-tight">Built for restaurants that want to stand out.</h3>
                <p className="text-black/60 text-base md:text-lg leading-relaxed font-light mb-10 max-w-lg">
                  We turn your food, space, and vibe into content that actually drives customers.<br className="hidden md:block" />
                  Not just visuals — content that makes people choose you.
                </p>
                <div className="flex gap-4 items-center border-l-2 border-[#B11226] pl-6 py-2">
                  <div className="text-black/30 uppercase tracking-widest text-[9px] font-mono">Before</div>
                  <div className="h-px w-4 bg-black/10" />
                  <div className="text-[#B11226] uppercase tracking-widest text-[9px] font-mono font-bold">The Transformation</div>
                  <div className="h-px flex-1 bg-black/10 hidden sm:block" />
                  <div className="text-black uppercase tracking-widest text-[9px] font-mono font-bold ml-auto sm:ml-0">After</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-[12px] md:text-base font-medium mt-4 pl-6 opacity-80 gap-2 sm:gap-0">
                  <span>Generic Static Shots</span>
                  <span className="text-black/20 hidden sm:block">→</span>
                  <span className="text-left sm:text-right">Cinematic, High-Retention Reels</span>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="bg-black/5 border border-black/5 p-6 md:p-10 hover-lift rounded-sm">
                <h4 className="font-mono text-[#B11226] text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">Our Workflow</h4>
                <ul className="flex flex-col gap-6">
                  {[
                    { step: "01", text: "Shoot", desc: "High-quality filming of your food and space" },
                    { step: "02", text: "Edit", desc: "We turn the clips into exciting short videos" },
                    { step: "03", text: "Deliver", desc: "Final videos sent, ready for social media" },
                    { step: "04", text: "Growth", desc: "Reach more people and get more customers" },
                  ].map((s, i) => (
                    <li key={i} className="flex items-center gap-6 group">
                      <span className="font-mono text-[#B11226] opacity-50 group-hover:opacity-100 transition-opacity text-xs">{s.step}</span>
                      <div>
                        <span className="block font-black text-black uppercase tracking-wide text-lg">{s.text}</span>
                        <span className="text-black/40 text-sm mt-0.5">{s.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3: WHAT WE DO / SERVICES (BLACK THEME)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="dark" className="py-24 md:py-32 bg-black text-white relative">
          <div className="container">
            <Reveal>
              <div className="flex items-center gap-6 mb-3">
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-[#B11226] font-mono tracking-[0.3em] uppercase text-[10px] shrink-0 font-bold">Services</p>
              </div>
            </Reveal>
            <Reveal className="mb-10">
              <h2 className="font-black text-white leading-[0.92] tracking-tighter uppercase" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}>How we help<br />your place grow.</h2>
              <p className="text-white/40 mt-6 max-w-lg font-light text-base md:text-lg">
                No complex marketing talk here. Just high-quality videos that make people in Bahrain crave your food. Simple as that.
              </p>
            </Reveal>
            <ServicesTable />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 4: PORTFOLIO / SELECTED WORK
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="bg-white pt-32 pb-20">
          <div className="container">
            <div className="flex flex-col">
              <div className="h-[2px] w-full bg-black mb-12" />
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[12px] font-bold mb-6">Our Work</p>
                  <h2 className="text-black font-black leading-[0.85] tracking-tighter" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "-0.05em" }}>
                    PROJECTS<br />WE LOVE.
                  </h2>
                </div>
                <div className="max-w-xs pb-4">
                  <p className="text-black/50 text-sm font-light leading-relaxed italic">
                    Bringing those Manama vibes to the screen. Khalas, your search for a camera team ends here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section data-theme="light" className="pb-24 md:pb-40 bg-white text-black overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-5">
                <Reveal delay={0.1}>
                  <div className="group relative aspect-[9/16] bg-black/5 rounded-2xl overflow-hidden cursor-pointer hover-lift">
                    <SmartVideo src="https://www.pexels.com/download/video/3298720/" autoPlayViewport={true} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <p className="text-[#B11226] font-mono text-[9px] tracking-[0.4em] uppercase mb-2">Hospitality</p>
                      <h4 className="text-white font-black text-4xl">Culinary Art</h4>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
                {[
                  { title: "Elegant Dining", cat: "Hospitality", vid: "https://www.pexels.com/download/video/12188718/" },
                  { title: "Atmosphere", cat: "Hospitality", vid: "https://www.pexels.com/download/video/5657164/" },
                ].map((video, idx) => (
                  <Reveal key={idx} delay={0.15 + (idx * 0.1)}>
                    <div className="group relative aspect-video overflow-hidden bg-white/5 rounded-2xl cursor-pointer hover-lift">
                      <SmartVideo src={video.vid} autoPlayViewport={true} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <p className="text-[#B11226] font-mono text-[9px] tracking-[0.4em] uppercase mb-2">{video.cat}</p>
                        <h4 className="text-white font-black text-4xl">{video.title}</h4>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 5: PROCESS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ProcessSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 6: PRICING
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <PricingSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 7: SOCIAL PROOF (REVERTED)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 7: SOCIAL PROOF (REFINED)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="light" className="py-20 md:py-28 bg-white text-black overflow-hidden relative border-t border-black/5">
          <div className="container relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-24">
              
              {/* Left: Authority Block */}
              <div className="max-w-xl">
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-px bg-[#B11226]" />
                    <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[9px] font-bold">Social Proof</p>
                  </div>
                  <h2 className="text-black font-black leading-[0.85] tracking-tighter mb-10 uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}>
                    WHAT OUR<br /><span className="text-black/10">CLIENTS SAY.</span>
                  </h2>
                </Reveal>

                <div className="flex gap-12">
                  <Reveal delay={0.1}>
                    <p className="text-[#B11226] font-black text-3xl md:text-4xl tracking-tighter mb-1">+40%</p>
                    <p className="text-black/30 font-mono uppercase text-[8px] tracking-[0.2em]">Footfall Increase</p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="text-black font-black text-3xl md:text-4xl tracking-tighter mb-1">100%</p>
                    <p className="text-black/30 font-mono uppercase text-[8px] tracking-[0.2em]">Client Trust</p>
                  </Reveal>
                </div>
              </div>

              {/* Vertical Divider (Desktop only) */}
              <div className="hidden lg:block w-px h-32 bg-black/5 shrink-0" />

              {/* Right: Testimonial Engine */}
              <div className="relative flex-1 min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
                <TestimonialWheel />
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote: "Our reels started bringing in real customers. People were coming in saying they saw us on Instagram.",
    client: "Ayaan Khan — Restaurant Owner"
  },
  {
    quote: "The quality of the video immediately changed how people perceived our brand. We look premium now.",
    client: "Sara Malik — Café Founder"
  },
  {
    quote: "We've seen a massive spike in weekend bookings since the campaign went live. It actually works.",
    client: "Omar Hussain — Fine Dining Brand"
  },
  {
    quote: "They understood our vision and translated it into visuals that actually represent who we are.",
    client: "Zaid Ahmed — Burger Boutique"
  },
  {
    quote: "The footage is stunning, but the results are better. Our engagement is at an all-time high.",
    client: "Layla Yusuf — Dessert Bar"
  },
  {
    quote: "Finally found a team that treats our food like art. The response from our followers was huge.",
    client: "Faisal Aziz — Steakhouse Founder"
  },
  {
    quote: "It's rare to find production quality this high in the region. They've set a new standard for us.",
    client: "Noor Al-Bahrani — Specialty Coffee"
  },
  {
    quote: "Our launch was a success because the teaser video built so much hype before we even opened.",
    client: "Hamad Qasim — Fusion Concept"
  },
  {
    quote: "The cinematic look they gave us helped us secure a major partnership. It was a game changer.",
    client: "Mariam Shah — Bakery Chain"
  },
  {
    quote: "The best investment we've made this year. The content paid for itself within the first month.",
    client: "Rashid Mahmood — Rooftop Lounge"
  }
];

function TestimonialWheel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500); // Slightly slower for readability
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0, rotateX: -30 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -50, opacity: 0, rotateX: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <p className="text-black font-medium text-xl md:text-2xl lg:text-3xl leading-[1.2] tracking-tight italic mb-8">
            "{TESTIMONIALS[index].quote}"
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-black/60 font-mono text-[10px] uppercase tracking-widest font-bold">
              {TESTIMONIALS[index].client}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#B11226]" />
              <p className="text-black/20 font-mono text-[8px] uppercase tracking-[0.2em] font-bold">Client Result</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
