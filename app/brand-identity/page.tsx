"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import Link from "next/link";
import Image from "next/image";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function BrandIdentityPage() {
  const { openProjectModal } = useModal();

  const PILLARS = [
    { title: "Brand Strategy", desc: "Deep positioning work to uncover your unique market advantage and target audience.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" },
    { title: "Logo Systems", desc: "Timeless, dynamic logo marks built to scale across all physical and digital touchpoints.", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" },
    { title: "Visual Identity", desc: "Comprehensive typography, color palettes, and brand guidelines for absolute consistency.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop" },
    { title: "Social Branding", desc: "Grid aesthetics, template systems, and motion guidelines for digital presence.", image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1974&auto=format&fit=crop" },
    { title: "Packaging Direction", desc: "Premium physical touchpoints that turn unboxing into a brand experience.", image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=2000&auto=format&fit=crop" },
    { title: "Market Positioning", desc: "Strategic messaging and tone of voice that separates you from the competition.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
  ];

  return (
    <main className="bg-white min-h-screen text-black">
      <VisualHiddenSEO>
        <h1>Brand Identity & Logo Design Agency in Bahrain</h1>
        <p>Premium branding, visual identity systems, and market positioning for ambitious businesses.</p>
      </VisualHiddenSEO>

      {/* ── HERO SECTION ── */}
      <section data-theme="light" className="relative pt-36 md:pt-52 pb-20 md:pb-32 bg-white overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Brand Identity</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  LEGACY<br />BRANDS.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  We build memorable brands.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  A brand is more than just a logo. We craft comprehensive visual identities, strategic positioning, and brand guidelines that resonate with your audience and set you apart in a crowded market.
                </p>
                <button 
                  onClick={() => openProjectModal()}
                  className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 text-[11px] font-bold tracking-[0.2em] uppercase"
                >
                  Start Your Branding Project →
                </button>
              </div>
            </Reveal>
          </div>
          <div className="h-[2px] w-full bg-black/10 mt-16" />
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section data-theme="light" className="py-24 md:py-36 bg-[#fafafa] text-black border-t border-black/5 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold">CORE SERVICES</span>
                <div className="h-px flex-1 bg-black/8" />
              </div>
              <h2 className="text-[#1a1a1a] font-black text-3xl md:text-5xl uppercase tracking-tighter mb-4">Pillars of Branding</h2>
              <p className="text-black/60 text-[15px] md:text-base leading-relaxed font-light max-w-2xl">
                We craft tailored visual strategies and identity systems optimized for brand authority and market positioning.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-[#111] border border-black/10 hover:border-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 transform-gpu will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10" />
                  </div>
                  
                  <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="font-mono text-[#9A0E1F] text-[10px] tracking-[0.3em] font-bold mb-4 block">0{idx + 1}</span>
                    <h3 className="text-white text-2xl font-bold tracking-tight uppercase mb-4">{pillar.title}</h3>
                    <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* ── SIMPLE PRICING ── */}
      <section data-theme="light" className="py-24 bg-white border-t border-black/5">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-[#1a1a1a] font-black text-3xl md:text-5xl uppercase tracking-tighter mb-6">Investment</h2>
            <p className="text-black/60 text-sm md:text-base font-light mb-12 max-w-2xl mx-auto">
              Our branding engagements are highly customized to the scope of your project. We offer everything from foundational visual identity sprints to comprehensive enterprise brand overhauls.
            </p>
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] inline-block text-left w-full md:w-auto">
              <p className="text-black/40 font-mono text-[10px] tracking-widest uppercase mb-4">Starting At</p>
              <div className="text-[#1a1a1a] font-black text-5xl tracking-tighter mb-8">BHD 500</div>
              <button 
                onClick={() => openProjectModal()}
                className="w-full text-center py-4 rounded-xl bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-transform duration-300 hover:-translate-y-1"
              >
                Request a Custom Proposal
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
