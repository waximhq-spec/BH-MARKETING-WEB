"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";

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
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Team Data - Focusing exclusively on Leadership
   ─────────────────────────────────────────────────────────── */
const LEADERSHIP = [
  {
    name: "Shayan Ahmad",
    role: "Head of Pre-Production & Director",
    desc: "The architect of vision and narrative strategy. Shayan defines the soul of every project before the cameras roll. He conceptualizes complex visual worlds, crafts powerful narratives, and leads elite global crews on-set to capture raw, cinematic emotion with unparalleled precision and high-end aesthetic intent.",
  },
  {
    name: "Wasim Pakhtoon",
    role: "Head of Post-Production & Digital Experience",
    desc: "The master of refined delivery and digital architecture. Wasim perfects the technical aesthetic of the final capture. He provides deep strategic oversight of the entire post-production pipeline, conducting the workflow from final color grade to premium UI/UX design to ensure flawless execution and visual continuity.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Component: Leadership Card (Symmetrical Circular Equity)
   ─────────────────────────────────────────────────────────── */
function LeadershipCard({ leader }: { leader: any }) {
  const isShayan = leader.name === "Shayan Ahmad";
  
  return (
    <Reveal className="h-full">
      <div className="group relative bg-[#FBFBFB] border border-black/5 p-8 md:p-12 h-full transition-all duration-700 hover:border-black/10 hover:shadow-2xl hover:shadow-black/5 flex flex-col">
        <div className="flex flex-col gap-10 flex-1">
          {/* Circular Abstract Profile Placeholder */}
          <div className="relative aspect-square w-48 mx-auto overflow-hidden bg-neutral-200 rounded-full border border-black/5 shrink-0 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-300 via-neutral-100 to-neutral-200 opacity-40" />
            
            {/* Center Aesthetic Dot */}
            <div className="w-4 h-4 rounded-full bg-[#8B0016]/20 animate-pulse" />

            <div className="absolute top-0 right-1/4 w-10 h-10 bg-[#8B0016] rounded-full flex items-center justify-center font-mono text-[9px] text-white border-2 border-[#FBFBFB]">
              LEAD
            </div>
          </div>

          {/* Leadership Copy - Balanced Hierarchy */}
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-6 h-6 shrink-0">
                  {isShayan ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B0016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                      <line x1="9.69" y1="8" x2="21.17" y2="8" />
                      <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                      <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                      <line x1="14.31" y1="16" x2="2.83" y2="16" />
                      <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B0016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20M2 12h20M12 2c3.5 0 6 4.5 6 10s-2.5 10-6 10-6-4.5-6-10 2.5-10 6-10z" />
                    </svg>
                  )}
                </div>
                <span className="w-8 h-px bg-[#8B0016] shrink-0" />
                <p className="text-[#8B0016] font-mono text-[10px] tracking-[0.3em] uppercase font-bold truncate">{leader.role}</p>
              </div>
              
              <h3 className="text-black font-black text-3xl md:text-5xl tracking-tighter leading-tight mb-8">
                {leader.name.split(" ").map((word: string, i: number) => (
                  <span key={i} className={i === 0 ? "block" : "block text-black/20"}>{word}</span>
                ))}
              </h3>

              <p className="text-black/50 text-sm md:text-base leading-relaxed font-light">
                {leader.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ─────────────────────────────────────────────────────────── */
export default function TeamPage() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen">
      
      {/* SECTION 1: HERO */}
      <section data-theme="light" className="relative pt-40 md:pt-60 pb-24 md:pb-32 overflow-hidden bg-[#FBFBFB]">
        {/* Subtle Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ 
            backgroundImage: "linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />

        <div className="container relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">
                The Visual Storytellers & Craftsmen
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 
              className="text-black font-black leading-[0.82] mb-12"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)", letterSpacing: "-0.05em" }}
            >
              MEET THE VISUAL<br />
              <span className="text-[#8B0016]">ARCHITECTS.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col lg:flex-row items-end justify-between gap-12">
            <p className="text-black/50 max-w-lg text-lg md:text-xl leading-relaxed font-light">
              Driven by aesthetic perfection and cinematic excellence, we are an independent collective of artists committed to positioning visionaries above the competition.
            </p>
            
            <button 
              onClick={openProjectModal}
              className="group flex items-center gap-6 text-black font-mono text-[10px] tracking-[0.4em] uppercase hover:text-[#8B0016] transition-colors"
            >
              Start a Project <span className="text-xl transition-transform group-hover:translate-x-3">→</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: LEADERSHIP (EDITORIAL) */}
      <section data-theme="light" className="py-24 md:py-40 bg-white">
        <div className="container">
          <Reveal className="mb-24">
            <h2 className="text-black/10 font-mono text-[11px] tracking-[0.5em] uppercase border-b border-black/5 pb-8 flex items-center justify-between">
              Studio Leadership <span>01 — Founding Directors</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            {LEADERSHIP.map((leader, i) => (
              <LeadershipCard key={leader.name} leader={leader} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FOOTER CTA */}
      <section className="py-32 md:py-60 bg-black" data-theme="dark">
        <div className="container text-center flex flex-col items-center">
          <Reveal>
            <h2 
              className="text-white font-black mb-12 leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
            >
              READY TO<br />COLLABORATE?
            </h2>
          </Reveal>
          
          <Reveal delay={0.15}>
            <button 
              onClick={openProjectModal}
              className="px-12 py-6 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl"
            >
              Start a Project
            </button>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
