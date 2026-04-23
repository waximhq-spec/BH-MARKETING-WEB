"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal
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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CAPABILITIES = [
  {
    label: "Brand Films",
    desc: "Narrative-driven campaigns that build emotional equity.",
  },
  {
    label: "Aerial Cinematics",
    desc: "GCAA-certified drone operations for scale and impact.",
  },
  {
    label: "Colour & Grade",
    desc: "DaVinci Resolve pipeline. S-Log3. HDR delivery.",
  },
  {
    label: "Photography",
    desc: "Editorial and product photography for print and digital.",
  },
  {
    label: "Motion Design",
    desc: "Titles, graphic packages, and social-ready animation.",
  },
  {
    label: "Strategy",
    desc: "Brand positioning and visual direction from the ground up.",
  },
];

export default function AboutContent() {
  return (
    <main className="bg-white min-h-screen">
      {/* ══════════════════════════════════════════════════════
          HERO / MANIFESTO — ELEVATED
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-32 md:py-48 min-h-[90svh] flex flex-col justify-center bg-white border-b border-black/5">
        <div className="container">
          {/* Hero text */}
          <div className="mb-24 md:mb-40">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="w-8 h-px bg-[#8B0016]" />
                <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">
                  About Us
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="text-black font-black leading-[0.85] tracking-tight"
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 10rem)",
                  letterSpacing: "-0.05em",
                }}
              >
                CINEMATIC STUDIO.<br />
                <span className="text-[#8B0016]">BAHRAIN</span>-BASED.
              </h1>
            </Reveal>
          </div>

          {/* Two-column statement */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 pr-4 lg:pr-0 border-t border-black/10 pt-16">
            <div className="lg:w-1/2 lg:sticky lg:top-40 self-start">
              <Reveal>
                <h2
                  className="font-black text-black leading-[0.95]"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  WE BELIEVE THE BEST STORIES ARE <span className="text-[#8B0016] italic font-serif">FELT</span> — NOT JUST SEEN.
                </h2>
              </Reveal>
            </div>
            <div className="lg:w-1/2">
              <Reveal delay={0.1}>
                <p className="text-black/80 mb-10 font-light" style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                  Cinmach Productions was built around a simple conviction: that visual communication,
                  when done with obsessive intention, can move people to act, buy, and remember.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-black/60 mb-10 font-light" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.8 }}>
                  We are a highly focused, independent studio. We don&apos;t work with everyone — we choose projects
                  where the brief demands craft and the client demands excellence.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-black/60 font-light" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.8 }}>
                  Based in Bahrain and operating across the Gulf, we architect visual systems for real estate, hospitality,
                  F&B, and luxury consumer brands.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CAPABILITIES — ARCHITECTURAL GRID
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-40 bg-[#FAFAFA]">
        <div className="container">
          <Reveal>
            <h2 className="text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase border-b border-black/10 pb-4 inline-flex mb-16 md:mb-24">
              Capabilities <span className="ml-4 text-black/30">Core</span>
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.label} delay={i * 0.05} className="h-full">
                <div className="group border-t border-black/10 py-12 pr-8 flex flex-col h-full hover:bg-white transition-colors duration-500 px-6 -ml-6 border-b lg:border-b-0 cursor-default">
                  <span className="text-black/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 block transition-colors group-hover:text-[#8B0016]">
                    [0{i + 1}]
                  </span>
                  <p className="text-black font-black text-2xl lg:text-3xl mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {cap.label}
                  </p>
                  <p className="text-black/50 text-[15px] leading-relaxed font-light mt-auto">
                    {cap.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
              Next Steps
            </p>
            <h2
              className="text-white font-black mb-12"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
              }}
            >
              READY TO TALK<br />ABOUT YOUR PROJECT?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <Link
                href="/estimate"
                className="group flex justify-center items-center w-full sm:w-auto px-12 py-5 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl"
              >
                Let&apos;s Talk 
                <span className="ml-4 transition-transform duration-500 group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
