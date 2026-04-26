"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
   Team Data
   ─────────────────────────────────────────────────────────── */
const FEATURED_LEADERSHIP = {
  name: "Suhail Ahmad Goni",
  role: "Co-Founder & CEO",
  badge: "CO-FOUNDER & CEO",
  image: "/team-img/suhailb.jpg",
  desc: "The catalyst of Cinmach's architectural evolution. Suhail orchestrates the convergence of creative ambition and strategic scale, ensuring every production transcends traditional boundaries to establish a new standard of cinematic excellence.",
};

const LEADERSHIP = [
  {
    name: "Shayan Ahmad",
    role: "Head of Pre-Production",
    badge: "PRE-PRODUCTION DIRECTOR",
    desc: "The architect of vision and narrative strategy. Shayan defines the soul of every project before the cameras roll. He conceptualizes complex visual worlds, crafts powerful narratives, and leads elite global crews on-set to capture raw, cinematic emotion with unparalleled precision and high-end aesthetic intent.",
  },
  {
    name: "Wasim Pakhtoon",
    role: "Head of Post-Production",
    badge: "POST-PRODUCTION DIRECTOR",
    desc: "The master of refined delivery and digital architecture. Wasim perfects the technical aesthetic of the final capture. He provides deep strategic oversight of the entire post-production pipeline, conducting the workflow from final color grade to premium UI/UX design to ensure flawless execution and visual continuity.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Component: Featured Leadership (Primary Section)
   ─────────────────────────────────────────────────────────── */
function FeaturedLeadershipCard({ leader }: { leader: any }) {
  return (
    <Reveal className="w-full">
      <div className="flex flex-col items-center text-center py-6 md:py-8 group">
        {/* Elevated Visual Scale: Refined avatar with priority loading */}
        <div className="relative w-48 md:w-64 mx-auto mb-10 group">
          <div className="relative aspect-square overflow-hidden bg-neutral-100 rounded-full border border-black/10 transition-transform duration-1000 group-hover:scale-[1.02] flex items-center justify-center">
            {leader.image ? (
              <Image 
                src={leader.image} 
                alt={leader.name} 
                width={256}
                height={256}
                priority
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-[#8B0016]/20 animate-pulse" />
            )}
          </div>

          <div className="absolute -bottom-2 -right-2 md:-right-6 px-4 py-2 bg-[#8B0016] rounded-full flex items-center justify-center font-mono text-[8px] md:text-[9px] text-white border-2 border-white shadow-xl z-20 whitespace-nowrap">
            {leader.badge}
          </div>
        </div>

        {/* Refined Hierarchy Copy */}
        <div className="max-w-2xl px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#8B0016]/30" />
            <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase font-bold">{leader.role}</p>
            <span className="w-6 h-px bg-[#8B0016]/30" />
          </div>
          
          <h3 className="text-black font-bold text-4xl md:text-6xl tracking-tighter leading-[0.9] mb-6">
            {leader.name.split(" ").map((word: string, i: number) => (
              <span key={i} className={i === 0 ? "block text-black" : "block text-black/20"}>{word}</span>
            ))}
          </h3>

          <p className="text-black/60 text-sm md:text-base leading-relaxed font-light italic max-w-xl mx-auto">
            "{leader.desc}"
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Component: Leadership Card (Symmetrical Circular Equity)
   ─────────────────────────────────────────────────────────── */
function LeadershipCard({ leader }: { leader: any }) {
  return (
    <Reveal className="h-full">
      <div className="flex flex-col items-center text-center py-6 group">
        {/* Minimal Avatar Scale */}
        <div className="relative w-40 md:w-52 mx-auto mb-8">
          <div className="relative aspect-square overflow-hidden bg-neutral-100 rounded-full border border-black/5 transition-transform duration-1000 group-hover:scale-[1.02] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#8B0016]/20 animate-pulse" />
          </div>

          <div className="absolute -bottom-1 -right-1 px-3 py-1 bg-[#8B0016] rounded-full flex items-center justify-center font-mono text-[7px] md:text-[8px] text-white border-2 border-white shadow-lg z-20 whitespace-nowrap">
            {leader.badge}
          </div>
        </div>

        {/* Leadership Copy */}
        <div className="max-w-md px-4">
          <div className="flex items-center justify-center gap-3 mb-3">
             <span className="w-4 h-px bg-[#8B0016]/30" />
             <p className="text-[#8B0016] font-mono text-[8px] tracking-[0.2em] uppercase font-bold">{leader.role}</p>
             <span className="w-4 h-px bg-[#8B0016]/30" />
          </div>
          
          <h3 className="text-black font-bold text-2xl md:text-4xl tracking-tighter leading-tight mb-4">
            {leader.name.split(" ").map((word: string, i: number) => (
              <span key={i} className={i === 0 ? "block text-black" : "block text-black/20"}>{word}</span>
            ))}
          </h3>

          <p className="text-black/50 text-[13px] md:text-sm leading-relaxed font-light">
            {leader.desc}
          </p>
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
      <section data-theme="light" className="py-12 md:py-24 bg-white">
        <div className="container">
          
          {/* Featured Primary Leadership */}
          <div className="mb-12 md:mb-16">
            <FeaturedLeadershipCard leader={FEATURED_LEADERSHIP} />
            
            {/* Subtle Divider */}
            <Reveal delay={0.2} className="mt-4 flex justify-center">
              <div className="w-12 h-px bg-black/5" />
            </Reveal>
          </div>

          <Reveal className="mb-12">
            <h2 className="text-black/20 font-mono text-[11px] tracking-[0.5em] uppercase border-b border-black/5 pb-4 flex items-center justify-between">
              Core Leadership <span>02 — Founding Directors</span>
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
