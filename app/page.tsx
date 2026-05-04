"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import SmartVideo from "@/components/SmartVideo";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";

// Lazy load below-the-fold sections for performance
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={`will-change-[transform,opacity] transform-gpu ${className}`}
      style={{ transform: "translateZ(0)", ...style }}
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
    desc: "We create cinematic food content that drives footfall and builds authority.",
    sub: ["Reels & Short-form Ads", "Menu & Food Cinematography", "Social Media Packages"],
  },
  {
    num: "02",
    title: "Real Estate & Spaces",
    desc: "We shoot properties that attract buyers and increase inquiries.",
    sub: ["Interior Shoots", "Exterior Cinematics", "Drone Coverage"],
  },
  {
    num: "03",
    title: "Gyms & Fitness",
    desc: "Content that brings more people into your gym.",
    sub: ["Training Promos", "Facility Tours", "Client Transformations"],
  },
  {
    num: "04",
    title: "Hotels & Resorts",
    desc: "Visuals that increase bookings and guest interest.",
    sub: ["Room Showcases", "Lifestyle Shoots", "Amenity Coverage"],
  },
  {
    num: "05",
    title: "Ads & E-commerce",
    desc: "Content that drives clicks, sales, and conversions.",
    sub: ["Product Cinematics", "Direct Response Ads", "Explainer Videos"],
  },
  {
    num: "06",
    title: "Luxury Lifestyle & Automotive",
    desc: "Content that attracts high-end clients for cars, yachts, and premium brands.",
    sub: ["Exotic Automotive Shoots", "Luxury Yacht Coverage", "Personal & Corporate Events"],
  },
];

/* ─────────────────────────────────────────────────────────────
   Cinematic Hero Blur — scroll-linked depth-of-field effect
   ─────────────────────────────────────────────────────────── */
function HeroBlurWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();

  // Map scroll position to blur + opacity
  // Start blurring after 100px of scroll, fully blurred by 600px
  const blurAmount = useTransform(scrollY, [100, 600], [0, 14]);
  const opacityAmount = useTransform(scrollY, [100, 500], [1, 0.2]);

  useMotionValueEvent(blurAmount, "change", (blur) => {
    if (wrapperRef.current) {
      const opacity = opacityAmount.get();
      wrapperRef.current.style.filter = blur > 0.1 ? `blur(${blur}px)` : "none";
      wrapperRef.current.style.opacity = String(opacity);
    }
  });

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full will-change-[filter,opacity] transform-gpu"
      style={{ transition: "filter 0.1s linear, opacity 0.1s linear" }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section Blur — blurs a section as user scrolls past it
   ─────────────────────────────────────────────────────────── */
function SectionBlurWrapper({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Blur kicks in during the last 30% of section visibility
  const blurAmount = useTransform(scrollYProgress, [0.65, 1], [0, 10]);
  const opacityAmount = useTransform(scrollYProgress, [0.65, 1], [1, 0.3]);

  useMotionValueEvent(blurAmount, "change", (blur) => {
    if (contentRef.current) {
      const opacity = opacityAmount.get();
      contentRef.current.style.filter = blur > 0.1 ? `blur(${blur}px)` : "none";
      contentRef.current.style.opacity = String(opacity);
    }
  });

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={contentRef}
        className="will-change-[filter,opacity] transform-gpu"
        style={{ transition: "filter 0.08s linear, opacity 0.08s linear" }}
      >
        {children}
      </div>
    </div>
  );
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
            ${ isDimmed ? "opacity-30" : "opacity-100" }
            ${ isFeatured
              ? "border-[#9A0E1F]/20"
              : isHovered
              ? "border-white/15 bg-white/[0.025]"
              : "border-white/8"
            }`}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* ── Background: image for featured, glow for rest ── */}
          {isFeatured ? (
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.pexels.com/photos/33033789/pexels-photo-33033789.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Food & Hospitality Content"
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-[1400ms] ease-out opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/85" />
              {/* Featured red glow tint */}
              <div className="absolute inset-0 bg-[#9A0E1F]/5" />
            </div>
          ) : (
            <div
              className={`absolute inset-0 z-0 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#9A0E1F]/5 via-transparent to-transparent" />
            </div>
          )}

          {/* ── Always-on left accent bar ── */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ease-out z-10
              ${ isFeatured
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
              <span className={`font-mono text-[9px] tracking-[0.3em] pt-1 transition-colors duration-300 shrink-0 ${
                isFeatured ? "text-[#9A0E1F]" : isHovered ? "text-[#9A0E1F]" : "text-white/25"
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
              <p className={`text-[14px] leading-[1.7] antialiased font-light ${
                isFeatured ? "text-white/88" : "text-white/70"
              }`}>
                {svc.desc}
              </p>
            </div>

            {/* Right-center: Includes [20%] */}
            <div className="md:w-[20%] flex flex-col gap-2">
              <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-white/30 font-bold mb-1.5">Includes</p>
              {svc.sub.map((subItem, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2.5">
                  <span className={`text-[8px] leading-none shrink-0 ${
                    isFeatured ? "text-[#9A0E1F]/60" : "text-white/25"
                  }`}>—</span>
                  <span className="text-[10px] text-white/45 antialiased leading-snug">{subItem}</span>
                </div>
              ))}
            </div>

            {/* Far-right: CTA [15%] */}
            <div className="md:w-[15%] flex justify-end">
              <Link
                href="/services"
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 border font-mono text-[8px] tracking-[0.2em] uppercase rounded-[2px] transition-all duration-300 ease-out group/btn
                  ${ isFeatured
                    ? "border-[#9A0E1F]/50 text-white/80 bg-[#9A0E1F]/10 hover:bg-[#9A0E1F]/20 hover:border-[#9A0E1F] hover:text-white shadow-[0_0_16px_rgba(154,14,31,0.15)]"
                    : "border-white/10 text-white/50 bg-transparent hover:border-white/30 hover:text-white"
                  }`}
              >
                Explore
                <span className="text-[11px] leading-none transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
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
        {secondary.map((svc, i) => renderRow(svc, i + 2, false, i * 0.06))}
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
        <h1>Restaurant Videography & Food Content Creation in Bahrain</h1>
        <h2>Cinmach Productions: Premium Video Production Agency</h2>
        <p>Cinmach Productions is a Bahrain-based video production agency specializing in restaurant videography, food photography, and cinematic content for cafés and hospitality brands. We help businesses in Manama and across Bahrain grow through high-quality video marketing, social media reels, and brand storytelling.</p>
        
        <h2>Our Specialized Services</h2>
        <ul>
          <li><strong>Restaurant Videography Bahrain:</strong> High-end cinematic films for the hospitality industry.</li>
          <li><strong>Food Videography:</strong> Appetizing, high-converting visuals for menus and ads.</li>
          <li><strong>Social Media Video Production:</strong> High-retention reels and short-form content.</li>
          <li>Real Estate & Space Cinematics: Interior and exterior cinematic coverage.</li>
          <li>Brand Commercials: Creative direction and high-end storytelling.</li>
          <li>Post-Production: Professional color grading and sound design.</li>
        </ul>

        <h2>FAQ — Video Production for Restaurants</h2>
        <div>
          <h3>How does restaurant videography help my business?</h3>
          <p>Cinematic video content increases engagement on social media, showcases your food in the best light, and drives more footfall to your restaurant or café in Bahrain.</p>
          
          <h3>What is included in a food videography shoot?</h3>
          <p>We provide full production, including creative direction, high-end filming, and professional post-production (editing, color grading, and sound design).</p>
          
          <h3>Do you offer social media video production for cafés?</h3>
          <p>Yes, we specialize in high-retention social media reels and short-form ads tailored for platforms like Instagram and TikTok.</p>
          
          <h3>Where are you based?</h3>
          <p>We are a video production agency based in Manama, serving clients across all of Bahrain.</p>
        </div>

        <h2>Related Services</h2>
        <p>
          Learn more about our <a href="/restaurant-videography-bahrain">Restaurant Videography in Bahrain</a>.
        </p>

        <h2>Why Choose Cinmach Productions?</h2>
        <p>Our cinematic visuals are engineered to turn views into bookings. With over 40+ restaurants served in Bahrain, we deliver 3x engagement through high-quality video production.</p>
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
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.2] anim-slow-zoom"
          />
          {/* Base darkening */}
          <div className="absolute inset-0 bg-black/75 z-[1]" />
          {/* Subtle amber/red radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,42,42,0.15)_0%,transparent_80%)] z-[1]" />
          {/* Cinematic vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none z-[1]" />
          <motion.div 
            className="absolute inset-0 bg-black z-[2] transform-gpu" 
            initial={{ scaleY: 1 }} 
            animate={{ scaleY: 0 }} 
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            style={{ transform: "translateZ(0)" }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 z-[3] transform-gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            style={{ transform: "translateZ(0)" }}
          />
          
          {/* Architectural Grid Overlay */}
          <div className="absolute inset-0 z-[3] pointer-events-none">
            <div className="container h-full relative">
              {/* Vertical Lines */}
              <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0 opacity-[0.03]">
                {[...Array(13)].map((_, i) => (
                  <div key={i} className="border-r border-white h-full" />
                ))}
              </div>
              
              {/* Horizontal Lines */}
              <div className="absolute left-0 right-0 top-[15%] border-t border-white/5" />
              <div className="absolute left-0 right-0 bottom-[25%] border-t border-white/5" />
              <div className="absolute left-0 right-0 bottom-[10%] border-t border-white/5" />
            </div>
          </div>

          <div className="container relative z-[4] flex flex-col h-full justify-center px-5 md:px-0">
            {/* Top Metadata Removed */}
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-24 items-start py-4">
              {/* LEFT: CONTENT AREA */}
              <div className="lg:col-span-7 flex flex-col mt-4 lg:mt-12">
                <Reveal delay={0.2}>
                  <h1 className="text-white font-black leading-[0.9] tracking-tighter mb-5 lg:mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" style={{ fontSize: "clamp(2rem, 10vw, 5.5rem)", letterSpacing: "-0.04em" }}>
                    <span className="block whitespace-nowrap text-[0.8em] font-semibold tracking-tight mb-2">
                      Content that <span className="italic">fills</span>
                    </span>
                    <span className="text-[#9A0E1F] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">RESTAURANTS<br />&amp; CAF&Eacute;S.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.4} className="max-w-xl">
                  <p className="text-white/85 text-[13px] md:text-[15px] lg:text-base leading-relaxed font-light pr-2 md:pr-0 mb-6 md:mb-10 lg:max-w-md">
                    We create scroll-stopping content that grabs attention and turns it into real customers at your tables.
                  </p>
                </Reveal>

                {/* Secondary CTA (Desktop Only) */}
                <div className="hidden lg:block">
                  <Reveal delay={0.5}>
                    <button 
                      onClick={openProjectModal}
                      className="group relative flex items-center justify-center gap-4 px-6 py-3 border border-white/20 text-white text-[9px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white hover:text-black"
                    >
                       <span>VIEW PROJECTS</span>
                       <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </Reveal>
                </div>
              </div>

              {/* RIGHT: CONVERSION CARD (Desktop Only) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col items-end">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="w-full max-w-[400px]"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full bg-[#0a0a0a]/55 backdrop-blur-[16px] border border-white/[0.06] p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group transition-all duration-500 hover:scale-[1.02] hover:border-white/20 will-change-transform transform-gpu"
                  >
                    {/* Architectural Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#9A0E1F]/40 -translate-y-4 translate-x-4 transition-transform duration-700 group-hover:translate-x-0 group-hover:translate-y-0" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 bg-[#9A0E1F] rounded-full animate-pulse shadow-[0_0_10px_#9A0E1F]" />
                        <span className="text-[#9A0E1F] font-mono text-[8px] uppercase tracking-widest font-bold">Direct Booking</span>
                      </div>
                      
                      <h3 className="text-white font-bold text-xl mb-1 tracking-tight uppercase">Start Your Shoot</h3>
                      <p className="text-white/40 text-[9px] font-mono uppercase tracking-widest mb-6">Limited Slots Available</p>
                      
                      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative group/input">
                          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 text-white text-xs outline-none focus:border-[#9A0E1F]/50 transition-all duration-300 rounded-none placeholder:text-white/30 bg-white/[0.02]" />
                          <div className="absolute inset-0 bg-[#9A0E1F]/10 opacity-0 group-focus-within/input:opacity-100 blur-md transition-opacity pointer-events-none transform-gpu" />
                        </div>
                        
                        <div className="relative group/input">
                          <input type="text" placeholder="Business Name" className="w-full px-4 py-3 text-white text-xs outline-none focus:border-[#9A0E1F]/50 transition-all duration-300 rounded-none placeholder:text-white/30 bg-white/[0.02]" />
                          <div className="absolute inset-0 bg-[#9A0E1F]/10 opacity-0 group-focus-within/input:opacity-100 blur-md transition-opacity pointer-events-none transform-gpu" />
                        </div>
                        
                        <div className="relative group/input">
                          <input type="text" placeholder="Phone / WhatsApp" className="w-full px-4 py-3 text-white text-xs outline-none focus:border-[#9A0E1F]/50 transition-all duration-300 rounded-none placeholder:text-white/30 bg-white/[0.02]" />
                          <div className="absolute inset-0 bg-[#9A0E1F]/10 opacity-0 group-focus-within/input:opacity-100 blur-md transition-opacity pointer-events-none transform-gpu" />
                        </div>
                        
                        <button className="group/btn w-full bg-white text-black h-[50px] font-mono font-bold text-[10px] tracking-[0.3em] uppercase mt-2 hover:bg-[#9A0E1F] hover:text-white hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all duration-200 ease-out shadow-xl flex items-center justify-center gap-4 overflow-hidden relative rounded-sm">
                          <span className="relative z-10 transition-transform duration-200 group-hover/btn:scale-[1.02]">Book Your Shoot</span>
                          <span className="relative z-10 transform group-hover/btn:translate-x-2 transition-transform duration-200 text-lg">→</span>
                        </button>
                      </form>
                      
                      <p className="text-white/40 text-[9px] text-center mt-5 font-mono tracking-[0.25em] uppercase font-medium">Response within <span className="font-black text-white/90 text-[10px]">24 hours</span></p>
                    </div>
                  </motion.div>

                  {/* Trust Signal Testimonial Slider */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 w-full bg-[#0a0a0a]/55 backdrop-blur-[16px] border border-white/[0.06] p-6 lg:p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(154,14,31,0.06)]"
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
                </motion.div>
              </div>

              {/* Mobile CTA (Visible only on mobile) */}
              <div className="lg:hidden flex flex-col items-start gap-3">
                <Reveal delay={0.5}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 bg-[#9A0E1F] rounded-full animate-pulse" />
                    <span className="text-[#9A0E1F] font-mono text-[8px] uppercase tracking-widest font-bold">Now Booking</span>
                  </div>
                </Reveal>
                
                <Reveal delay={0.6}>
                  <button 
                    onClick={openProjectModal}
                    className="group relative flex items-center justify-center gap-4 w-full px-8 py-4 bg-white text-black text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(154,14,31,0.2)] rounded-full"
                  >
                     <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#9A0E1F] z-20" />
                     <span className="relative z-10 transition-colors duration-500 flex items-center group-hover:text-white">
                       BOOK YOUR SHOOT <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-500 opacity-70 group-hover:opacity-100">→</span>
                     </span>
                     <div className="absolute inset-0 bg-[#9A0E1F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </button>
                </Reveal>
                <Reveal delay={0.65}>
                  <p className="w-full text-[#9A0E1F] text-[8px] text-center mt-2 font-mono tracking-[0.2em] uppercase font-black">Response within 24 hours</p>
                </Reveal>

                {/* Mobile Testimonial Slider */}
                <div className="w-full mt-2">
                  <Reveal delay={0.7}>
                    <div className="w-full bg-[#0a0a0a]/55 backdrop-blur-[16px] border border-white/[0.06] p-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(154,14,31,0.06)]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-[1px] w-5 bg-[#9A0E1F]" />
                        <span className="text-[#9A0E1F] font-mono text-[8px] uppercase tracking-[0.2em] font-black block">What Our Clients Say</span>
                      </div>
                      <div className="relative h-10 flex items-center">
                        <TestimonialRotation isMobile={true} />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Bottom Metrics */}
            <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-24 lg:pb-20 w-full px-5 md:px-0">
              <div className="container mx-auto border-t border-white/5 pt-6 md:pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* LEFT COLUMN: All 3 Metrics */}
                  <div className="lg:col-span-7 flex flex-row items-end gap-8 md:gap-16 lg:gap-20">
                    <Reveal delay={0.7}>
                      <div className="flex flex-col">
                        <span className="text-white font-black text-xl md:text-4xl tracking-tighter">GULF</span>
                        <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">Clients</span>
                      </div>
                    </Reveal>
                    <Reveal delay={0.8}>
                      <div className="flex flex-col">
                        <span className="text-white font-black text-xl md:text-4xl tracking-tighter">
                          <CountUp start={0} end={40} duration={5} redraw={true} suffix="+" />
                        </span>
                        <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">Restaurants</span>
                      </div>
                    </Reveal>
                    <Reveal delay={0.9}>
                      <div className="flex flex-col">
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
            SECTION 2: PORTFOLIO / SELECTED WORK
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
        <section data-theme="light" className="defer-render bg-white pt-40 pb-24">
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
                <div className="max-w-[340px] mt-28">
                  <h4 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                    Built to turn views into real customers.
                  </h4>
                  <p className="text-black/85 text-[15px] md:text-base leading-relaxed font-light antialiased">
                    A selection of client work crafted to drive attention, engagement, and real customer growth.
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
                   { title: "Culinary Art", cat: "Hospitality", vid: "https://www.pexels.com/download/video/3298720/", poster: "https://images.pexels.com/videos/3298720/pictures/preview-0.jpg" },
                   { title: "Elegant Dining", cat: "Hospitality", vid: "https://www.pexels.com/download/video/12188718/", poster: "https://images.pexels.com/videos/12188718/pictures/preview-0.jpg" },
                   { title: "Atmosphere", cat: "Hospitality", vid: "https://www.pexels.com/download/video/5657164/", poster: "https://images.pexels.com/videos/5657164/pictures/preview-0.jpg" },
                 ];
                 
                 const chunks = [];
                 for (let i = 0; i < PORTFOLIO_VIDEOS.length; i += 3) {
                   chunks.push(PORTFOLIO_VIDEOS.slice(i, i + 3));
                 }

                 return chunks.map((chunk, chunkIdx) => {
                   const isAlternate = chunkIdx % 2 !== 0;
                   const largeVideo = chunk[0];
                   const smallVideos = chunk.slice(1);
                   
                   return (
                     <div key={chunkIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
                       
                       {/* LARGE CARD (~60%) */}
                       <div className={`lg:col-span-7 h-full ${isAlternate ? 'md:order-2 lg:order-2' : 'md:order-1 lg:order-1'}`}>
                         {largeVideo && (
                           <Reveal delay={0.1} className="h-full">
                             <div className="group relative w-full h-full min-h-[400px] lg:min-h-[550px] aspect-[4/5] lg:aspect-auto bg-black/5 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500">
                               <SmartVideo 
                                  src={largeVideo.vid} 
                                  poster={largeVideo.poster}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                                />
                               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-[5]" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-90" />
                               
                               {/* Play Icon */}
                               <div className="absolute inset-0 flex items-center justify-center z-[7] opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100">
                                 <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                                   <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
                                 </div>
                               </div>

                               <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
                                 <p className="text-white/80 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2 font-bold drop-shadow-md">{largeVideo.cat}</p>
                                 <h4 className="text-white font-bold text-3xl md:text-4xl tracking-tight drop-shadow-lg">{largeVideo.title}</h4>
                               </div>
                             </div>
                           </Reveal>
                         )}
                       </div>

                       {/* SMALL CARDS (~40%) */}
                       <div className={`lg:col-span-5 flex flex-col gap-4 md:gap-6 ${isAlternate ? 'md:order-1 lg:order-1' : 'md:order-2 lg:order-2'}`}>
                         {smallVideos.map((video, idx) => (
                           <Reveal key={idx} delay={0.15 + (idx * 0.1)} className="flex-1 h-full">
                             <div className="group relative w-full h-full min-h-[220px] aspect-video lg:aspect-auto bg-black/5 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500">
                               <SmartVideo 
                                  src={video.vid} 
                                  poster={video.poster}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                                />
                               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-[5]" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-90" />
                               
                               {/* Play Icon */}
                               <div className="absolute inset-0 flex items-center justify-center z-[7] opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100">
                                 <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                                   <div className="w-0 h-0 border-t-6 border-t-transparent border-l-[10px] border-l-white border-b-6 border-b-transparent ml-1" />
                                 </div>
                               </div>

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
           </div>
         </section>
        </SectionBlurWrapper>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3: WHAT WE DO / SERVICES (BLACK THEME)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
        <section data-theme="dark" className="defer-render py-32 md:py-40 bg-black text-white relative">
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
                      Built to turn views into real customers.
                    </h4>
                    <p className="text-white/85 text-[15px] md:text-base leading-relaxed font-light antialiased">
                      We create content that drives attention, demand, and real customer growth.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
            <ServicesTable />
          </div>
        </section>
        </SectionBlurWrapper>

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
        <section data-theme="light" className="defer-render py-28 md:py-36 bg-white text-black overflow-hidden relative border-t border-black/5">
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
  "We started getting real customers within weeks.",
  "Our bookings increased almost instantly.",
  "Content actually brought people into our restaurant.",
  "We saw a clear jump in customers after working with them.",
  "Finally content that converts into real business.",
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
              <p className="text-[#B11226] font-mono text-[9px] uppercase tracking-[0.3em] font-black">What Our Clients Say</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
