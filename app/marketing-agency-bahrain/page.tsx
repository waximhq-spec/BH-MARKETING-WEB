"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import SmartVideo from "@/components/SmartVideo";
import React from "react";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal utility
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
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function MarketingAgencyGatewayPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#9A0E1F]/30 selection:text-white">
      {/* ── SEO CONTENT LAYER (Invisible but Indexable) ── */}
      <VisualHiddenSEO>
        <h1>Elevating Bahrain's Luxury Brands</h1>
        <p>
          When searching for a marketing agency in Bahrain, high-end brands require 
          more than just standard digital services—they need striking visual narratives. 
          Cinmach Productions is a specialized creative studio built on a foundation 
          of cinematic excellence and elite digital design. We partner with Bahrain's 
          luxury real estate, hospitality, and commercial sectors to create media 
          that commands attention.
        </p>

        <h2>A Specialized Creative Pipeline</h2>
        <p>
          We deliver a flawless product through a highly specialized workflow. 
          Our team is structured around two distinct pillars: masterful on-set 
          directing and cinematography, combined with industry-leading post-production, 
          color grading, and motion graphics. From raw capture to the final pixel, 
          your brand's image is crafted by specialists.
        </p>

        <h3>Core Capabilities:</h3>
        <ul>
          <li>Commercial Cinematography: Dynamic lighting and perfect framing for real estate and brand films.</li>
          <li>Elite Post-Production: Advanced editing, VFX, and color grading for a premium finish.</li>
          <li>Immersive Projection Mapping: Transforming Bahrain's luxury spaces with unforgettable visual media.</li>
          <li>Premium Digital Design: High-converting, minimalist UI/UX web development.</li>
        </ul>

        <h2>See the Difference</h2>
        <p>
          Discover why top-tier brands trust our vision. Explore our full pipeline, 
          meet the team, and view our portfolio of high-contrast, premium campaigns.
        </p>
      </VisualHiddenSEO>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: FULL SCREEN HERO GATEWAY
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <SmartVideo 
            src="/bg-rest.mp4" 
            autoPlay={true}
            className="w-full h-full object-cover grayscale opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,14,31,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="container relative z-10 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#9A0E1F]" />
              <span className="text-[#9A0E1F] font-mono tracking-[0.5em] uppercase text-[9px] font-bold">Creative Marketing</span>
              <div className="w-8 h-px bg-[#9A0E1F]" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="font-black text-white leading-[0.85] mb-16 tracking-tighter uppercase" style={{ fontSize: "clamp(2.5rem, 10vw, 8.5rem)" }}>
              ELEVATING<br />
              BAHRAIN&apos;S<br />
              <span className="text-white/20">LUXURY BRANDS.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <Link 
              href="/"
              className="group relative inline-flex items-center gap-6 px-16 py-8 bg-white text-black font-mono font-black text-[12px] tracking-[0.4em] uppercase overflow-hidden rounded-full transition-all duration-700 hover:bg-[#9A0E1F] hover:text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <span className="relative z-10">Enter Cinmach Productions</span>
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">→</span>
              <div className="absolute inset-0 bg-[#9A0E1F] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
            </Link>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-10">
           <span className="text-[8px] uppercase tracking-[0.6em] font-bold">Discover</span>
           <div className="w-px h-10 bg-white" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: BRIEF VALUE PROP (BELOW THE FOLD)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-32 md:py-56 bg-[#080808] border-t border-white/5 relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
            {/* Column 1: Pillar Statement */}
            <Reveal>
              <h2 className="text-[10px] font-mono font-black text-[#9A0E1F] tracking-[0.4em] uppercase mb-10">Expertise Pipeline</h2>
              <p className="text-white font-black text-3xl md:text-5xl tracking-tighter uppercase leading-[0.9] mb-8">
                Mastery in Every <span className="text-white/20 italic">Frame.</span>
              </p>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">
                We deliver a flawless product through a highly specialized workflow. Our team is structured around masterful on-set directing and cinematography, combined with elite post-production.
              </p>
            </Reveal>

            {/* Column 2: Services List */}
            <Reveal delay={0.2}>
              <h2 className="text-[10px] font-mono font-black text-white/30 tracking-[0.4em] uppercase mb-10">Core Capabilities</h2>
              <ul className="flex flex-col gap-8">
                {[
                  { label: "Commercial Cinematography", detail: "Dynamic lighting & perfect framing." },
                  { label: "Elite Post-Production", detail: "Advanced editing, VFX & color grading." },
                  { label: "Immersive Projection Mapping", detail: "Transforming luxury spaces." },
                  { label: "Premium Digital Design", detail: "High-converting UI/UX development." }
                ].map((item, i) => (
                  <li key={i} className="group border-b border-white/5 pb-8 last:border-0">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-[#9A0E1F] transition-colors duration-300">{item.label}</h3>
                    <p className="text-white/20 text-sm font-light uppercase tracking-widest">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: MINIMALIST FOOTER GATEWAY
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-16 md:py-24 bg-[#050505] border-t border-white/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="opacity-40 hover:opacity-100 transition-opacity">
                <img src="/HERO-LOGO.svg" alt="Cinmach" className="h-4 w-auto grayscale invert" />
              </Link>
              <p className="text-white/10 text-[9px] font-mono uppercase tracking-[0.3em]">
                &copy; 2026 Cinmach Productions &middot; Bahrain
              </p>
           </div>
           
           <Link 
             href="/"
             className="text-white/40 hover:text-[#9A0E1F] font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 flex items-center gap-3"
           >
             Go to Homepage <span>→</span>
           </Link>
        </div>
      </section>
    </main>
  );
}
