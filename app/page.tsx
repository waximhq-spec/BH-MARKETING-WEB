"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import Image from "next/image";
import { FALLBACK_PROJECTS, type Project } from "@/lib/project-types";
import ProjectLightbox from "@/components/ProjectLightbox";

// Lazy load below-the-fold sections for performance
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const EngagementModels = dynamic(() => import("@/components/EngagementModels"));

const FAQSection = dynamic(() => import("@/components/FAQSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));

/* ─────────────────────────────────────────────────────────────
   Internal Components
   ─────────────────────────────────────────────────────────── */
function HeroClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    setTimeout(() => setTime(new Date()), 0);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="w-20" />; // Placeholder to avoid layout shift

  return (
    <div className="flex flex-col items-start gap-1 font-mono">
      <div className="flex items-center gap-2">
        <span className="w-1 h-1 bg-[#9A0E1F] rounded-full animate-pulse transform-gpu will-change-[opacity]" />
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
import Reveal from "@/components/Reveal";

/* ─────────────────────────────────────────────────────────────
   Services Table Component (Interactive Accordion)
   ─────────────────────────────────────────────────────────── */
const SERVICES_DATA: Array<{
  num: string;
  title: string;
  desc: string;
  sub: string[];
  alt: string;
  bg: string;
  href: string;
  disabled?: boolean;
}> = [
  {
    num: "01",
    title: "Content Production",
    desc: "Cinematic content designed to capture attention and drive engagement.",
    sub: ["Reels & Short-Form Content", "Commercial Videos", "Photography"],
    alt: "Cinematic content production and commercial video services in Bahrain",
    bg: "https://i.pinimg.com/736x/a9/b9/88/a9b988ce1e463875821ab469a204221d.jpg",
    href: "/content-production"
  },
  {
    num: "02",
    title: "Brand Identity",
    desc: "We build memorable brands that stand out online and in real life.",
    sub: ["Logo Design", "Visual Identity", "Brand Strategy", "Brand Guidelines"],
    alt: "Premium brand identity and logo design services by creative agency in Bahrain",
    bg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    href: "/brand-identity"
  }
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
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = panelRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    panelRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── DESKTOP: Sticky Left + Scrolling Right Panels ── */}
      <div ref={sectionRef} className="hidden lg:flex w-full relative items-start">
        {/* LEFT: Sticky Column */}
        <div className="w-[42%] sticky top-[56px] lg:top-[64px] h-[calc(100vh-56px)] lg:h-[calc(100vh-64px)] flex flex-col justify-center py-12 border-r border-white/10">
          <div className="w-full flex flex-col justify-center h-full" style={{ paddingLeft: 'var(--container-margin)', paddingRight: '3rem' }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-6 lg:mb-10 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#9A0E1F]" />
              <span className="text-white font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Our Services</span>
            </div>

            <div className="flex flex-col gap-2 mb-10">
            {SERVICES_DATA.map((svc, idx) => (
              <button
                key={svc.num}
                onClick={() => panelRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="flex items-center gap-4 text-left group w-full py-2"
              >
                <span className={`font-mono text-[10px] tracking-[0.3em] transition-colors duration-300 ${activeIndex === idx ? "text-[#9A0E1F]" : "text-white/20"}`}>
                  {svc.num}
                </span>
                <span className={`font-black text-[13px] md:text-[15px] tracking-tight uppercase transition-colors duration-300 ${activeIndex === idx ? "text-white" : "text-white/30"}`}>
                  {svc.title}
                </span>
                <span className={`ml-auto transition-all duration-300 ${activeIndex === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" />
                </span>
              </button>
            ))}
          </div>

          {/* Active service info panel */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-[13px] leading-relaxed font-light mb-6">
              {SERVICES_DATA[activeIndex].desc}
            </p>
            <div className="flex flex-col gap-2">
              {SERVICES_DATA[activeIndex].sub.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#9A0E1F]" />
                  <span className="text-[12px] text-white/60 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* RIGHT: Scrolling Panels */}
        <div className="w-[58%] flex flex-col">
          {SERVICES_DATA.map((svc, idx) => (
            <div
              key={svc.num}
              ref={(el) => { panelRefs.current[idx] = el; }}
              className="relative h-screen flex items-center"
            >
              <div className="w-full" style={{ paddingRight: 'var(--container-margin)', paddingLeft: '4rem' }}>
                <Link
                  href={svc.disabled ? "#" : svc.href}
                  onClick={(e) => svc.disabled && e.preventDefault()}
                  className={`block relative w-full h-[65vh] max-h-[600px] overflow-hidden rounded-2xl group ${svc.disabled ? "cursor-not-allowed opacity-90" : "cursor-pointer"}`}
                >
                  <Image
                    src={svc.bg}
                    alt={svc.alt || svc.title}
                    fill
                    loading="lazy"
                    sizes="55vw"
                    className={`object-cover transition-transform duration-[1200ms] ease-out ${!svc.disabled ? "group-hover:scale-[1.04]" : ""}`}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9A0E1F]/20 to-transparent" />
                  
                  {/* Bottom details & Explore button */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#9A0E1F] mb-2">{svc.num} / 0{SERVICES_DATA.length}</p>
                      <h3 className="text-white font-black text-2xl uppercase tracking-tight mb-2">{svc.title}</h3>
                      <p className="text-white/60 text-[11px] font-light max-w-[340px] leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                    
                    {/* Premium Glassmorphism CTA Button */}
                    <div className="flex items-center gap-4 rounded-full pl-6 pr-2 py-2 bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-300">
                      <span className="font-mono tracking-[0.2em] uppercase text-[10px] font-bold text-white pr-4">
                        {svc.disabled ? "Coming Soon" : "Details"}
                      </span>
                      {!svc.disabled && (
                        <div className="w-8 h-8 rounded-full bg-[#9A0E1F] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#b51226] text-white text-[14px]">
                          →
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* ── MOBILE: Card Stack ── */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-4 w-fit">
          <span className="w-2 h-2 rounded-full bg-[#9A0E1F]" />
          <span className="text-white font-mono tracking-[0.3em] uppercase text-[11px] md:text-[12px] font-bold">Our Services</span>
        </div>

        {SERVICES_DATA.map((svc, idx) => (
          <Reveal key={svc.num} delay={idx * 0.06}>
            <div className="relative rounded-xl overflow-hidden border border-white/[0.06] group cursor-default">
              <div className="absolute inset-0 z-0">
                <Image
                  src={svc.bg}
                  alt={svc.alt || svc.title}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#9A0E1F]/[0.3] via-[#9A0E1F]/[0.08] to-transparent" />
              </div>
              <div className="relative z-10 flex flex-col gap-4 py-8 px-5">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#9A0E1F] pt-1.5">{svc.num}</span>
                  <h3 className="font-black text-white/90 leading-[1.05] text-[1.15rem] tracking-tight">{svc.title}</h3>
                </div>
                <p className="text-[13px] leading-[1.7] font-light text-white/60 pl-8">{svc.desc}</p>
                <div className="flex flex-col gap-2 pl-8">
                  {svc.sub.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="text-[#9A0E1F] text-[10px]">—</span>
                      <span className="text-[11px] font-medium text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pl-8 mt-2">
                  <Link
                    href={svc.disabled ? "#" : svc.href}
                    onClick={(e) => svc.disabled && e.preventDefault()}
                    className={`inline-flex items-center gap-4 rounded-full pl-6 pr-2 py-2 bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-300 ${!svc.disabled ? "hover:border-[#9A0E1F]/50 hover:bg-black/60 group/mobilebtn" : "opacity-90 cursor-not-allowed"}`}
                  >
                    <span className="font-mono tracking-[0.2em] uppercase text-[9px] font-bold text-white pr-4">
                      {svc.disabled ? "Coming Soon" : "Details"}
                    </span>
                    {!svc.disabled && (
                      <div className="w-7 h-7 rounded-full bg-[#9A0E1F] flex items-center justify-center transition-all duration-300 group-hover/mobilebtn:translate-x-1 group-hover/mobilebtn:bg-[#b51226] text-white text-[12px]">
                        →
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* View All CTA */}
        <div className="flex justify-center mt-8">
          <Reveal delay={0.3}>
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center gap-4 pl-8 pr-3 py-3 rounded-full bg-white text-black font-mono font-bold text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transform-gpu will-change-transform"
            >
              <span>ALL SERVICES</span>
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-black/20 text-[14px]">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </>
  );
}


export default function LandingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"ALL" | "VIDEOS" | "PHOTOS">("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      {/* ── SEO CONTENT LAYER (Invisible but Indexable) ── */}
      <VisualHiddenSEO>
        <h1>Creative Marketing Agency & Cinematic Video Production in Bahrain</h1>
        <h2>Cinmach Productions: Premium Brand Building Agency</h2>
        <p>Cinmach Productions is a premium creative marketing and production agency in Bahrain. We combine strategy, storytelling, and cinematic production to build modern brands. We specialize in custom brand identity, professional logo design, high-end commercial video production, and visual assets across diverse industries.</p>

        <h2>Our Specialized Services</h2>
        <ul>
          <li><strong>Brand Identity:</strong> Custom logos, strategic positioning, and brand guidelines to drive growth.</li>
          <li><strong>Content Production:</strong> Cinematic brand films, high-end photography, reels, and visual storytelling.</li>
          <li><strong>Digital Marketing Assets:</strong> Conversion-focused digital visuals and creative social media presence.</li>
        </ul>

        <h2>FAQ — Creative Agency Services</h2>
        <div>
          <h3>How does cinematic content help my brand&apos;s growth?</h3>
          <p>Cinematic video content increases engagement, elevates your brand&apos;s perceived value, and turns digital views into real business growth.</p>

          <h3>What is included in a content production project?</h3>
          <p>We handle everything from start to finish: creative concept development, pre-production planning, high-end filming, and professional post-production including cinematic editing, color grading, and sound design.</p>

          <h3>Can you help with my company&apos;s branding and logo design?</h3>
          <p>Absolutely. We offer complete Brand Identity design services, including custom logo design, visual positioning, curated color palettes, typography, and professional brand guidelines to make your business memorable.</p>

          <h3>Do you produce content optimized for social media?</h3>
          <p>Yes, we produce high-end, short-form cinematic video reels and photography specifically formatted and optimized to stand out and capture attention on modern digital platforms like Instagram and TikTok.</p>

          <h3>Where are you based?</h3>
          <p>We are a creative marketing and production agency based in Manama, serving clients across all of Bahrain and the GCC.</p>
        </div>

        <h2>Why Choose Cinmach Productions?</h2>
        <p>Our strategic approach ensures that every visual serves a purpose. We engineer outcomes, turning businesses into recognizable brands through premium execution.</p>
      </VisualHiddenSEO>


      <main className="flex-1">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1: HERO (REFINED FOR ALL MOBILES)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section data-theme="dark" className="relative h-auto lg:h-[100svh] min-h-[100svh] lg:min-h-[650px] -mt-[92px] md:-mt-[100px] pt-[92px] md:pt-[100px] w-full overflow-hidden flex flex-col" id="hero-section">
          <HeroBlurWrapper>
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 pointer-events-none"
            >
              <source src="https://www.pexels.com/download/video/8396974/" type="video/mp4" />
            </video>

            {/* Architectural structural grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none z-[1]" />

            {/* Layered premium reddish glows matching the design mockup */}
            <div className="absolute top-0 left-0 w-[70%] h-full bg-[radial-gradient(ellipse_at_top_left,rgba(190,15,30,0.5)_0%,rgba(154,14,31,0.25)_45%,transparent_75%)] pointer-events-none z-[2]" />
            <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#ff1e27]/20 blur-[130px] pointer-events-none z-[2]" />

            {/* Cinematic vignette and page transition shadow for maximum legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-[#050505]/15 to-transparent z-[3] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505] z-[3] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-[3] pointer-events-none" />


            <div className="container relative z-[4] flex flex-col h-auto lg:h-full justify-center px-5 md:px-0 pt-4 pb-32 sm:pb-36 lg:pb-28">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-24 items-start">
                {/* LEFT: CONTENT AREA */}
                <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left w-full">
                  <div className="w-full flex flex-col mx-auto lg:mx-0">
                    {/* MOBILE HEADLINE */}
                    <h1 className="md:hidden text-white font-heading leading-none antialiased uppercase mb-6 text-center mx-auto max-w-[360px] w-full">
                      <span className="block text-[2.2rem] font-bold tracking-[-0.02em] mb-1 uppercase leading-[0.9] text-white">
                        WE MAKE
                      </span>
                      <span className="block text-[3.6rem] font-black text-white mb-1 uppercase leading-[0.88] tracking-[-0.03em]">
                        BRANDS
                      </span>
                      <span className="text-[#E50914] uppercase block text-[clamp(1.8rem,8.2vw,2.4rem)] font-black tracking-[-0.035em] mt-0 leading-[0.9]">
                        UNFORGETTABLE.
                      </span>
                    </h1>
                    {/* DESKTOP HEADLINE */}
                    <h1 className="hidden md:block text-white leading-none antialiased uppercase mb-6 font-heading">
                      <span 
                        className="block font-bold text-white uppercase"
                        style={{ 
                          fontSize: "clamp(2.5rem, 4.2vw, 4.4rem)", 
                          letterSpacing: "-0.02em",
                          lineHeight: 0.9
                        }}
                      >
                        WE MAKE
                      </span>
                      <span 
                        className="block font-black text-white uppercase"
                        style={{ 
                          fontSize: "clamp(4.2rem, 7.5vw, 7.8rem)", 
                          letterSpacing: "-0.03em",
                          lineHeight: 0.88
                        }}
                      >
                        BRANDS
                      </span>
                      <span 
                        className="text-[#E50914] font-black block animate-gpu"
                        style={{ 
                          fontSize: "clamp(3.2rem, 5.8vw, 6.2rem)", 
                          letterSpacing: "-0.035em",
                          lineHeight: 0.9
                        }}
                      >
                        UNFORGETTABLE.
                      </span>
                    </h1>

                    {/* Red Horizontal Divider Accent Line from Mockup */}
                    <div className="w-12 h-[2px] bg-[#E50914] my-5 mx-auto lg:mx-0" />

                    {/* MOBILE PARAGRAPH */}
                    <Reveal delay={0.2} className="w-full md:hidden mt-2">
                      <p className="text-[#E0E0E0] text-[14px] leading-[1.6] font-light mb-8 text-center max-w-[360px] mx-auto">
                        We combine strategy, storytelling, and cinematic production to turn businesses into recognizable brands that leave a lasting impact.
                      </p>
                    </Reveal>
                    {/* DESKTOP PARAGRAPH */}
                    <Reveal delay={0.2} className="w-full hidden md:block mt-2">
                      <p className="text-[#D8D8D8] text-[15px] lg:text-[16px] leading-[1.65] font-light mb-10 text-left max-w-[480px]">
                        We combine strategy, storytelling, and cinematic production to turn businesses into recognizable brands that leave a lasting impact.
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
                <div className="hidden lg:flex lg:col-span-5 flex-col items-end lg:mt-2">
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="w-full max-w-[400px] flex flex-col gap-4 transform-gpu will-change-transform"
                  >
                    {/* Trust Signal Testimonial Slider with Dark Transparent Frosted Glass */}
                    <motion.div
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="w-full bg-white/[0.06] backdrop-blur-2xl border border-white/15 p-6 lg:p-8 relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.4)] rounded-[24px]"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[1px] w-6 bg-[#E50914]" />
                          <span className="text-white/60 font-mono text-[9px] uppercase tracking-[0.3em] font-black">What Our Clients Say</span>
                        </div>
                        <div className="relative h-12 flex items-center">
                          <TestimonialRotation textColor="text-white" />
                        </div>
                      </div>
                    </motion.div>

                    <div
                      className="relative w-full bg-white/[0.06] backdrop-blur-2xl border border-white/15 p-6 lg:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.4)] rounded-[24px] group transition-all duration-700 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_40px_90px_rgba(0,0,0,0.5)] transform-gpu overflow-hidden"
                    >
                      {/* Soft ambient red glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Status Label */}
                        <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/12 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                          <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full shadow-[0_0_8px_#E50914] animate-pulse" />
                          <span className="text-white/80 font-medium text-[9px] uppercase tracking-[0.2em]">Direct Booking</span>
                        </div>

                        {/* Headings */}
                        <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 tracking-tight uppercase">Start Your Project</h3>
                        <p className="text-white/70 text-[11px] md:text-[12px] leading-relaxed max-w-[280px] mx-auto mb-6 font-light">
                          Creative marketing tailored for modern brands.
                        </p>

                        {/* CTA Button */}
                        <button 
                          data-cal-link="cinmach-productions-re7k86/call-req"
                          data-cal-namespace="call-req"
                          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                          aria-label="Book a creative strategy call for your shoot in Bahrain"
                          className="relative w-full overflow-hidden group/btn bg-[#E50914] rounded-full h-[50px] flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-[0_10px_35px_rgba(229,9,20,0.45)] active:scale-[0.98] border border-[#E50914]/50"
                        >
                          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 ease-out" />
                          <span className="relative z-10 text-white font-medium text-[11px] tracking-[0.15em] uppercase">
                            Book a Strategy Call
                          </span>
                          <span className="relative z-10 text-white/80 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </button>

                        {/* Footer text */}
                        <div className="mt-4 flex flex-col items-center gap-2">
                          <p className="text-white/50 text-[9px] font-medium tracking-[0.1em] uppercase">
                            Response within <span className="text-white font-bold">24 hours</span>
                          </p>
                          <p className="text-[#E50914] text-[8px] font-bold tracking-[0.15em] uppercase">
                            Limited client slots available for June
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Hero Content - Rendered with Static Solids */}
                <div className="lg:hidden flex flex-col items-center gap-3 w-full mt-2 mb-8">
                  <div className="w-full flex justify-center px-4">
                    <button
                      data-cal-link="cinmach-productions-re7k86/call-req"
                      data-cal-namespace="call-req"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                      aria-label="Book a strategy call for your marketing campaign in Bahrain"
                      className="relative flex items-center justify-center gap-2 w-full max-w-[260px] h-[48px] bg-[#9A0E1F] text-white text-[11px] font-mono font-black tracking-[0.1em] uppercase rounded-full shadow-[0_8px_20px_rgba(154,14,31,0.2)] active:scale-[0.98] transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>BOOK A STRATEGY CALL</span>
                    </button>
                  </div>
                  
                  <Reveal delay={0.3} className="w-full">
                    <p className="w-full text-white/40 text-[9px] text-center font-mono tracking-[0.1em] uppercase font-medium mt-1">
                      Response within <span className="font-black text-white/80">24 hours</span>
                    </p>
                  </Reveal>
                </div>
              </div>

              {/* Bottom Metrics - Exact Badged Design from Mockup Image */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 sm:pb-12 md:pb-20 lg:pb-16 w-full px-5 md:px-0">
                <div className="container mx-auto border-t border-white/10 pt-5 md:pt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN: All 3 Metrics with Dark Red Icon Badges */}
                    <div className="lg:col-span-8 flex flex-row items-center justify-between lg:justify-start gap-2.5 sm:gap-6 md:gap-12 lg:gap-14">
                      {/* Metric 1: GULF CLIENTS */}
                      <Reveal delay={0.7}>
                        <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3.5">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#22070a]/80 border border-[#9A0E1F]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(154,14,31,0.2)]">
                            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#E50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <span className="text-white font-extrabold text-[15px] sm:text-[18px] md:text-2xl tracking-tight uppercase">GULF</span>
                            <span className="text-white/40 font-mono font-medium text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">Clients</span>
                          </div>
                        </div>
                      </Reveal>

                      <div className="hidden sm:block h-8 w-px bg-white/10" />

                      {/* Metric 2: BRANDS BUILT */}
                      <Reveal delay={0.8}>
                        <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3.5">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#22070a]/80 border border-[#9A0E1F]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(154,14,31,0.2)]">
                            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#E50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <span className="text-white font-extrabold text-[15px] sm:text-[18px] md:text-2xl tracking-tight">
                              <CountUp start={0} end={40} duration={5} redraw={true} suffix="+" />
                            </span>
                            <span className="text-white/40 font-mono font-medium text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">Brands Built</span>
                          </div>
                        </div>
                      </Reveal>

                      <div className="hidden sm:block h-8 w-px bg-white/10" />

                      {/* Metric 3: MORE ENGAGEMENT */}
                      <Reveal delay={0.9}>
                        <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-3.5">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#22070a]/80 border border-[#9A0E1F]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(154,14,31,0.2)]">
                            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#E50914]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <span className="text-white font-extrabold text-[15px] sm:text-[18px] md:text-2xl tracking-tight">
                              <CountUp start={0} end={300} duration={5} redraw={true} suffix="%" />
                            </span>
                            <span className="text-white/40 font-mono font-medium text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">Engagement</span>
                          </div>
                        </div>
                      </Reveal>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 hidden lg:block" />
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
          <section id="work" data-theme="light" className="bg-white pt-40 pb-24">
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
                      OUR<br />WORK.
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

          <section data-theme="light" className="pb-32 md:pb-48 bg-white text-black overflow-hidden">
            <div className="container">
              {/* Tab Filter Switcher */}
              <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-black/5 pb-8">
                {(["ALL", "VIDEOS", "PHOTOS"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                      activeTab === tab
                        ? "bg-[#9A0E1F] text-white border-[#9A0E1F] font-bold shadow-[0_4px_12px_rgba(154,14,31,0.25)]"
                        : "bg-transparent text-black/60 border-black/10 hover:text-[#9A0E1F] hover:bg-[#9A0E1F]/5 hover:border-[#9A0E1F]/20"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4 md:gap-6">
                {(() => {
                  const rawProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;
                  const displayProjects = rawProjects.filter((project) => {
                    if (activeTab === "ALL") return true;
                    if (activeTab === "VIDEOS") return project.hasVideos;
                    if (activeTab === "PHOTOS") return project.hasPhotos;
                    return true;
                  });

                  if (displayProjects.length === 0) {
                    return (
                      <div className="py-24 text-center">
                        <p className="text-black/40 font-mono text-sm">No items found matching the selected filter.</p>
                      </div>
                    );
                  }

                  const chunks: Project[][] = [];
                  for (let i = 0; i < displayProjects.length; i += 4) {
                    chunks.push(displayProjects.slice(i, i + 4));
                  }

                  return chunks.map((chunk, chunkIdx) => {
                    const isAlternate = chunkIdx % 2 !== 0;
                    const mainProjects = chunk.slice(0, 2);
                    const sideProjects = chunk.slice(2, 4);

                    return (
                      <div key={chunkIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

                        {/* PRIMARY VERTICAL REELS AREA (9:16) */}
                        <div className={`lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6 ${isAlternate ? 'md:order-2 lg:order-2' : 'md:order-1 lg:order-1'}`}>
                          {mainProjects.map((project, idx) => (
                            <Reveal key={project.id} delay={0.1 + (idx * 0.1)} className="h-full">
                              <button
                                onClick={() => setActiveProject(project)}
                                className="group relative block text-left w-full h-full aspect-[9/16] bg-black/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-[transform,shadow] duration-500 hover:-translate-y-1 transform-gpu"
                              >
                                <Image
                                  src={project.thumbnail}
                                  alt={project.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  loading="lazy"
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05] transform-gpu"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-[5] pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-90" />
                                
                                {/* Centered Play or Photo Button Overlay */}
                                <div className="absolute inset-0 z-[7] flex items-center justify-center pointer-events-none">
                                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#050505]/70 flex items-center justify-center transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-[#9A0E1F]/90 shadow-[0_0_20px_rgba(0,0,0,0.3)] transform-gpu">
                                    {project.hasVideos ? (
                                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    ) : (
                                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                      </svg>
                                    )}
                                  </div>
                                </div>

                                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 transform-gpu">
                                  <p className="text-white/80 font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-2 font-bold drop-shadow-md">{project.category}</p>
                                  <h4 className="text-white font-bold text-lg md:text-xl tracking-tight drop-shadow-lg leading-tight">{project.title}</h4>
                                </div>
                              </button>
                            </Reveal>
                          ))}
                        </div>

                        {/* SECONDARY SIDE CARDS */}
                        {sideProjects.length > 0 && (
                          <div className={`lg:col-span-5 flex flex-col gap-4 md:gap-6 ${isAlternate ? 'md:order-1 lg:order-1' : 'md:order-2 lg:order-2'}`}>
                            {sideProjects.map((project, idx) => (
                              <Reveal key={project.id} delay={0.15 + (idx * 0.1)} className="flex-1 h-full">
                                <button
                                  onClick={() => setActiveProject(project)}
                                  className="group relative block text-left w-full h-full min-h-[220px] aspect-video lg:aspect-auto bg-black/5 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-[transform,shadow] duration-500 hover:-translate-y-1 transform-gpu"
                                >
                                  <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05] transform-gpu"
                                  />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-[5] pointer-events-none" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-90" />

                                  {/* Centered Play or Photo Button Overlay */}
                                  <div className="absolute inset-0 z-[7] flex items-center justify-center pointer-events-none">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#050505]/70 flex items-center justify-center transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-[#9A0E1F]/90 shadow-[0_0_20px_rgba(0,0,0,0.3)] transform-gpu">
                                      {project.hasVideos ? (
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      ) : (
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                        </svg>
                                      )}
                                    </div>
                                  </div>

                                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 transform-gpu">
                                    <p className="text-white/80 font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-2 font-bold drop-shadow-md">{project.category}</p>
                                    <h4 className="text-white font-bold text-xl md:text-2xl tracking-tight drop-shadow-lg">{project.title}</h4>
                                  </div>
                                </button>
                              </Reveal>
                            ))}
                          </div>
                        )}
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
                    className="group relative inline-flex items-center justify-center gap-4 pl-8 pr-3 py-3 rounded-full bg-white text-black border border-black font-mono font-bold text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transform-gpu will-change-transform"
                  >
                    <span>OUR WORK</span>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-black/20 text-[14px]">
                      →
                    </span>
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>

          <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />
        </SectionBlurWrapper>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 4: WHAT WE DO / SERVICES (BLACK THEME)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section id="services" data-theme="dark" className="bg-[#050505] text-white relative">
          {/* Desktop: full-bleed for sticky to work — container inside ServicesTable */}
          <div className="hidden lg:block">
            {/* Section header only on desktop — inside container, above the sticky panels */}
            <div className="container pt-32 pb-16">
              <div className="h-px w-full bg-white/10 mb-12" />
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-10 opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F]" />
                  <span className="text-white font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">What We Do</span>
                </div>
              </Reveal>
              <Reveal>
                <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  OUR<br />SERVICES.
                </h2>
              </Reveal>
            </div>
            <ServicesTable />
            {/* All Services CTA below sticky section */}
            <div className="container pb-24 flex justify-end">
              <Link 
                href="/services" 
                className="group relative inline-flex items-center justify-center gap-4 pl-8 pr-3 py-3 rounded-full bg-white text-black font-mono font-bold text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transform-gpu will-change-transform"
              >
                <span>ALL SERVICES</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-black/20 text-[14px]">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile: normal container layout */}
          <div className="lg:hidden container py-20">
            <div className="h-px w-full bg-white/10 mb-10" />
            <div className="flex flex-col gap-6 mb-12">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F]" />
                  <span className="text-white font-mono tracking-[0.4em] uppercase text-[11px] font-bold">What We Do</span>
                </div>
              </Reveal>
              <Reveal>
                <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 4.5rem)", letterSpacing: "-0.03em" }}>
                  OUR<br />SERVICES.
                </h2>
              </Reveal>
            </div>
            <ServicesTable />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 5: PROCESS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ProcessSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ENGAGEMENT MODELS
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <EngagementModels />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 6: CALL TO ACTION
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
          <CTASection />
        </SectionBlurWrapper>



        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 7: SOCIAL PROOF (REFINED)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionBlurWrapper>
          <section data-theme="light" className="py-20 md:py-24 bg-white text-black overflow-hidden relative border-t border-black/20">
            <div className="container relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20">

                {/* Left: Authority Block */}
                <div className="max-w-xl">
                  <Reveal>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                        <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[11px] md:text-[12px] font-bold">Social Proof</span>
                      </div>
                    </div>
                    <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 font-black leading-[0.85] tracking-tight mb-8 uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.03em" }}>
                      WHAT OUR<br /><span className="text-black/10">CLIENTS SAY.</span>
                    </h2>
                  </Reveal>

                  <div className="flex gap-10">
                    <Reveal delay={0.1}>
                      <p className="text-[#9A0E1F] font-bold text-3xl tracking-tight antialiased uppercase mb-1">+40%</p>
                      <p className="text-black/30 font-mono uppercase text-[8px] tracking-[0.2em]">Brand Growth</p>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p className="text-black font-bold text-3xl tracking-tight antialiased uppercase mb-1">100%</p>
                      <p className="text-black/30 font-mono uppercase text-[8px] tracking-[0.2em]">Client Trust</p>
                    </Reveal>
                  </div>
                </div>

                {/* Vertical Divider (Desktop only) */}
                <div className="hidden lg:block w-px h-24 bg-black/5 shrink-0" />

                {/* Right: Testimonial Engine */}
                <div className="relative flex-1 min-h-[160px] md:min-h-[180px] flex flex-col justify-center">
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

function TestimonialRotation({ isMobile = false, textColor = "text-white" }: { isMobile?: boolean; textColor?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_TESTIMONIALS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative h-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={index}
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          exit={{ y: -8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`${textColor} font-bold italic ${isMobile ? "text-[13px]" : "text-[15px]"} leading-relaxed tracking-wide opacity-90 transform-gpu`}
          style={{ willChange: "transform" }}
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          exit={{ y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <p className="text-black font-medium text-lg md:text-xl lg:text-2xl leading-[1.3] tracking-tight italic mb-5">
            &ldquo;{TESTIMONIALS[index].quote}&rdquo;
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-black/60 font-mono text-[10px] uppercase tracking-widest font-bold">
              {TESTIMONIALS[index].client}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#9A0E1F]" />
              <p className="text-[#9A0E1F] font-mono text-[9px] uppercase tracking-[0.3em] font-black">What Our Clients Say</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
