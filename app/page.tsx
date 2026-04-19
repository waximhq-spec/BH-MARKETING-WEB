"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = testimonialRef.current;
      if (container && window.innerWidth < 768) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Calculate next position by finding the width of the first child + gap
          const cardWidth = container.firstElementChild?.clientWidth || clientWidth;
          const gap = 20; // gap-5 is 20px
          container.scrollTo({ left: scrollLeft + cardWidth + gap, behavior: "smooth" });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════════════════ */}
      <main className="relative bg-black min-h-screen overflow-x-hidden">
        <section
        data-theme="red"
        className="relative h-[100svh] flex flex-col justify-start overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
          poster="https://images.pexels.com/photos/8396974/pexels-photo-8396974.jpeg"
        >
          <source src="https://www.pexels.com/download/video/8396974/" type="video/mp4" />
        </video>

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

        {/* Content — pt accounts for fixed 64px navbar + responsive breathing room */}
        <div
          className="w-full max-w-[1536px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pb-32 flex flex-col justify-center"
          style={{
            paddingTop: "calc(64px + clamp(3rem, 8svh, 6rem))",
            minHeight: "100svh",
          }}
        >
          {/* Pre-Header */}
          <div className="w-full mb-4 lg:mb-6">
            <p className="text-white font-mono tracking-[0.15em] uppercase text-[9px] anim-fade-up -ml-[4px] opacity-40">
              [ Cinmach Productions · Manama ]
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-8 xl:gap-16">
            {/* Left Column: Headline */}
            <div className="flex flex-col items-start gap-6 lg:w-[60%] xl:w-[62%] flex-shrink-0 min-w-0">
              <h1
                className="text-white font-black leading-[0.82] anim-fade-up anim-delay-1 break-words w-full"
                style={{ fontSize: "clamp(2.5rem, 10vw, 10.5rem)", letterSpacing: "-0.05em" }}
              >
                CREATE<br />YOUR<br />PRESENCE.
              </h1>
            </div>

            {/* Right Column: Supporting Content */}
            <div className="flex flex-col items-start lg:w-[40%] xl:w-[35%] lg:-mt-[8px] xl:-mt-[12px]">
              <div className="max-w-[480px] mb-12 lg:mb-16 anim-fade-up anim-delay-2">
                <p 
                  className="text-white font-black mb-5" 
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                >
                  We don’t just shoot — we build how your brand is seen.
                </p>
                <p
                  className="text-white/40 font-light"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", lineHeight: 1.75, letterSpacing: "0.01em" }}
                >
                  From strategy to final delivery, we create cinematic content that captures attention and positions you above the competition.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 anim-fade-up anim-delay-3 w-full">
                <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                  <Link
                    href="/work"
                    className="flex-1 sm:flex-none sm:w-52 py-4.5 px-8 bg-[#8B0016] text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-2xl text-center flex items-center justify-center"
                  >
                    View Work
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 sm:flex-none sm:w-52 py-4.5 px-8 bg-white text-black text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl text-center flex items-center justify-center"
                  >
                    Start a Project
                  </Link>
                </div>
                <p className="text-white/20 font-mono text-[9px] tracking-[0.25em] uppercase pl-1 mt-2">
                  Built for brands that want to stand out.
                </p>
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

          {/* ── About Intro ── */}
          <Reveal className="mb-8">
            <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px]">
              The Collective
            </p>
          </Reveal>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24 mb-20 md:mb-28">

            {/* Left — Headline */}
            <Reveal className="lg:w-1/2 shrink-0">
              <h2
                className="font-black text-black"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                WE DON&apos;T JUST<br />SHOOT. WE<br />INSPIRE ACTION.
              </h2>
            </Reveal>

            {/* Right — Body + CTA */}
            <Reveal delay={0.2} className="lg:w-[460px] lg:border-l lg:border-black/10 lg:pl-12 shrink-0">
              <p
                className="text-black/70 mb-4"
                style={{ fontSize: "clamp(1rem, 1.3vw, 1.2rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}
              >
                Cinmach Productions is a specialized visual powerhouse based in Bahrain. We build cinematic assets that become the heartbeat of your brand strategy.
              </p>
              <p
                className="text-black/50 mb-10"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.7 }}
              >
                No fluff. No filler. Just pure, intentional impact — crafted frame by frame.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-[#8B0016] font-mono text-[10px] tracking-[0.3em] uppercase border-b border-[#8B0016] pb-1 hover:text-black hover:border-black transition-all duration-300"
              >
                Explore Our Approach <span>→</span>
              </Link>
            </Reveal>
          </div>

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
      <section data-theme="dark" className="py-32 md:py-48" style={{ background: "#050505" }}>
        <div className="container">

          <Reveal className="mb-24">
            <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] mb-6">
              How We Work
            </p>
            <h2
              className="text-white font-black"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}
            >
              THE PROCESS.
            </h2>
          </Reveal>

          {/* Master Guide Line Container */}
          <div className="relative border-l border-white/10 ml-4 md:ml-12 flex flex-col pt-4 pb-12">
            {[
              { num: "01", title: "Strategy",       desc: "Deep-dive into your brand, audience, and goals. We define what the film needs to say before a single frame is shot." },
              { num: "02", title: "Production",      desc: "On-location cinematic shooting with our crew. Precision lighting, composition, and movement — nothing is left to chance." },
              { num: "03", title: "Post-Production", desc: "Color grading, sound design, and cut — all refined to match a premium visual signature unique to your brand." },
              { num: "04", title: "Delivery",        desc: "Ready-to-publish assets across every format and platform. From social reels to full broadcast spots." },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                {/* Row Wrapper */}
                <motion.div 
                  initial="initial"
                  whileInView="active"
                  viewport={{ once: false, amount: 0.5 }}
                  className="group relative pl-8 md:pl-20 py-12 md:py-16 -ml-[1px] hover:bg-white/[0.02] transition-colors duration-500 cursor-default border-b border-white/[0.03] last:border-0 rounded-r-3xl"
                >
                  
                  {/* Hover/Scroll Indicator Line */}
                  <motion.div 
                    variants={{
                      initial: { scaleY: 0 },
                      active: { scaleY: 1, boxShadow: "0 0 20px #C50022" }
                    }}
                    className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#C50022] group-hover:scale-y-100 group-hover:shadow-[0_0_20px_#C50022] origin-top transition-all duration-500 ease-out z-10" 
                  />
                  
                  {/* Small Notch */}
                  <motion.div 
                    variants={{
                      initial: { width: "1rem", backgroundColor: "rgba(255,255,255,0.2)" },
                      active: { width: "2rem", backgroundColor: "#C50022" }
                    }}
                    className="absolute top-[4.5rem] md:top-[5.5rem] left-0 h-[1px] group-hover:w-8 group-hover:bg-[#C50022] transition-all duration-500" 
                  />
                  
                  <div className="flex flex-col md:flex-row gap-6 md:gap-24 items-start">
                    {/* Number */}
                    <div className="shrink-0 w-16">
                      <motion.span 
                        variants={{
                          initial: { color: "#8B0016" },
                          active: { color: "#FA002A" }
                        }}
                        className="font-mono font-bold text-2xl md:text-3xl tracking-widest group-hover:text-[#FA002A] transition-colors duration-500 block"
                      >
                        {step.num}
                      </motion.span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4 md:gap-6">
                      <motion.h3
                        variants={{
                          initial: { color: "rgba(255,255,255,0.8)" },
                          active: { color: "rgba(255,255,255,1)" }
                        }}
                        className="font-black tracking-tight group-hover:text-white transition-colors duration-500"
                        style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1 }}
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p 
                        variants={{
                          initial: { color: "rgba(255,255,255,0.3)" },
                          active: { color: "rgba(255,255,255,0.7)" }
                        }}
                        className="text-base md:text-lg leading-relaxed max-w-xl group-hover:text-white/70 transition-colors duration-500"
                      >
                        {step.desc}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          §5  FEATURED WORK — WHITE
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">

          <Reveal className="mb-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-4">Portfolio</p>
                <h2
                  className="text-black font-black"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
                >
                  SELECTED<br />WORK.
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden md:inline-flex items-center gap-3 text-black font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#8B0016] hover:border-[#8B0016] transition-all duration-300 self-end mb-2"
              >
                View All Work <span>→</span>
              </Link>
            </div>
          </Reveal>

          {/* Tier 1: Vertical Reels (9:16) */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
            {[
              { id: 1, title: "Automotive Showcase", url: "https://www.pexels.com/download/video/31588827/" },
              { id: 2, title: "Speed & Motion", url: "https://www.pexels.com/download/video/34076260/" },
            ].map((reel, i) => (
              <Reveal key={reel.id} delay={i * 0.1}>
                <div className="group relative aspect-[9/16] bg-neutral-100 rounded-[16px] overflow-hidden cursor-pointer border border-black/5">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={reel.url} type="video/mp4" />
                  </video> 
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.4em] uppercase">Automotive</p>
                    <h4 className="text-white font-bold text-lg md:text-2xl tracking-tight mt-1">{reel.title}</h4>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tier 1.5: Cinematic Films (16:9) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              { label: "01", title: "Lee Heritage",          cat: "Hospitality",               vimeo: "1183128960" },
              { label: "02", title: "Heaven View Villa",     cat: "Hospitality",               vimeo: "1183128507" },
            ].map((video) => (
              <Reveal key={video.label} delay={0.1}>
                <div className="group relative aspect-video overflow-hidden bg-black cursor-pointer rounded-[16px]">
                  <div className="absolute inset-0 pointer-events-none">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeo}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
                      className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase mb-2">{video.cat}</p>
                    <h4 className="text-white font-black text-xl md:text-2xl tracking-tight">{video.title}</h4>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="text-white/30 font-mono text-[10px] tracking-[0.2em]">{video.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tier 2: Image Showcase (Square Boxes) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "03", title: "Harbour Row Dining",    cat: "Hospitality",   driveId: "1LGbCekMBgMNNIyabVbFiTkVO6-brJgAe", bg: "bg-neutral-800" },
              { label: "04", title: "Ebrahim Corp Identity", cat: "Brand Film",    driveId: "1TZB5T-PnWl2-cePCrcC4tdsJAz2PSI3w", bg: "bg-neutral-900" },
              { label: "05", title: "Corporate Assets",      cat: "Hospitality",   driveId: "1-b48lZJ5UFnpe6QG639kJAiB0O6yqGBI", bg: "bg-neutral-700" },
              { label: "06", title: "Brand Vision",          cat: "Hospitality",   driveId: "1Ex9QPsfx6VsIX8GhiDqmSNStOrg76OHp", bg: "bg-neutral-800" },
            ].map((project) => (
              <motion.div
                key={project.label}
                className={`group relative aspect-square overflow-hidden rounded-[16px] ${project.bg} cursor-pointer`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={`https://drive.google.com/thumbnail?sz=w1000&id=${project.driveId}`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase mb-1">{project.cat}</p>
                  <h4 className="text-white font-black text-sm md:text-lg tracking-tight leading-tight">{project.title}</h4>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-white/30 font-mono text-[9px] tracking-[0.2em]">{project.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-12 md:hidden">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-black font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#8B0016] hover:border-[#8B0016] transition-all duration-300"
            >
              View All Work →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6  ABOUT / POSITIONING — WHITE
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">
          <Reveal className="mb-8">
            <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px]">About Us</p>
          </Reveal>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">
            <Reveal className="lg:w-1/2 shrink-0">
              <h2
                className="font-black text-black mb-8"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                CRAFTED IN<br />BAHRAIN.<br />BUILT FOR<br />THE WORLD.
              </h2>
              <p className="text-black/60 max-w-md" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", lineHeight: 1.7 }}>
                We are a boutique cinematic production studio rooted in Bahrain, creating high-end visual content for forward-thinking brands across the Gulf and beyond.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="lg:w-[400px] shrink-0 grid grid-cols-1 gap-12">
              {[
                { stat: "5+",  label: "Years of craft",     desc: "Visual storytelling refined into a precise, repeatable signature system." },
                { stat: "40+", label: "Projects delivered", desc: "From intimate restaurants to large-scale real estate developments." },
                { stat: "BH",  label: "Based in Bahrain",   desc: "Serving the GCC region and international brands with local precision." },
              ].map((item) => (
                <div key={item.stat} className="flex items-start gap-8">
                  <span className="text-black font-black shrink-0" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>{item.stat}</span>
                  <div>
                    <p className="text-black font-black text-sm tracking-tight mb-1">{item.label}</p>
                    <p className="text-black/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6b  TESTIMONIALS — PREMIUM CARD LAYOUT
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-36" style={{ background: "#F5F5F5" }}>
        <div className="container">

          {/* Section Header */}
          <Reveal className="mb-14 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-4">Client Feedback</p>
              <h2
                className="font-black text-black"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                WHAT OUR<br />CLIENTS SAY.
              </h2>
            </div>
            <p className="text-black/40 text-sm max-w-[280px] leading-relaxed">
              Trusted by real estate developers, brands, and creative agencies across the region.
            </p>
          </Reveal>

          {/* Featured Hero Card */}
          <Reveal className="mb-6">
            <div
              className="relative w-full overflow-hidden rounded-2xl p-10 md:p-16"
              style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a0006 100%)", boxShadow: "0 32px 80px rgba(0,0,0,0.18)" }}
            >
              <span
                className="absolute top-6 right-10 font-black text-white/5 select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
              >
                &#8220;
              </span>
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#8B0016]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p
                className="text-white font-medium leading-[1.4] mb-12 relative z-10 max-w-3xl"
                style={{ fontSize: "clamp(1.3rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
              >
                &ldquo;Cinmach completely transformed how we present our properties. The visuals didn&apos;t just look good &mdash; they sold the <em>lifestyle</em>. Their eye for composition and storytelling is the finest we&apos;ve seen anywhere in the Gulf.&rdquo;
              </p>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-black text-white text-base" style={{ background: "#8B0016" }}>F</div>
                <div>
                  <p className="text-white font-black text-base tracking-tight uppercase">Faisal Al-Dosari</p>
                  <p className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase mt-0.5">Property Developer · Manama, Bahrain</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3-Column Supporting Cards */}
          <div 
            ref={testimonialRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 no-scrollbar pb-8 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0"
          >
            {[
              { quote: "Working with Cinmach was seamless from day one. They understood the spirit of Bahraini hospitality and translated it into visuals that resonated with guests from around the world.", name: "Noor Al-Mannai", role: "Marketing Director · Gulf Hotel Bahrain", project: "Brand Film", initial: "N" },
              { quote: "Our social media engagement doubled within a week of going live. The reels they produced were crisp, high-energy, and exactly on-brand. Truly a premium studio.", name: "Yousef Al-Khalifa", role: "Founder · Talah Restaurant Group", project: "Social Media Ads", initial: "Y" },
              { quote: "Every frame was deliberate. The aerial sequences over our Amwaj development generated more enquiries in three days than our previous six months of marketing combined.", name: "Mariam Al-Zayani", role: "Head of Sales · Ithmaar Development", project: "Real Estate Film", initial: "M" },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.12}>
                <div
                  className="group relative bg-white rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-1 min-w-[85vw] snap-center shrink-0 md:min-w-0 md:shrink"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ background: "#8B0016" }} />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-[#8B0016]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-black/75 text-[15px] leading-relaxed mb-8 flex-1">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-black/5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-white text-sm" style={{ background: "#0A0A0A" }}>{item.initial}</div>
                    <div>
                      <p className="text-black font-black text-sm tracking-tight">{item.name}</p>
                      <p className="text-black/35 font-mono text-[8px] tracking-[0.25em] uppercase mt-0.5">{item.role}</p>
                    </div>
                    <span className="ml-auto font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 rounded" style={{ background: "#F0F0F0", color: "#8B0016" }}>{item.project}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Section CTA */}
          <Reveal className="mt-16 md:mt-20">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-5 text-black font-black hover:text-[#8B0016] transition-colors"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)", letterSpacing: "-0.02em" }}
            >
              Let&apos;s create something impactful together{" "}
              <span className="transition-transform duration-500 group-hover:translate-x-3">→</span>
            </Link>
          </Reveal>

        </div>
      </section>



      {/* ══════════════════════════════════════════════════════
          §7  FINAL CTA — VISION LAYOUT (WHITE)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-40 bg-white border-t border-black/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-16 lg:gap-24 items-start">
            
            {/* Left: Heading & Buttons */}
            <div>
              <Reveal>
                <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] mb-8 font-bold">
                  Next Phase
                </p>
                <h2
                  className="text-black font-black mb-12"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)", letterSpacing: "-0.05em", lineHeight: 0.88 }}
                >
                  READY TO BUILD<br />YOUR VISION?
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-4 px-10 py-5 bg-black text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] transition-all duration-500"
                  >
                    Start a Project <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </Link>
                  <Link
                    href="https://wa.me/yournumber"
                    className="px-10 py-5 border border-black/10 text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:border-black/40 transition-all duration-500"
                  >
                    Whatsapp
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right: Personal/Agency Info Slots */}
            <div className="flex flex-col gap-12 pt-4 lg:pt-24 border-t lg:border-t-0 border-black/10">
              <Reveal delay={0.3}>
                <div className="space-y-2">
                  <p className="text-black/30 font-mono text-[9px] tracking-[0.3em] uppercase">Location</p>
                  <p className="text-black font-black text-lg md:text-xl tracking-tight uppercase">Manama, Bahrain</p>
                  <p className="text-black/40 text-[10px] uppercase font-bold tracking-widest">Available Worldwide</p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="space-y-2">
                  <p className="text-black/30 font-mono text-[9px] tracking-[0.3em] uppercase">Local Time</p>
                  <LocalTime />
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="space-y-2">
                  <p className="text-black/30 font-mono text-[9px] tracking-[0.3em] uppercase">Email</p>
                  <a 
                    href="mailto:contact@cinmachproductions.com" 
                    className="text-black font-black text-lg md:text-xl tracking-tight uppercase border-b-2 border-transparent hover:border-[#8B0016] transition-all"
                  >
                    CONTACT@CINMACHPRODUCTIONS.COM
                  </a>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Footer / Copyright Minimal */}
      <footer className="py-12 bg-white border-t border-black/5">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-black/30 font-mono text-[9px] tracking-[0.3em] uppercase">
            © 2024 Cinmach Productions. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-black/30 hover:text-black font-mono text-[9px] tracking-[0.3em] uppercase transition-colors">Instagram</Link>
            <Link href="#" className="text-black/30 hover:text-black font-mono text-[9px] tracking-[0.3em] uppercase transition-colors">Vimeo</Link>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
