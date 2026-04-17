"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Project data
   ─────────────────────────────────────────────────────────── */
const FEATURED = [
  {
    id: "dilmunia-waterfront",
    category: "Real Estate",
    title: "Dilmunia Waterfront",
    thumb: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=75",
    aspectRatio: "4/3",
  },
  {
    id: "khaleej-co",
    category: "F&B",
    title: "Khaleej & Co.",
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=75",
    aspectRatio: "4/3",
  },
  {
    id: "palm-villa-al-areen",
    category: "Real Estate",
    title: "The Palm Villa — Al Areen",
    thumb: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=75",
    aspectRatio: "4/3",
  },
  {
    id: "flame-and-salt",
    category: "F&B",
    title: "Flame & Salt",
    thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=75",
    aspectRatio: "4/3",
  },
];

const SERVICES = [
  "Brand Film & Cinematography",
  "Aerial & Drone Capture",
  "Colour Grading & Post-Production",
  "Product & Editorial Photography",
  "Motion Graphics & Titles",
  "Brand Identity & Visual Strategy",
];

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered fade wrapper (viewport-only, no layout shift)
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
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Work card — hover scales image
   ─────────────────────────────────────────────────────────── */
function WorkCard({ item }: { item: (typeof FEATURED)[0] }) {
  return (
    <Link href={`/work/${item.id}`} className="group block">
      <div
        className="overflow-hidden mb-4 bg-[#111]"
        style={{ aspectRatio: item.aspectRatio }}
      >
        <img
          src={item.thumb}
          alt={item.title}
          width={900}
          height={675}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
          style={{ aspectRatio: item.aspectRatio }}
        />
      </div>
      <p className="label mb-1">{item.category}</p>
      <p className="text-sm font-medium text-[#EDEDED] group-hover:text-white transition-colors">
        {item.title}
      </p>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Split section — Spaces / Tastes (no layout-shifting)
   ─────────────────────────────────────────────────────────── */
function SplitSection() {
  const [active, setActive] = useState<"spaces" | "tastes" | null>(null);
  return (
    <section className="defer-render w-full" style={{ minHeight: "70vh" }}>
      <div className="flex flex-col md:flex-row" style={{ minHeight: "70vh" }}>
        {/* The Spaces */}
        <div
          className="relative flex-1 overflow-hidden cursor-pointer group/s min-h-[50vh] md:min-h-0"
          onMouseEnter={() => setActive("spaces")}
          onMouseLeave={() => setActive(null)}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover/s:scale-[1.03]"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=70"
              alt="The Spaces"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.4)", aspectRatio: "3/2" }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14 z-10">
            <p className="label mb-3">Category 01</p>
            <h2
              className="text-white font-black mb-3 transition-colors"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
            >
              The<br />Spaces
            </h2>
            <p
              className="text-[#aaa] text-sm max-w-[260px] leading-relaxed transition-opacity duration-500"
              style={{ opacity: active === "spaces" ? 1 : 0 }}
            >
              Real estate cinematics crafted to sell a feeling, not just a property.
            </p>
            <div
              className="mt-5 transition-all duration-500"
              style={{ opacity: active === "spaces" ? 1 : 0, transform: active === "spaces" ? "translateY(0)" : "translateY(8px)" }}
            >
              <Link href="/work?filter=real-estate" className="text-[11px] tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-colors">
                Explore →
              </Link>
            </div>
          </div>
          {/* Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-white/10 z-20" />
        </div>

        {/* The Tastes */}
        <div
          className="relative flex-1 overflow-hidden cursor-pointer group/t min-h-[50vh] md:min-h-0"
          onMouseEnter={() => setActive("tastes")}
          onMouseLeave={() => setActive(null)}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover/t:scale-[1.03]"
          >
            <img
              src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=70"
              alt="The Tastes"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.4)", aspectRatio: "3/2" }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14 z-10">
            <p className="label mb-3">Category 02</p>
            <h2
              className="text-white font-black mb-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
            >
              The<br />Tastes
            </h2>
            <p
              className="text-[#aaa] text-sm max-w-[260px] leading-relaxed transition-opacity duration-500"
              style={{ opacity: active === "tastes" ? 1 : 0 }}
            >
              F&B campaigns with flavour, texture, and appetite-driven storytelling.
            </p>
            <div
              className="mt-5 transition-all duration-500"
              style={{ opacity: active === "tastes" ? 1 : 0, transform: active === "tastes" ? "translateY(0)" : "translateY(8px)" }}
            >
              <Link href="/work?filter=fb" className="text-[11px] tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-colors">
                Explore →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Home Page
   ─────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col justify-end pb-16 md:pb-20 pt-32">
        <div className="container">
          {/* Eyebrow */}
          <p className="label-red mb-8 anim-fade-up">
            Cinematic Studio · Bahrain
          </p>

          {/* Title */}
          <h1
            className="text-[#EDEDED] font-black leading-none mb-8 anim-fade-up anim-delay-1"
            style={{
              fontSize: "clamp(3.2rem, 10vw, 9rem)",
              letterSpacing: "-0.04em",
              maxWidth: "14ch",
            }}
          >
            Cinmach<br />Productions
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#888] font-light max-w-md mb-12 anim-fade-up anim-delay-2"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", lineHeight: 1.7 }}
          >
            We craft cinematic visual stories for spaces, brands, and experiences
            that demand to be remembered.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 anim-fade-up anim-delay-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#EDEDED]/20 text-[#EDEDED] text-[11px] tracking-[0.2em] uppercase hover:border-white hover:text-white transition-all duration-300"
            >
              Our Work →
            </Link>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[#666] text-[11px] tracking-[0.2em] uppercase hover:text-[#EDEDED] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FEATURED WORK ════════════════════════════════════ */}
      <section className="defer-render py-24 md:py-36">
        <div className="container">
          <Reveal className="flex items-end justify-between mb-12">
            <div>
              <p className="label mb-4">Selected Work</p>
              <h2
                className="text-[#EDEDED] font-black"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
              >
                Where we've been.
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-[#666] hover:text-[#EDEDED] transition-colors pb-1 border-b border-transparent hover:border-[#EDEDED]/30"
            >
              View All →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {FEATURED.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <WorkCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link href="/work" className="text-[11px] tracking-[0.2em] uppercase text-[#666] hover:text-[#EDEDED] transition-colors border-b border-transparent hover:border-current pb-0.5">
              View All Work →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ DUAL CATEGORY (Spaces / Tastes) ═════════════════ */}
      <SplitSection />

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <section className="defer-render py-24 md:py-36" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            {/* Left: big editorial text */}
            <Reveal className="lg:w-1/2">
              <p className="label mb-8">About</p>
              <h2
                className="text-[#EDEDED] font-black"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.02 }}
              >
                We believe<br />the best stories<br />are felt — not<br />just seen.
              </h2>
            </Reveal>

            {/* Right: supporting copy + capabilities */}
            <Reveal delay={0.15} className="lg:w-1/2 flex flex-col justify-end">
              <p className="text-[#888] font-light max-w-md mb-10" style={{ lineHeight: 1.8 }}>
                Based in Bahrain, Cinmach Productions is an independent creative studio operating at
                the intersection of high-end cinematography and strategic brand building. Every frame
                we capture is deliberate. Every cut is intentional.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                {["Strategy", "Cinematography", "Design", "Post-Production"].map((cap) => (
                  <div key={cap}>
                    <p className="label-red mb-2">{cap}</p>
                    <div className="w-8 h-px bg-[#8B0000]" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════ */}
      <section className="defer-render py-24 md:py-36" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container">
          <Reveal className="mb-16">
            <p className="label mb-4">Services</p>
            <h2
              className="text-[#EDEDED] font-black"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              What we do.
            </h2>
          </Reveal>

          <ul>
            {SERVICES.map((service, i) => (
              <Reveal key={service} delay={i * 0.06}>
                <li
                  className="flex items-center justify-between py-5 text-[#EDEDED] group cursor-default"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="font-light text-lg md:text-xl group-hover:text-white transition-colors"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {service}
                  </span>
                  <span className="text-[#333] group-hover:text-[#8B0000] transition-colors text-xl font-light">
                    →
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════ */}
      <section className="defer-render py-24 md:py-40" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container text-center">
          <Reveal>
            <p className="label mb-8" style={{ letterSpacing: "0.35em" }}>Start a Project</p>
            <h2
              className="text-[#EDEDED] font-black mb-10 mx-auto"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.95, maxWidth: "12ch" }}
            >
              Ready to elevate?
            </h2>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#EDEDED]/20 text-[#EDEDED] text-[11px] tracking-[0.25em] uppercase hover:border-white hover:text-white transition-all duration-300"
            >
              Get in Touch →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
