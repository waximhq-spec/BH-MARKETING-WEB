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
   Brutalist Service Component
   ─────────────────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES_DATA[0]; index: number }) {
  const isTopRow = index < 3;
  return (
    <div className={`group relative bg-transparent flex flex-col h-full border-t border-black/10 transition-colors duration-500 hover:bg-white pt-10 pb-12 px-6 lg:px-10`}>
      {/* Red accent beam */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8B0016] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
      
      <span className="text-black/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 block transition-colors group-hover:text-[#8B0016]">
        [{service.num}]
      </span>
      
      <h3
        className="text-black font-black mb-6 leading-[1.05] group-hover:translate-x-2 transition-transform duration-500"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em" }}
      >
        {service.title}
      </h3>
      
      <p className="text-black/60 text-[15px] leading-relaxed mb-10 max-w-[90%] font-light group-hover:text-black transition-colors duration-500">
        {service.shortDesc}
      </p>

      {/* Structured bullet list */}
      <div className="mt-auto flex flex-col gap-3 group-hover:opacity-100 transition-opacity duration-500">
        {service.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#8B0016] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-black/70 text-sm font-medium tracking-tight uppercase group-hover:text-black transition-colors duration-300">{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ─────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════════════════
          HERO SECTION — ELEVATED
      ══════════════════════════════════════════════════════ */}
      <section
        data-theme="light"
        className="relative pt-40 md:pt-56 pb-24 md:pb-36 bg-white overflow-hidden"
      >
        <div className="container relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">
                Capabilities
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="font-black text-black mb-12"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 9rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
              }}
            >
              CINEMATIC VISUALS<br />
              <span className="text-black/20">BUILT TO MOVE</span><br />
              YOUR BRAND.
            </h1>
          </Reveal>

          <Reveal delay={0.18} className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 mt-16 max-w-5xl border-t border-black/10 pt-10">
            <p
              className="text-black/80 font-light leading-[1.8] flex-1"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
            >
              We go far beyond the shoot. Cinmach Productions offers a full creative suite — from concept and direction to production, post-production, and digital presence. Delivering one flawless standard of excellence.
            </p>

            <div className="flex flex-col gap-5 shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group flex justify-center items-center gap-6 px-12 py-5 bg-black text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] transition-all duration-500 shadow-2xl"
              >
                Initiate Project{" "}
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </Link>
              <Link
                href="/work"
                className="flex justify-center px-12 py-5 border border-black/10 text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:border-[#8B0016] hover:text-[#8B0016] hover:bg-[#8B0016]/5 transition-all duration-500"
              >
                Explore Archive
              </Link>
            </div>
          </Reveal>
        </div>
      </section>



      {/* ══════════════════════════════════════════════════════
          PROCESS CALLOUT — COMPACT & STRUCTURED
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32 bg-white">
        <div className="container">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start px-2 lg:px-0">
            <div className="lg:sticky lg:top-32 lg:pb-20">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-[#8B0016]" />
                <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[9px] font-bold">How it works</p>
              </div>
              <h2
                className="font-black text-black leading-[0.9]"
                style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", letterSpacing: "-0.04em" }}
              >
                BRIEF →<br />STRATEGY →<br />PRODUCTION →<br />DELIVERY.
              </h2>
            </div>
            
            <div className="flex flex-col border-t border-black/10">
              {[
                { step: "01", label: "Discovery Call", desc: "We understand your brand, goals, and audience intimately." },
                { step: "02", label: "Creative Proposal", desc: "Concept, moodboard, visual direction, timeline, and exact budget." },
                { step: "03", label: "Production", desc: "We execute with precision, on-site and in-studio using cinema-grade pipelines." },
                { step: "04", label: "Delivery", desc: "Final masterpieces delivered logically in all optimal platform formats." },
              ].map((s, i) => (
                <div key={s.step} className="group flex items-start gap-8 border-b border-black/10 py-10 transition-colors duration-500 hover:bg-[#FAFAFA] px-4 -mx-4 cursor-default">
                  <span className="text-[#8B0016] font-black text-2xl shrink-0 mt-1 transition-transform group-hover:scale-110">{s.step}</span>
                  <div>
                    <p className="text-black font-black text-lg tracking-tight uppercase mb-3">{s.label}</p>
                    <p className="text-black/60 text-[15px] font-light leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — IMMERSIVE CINEMATIC (BLACK)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="relative py-24 md:py-48 bg-black overflow-hidden border-t-[0.5px] border-white/10">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,0,22,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="container relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] mb-8 font-bold">
              Ready to execute?
            </p>
            <h2
              className="text-white font-black mb-12"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
              }}
            >
              LET&apos;S BUILD<br />YOUR VISION.
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-16 font-light leading-relaxed text-lg lg:text-xl">
              From single brand films to defining entire visual identities. We bring the exact same obsessive craft to everything.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <Link
                href="/estimate"
                className="group flex justify-center items-center w-full sm:w-auto px-12 py-5 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl"
              >
                Initiate Project{" "}
                <span className="ml-4 transition-transform duration-500 group-hover:translate-x-2">→</span>
              </Link>
              <Link
                href="/work"
                className="flex justify-center items-center w-full sm:w-auto px-12 py-5 border border-white/20 text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:border-[#8B0016] hover:text-[#8B0016] hover:bg-[#8B0016]/5 transition-all duration-500"
              >
                View Archive
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
