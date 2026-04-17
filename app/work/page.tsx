"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ALL_PROJECTS = [
  {
    id: "dilmunia-waterfront",
    category: "real-estate",
    categoryLabel: "Real Estate",
    title: "Dilmunia Waterfront Residences",
    tags: ["Drone", "HDR", "Interior"],
    thumb: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=75",
    year: "2024",
  },
  {
    id: "palm-villa-al-areen",
    category: "real-estate",
    categoryLabel: "Real Estate",
    title: "The Palm Villa — Al Areen",
    tags: ["Aerial", "Twilight", "4K"],
    thumb: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=75",
    year: "2024",
  },
  {
    id: "seef-district-tower",
    category: "real-estate",
    categoryLabel: "Real Estate",
    title: "Seef District Tower",
    tags: ["Interior", "Slow Motion"],
    thumb: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=75",
    year: "2023",
  },
  {
    id: "khaleej-co",
    category: "fb",
    categoryLabel: "F&B",
    title: "Khaleej & Co.",
    tags: ["Food Motion", "Brand Film"],
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=75",
    year: "2024",
  },
  {
    id: "flame-and-salt",
    category: "fb",
    categoryLabel: "F&B",
    title: "Flame & Salt",
    tags: ["Texture", "Colour Graded"],
    thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=75",
    year: "2023",
  },
  {
    id: "zafran-house",
    category: "fb",
    categoryLabel: "F&B",
    title: "Zafran House",
    tags: ["Identity", "Motion"],
    thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=75",
    year: "2023",
  },
];

type Filter = "all" | "real-estate" | "fb";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "real-estate", label: "Real Estate" },
  { id: "fb", label: "Restaurants & F&B" },
];

export default function WorkPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <div className="pt-32 pb-24 md:pb-36">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <p className="label mb-5">Selected Work</p>
          <h1
            className="text-[#EDEDED] font-black mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Our portfolio.
          </h1>
          <p className="text-[#666] font-light" style={{ maxWidth: "40ch", lineHeight: 1.75 }}>
            From high-altitude drone shots to macro food cinematics — we move between worlds with precision.
          </p>
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-0 mb-16 overflow-x-auto pb-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className="shrink-0 mr-8 pb-3 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 relative"
              style={{ color: active === f.id ? "#EDEDED" : "#666" }}
            >
              {f.label}
              {active === f.id && (
                <motion.div
                  layoutId="filter-bar"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#B11226]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/work/${project.id}`} className="group block">
                {/* Thumb */}
                <div
                  className="overflow-hidden mb-4 bg-[#111]"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={project.thumb}
                    alt={project.title}
                    width={900}
                    height={675}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                    style={{ aspectRatio: "4/3" }}
                  />
                </div>
                {/* Meta */}
                <p className="label mb-1.5">{project.categoryLabel} · {project.year}</p>
                <p className="text-sm font-medium text-[#EDEDED] group-hover:text-white transition-colors">
                  {project.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
