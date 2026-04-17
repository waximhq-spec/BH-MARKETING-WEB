"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
const overview = [
  { num: "01", label: "Production", desc: "Real estate, brand & social" },
  { num: "02", label: "Post-Production", desc: "Edit, grade, sound, motion" },
  { num: "03", label: "Creative & Branding", desc: "Direction, identity, story" },
  { num: "04", label: "Digital Presence", desc: "Websites, landing pages" },
];

const categories = [
  {
    id: "production",
    num: "01",
    title: "Production",
    tagline: "Every project starts with intent.",
    intro:
      "We don't just show up and shoot. Every production begins with a deep understanding of your brand, your space, and your audience — then we execute with surgical precision.",
    services: [
      {
        name: "Real Estate Films",
        description:
          "Architectural storytelling that turns a property into a lifestyle. We handle interiors, exteriors, aerials, and twilight sequences — designed to move inventory faster.",
        tags: ["Interior Cinematography", "Aerial Drone", "Twilight Shoots", "Virtual Tours"],
      },
      {
        name: "Brand Commercials",
        description:
          "High-production-value films for brands that demand presence. From concept to final cut, we create commercials that feel like cinema — not advertising.",
        tags: ["Campaign Films", "Product Showcases", "Corporate Films", "Lifestyle Content"],
      },
      {
        name: "Social Media Content",
        description:
          "Vertical, horizontal, looping, snappy. We produce content designed specifically for Instagram, TikTok, and LinkedIn — formats that stop the scroll and hold attention.",
        tags: ["Reels & Shorts", "Story Ads", "Platform-Native Edits", "Trend Adaptation"],
      },
    ],
  },
  {
    id: "post-production",
    num: "02",
    title: "Post-Production",
    tagline: "Where the story is truly told.",
    intro:
      "The edit suite is where raw footage becomes something that moves people. Our post workflow is built around cinematic precision — no cookie-cutter presets, no assembly-line grading.",
    services: [
      {
        name: "Video Editing",
        description:
          "Rhythm, pacing, structure — the invisible craft that makes viewers feel without knowing why. Every cut is made with intent, calibrated to your brand's voice.",
        tags: ["Narrative Editing", "Pacing & Structure", "Multi-format Delivery", "Sync Editing"],
      },
      {
        name: "Colour Grading",
        description:
          "We use professional DaVinci Resolve workflows to deliver a bespoke look. Warm, cool, clinical, or cinematic — your colour becomes an extension of your brand.",
        tags: ["DaVinci Resolve", "LUT Development", "Skin Tone Matching", "Scene Consistency"],
      },
      {
        name: "Sound Design",
        description:
          "Sound is 50% of the experience. From ambient layering and scoring to VO mixing and effects, we deliver audio that's as refined as the visuals.",
        tags: ["Music Licensing", "VO Mixing", "Ambient Layering", "SFX & Foley"],
      },
      {
        name: "Motion Graphics",
        description:
          "Text reveals, logo animations, infographic sequences. Motion that feels integrated — not slapped on. Built to match your brand's design system.",
        tags: ["Kinetic Typography", "Logo Animations", "Infographics", "3D Integration"],
      },
    ],
  },
  {
    id: "creative-branding",
    num: "03",
    title: "Creative & Branding",
    tagline: "Identity built to last.",
    intro:
      "Before a single camera rolls, we work alongside you to define the look, feel, and language of your brand. Creative direction isn't a service we add on — it's how everything begins.",
    services: [
      {
        name: "Creative Direction",
        description:
          "We lead the visual strategy behind each project: moodboards, references, location scouting, wardrobe, talent briefs. The full pre-production picture, meticulously crafted.",
        tags: ["Moodboards", "Shot Lists", "Location Scouting", "Talent Coordination"],
      },
      {
        name: "Storyboarding & Concept",
        description:
          "No surprises on set. We storyboard every key sequence and develop concept decks that give clients complete visibility before production begins.",
        tags: ["Concept Decks", "Visual Storyboards", "Campaign Strategy", "Narrative Mapping"],
      },
      {
        name: "Brand Visual Identity",
        description:
          "Logo systems, typography, colour palettes, art direction guidelines. We build visual identities that scale — from business cards to billboard campaigns.",
        tags: ["Logo Design", "Brand Guidelines", "Typography Systems", "Art Direction"],
      },
    ],
  },
  {
    id: "digital",
    num: "04",
    title: "Digital Presence",
    tagline: "Your brand deserves a home that matches its standard.",
    intro:
      "For clients who need a total brand presence, we extend our work into the digital space — building websites and landing pages that are as considered as every frame we shoot.",
    services: [
      {
        name: "Website Design",
        description:
          "Editorial, clean, and conversion-focused. We design website experiences that feel premium and perform — built for brands that understand the value of first impressions.",
        tags: ["UX/UI Design", "Next.js Development", "CMS Integration", "Performance Optimised"],
      },
      {
        name: "Landing Pages",
        description:
          "Single-purpose pages engineered to convert. Whether for a product launch, campaign, or property listing — we design and build pages that get results.",
        tags: ["Campaign Pages", "Property Listings", "Lead Capture", "A/B Ready"],
      },
    ],
  },
];

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
          SERVICES OVERVIEW — QUICK SCAN GRID
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-16 md:py-20 bg-white border-y border-black/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {overview.map((item, idx) => (
              <Reveal key={item.num} delay={idx * 0.08}>
                <a
                  href={`#${categories[idx].id}`}
                  className="group flex flex-col gap-3 px-0 py-8 md:py-10 border-r border-black/5 last:border-r-0 md:px-10 first:pl-0 hover:bg-black/[0.02] transition-colors duration-300"
                >
                  <span className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase">
                    {item.num}
                  </span>
                  <h3 className="text-black font-black text-base md:text-lg tracking-tight leading-tight group-hover:text-[#8B0016] transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-black/35 text-xs font-mono tracking-wide">{item.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DETAILED SERVICE CATEGORIES
      ══════════════════════════════════════════════════════ */}
      {categories.map((cat, catIdx) => (
        <section
          key={cat.id}
          id={cat.id}
          data-theme="light"
          className="py-24 md:py-36"
          style={{ background: catIdx % 2 === 0 ? "#FFFFFF" : "#F7F7F7" }}
        >
          <div className="container">

            {/* Category Header */}
            <Reveal className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-12 lg:gap-24 items-start mb-20 md:mb-28 pb-12 border-b border-black/5">
              <div className="shrink-0">
                <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-4">{cat.num}</p>
                <h2
                  className="font-black text-black"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.92,
                  }}
                >
                  {cat.title.toUpperCase()}
                </h2>
              </div>
              <div className="flex flex-col gap-4 mt-1 lg:mt-6">
                <p
                  className="text-black font-black"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", letterSpacing: "-0.01em" }}
                >
                  {cat.tagline}
                </p>
                <p className="text-black/50 leading-relaxed max-w-xl" style={{ lineHeight: 1.75 }}>
                  {cat.intro}
                </p>
              </div>
            </Reveal>

            {/* Service Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cat.services.map((svc, svcIdx) => (
                <Reveal key={svc.name} delay={svcIdx * 0.1}>
                  <div
                    className="group relative bg-white border border-black/6 p-8 md:p-10 flex flex-col h-full transition-all duration-500 hover:-translate-y-1"
                    style={{
                      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Hover top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, #8B0016, transparent)" }}
                    />

                    {/* Index */}
                    <span className="text-black/15 font-mono text-[9px] tracking-[0.3em] uppercase mb-6 block">
                      {cat.num}.{String(svcIdx + 1).padStart(2, "0")}
                    </span>

                    {/* Name */}
                    <h3
                      className="text-black font-black mb-4 leading-tight"
                      style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", letterSpacing: "-0.02em" }}
                    >
                      {svc.name}
                    </h3>

                    {/* Description */}
                    <p className="text-black/55 text-sm leading-relaxed mb-8 flex-1">
                      {svc.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-black/5">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 rounded"
                          style={{ background: "#F0F0F0", color: "#8B0016" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>
      ))}

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
