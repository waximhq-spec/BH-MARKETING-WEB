"use client";

import { motion } from "framer-motion";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";

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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function WorkPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen text-[#1a1a1a] selection:bg-[#9A0E1F] selection:text-white pb-32">
      {/* ── SEO CONTENT LAYER ── */}
      <VisualHiddenSEO>
        <h1>Our Portfolio: Selected Cinematic Work by Cinmach Productions</h1>
        <p>Explore our archive of high-end cinematic films, vertical reels, and visual narratives. We partner with visionaries in luxury hospitality, real estate, and high-end consumer brands to shape global narratives.</p>
      </VisualHiddenSEO>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="pt-40 md:pt-56 pb-20 md:pb-32">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-8 md:mb-10 opacity-80">
              <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
              <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Archive</span>
            </div>
            <h1
              className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase"
              style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}
            >
              OUR<br />WORK.
            </h1>
          </Reveal>
          
          <Reveal delay={0.1} className="mt-12 md:mt-20 border-t border-black/10 pt-10">
            <p className="text-black/60 max-w-2xl font-light leading-relaxed text-[15px] md:text-lg antialiased">
              A curated selection of cinematic assets. We partner with visionaries in luxury hospitality, real estate, and high-end consumer brands to shape global narratives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: CINEMATIC FILMS (16:9 Placeholders)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-20 md:py-32 bg-white border-t border-black/5">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
              Cinematic Films
              <span className="h-px bg-black/10 flex-1"></span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[1, 2].map((idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group relative aspect-video bg-[#f0f0f0] rounded-xl overflow-hidden flex items-center justify-center border border-black/5 transition-all duration-500 hover:shadow-xl">
                  {/* Placeholder Content */}
                  <div className="text-center opacity-40">
                    <svg className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black font-bold">16:9 Video Placeholder</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: VERTICAL REELS (9:16 Placeholders)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-20 md:py-32 bg-[#fafafa] border-t border-black/5">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-[0.2em] uppercase mb-12 flex items-center gap-4">
              Vertical Reels
              <span className="h-px bg-black/10 flex-1"></span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group relative aspect-[9/16] bg-white rounded-xl overflow-hidden flex items-center justify-center border border-black/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  {/* Placeholder Content */}
                  <div className="text-center opacity-40">
                    <svg className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-black font-bold max-w-[80%] mx-auto">9:16 Placeholder</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
