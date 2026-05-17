"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import SmartVideo from "@/components/SmartVideo";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import Image from "next/image";

// Lazy load below-the-fold sections for performance
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));

/* ─────────────────────────────────────────────────────────────
   Internal Components
   ─────────────────────────────────────────────────────────── */
function HeroClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="w-20" />; // Placeholder to avoid layout shift

  return (
    <div className="flex flex-col items-start gap-1 font-mono">
      <div className="flex items-center gap-2">
        <span className="w-1 h-1 bg-[#9A0E1F] rounded-full animate-pulse" />
        <span className="text-white/40 text-[8px] tracking-[0.3em] uppercase font-bold">Local Time</span>
      </div>
      <span className="text-white text-[13px] font-black tracking-[0.15em] tabular-nums">
        {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal
   ─────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
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
    title: "Food & Hospitality",
    desc: "We make food videos that bring more customers to your door.",
    sub: ["Reels & Short-form Ads", "Menu & Food Cinematography", "Social Media Packages"],
    alt: "Cinematic food and hospitality video shoot by marketing agency in Bahrain",
  },
  {
    num: "02",
    title: "Real Estate & Spaces",
    desc: "We shoot property videos that help you sell or rent faster.",
    sub: ["Interior Shoots", "Exterior Cinematics", "Drone Coverage"],
    alt: "Luxury real estate videography and space cinematics in Bahrain",
  },
  {
    num: "03",
    title: "Gyms & Fitness",
    desc: "Videos that get more people to join your gym.",
    sub: ["Training Promos", "Facility Tours", "Client Transformations"],
    alt: "High-energy gym promo videos and fitness cinematography in Bahrain",
  },
  {
    num: "04",
    title: "Hotels & Resorts",
    desc: "Videos that get more guests to book a stay.",
    sub: ["Room Showcases", "Lifestyle Shoots", "Amenity Coverage"],
    alt: "Premium hotel and resort visual production by creative agency in Bahrain",
  },
];

/* ─────────────────────────────────────────────────────────────
   Cinematic Hero Blur — scroll-linked depth-of-field effect
   ─────────────────────────────────────────────────────────── */
function HeroBlurWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SectionBlurWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ServicesTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const secondary = SERVICES_DATA.slice(1);

  // Shared row renderer for cleanliness
  const renderRow = (
    svc: typeof SERVICES_DATA[0],
    idx: number,
    isFeatured: boolean,
    delay: number,
    bgImage?: string
  ) => {
    const isHovered = hoveredIndex === idx;
    const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

    return (
      <Reveal key={svc.num} delay={delay}>
        <div
          className={`group relative flex flex-col border-b transition-all duration-500 ease-out overflow-hidden
            ${isDimmed ? "opacity-30" : "opacity-100"}
            ${isFeatured
              ? "border-[#9A0E1F]/20"
              : isHovered
                ? "border-white/15 bg-white/[0.025]"
                : "border-white/8"
            }`}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* ── Background: image for featured/specific, glow for rest ── */}
          {(isFeatured || bgImage) ? (
            <div className="absolute inset-0 z-0">
              <Image
                src={bgImage || "https://images.pexels.com/photos/33033789/pexels-photo-33033789.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                alt={svc.alt || svc.title}
                fill
                loading="lazy"
                sizes="100vw"
                className={`object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-[1400ms] ease-out ${isFeatured ? "opacity-60" : idx === 2 ? "opacity-35" : "opacity-20"
                  }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/85" />
              {/* Red glow tint */}
              <div className="absolute inset-0 bg-[#9A0E1F]/5" />
            </div>
          ) : (
            <div
              className={`absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#9A0E1F]/5 via-transparent to-transparent" />
            </div>
          )}

          {/* ── Always-on left accent bar ── */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ease-out z-10
              ${isFeatured
                ? "bg-gradient-to-b from-[#9A0E1F] to-[#9A0E1F]/30 scale-y-100"
                : isHovered
                  ? "bg-[#9A0E1F] scale-y-100"
                  : "bg-white/10 scale-y-100"
              } origin-top`}
          />

          {/* ── Row content ── */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-14 py-10 md:py-14 px-4">

            {/* Left: Number + Title [25%] */}
            <div className="flex items-start gap-5 md:w-[25%]">
              <span className={`font-mono text-[9px] tracking-[0.3em] pt-1 transition-colors duration-300 shrink-0 ${isFeatured ? "text-[#9A0E1F]" : isHovered ? "text-[#9A0E1F]" : "text-white/25"
                }`}>
                {svc.num}
              </span>
              <div className="flex flex-col gap-1.5">
                {isFeatured && (
                  <span className="text-[#9A0E1F] font-mono text-[8px] tracking-[0.35em] font-bold uppercase leading-none">Featured</span>
                )}
                <h3
                  className="font-black antialiased leading-[1.05] text-white"
                  style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)", letterSpacing: "-0.025em" }}
                >
                  {svc.title}
                </h3>
              </div>
            </div>

            {/* Center: Description [35%] */}
            <div className="md:w-[35%]">
              <p className={`text-[14px] leading-[1.7] antialiased font-light ${isFeatured ? "text-white/88" : "text-white/70"
                }`}>
                {svc.desc}
              </p>
            </div>

            {/* Right-center: Includes [20%] */}
            <div className="md:w-[20%] flex flex-col gap-2.5">
              <p className={`text-[8px] font-mono tracking-[0.3em] uppercase font-black mb-1.5 transition-colors duration-300 ${isFeatured ? "text-[#9A0E1F]" : "text-white/50"
                }`}>
                Includes
              </p>
              {svc.sub.map((subItem, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3">
                  <span className={`text-[10px] leading-none shrink-0 transition-colors duration-300 ${isFeatured ? "text-[#9A0E1F]" : "text-white/40"
                    }`}>—</span>
                  <span className={`text-[11px] antialiased leading-snug font-medium transition-colors duration-300 ${isFeatured ? "text-white" : "text-white/80"
                    }`}>
                    {subItem}
                  </span>
                </div>
              ))}
            </div>

            {/* Far-right: CTA [15%] */}
            <div className="md:w-[15%] flex justify-end mt-6 md:mt-0">
              <Link
                href="/services"
                aria-label={`Explore ${svc.title} video production services in Bahrain`}
                className={`group inline-flex items-center gap-4 rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 border
                  ${isFeatured
                    ? "border-[#9A0E1F]/30 bg-[#9A0E1F]/10 hover:bg-[#9A0E1F]/20 hover:border-[#9A0E1F]/50"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
              >
                <span className={`font-mono tracking-[0.25em] uppercase text-[9px] font-bold mt-[1px] ${isFeatured ? "text-[#9A0E1F]" : "text-white/70"}`}>
                  Explore
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isFeatured ? "bg-[#9A0E1F] group-hover:bg-white" : "bg-white/10 group-hover:bg-white"}`}>
                  <svg className={`w-3 h-3 transition-colors duration-300 ${isFeatured ? "text-white group-hover:text-[#9A0E1F]" : "text-white/70 group-hover:text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    );
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Featured */}
      {renderRow(SERVICES_DATA[0], 1, true, 0)}

      {/* Secondary */}
      <div className="flex flex-col">
        {secondary.map((svc, i) => {
          const actualIdx = i + 2;
          let bg;
          if (svc.title === "Gyms & Fitness") {
            bg = "https://images.pexels.com/photos/29639963/pexels-photo-29639963.jpeg";
          } else if (svc.title === "Real Estate & Spaces") {
            bg = "https://images.pexels.com/photos/9771524/pexels-photo-9771524.jpeg";
          } else if (svc.title === "Hotels & Resorts") {
            bg = "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg";
          }
          return renderRow(svc, actualIdx, false, i * 0.06, bg);
        })}
      </div>

      {/* View All Services CTA */}
      <div className="flex justify-center md:justify-end mt-12 md:mt-16 pr-4">
        <Reveal delay={0.3}>
          <Link
            href="/services"
            aria-label="View all creative marketing and video production services in Bahrain"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#050505]/80 border border-[#9A0E1F]/50 shadow-[0_15px_40px_rgba(154,14,31,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-black hover:border-white/20 hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white transition-colors duration-300">
              ALL SERVICES
            </span>
            <span className="relative z-10 text-[#9A0E1F] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-500 ease-[0.16,1,0.3,1] text-[14px] leading-none ml-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { openProjectModal } = useModal();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* ── SEO CONTENT LAYER (Invisible but Indexable) ── */}
      <VisualHiddenSEO>
        <h1>Creative Marketing Agency & Cinematic Video Production in Bahrain</h1>
        <h2>Cinmach Productions: Premium Brand Building Agency</h2>
        <p>Cinmach Productions is a premium creative marketing agency in Bahrain. We combine strategy, storytelling, and cinematic production to build modern brands. We specialize in brand strategy, social media campaigns, commercial video production, and digital presence across industries.</p>

        <h2>Our Specialized Services</h2>
        <ul>
          <li><strong>Brand Strategy:</strong> Positioning and visual identity to drive business growth.</li>
          <li><strong>Content Production:</strong> Cinematic brand films, commercials, and high-end storytelling.</li>
          <li><strong>Social Media Marketing:</strong> Conversion-focused campaigns and audience engagement.</li>
          <li>Websites & Digital: Premium UI/UX and digital brand experiences.</li>
        </ul>

        <h2>FAQ — Creative Agency Services</h2>
        <div>
          <h3>How does cinematic content help my brand?</h3>
          <p>Cinematic video content increases engagement, elevates your brand's perceived value, and turns digital views into real business growth.</p>

          <h3>What is included in a campaign production?</h3>
          <p>We handle everything from creative direction and strategy to high-end filming, lighting, editing, color grading, and deployment.</p>

          <h3>Do you work with industries outside of hospitality?</h3>
          <p>Yes, we build brands across fashion, real estate, fitness, lifestyle, corporate, and tech sectors in Bahrain.</p>

          <h3>Where are you based?</h3>
          <p>We are a creative marketing agency based in Manama, serving clients across all of Bahrain and the GCC.</p>
        </div>

        <h2>Why Choose Cinmach Productions?</h2>
        <p>Our strategic approach ensures that every visual serves a purpose. We engineer outcomes, turning businesses into recognizable brands through premium execution.</p>
      </VisualHiddenSEO>


      <main className="flex-1">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1: HERO (REFINED FOR ALL MOBILES)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="dark" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex flex-col" id="hero-section">
          {/* Cinematic scroll blur wrapper */}
          <HeroBlurWrapper>
            <SmartVideo
              src="/bg-rest.mp4"
              autoPlay={true}
              className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.2] anim-slow-zoom transform-gpu"
              style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" } as React.CSSProperties}
            />
            {/* Base darkening */}
            <div className="absolute inset-0 bg-black/75 z-[1]" />
            {/* Subtle amber/red radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,42,42,0.15)_0%,transparent_80%)] z-[1]" />
            {/* Cinematic vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none z-[1]" />

            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 z-[3] transform-gpu" />


            <div className="container relative z-[4] flex flex-col h-full justify-center px-5 md:px-0">
              {/* Top Metadata Removed */}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-24 items-start py-4">
                {/* LEFT: CONTENT AREA */}
                <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left mt-4 lg:mt-12 w-full">
                  <div className="w-min lg:w-full flex flex-col mx-auto lg:mx-0">
                    <Reveal delay={0.2}>
                      <h1 className="text-white font-black leading-[0.85] tracking-tighter mb-5 lg:mb-8" style={{ fontSize: "clamp(3rem, 11.5vw, 7.2rem)", letterSpacing: "-0.05em" }}>
                        <span className="block whitespace-nowrap text-[0.42em] font-medium tracking-normal opacity-90 mb-1.5 lg:mb-2 uppercase">
                          We build brands people
                        </span>
                        <span className="text-[#9A0E1F] uppercase block mt-1">REMEMBER.</span>
                      </h1>
                    </Reveal>
                    <Reveal delay={0.4} className="w-full">
                      <p className="text-white/80 text-[14px] md:text-[15px] lg:text-base leading-[1.6] font-light mb-8 md:mb-10 text-left lg:text-left">
                        We combine strategy, storytelling, and cinematic production to turn businesses into recognizable brands.
                      </p>
                    </Reveal>
                  </div>

                  {/* Secondary CTA & Clock (Desktop Only) */}
                  <div className="hidden lg:flex items-center gap-10">
                    <Reveal delay={0.5}>
                      <Link
                        href="#work"
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white/[0.08] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
                      >
                        {/* Corner Accents - Static CSS */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/70" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/70" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/70" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/70" />
                        
                        {/* Hover Fill Effect */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <span className="relative z-10 text-[11px] font-mono font-black tracking-[0.3em] uppercase text-white">
                          OUR WORK
                        </span>
                        
                        <span className="relative z-10 text-white transition-transform duration-500 group-hover:translate-x-1.5 text-[14px] leading-none">
                          →
                        </span>
                      </Link>
                    </Reveal>

                    <Reveal delay={0.6}>
                      <HeroClock />
                    </Reveal>
                  </div>
                </div>

                {/* RIGHT: CONVERSION CARD (Desktop Only) */}
                <div className="hidden lg:flex lg:col-span-5 flex-col items-end lg:mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="w-full max-w-[400px]"
                  >
                    {/* Trust Signal Testimonial Slider */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full bg-[#050505]/95 border border-white/[0.08] p-6 lg:p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(154,14,31,0.06)] rounded-[24px]"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[1px] w-6 bg-[#9A0E1F]" />
                          <span className="text-white/60 font-mono text-[9px] uppercase tracking-[0.3em] font-black">What Our Clients Say</span>
                        </div>
                        <div className="relative h-12 flex items-center">
                          <TestimonialRotation />
                        </div>
                      </div>
                      {/* Subtle accent line */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/30 to-transparent" />
                    </motion.div>

                    <div
                      className="mt-4 relative w-full bg-[#050505]/95 border border-white/[0.08] p-6 lg:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-[24px] group transition-all duration-700 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_40px_80px_rgba(154,14,31,0.15)] transform-gpu overflow-hidden"
                    >
                      {/* Soft ambient red glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9A0E1F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Status Label */}
                        <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                          <span className="w-1.5 h-1.5 bg-[#9A0E1F] rounded-full shadow-[0_0_8px_#9A0E1F] animate-pulse" />
                          <span className="text-white/60 font-medium text-[9px] uppercase tracking-[0.2em]">Direct Booking</span>
                        </div>

                        {/* Headings */}
                        <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 tracking-tight uppercase">Start Your Project</h3>
                        <p className="text-white/50 text-[11px] md:text-[12px] leading-relaxed max-w-[280px] mx-auto mb-6 font-light">
                          Creative marketing tailored for modern brands.
                        </p>

                        {/* CTA Button */}
                        <button 
                          data-cal-link="wasim-ebxvk8/schedule-call"
                          data-cal-namespace="schedule-call"
                          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                          aria-label="Book a creative strategy call for your shoot in Bahrain"
                          className="relative w-full overflow-hidden group/btn bg-gradient-to-r from-[#9A0E1F] to-[#c01529] rounded-full h-[50px] flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(154,14,31,0.5)] active:scale-[0.98] border border-[#9A0E1F]/50"
                        >
                          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 ease-out" />
                          <span className="relative z-10 text-white font-medium text-[11px] tracking-[0.15em] uppercase">
                            Book a Strategy Call
                          </span>
                          <span className="relative z-10 text-white/80 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </button>

                        {/* Footer text */}
                        <div className="mt-4 flex flex-col items-center gap-2">
                          <p className="text-white/40 text-[9px] font-medium tracking-[0.1em] uppercase">
                            Response within <span className="text-white/80 font-bold">24 hours</span>
                          </p>
                          <p className="text-[#9A0E1F]/70 text-[8px] font-medium tracking-[0.15em] uppercase">
                            Limited client slots available for June
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile CTA (Visible only on mobile) */}
                <div className="lg:hidden flex flex-col items-center gap-5 w-full mt-2">
                  {/* Mobile Testimonial (Shifted Higher) */}
                  <div className="w-full mt-2 mb-2 flex justify-center px-4">
                    <Reveal delay={0.5} className="w-full max-w-[340px]">
                      <div className="w-full bg-[#0a0a0a]/70 border border-white/[0.06] p-5 rounded-2xl flex flex-col items-center text-center transform-gpu shadow-xl" style={{ WebkitBackfaceVisibility: "hidden" } as React.CSSProperties}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="h-[1px] w-4 bg-[#9A0E1F]" />
                          <span className="text-white/50 font-mono text-[8px] uppercase tracking-[0.25em] font-bold block">What Our Clients Say</span>
                          <div className="h-[1px] w-4 bg-[#9A0E1F]" />
                        </div>
                        <div className="relative h-12 w-full flex items-center justify-center">
                          <TestimonialRotation isMobile={true} />
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  <Reveal delay={0.6}>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 bg-[#9A0E1F] rounded-full animate-pulse" />
                      <span className="text-[#9A0E1F] font-mono text-[9px] uppercase tracking-[0.25em] font-bold">Now Booking</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.65} className="w-full flex justify-center px-6">
                    <button
                      data-cal-link="wasim-ebxvk8/schedule-call"
                      data-cal-namespace="schedule-call"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      aria-label="Book a strategy call for your marketing campaign in Bahrain"
                      className="relative flex items-center justify-center gap-3 w-full max-w-[320px] h-[54px] bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white text-[11px] font-mono font-black tracking-[0.2em] uppercase rounded-full shadow-[0_8px_24px_rgba(154,14,31,0.4)] border border-[#9A0E1F]/50 active:scale-[0.97] transition-transform duration-200"
                    >
                      BOOK A STRATEGY CALL
                      <span className="opacity-80">→</span>
                    </button>
                  </Reveal>
                  <Reveal delay={0.7} className="w-full">
                    <p className="w-full text-white/40 text-[9px] text-center font-mono tracking-[0.2em] uppercase font-medium">Response within <span className="font-black text-white/90">24 hours</span></p>
                  </Reveal>
                </div>
              </div>

              {/* Bottom Metrics */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 md:pb-24 lg:pb-20 w-full px-5 md:px-0">
                <div className="container mx-auto border-t border-white/5 pt-5 md:pt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN: All 3 Metrics */}
                    <div className="lg:col-span-7 flex flex-row items-end justify-center lg:justify-start gap-6 md:gap-16 lg:gap-20">
                      <Reveal delay={0.7}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white font-black text-xl md:text-4xl tracking-tighter">GULF</span>
                          <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">Clients</span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.8}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white font-black text-xl md:text-4xl tracking-tighter">
                            <CountUp start={0} end={40} duration={5} redraw={true} suffix="+" />
                          </span>
                          <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">Brands Built</span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.9}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white font-black text-xl md:text-4xl tracking-tighter">
                            <CountUp start={0} end={300} duration={5} redraw={true} suffix="%" />
                          </span>
                          <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">More Engagement</span>
                        </div>
                      </Reveal>
                    </div>

                    {/* RIGHT COLUMN: Empty for now */}
                    <div className="lg:col-span-5 hidden lg:block" />
                  </div>
                </div>
              </div>
            </div>
          </HeroBlurWrapper>
        </section>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3: PORTFOLIO / SELECTED WORK
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
          <section id="work" data-theme="light" className="defer-render bg-white pt-40 pb-24">
            <div className="container">
              <div className="flex flex-col">
                <div className="h-[2px] w-full bg-black mb-12" />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-80 transition-opacity hover:opacity-100">
                      <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                      <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Our Work</span>
                    </div>
                    <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                      CLIENT<br />WORK.
                    </h2>
                  </div>
                  <div className="max-w-[340px] mt-12 md:mt-28">
                    <h4 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                      Campaigns that drive real growth.
                    </h4>
                    <p className="text-black/85 text-[15px] md:text-base leading-relaxed font-light antialiased">
                      A selection of our cinematic campaigns, commercials, and brand films.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section data-theme="light" className="defer-render pb-32 md:pb-48 bg-white text-black overflow-hidden">
            <div className="container">
              <div className="flex flex-col gap-4 md:gap-6">
                {(() => {
                  const PORTFOLIO_VIDEOS = [
                    { title: "Modern Aesthetics", cat: "Brand Film", vid: "https://www.pexels.com/download/video/29586732", poster: "https://images.pexels.com/videos/29586732/pictures/preview-0.jpg" },
                    { title: "Urban Motion", cat: "Campaign", vid: "https://www.pexels.com/download/video/34867881", poster: "https://images.pexels.com/videos/34867881/pictures/preview-0.jpg" },
                    { title: "Elevated Dining", cat: "Hospitality", vid: "https://www.pexels.com/download/video/3769033", poster: "https://images.pexels.com/videos/3769033/pictures/preview-0.jpg" },
                    { title: "Architectural Space", cat: "Commercial", vid: "https://www.pexels.com/download/video/4253140", poster: "https://images.pexels.com/videos/4253140/pictures/preview-0.jpg" },
                  ];

                  const chunks: (typeof PORTFOLIO_VIDEOS)[] = [];
                  for (let i = 0; i < PORTFOLIO_VIDEOS.length; i += 4) {
                    chunks.push(PORTFOLIO_VIDEOS.slice(i, i + 4));
                  }

                  return chunks.map((chunk, chunkIdx) => {
                    const isAlternate = chunkIdx % 2 !== 0;
                    const mainVideos = chunk.slice(0, 2);
                    const sideVideos = chunk.slice(2, 4);

                    return (
                      <div key={chunkIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

                        {/* PRIMARY VERTICAL REELS AREA (9:16) */}
                        <div className={`lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6 ${isAlternate ? 'md:order-2 lg:order-2' : 'md:order-1 lg:order-1'}`}>
                          {mainVideos.map((video, idx) => (
                            <Reveal key={idx} delay={0.1 + (idx * 0.1)} className="h-full">
                              <div className="group relative w-full h-full aspect-[9/16] bg-black/5 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500">
                                <SmartVideo
                                  src={video.vid}
                                  poster={video.poster}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-[5] pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-90" />

                                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end z-10 pointer-events-none">
                                  <p className="text-white/80 font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-1 font-bold drop-shadow-md">{video.cat}</p>
                                  <h4 className="text-white font-bold text-lg md:text-xl tracking-tight drop-shadow-lg leading-tight">{video.title}</h4>
                                </div>
                              </div>
                            </Reveal>
                          ))}
                        </div>

                        {/* SECONDARY SIDE CARDS */}
                        <div className={`lg:col-span-5 flex flex-col gap-4 md:gap-6 ${isAlternate ? 'md:order-1 lg:order-1' : 'md:order-2 lg:order-2'}`}>
                          {sideVideos.map((video, idx) => (
                            <Reveal key={idx} delay={0.15 + (idx * 0.1)} className="flex-1 h-full">
                              <div className="group relative w-full h-full min-h-[220px] aspect-video lg:aspect-auto bg-black/5 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500">
                                <SmartVideo
                                  src={video.vid}
                                  poster={video.poster}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-[5] pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-90" />

                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                                  <p className="text-white/80 font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-1 md:mb-2 font-bold drop-shadow-md">{video.cat}</p>
                                  <h4 className="text-white font-bold text-xl md:text-2xl tracking-tight drop-shadow-lg">{video.title}</h4>
                                </div>
                              </div>
                            </Reveal>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Dedicated Work Page CTA */}
              <div className="flex justify-center md:justify-end mt-16 md:mt-20 w-full pr-2">
                <Reveal delay={0.2}>
                  <Link
                    href="/work"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#050505] border border-[#9A0E1F]/50 shadow-[0_15px_40px_rgba(154,14,31,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-500 ease-[0.16,1,0.3,1] hover:bg-black hover:border-white/20 hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-100 group-hover:opacity-0 bg-[radial-gradient(ellipse_at_bottom,rgba(154,14,31,0.5)_0%,transparent_80%)] transition-opacity duration-700 pointer-events-none" />
                    
                    <span className="relative z-10 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white transition-colors duration-300">
                      OUR WORK
                    </span>
                    
                    <span className="relative z-10 text-[#9A0E1F] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-500 ease-[0.16,1,0.3,1] text-[14px] leading-none ml-1">
                      →
                    </span>
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        </SectionBlurWrapper>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 4: WHAT WE DO / SERVICES (BLACK THEME)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="services" data-theme="dark" className="defer-render py-32 md:py-40 bg-black text-white relative">
          <div className="container">
            <div className="flex flex-col">
              <div className="h-px w-full bg-white/10 mb-12" />
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 md:mb-20">
                <div>
                  <Reveal>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-10 opacity-80">
                      <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
                      <span className="text-white font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Services</span>
                    </div>
                  </Reveal>
                  <Reveal>
                    <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                      SERVICES.
                    </h2>
                  </Reveal>
                </div>
                <Reveal>
                  <div className="max-w-[340px] mt-28">
                    <h4 className="text-white font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                      Videos that actually get you customers.
                    </h4>
                    <p className="text-white/85 text-[15px] md:text-base leading-relaxed font-light antialiased">
                      We make videos that get people interested and help your business grow.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
            <ServicesTable />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 5: PROCESS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ProcessSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 6: PRICING
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
          <PricingSection />
        </SectionBlurWrapper>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 7: SOCIAL PROOF (REFINED)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
          <section data-theme="light" className="defer-render py-32 md:py-40 bg-white text-black overflow-hidden relative border-t border-black/5">
            <div className="container relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-24">

                {/* Left: Authority Block */}
                <div className="max-w-xl">
                  <Reveal>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                        <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Social Proof</span>
                      </div>
                    </div>
                    <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 font-black leading-[0.85] tracking-tight mb-10 uppercase" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}>
                      WHAT OUR<br /><span className="text-black/10">CLIENTS SAY.</span>
                    </h2>
                  </Reveal>

                  <div className="flex gap-12">
                    <Reveal delay={0.1}>
                      <p className="text-[#B11226] font-black text-3xl md:text-4xl tracking-tighter mb-1">+40%</p>
                      <p className="text-black/30 font-mono uppercase text-[8px] tracking-[0.2em]">Brand Growth</p>
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
        </SectionBlurWrapper>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 8: FAQ
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
          <FAQSection />
        </SectionBlurWrapper>
      </main>
    </div>

  );
}

/* ─────────────────────────────────────────────────────────────
   Testimonial Rotation Component
   ─────────────────────────────────────────────────────────── */
const HERO_TESTIMONIALS = [
  "We started getting real clients within weeks.",
  "Our conversions increased almost instantly.",
  "The campaign actually brought people to our business.",
  "We saw a clear jump in engagement after working with them.",
  "Finally, creative marketing that converts into real business.",
];

function TestimonialRotation({ isMobile = false }: { isMobile?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_TESTIMONIALS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative h-full">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`text-white font-bold italic ${isMobile ? "text-[13px]" : "text-[15px]"} leading-relaxed tracking-wide opacity-90`}
        >
          &ldquo;{HERO_TESTIMONIALS[index]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Count-up Animation
   ─────────────────────────────────────────────────────────── */
function CountUp({
  end,
  start = 0,
  duration = 1.5,
  suffix = "",
  redraw = false
}: {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  redraw?: boolean;
}) {
  const [count, setCount] = useState(start);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || redraw) {
            setHasAnimated(true);
            let startTime: number;
            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
              // Ease out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(start + (easeProgress * (end - start))));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        } else if (redraw) {
          setHasAnimated(false);
          setCount(start);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [end, start, duration, redraw, hasAnimated]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

const TESTIMONIALS = [
  {
    quote: "Our engagement started bringing in real clients. People were reaching out saying they saw our campaign.",
    client: "Ayaan Khan — Real Estate Director"
  },
  {
    quote: "The quality of the video immediately changed how people perceived our brand. We look premium now.",
    client: "Sara Malik — Fashion Founder"
  },
  {
    quote: "We've seen a massive spike in conversions since the campaign went live. It actually works.",
    client: "Omar Hussain — Tech Startup"
  },
  {
    quote: "They understood our vision and translated it into visuals that actually represent who we are.",
    client: "Zaid Ahmed — Hospitality Group"
  },
  {
    quote: "The footage is stunning, but the results are better. Our digital presence is at an all-time high.",
    client: "Layla Yusuf — Lifestyle Brand"
  },
  {
    quote: "Finally found an agency that treats our brand like art. The response from our audience was huge.",
    client: "Faisal Aziz — Fitness Franchise"
  },
  {
    quote: "It's rare to find creative direction this high in the region. They've set a new standard for us.",
    client: "Noor Al-Bahrani — Corporate Leader"
  },
  {
    quote: "Our product launch was a success because the brand film built so much hype before we even went live.",
    client: "Hamad Qasim — Product Designer"
  },
  {
    quote: "The cinematic look they gave us helped us secure a major partnership. It was a game changer.",
    client: "Mariam Shah — Retail Brand"
  },
  {
    quote: "The best investment we've made this year. The campaign paid for itself within the first month.",
    client: "Rashid Mahmood — Hospitality Director"
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
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
              <p className="text-[#B11226] font-mono text-[9px] uppercase tracking-[0.3em] font-black">What Our Clients Say</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
