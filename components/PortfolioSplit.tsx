"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Side = "spaces" | "tastes" | null;

const SPACES_ITEMS = [
  {
    id: 1,
    title: "Dilmunia Waterfront Residences",
    tags: ["Drone", "HDR", "Interior"],
    thumb: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
  },
  {
    id: 2,
    title: "The Palm Villa — Al Areen",
    tags: ["Aerial", "Twilight", "4K"],
    thumb: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80",
  },
  {
    id: 3,
    title: "Seef District Tower",
    tags: ["Interior", "Slow Motion", "Colour Grade"],
    thumb: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
  },
];

const TASTES_ITEMS = [
  {
    id: 1,
    title: "Khaleej & Co.",
    tags: ["Food Motion", "Brand Film", "Editorial"],
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    size: "large",
  },
  {
    id: 2,
    title: "Flame & Salt",
    tags: ["Texture", "Colour Graded"],
    thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    size: "small",
  },
  {
    id: 3,
    title: "Zafran House",
    tags: ["Identity", "Motion"],
    thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80",
    size: "small",
  },
];

function ProjectCard({
  title,
  tags,
  thumb,
}: {
  title: string;
  tags: string[];
  thumb: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 cursor-pointer"
    >
      {/* Thumbnail */}
      <img
        src={thumb}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 brightness-75"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex gap-2 flex-wrap mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#D91616]/80 border border-[#D91616]/25 px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: "-0.02em" }}>
          {title}
        </p>
      </div>

      {/* Hover play indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSplit() {
  const [hovered, setHovered] = useState<Side>(null);

  const spacesWidth = hovered === "spaces" ? "65%" : hovered === "tastes" ? "35%" : "50%";
  const tastesWidth = hovered === "tastes" ? "65%" : hovered === "spaces" ? "35%" : "50%";

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#0d0303]">
      {/* ── Top label ── */}
      <div className="w-full flex justify-center pt-20 pb-12 px-6">
        <div className="text-center">
          <p className="type-label text-[#D91616] mb-4" style={{ textShadow: "0 0 18px rgba(217,22,22,0.4)" }}>
            Selected Work
          </p>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Two Worlds. <span className="font-light text-white/50">One Vision.</span>
          </h2>
        </div>
      </div>

      {/* ── Fullscreen Split (desktop) ── */}
      <div className="hidden md:flex flex-1 relative overflow-hidden min-h-[85vh]">
        {/* THE SPACES */}
        <motion.div
          className="relative overflow-hidden cursor-pointer group/spaces"
          animate={{ width: spacesWidth }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered("spaces")}
          onHoverEnd={() => setHovered(null)}
        >
          {/* BG video/image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
              alt="The Spaces"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35) saturate(0.8)" }}
            />
            {/* Subtle red wash on hover */}
            <motion.div
              animate={{ opacity: hovered === "spaces" ? 0.18 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#D91616] mix-blend-color"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0303]/80 via-transparent to-[#0d0303]/40" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14 z-10">
            <motion.div
              animate={{ opacity: hovered === "tastes" ? 0.4 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="type-label text-white/40 mb-3">Category 01</p>
              <h3
                className="text-white font-black mb-3"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                THE<br />SPACES
              </h3>
              <p className="text-white/40 text-sm max-w-[280px] leading-relaxed">
                Crafted with cinematic lighting and spatial storytelling.
              </p>
              <motion.div
                animate={{
                  opacity: hovered === "spaces" ? 1 : 0,
                  y: hovered === "spaces" ? 0 : 8,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-6"
              >
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-[#D91616] hover:text-[#D91616] transition-colors duration-300"
                >
                  Explore Real Estate →
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Vertical divider label */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent z-20" />
        </motion.div>

        {/* THE TASTES */}
        <motion.div
          className="relative overflow-hidden cursor-pointer group/tastes"
          animate={{ width: tastesWidth }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered("tastes")}
          onHoverEnd={() => setHovered(null)}
        >
          {/* BG image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1400&q=80"
              alt="The Tastes"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35) saturate(1.1)" }}
            />
            <motion.div
              animate={{ opacity: hovered === "tastes" ? 0.2 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#D91616] mix-blend-color"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0d0303]/80 via-transparent to-[#0d0303]/10" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14 z-10">
            <motion.div
              animate={{ opacity: hovered === "spaces" ? 0.4 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="type-label text-white/40 mb-3">Category 02</p>
              <h3
                className="text-white font-black mb-3"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                THE<br />TASTES
              </h3>
              <p className="text-white/40 text-sm max-w-[280px] leading-relaxed">
                Designed for appetite, engagement, and brand identity.
              </p>
              <motion.div
                animate={{
                  opacity: hovered === "tastes" ? 1 : 0,
                  y: hovered === "tastes" ? 0 : 8,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-6"
              >
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-[#D91616] hover:text-[#D91616] transition-colors duration-300"
                >
                  Explore F&amp;B →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile: Stacked ── */}
      <div className="md:hidden flex flex-col gap-0">
        {/* The Spaces */}
        <div className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
            alt="The Spaces"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10 p-8">
            <p className="type-label text-[#D91616]/70 mb-2">Category 01</p>
            <h3 className="text-white font-black text-4xl mb-2" style={{ letterSpacing: "-0.04em" }}>
              THE SPACES
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Crafted with cinematic lighting and spatial storytelling.
            </p>
            <Link href="/work" className="text-[11px] font-bold tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1">
              Explore →
            </Link>
          </div>
        </div>

        {/* The Tastes */}
        <div className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end border-t border-white/5">
          <img
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=80"
            alt="The Tastes"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10 p-8">
            <p className="type-label text-[#D91616]/70 mb-2">Category 02</p>
            <h3 className="text-white font-black text-4xl mb-2" style={{ letterSpacing: "-0.04em" }}>
              THE TASTES
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Designed for appetite, engagement, and brand identity.
            </p>
            <Link href="/work" className="text-[11px] font-bold tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1">
              Explore →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Project Grids (below split) ── */}
      <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Spaces Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="type-label text-white/25 mb-2">Real Estate</p>
                <h4 className="text-white font-bold text-xl" style={{ letterSpacing: "-0.02em" }}>The Spaces</h4>
              </div>
              <Link href="/work" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D91616]/70 hover:text-[#D91616] transition-colors">
                View All →
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {SPACES_ITEMS.map((item) => (
                <ProjectCard key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* Tastes Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="type-label text-white/25 mb-2">Restaurants & F&B</p>
                <h4 className="text-white font-bold text-xl" style={{ letterSpacing: "-0.02em" }}>The Tastes</h4>
              </div>
              <Link href="/work" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D91616]/70 hover:text-[#D91616] transition-colors">
                View All →
              </Link>
            </div>
            {/* Editorial grid — first item large, then 2 side by side */}
            <div className="flex flex-col gap-4">
              <ProjectCard key={TASTES_ITEMS[0].id} {...TASTES_ITEMS[0]} />
              <div className="grid grid-cols-2 gap-4">
                {TASTES_ITEMS.slice(1).map((item) => (
                  <ProjectCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
