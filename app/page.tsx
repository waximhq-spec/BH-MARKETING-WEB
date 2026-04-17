"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Data
   ─────────────────────────────────────────────────────────── */
const FEATURED = [
  {
    id: "dilmunia-waterfront",
    category: "Real Estate",
    title: "Dilmunia Waterfront",
    thumb: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=75",
  },
  {
    id: "khaleej-co",
    category: "F&B",
    title: "Khaleej & Co.",
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=75",
  },
  {
    id: "palm-villa-al-areen",
    category: "Real Estate",
    title: "The Palm Villa",
    thumb: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=75",
  },
  {
    id: "flame-and-salt",
    category: "F&B",
    title: "Flame & Salt",
    thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=75",
  },
];

const SERVICES = [
  "Brand Cinematography",
  "Aerial Drone Capture",
  "Precision Post-Production",
  "Editorial Photography",
  "Motion Graphics",
  "Visual Strategy",
];

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal - Snappier for energy
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
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Home Page
   ─────────────────────────────────────────────────────────── */
export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <>
      {/* ══ 1. HERO — BOLD RED ══════════════════════════════════ 
          Using the new strong red as a massive energy hook.
      */}
      <section
        data-theme="dark"
        className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-20"
        style={{ background: "#C50022" }}
      >
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-white font-black tracking-[0.4em] uppercase text-[10px] mb-8 anim-fade-up">
              Cinmach Productions · Manama
            </p>

            <h1
              className="text-white font-black leading-[0.85] mb-10 anim-fade-up anim-delay-1"
              style={{
                fontSize: "clamp(4rem, 15vw, 14rem)",
                letterSpacing: "-0.06em",
              }}
            >
              MOVE<br />THE<br />WORLD.
            </h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <p
                className="font-bold max-w-sm anim-fade-up anim-delay-2"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                }}
              >
                High-impact cinematography for brands that refuse to be ignored. 
              </p>

              <div className="flex gap-4 anim-fade-up anim-delay-3">
                <Link
                  href="/work"
                  className="px-10 py-5 bg-black text-white text-[11px] font-black tracking-[0.3em] uppercase hover:scale-105 transition-transform duration-300"
                >
                  View Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. FEATURED — PURE BLACK ═════════════════════════ */}
      <section
        data-theme="dark"
        className="py-24 md:py-40"
        style={{ background: "#000000" }}
      >
        <div className="container">
          <Reveal className="mb-20">
            <h2
              className="text-white font-black"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
            >
              SELECTED<br /><span style={{ color: "#C50022" }}>STORIES.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {FEATURED.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <Link href={`/work/${item.id}`} className="group block">
                  <div className="relative overflow-hidden mb-6 bg-[#111]" style={{ aspectRatio: "16/10" }}>
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#C50022]/0 group-hover:bg-[#C50022]/10 transition-colors duration-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#C50022] mb-1">{item.category}</p>
                      <h3 className="text-xl font-black text-white tracking-tight">{item.title}</h3>
                    </div>
                    <span className="text-white text-2xl font-light transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. ABOUT — WHITE ════════════════════════════════ */}
      <section
        data-theme="light"
        className="py-24 md:py-40"
        style={{ background: "#FAFAFA" }}
      >
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <Reveal className="lg:w-1/2">
              <h2
                className="font-black text-black"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                WE DON’T<br />JUST SHOOT.<br />WE INSPIRE<br /><span style={{ color: "#C50022" }}>ACTION.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2} className="lg:w-1/2">
              <p
                className="text-black font-medium mb-10"
                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)", lineHeight: 1.5, letterSpacing: "-0.02em" }}
              >
                Cinmach Productions is a specialized visual powerhouse. We build cinematic assets that become the heartbeat of your brand strategy. No fluff. No filler. Just pure impact.
              </p>
              <Link href="/about" className="inline-block border-b-4 border-black pb-1 text-black font-black uppercase tracking-[0.2em] text-[12px] hover:text-[#C50022] hover:border-[#C50022] transition-colors">
                Our Philosophy →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES — RED OVERLAY ══════════════════════════ */}
      <section
        data-theme="dark"
        className="py-24 md:py-40 relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        <div className="container relative z-10">
          <Reveal className="mb-20">
            <p className="text-[#C50022] font-black tracking-[0.4em] uppercase text-[10px] mb-4">Capabilities</p>
            <h2 className="text-white font-black text-5xl md:text-7xl tracking-tighter">OUR ARSENAL.</h2>
          </Reveal>

          <div className="flex flex-col">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                className="border-t border-white/10 py-8 md:py-12 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-8">
                  <span className="text-[#C50022] font-black text-sm">0{i + 1}</span>
                  <h3 
                    className="text-white font-black text-3xl md:text-6xl transition-all duration-300 group-hover:pl-4"
                    style={{ opacity: hoveredService !== null && hoveredService !== i ? 0.3 : 1 }}
                  >
                    {service}
                  </h3>
                </div>
                <div className="w-12 h-12 md:w-20 md:h-20 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#C50022] group-hover:border-[#C50022] transition-all duration-500">
                  <span className="text-white text-xl md:text-3xl">→</span>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ══ 5. CTA — FULL RED ══════════════════════════════════ */}
      <section
        data-theme="dark"
        className="py-32 md:py-52"
        style={{ background: "#C50022" }}
      >
        <div className="container text-center">
          <Reveal>
            <h2
              className="text-white font-black mb-12"
              style={{
                fontSize: "clamp(3rem, 10vw, 9rem)",
                letterSpacing: "-0.06em",
                lineHeight: 0.85,
              }}
            >
              READY TO<br />IGNITE?
            </h2>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white text-[12px] font-black tracking-[0.4em] uppercase hover:scale-110 transition-transform duration-500"
            >
              Contact Us Now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
