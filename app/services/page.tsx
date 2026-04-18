"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Data
   ─────────────────────────────────────────────────────────── */
const SERVICES_DATA = [
  {
    num: "01",
    title: "Video Production",
    shortDesc: "High-end cinematic video production for brands and real estate.",
    bullets: ["Real Estate Shoots", "Commercial Ads", "Drone Cinematics", "Corporate Films"],
  },
  {
    num: "02",
    title: "Post Production",
    shortDesc: "Precision editing, color grading, and sound to elevate your story.",
    bullets: ["Color Grading", "Sound Design", "Video Editing", "Motion Graphics"],
  },
  {
    num: "03",
    title: "Creative & Branding",
    shortDesc: "Visual identity and creative direction built to last.",
    bullets: ["Storyboarding", "Creative Direction", "Brand Identity", "Visual Strategy"],
  },
  {
    num: "04",
    title: "Digital Presence",
    shortDesc: "Clean, conversion-focused websites and landing pages.",
    bullets: ["Website Design", "Landing Pages", "UX/UI Design", "Performance Optimization"],
  },
  {
    num: "05",
    title: "Social Content",
    shortDesc: "Native vertical content engineered for maximum retention.",
    bullets: ["Meta & TikTok Ads", "Reels & Shorts", "Platform-Native Edits", "Trend Adaptation"],
  },
];

/* ─────────────────────────────────────────────────────────────
   Interactive Card Component
   ─────────────────────────────────────────────────────────── */
function ServiceCard({ service }: { service: typeof SERVICES_DATA[0] }) {
  return (
    <motion.div
      layout
      className="group relative bg-white border border-black/5 p-8 md:p-10 flex flex-col h-full transition-all duration-500 will-change-transform"
      style={{
        boxShadow: "0 16px 40px rgba(0,0,0,0.04)",
        borderRadius: "16px",
      }}
      whileHover={{ y: -4 }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-full"
        style={{ background: "linear-gradient(90deg, #8B0016, transparent)" }}
      />
      
      <span className="text-black/20 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 block font-bold transition-colors group-hover:text-[#8B0016]">
        {service.num}
      </span>
      
      <motion.h3
        layout="position"
        className="text-black font-black mb-4 leading-tight group-hover:text-[#8B0016] transition-colors duration-300"
        style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)", letterSpacing: "-0.02em" }}
      >
        {service.title}
      </motion.h3>
      
      <motion.p layout="position" className="text-black/60 text-sm leading-relaxed max-w-[280px]">
        {service.shortDesc}
      </motion.p>

      {/* Permanently Open Bullet Points */}
      <motion.div
        layout
        className="overflow-hidden border-t border-black/5 pt-6 mt-6 flex flex-col gap-3"
      >
        {service.bullets.map((bullet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B0016]/80 shrink-0" />
            <span className="text-black/80 text-[14px] font-medium tracking-wide">{bullet}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ─────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        className="relative pt-40 md:pt-56 pb-24 md:pb-36 overflow-hidden"
        style={{ background: "#FAFAFA" }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="container relative z-10">
          <Reveal>
            <p className="text-[#8B0016] font-mono tracking-[0.35em] uppercase text-[10px] mb-6 font-bold">
              Our Services
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="font-black text-black mb-8"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
              }}
            >
              CINEMATIC VISUALS<br />
              <span className="text-[#8B0016]">BUILT TO MOVE</span><br />
              YOUR BRAND.
            </h1>
          </Reveal>

          <Reveal delay={0.18} className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 mt-12">
            <p
              className="text-black/55 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 }}
            >
              We go far beyond the shoot. Cinmach Productions offers a full creative suite — from concept and direction to production, post-production, and digital presence. One studio, one standard of excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-4 px-10 py-5 bg-black text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] transition-all duration-500"
              >
                Start a Project{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
              <Link
                href="/work"
                className="px-10 py-5 border border-black/10 text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:border-black/40 transition-all duration-500"
              >
                View Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT WE DO — INTERACTIVE GRID
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-36 bg-[#FAFAFA] border-t border-black/5">
        <div className="container">
          {/* Section Header */}
          <Reveal className="mb-16 md:mb-24 flex items-center gap-6">
            <h2 
              className="font-black text-black shrink-0"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            >
              WHAT WE DO.
            </h2>
            <div className="h-px flex-1 bg-black/10" />
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {SERVICES_DATA.map((service, idx) => (
              <Reveal key={service.num} delay={idx * 0.1}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS CALLOUT — COMPACT
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-20 md:py-28 bg-white border-t border-black/5">
        <div className="container">
          <Reveal className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 items-center">
            <div>
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-5">How it works</p>
              <h2
                className="font-black text-black"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                BRIEF → STRATEGY →<br />PRODUCTION → DELIVERY.
              </h2>
            </div>
            <div className="flex flex-col gap-5 max-w-xs">
              {[
                { step: "01", label: "Discovery Call", desc: "We understand your brand, goals, and audience." },
                { step: "02", label: "Creative Proposal", desc: "Concept, moodboard, timeline, and budget." },
                { step: "03", label: "Production", desc: "We execute with precision, on-site and in-studio." },
                { step: "04", label: "Delivery", desc: "Final assets delivered in all required formats." },
              ].map((s, i) => (
                <div key={s.step} className="flex items-start gap-5">
                  <span className="text-[#8B0016] font-mono text-[10px] tracking-[0.25em] shrink-0 mt-0.5">{s.step}</span>
                  <div>
                    <p className="text-black font-black text-sm tracking-tight">{s.label}</p>
                    <p className="text-black/40 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section
        data-theme="dark"
        className="py-24 md:py-36"
        style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #1a0006 100%)" }}
      >
        <div className="container">
          <Reveal>
            <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] mb-8 font-bold">
              Ready to start?
            </p>
            <h2
              className="text-white font-black mb-10"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
              }}
            >
              LET&apos;S BUILD<br />YOUR VISION.
            </h2>
            <p className="text-white/40 max-w-md mb-12 leading-relaxed">
              Whether you need a single film or a complete brand presence — we bring the same level of craft to every project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-4 px-12 py-6 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500"
              >
                Start a Project{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
              <Link
                href="/work"
                className="px-12 py-6 border border-white/20 text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:border-white/50 transition-all duration-500"
              >
                View Our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
