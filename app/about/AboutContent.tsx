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
    <>
      <section data-theme="light" className="py-24 md:py-32 min-h-[100svh] flex flex-col justify-center" style={{ background: "#FAFAFA" }}>
        <div className="container mt-16 md:mt-0">
          {/* Hero text */}
          <div className="mb-24 md:mb-32">
            <Reveal>
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-8">
                About Us
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="text-black font-black leading-none"
                style={{
                  fontSize: "clamp(3rem, 9vw, 8rem)",
                  letterSpacing: "-0.05em",
                  maxWidth: "14ch",
                  lineHeight: 0.9,
                }}
              >
                CINEMATIC STUDIO. BAHRAIN-BASED.
              </h1>
            </Reveal>
          </div>

          {/* Two-column statement */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-24 md:mb-36 pr-4 lg:pr-0">
            <div className="lg:w-1/2 lg:sticky lg:top-36 self-start">
              <Reveal>
                <h2
                  className="font-black text-black leading-[0.95]"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  WE BELIEVE THE BEST STORIES ARE FELT — NOT JUST SEEN.
                </h2>
              </Reveal>
            </div>
            <div className="lg:w-1/2">
              <Reveal delay={0.1}>
                <p className="text-black/70 mb-8" style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)", lineHeight: 1.75, letterSpacing: "-0.01em" }}>
                  Cinmach Productions was built around a simple conviction: that visual communication,
                  when done with obsessive intention, can move people to act, buy, and remember.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-black/60 mb-8" style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)", lineHeight: 1.8 }}>
                  We are a small, highly focused studio. We don&apos;t work with everyone — we choose projects
                  where the brief demands craft and the client demands excellence.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-black/60" style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)", lineHeight: 1.8 }}>
                  Based in Bahrain and operating across the Gulf, we work in real estate, hospitality,
                  F&B, and luxury consumer brands.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container">
          {/* Capabilities */}
          <Reveal>
            <div className="flex items-center gap-6 mb-16">
              <div className="h-px flex-1 bg-black/5" />
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] shrink-0">Capabilities</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.label} delay={i * 0.05}>
                <div className="group">
                  <p className="text-black font-black text-xl mb-3 tracking-tight group-hover:text-[#8B0016] transition-colors duration-300">
                    {cap.label}
                  </p>
                  <p className="text-black/60 text-base leading-relaxed">{cap.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal className="mt-28 md:mt-36">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-12 border-t border-black/5">
              <p className="text-black font-black" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                READY TO TALK <br className="hidden md:block" />ABOUT YOUR PROJECT?
              </p>
              <Link
                href="/estimate"
                className="shrink-0 inline-flex items-center gap-4 px-10 py-5 bg-black text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] transition-all duration-500 shadow-2xl"
              >
                Let&apos;s Talk <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
