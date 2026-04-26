"use client";

import Link from "next/link";
import { useState } from "react";
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
              <span className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">{featured.num}</span>
              <span className="text-[#B11226] font-mono text-[9px] tracking-[0.3em] uppercase border border-[#B11226]/40 px-3 py-1">
                Featured
              </span>
            </div>

            {/* Bottom content */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
              <div className="flex-1">
                <h3
                  className="font-black text-white leading-[0.95] tracking-tighter mb-4 group-hover:translate-x-1 transition-transform duration-500"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.04em" }}
                >
                  {featured.title}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl font-light">
                  Cinematic content that makes people choose your restaurant before they even arrive.
                </p>
                {/* Trust line */}
                <p className="text-white/35 text-[11px] font-mono tracking-widest uppercase mt-4">
                  Trusted by restaurants & cafes to drive real customer engagement.
                </p>
              </div>

              <button
                onClick={() => {}}
                className="group/cta shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-[#B11226] hover:text-white transition-all duration-500 self-start md:self-auto"
              >
                View Work
                <span className="transition-transform duration-500 group-hover/cta:translate-x-1.5">→</span>
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

export default function Page() {
  const { openProjectModal } = useModal();

  return (
    <>
      <main>
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1: HERO (REVERTED)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="red" className="relative h-[100svh] flex flex-col overflow-hidden bg-black">
          <motion.div className="absolute inset-0 z-0" initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}>
            <SmartVideo src="/bg-rest.mp4" autoPlayViewport={true} className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-black/60 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-[2]" />

          {/* Vertical scan lines — architectural accents */}
          <motion.div
            className="absolute left-[32%] top-0 bottom-0 w-px bg-white/[0.04] z-[3] hidden lg:block"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute right-[28%] top-0 bottom-0 w-px bg-white/[0.06] z-[3] hidden lg:block"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="container relative z-[4] flex flex-col h-full">
            <div className="flex items-center justify-between pt-24 lg:pt-28 shrink-0">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-white/35 font-mono tracking-[0.3em] uppercase text-[9px]">[ Cinmach Productions · Manama ]</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden md:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B11226] animate-pulse" />
                <span className="text-white/25 font-mono text-[9px] tracking-[0.2em] uppercase">Est. 2020</span>
              </motion.div>
            </div>
            <div className="flex-1 min-h-0 flex items-center py-6">
              <motion.h1 style={{ lineHeight: 0.9 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <span className="block text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(36px, 6.5vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em" }}>Cinematic</span>
                <span className="block text-white" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(36px, 6.5vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em" }}>content for</span>
                <span className="block text-[#B11226]" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(36px, 6.5vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginTop: "0.04em" }}>RESTAURANTS</span>
                <span className="block text-[#B11226]" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(36px, 6.5vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9 }}>&amp; CAF&Eacute;S.</span>
              </motion.h1>
            </div>
            <div className="border-t border-white/[0.1] pt-5 pb-8 lg:pb-10 shrink-0">
              <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0">
                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }} className="text-white/55 font-light leading-relaxed lg:w-[36%] lg:pr-16" style={{ fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.85 }}>
                  We create high-end cinematic visuals that drive footfall, elevate perception, and turn views into real bookings — built specifically for hospitality brands in the GCC.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }} className="flex items-center gap-10 lg:gap-14 lg:w-[30%] lg:border-l lg:border-white/[0.1] lg:pl-14">
                  {[
                    { val: "40+", label: "Restaurants" },
                    { val: "3×", label: "Engagement" },
                    { val: "BH", label: "Bahrain" },
                  ].map((s) => (
                    <div key={s.val} className="flex flex-col">
                      <span className="text-white font-black leading-none" style={{ fontSize: "clamp(22px, 2.5vw, 34px)", letterSpacing: "-0.03em" }}>{s.val}</span>
                      <span className="text-white/30 font-mono text-[9px] uppercase tracking-[0.2em] mt-1">{s.label}</span>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="flex flex-row gap-3 lg:ml-auto">
                  <Link href="/services" className="group btn-premium px-4 md:px-7 py-[14px] bg-[#B11226] text-white text-[9px] font-mono font-bold tracking-[0.15em] md:tracking-[0.28em] uppercase flex items-center gap-2.5 whitespace-nowrap">
                    View Our Work <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  <button onClick={openProjectModal} type="button" className="group btn-premium px-4 md:px-7 py-[14px] border border-white/25 text-white text-[9px] font-mono font-bold tracking-[0.15em] md:tracking-[0.28em] uppercase hover:bg-white/5 flex items-center gap-2.5 whitespace-nowrap">
                    Book a Shoot <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </motion.div>
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
              <h2 className="font-black text-white leading-[0.92] tracking-tighter" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}>What we do.</h2>
            </Reveal>
            <ServicesTable />
          </div>
        </section>
        
        {/* High-Impact Section Break */}
        <section data-theme="light" className="bg-white pt-40 pb-20">
          <div className="container">
            <div className="flex flex-col">
              <div className="h-[2px] w-full bg-black mb-12" />
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[12px] font-bold mb-6">Phase 04</p>
                  <h2 className="text-black font-black leading-[0.85] tracking-tighter" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "-0.05em" }}>
                    SELECTED<br />WORK.
                  </h2>
                </div>
                <div className="max-w-xs pb-4">
                  <p className="text-black/40 text-sm font-light leading-relaxed">
                    A curated collection of high-performance content engineered for brand authority and conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 4: PORTFOLIO
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
            SECTION 7: TESTIMONIALS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="dark" className="py-24 md:py-40 bg-black text-white border-t border-white/5">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
              <Reveal>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-px bg-[#B11226]" />
                  <p className="text-[#8A8A8A] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">Social Proof</p>
                </div>
                <h2 className="text-white font-black leading-[1.05] tracking-tight mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>THE OBVIOUS<br /><span className="text-white/20 text-italic">CHOICE.</span></h2>
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <span className="text-[#B11226] font-black text-4xl block">+40%</span>
                    <span className="text-white/30 font-mono text-[9px] uppercase tracking-widest">Footfall Increase</span>
                  </div>
                  <div>
                    <span className="text-[#B11226] font-black text-4xl block">100%</span>
                    <span className="text-white/30 font-mono text-[9px] uppercase tracking-widest">Client Trust</span>
                  </div>
                </div>
              </Reveal>
              <div className="flex flex-col gap-12">
                {[
                  { quote: "Bookings doubled within weeks. The perception shift was immediate.", name: "Sara Malik", role: "Marketing Director" },
                  { quote: "They engineered a level of excellence that redefined our brand authority.", name: "Ahmed Khan", role: "Founder . Hospitality Group" }
                ].map((t, i) => (
                  <Reveal key={i} delay={0.2}>
                    <p className="text-white/60 text-xl font-light italic mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-1 bg-[#B11226] rounded-full" />
                      <div>
                        <p className="text-white font-bold text-sm tracking-tight">{t.name}</p>
                        <p className="text-white/30 text-[10px] uppercase font-mono">{t.role}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 8: FINAL CTA
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="light" className="py-24 md:py-40 bg-white border-t border-black/5">
          <div className="container text-center flex flex-col items-center">
            <Reveal>
              <h2 className="text-black font-black leading-none mb-10" style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", letterSpacing: "-0.04em" }}>READY TO BUILD<br /><span className="text-black/10">YOUR VISION?</span></h2>
              <button onClick={openProjectModal} className="px-14 py-7 bg-black text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#B11226] transition-all duration-500 shadow-2xl">Start a Project</button>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
