"use client";
import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
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

export default function PaidAdvertisingPage() {
  const { openProjectModal } = useModal();

  const PILLARS = [
    { title: "Meta Ads (FB & IG)", desc: "Highly targeted campaigns across the Meta ecosystem designed to capture intent and drive direct sales.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop" },
    { title: "Growth Systems", desc: "End-to-end funnel optimization, ensuring traffic converts into measurable revenue.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" },
    { title: "Campaign Management", desc: "Daily monitoring, A/B testing, and budget reallocation by expert media buyers.", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2000&auto=format&fit=crop" },
    { title: "Lead Generation", desc: "High-volume lead acquisition systems tailored for B2B, real estate, and high-ticket services.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop" },
    { title: "Scaling Strategy", desc: "Data-driven roadmaps to increase ad spend profitability without diminishing returns.", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2000&auto=format&fit=crop" },
    { title: "Ad Creative Production", desc: "We deploy our in-house cinematic content to create high-converting ad variations.", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop" },
  ];

  return (
    <main className="bg-white min-h-screen text-black">
      <VisualHiddenSEO>
        <h1>Paid Advertising & Performance Marketing in Bahrain</h1>
        <p>Meta ads, growth campaigns, and performance marketing systems that scale revenue.</p>
      </VisualHiddenSEO>

      {/* ── HERO SECTION ── */}
      <section data-theme="light" className="relative pt-36 md:pt-52 pb-20 md:pb-32 bg-white overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Paid Advertising</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  REVENUE<br />SYSTEMS.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  Performance-driven ads.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  We don&apos;t just make things look good; we make them work. Our performance marketing team runs highly targeted ad campaigns utilizing custom creatives to generate high-quality leads and drive direct sales.
                </p>
                <button 
                  onClick={() => openProjectModal()}
                  className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 text-[11px] font-bold tracking-[0.2em] uppercase"
                >
                  Start Scaling Today →
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
                <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold">CAMPAIGN INFRASTRUCTURE</span>
                <div className="h-px flex-1 bg-black/8" />
              </div>
              <h2 className="text-[#1a1a1a] font-black text-3xl md:text-5xl uppercase tracking-tighter mb-4">Growth Systems</h2>
              <p className="text-black/60 text-[15px] md:text-base leading-relaxed font-light max-w-2xl">
                We design and manage high-converting ad campaigns engineered to capture intent and maximize your return on ad spend.
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
      
      {/* ── RETAINER PRICING ── */}
      <section data-theme="light" className="py-24 bg-white border-t border-black/5">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-[#1a1a1a] font-black text-3xl md:text-5xl uppercase tracking-tighter mb-6">Growth Retainers</h2>
              <p className="text-black/60 text-sm md:text-base font-light max-w-2xl mx-auto">
                Performance marketing requires ongoing optimization, testing, and creative refreshing. We operate on a customized monthly retainer model to align with your scaling goals.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
              <div className="flex-1 p-8 md:p-12 rounded-3xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
                <h3 className="text-[#1a1a1a] text-2xl font-bold mb-4">Ad Management</h3>
                <p className="text-black/60 text-sm mb-8 leading-relaxed">Dedicated media buying, campaign structuring, daily optimization, and exhaustive A/B testing.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-black/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" /> Multi-platform deployment
                  </li>
                  <li className="flex items-center gap-3 text-black/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" /> Retargeting funnels
                  </li>
                  <li className="flex items-center gap-3 text-black/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" /> Monthly performance reporting
                  </li>
                </ul>
              </div>
              
              <div className="flex-1 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#9A0E1F]/5 to-transparent border border-[#9A0E1F]/20 relative overflow-hidden shadow-[0_20px_60px_rgba(154,14,31,0.08)]">
                <div className="absolute top-0 right-0 p-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#9A0E1F]/10 text-[#9A0E1F] text-[9px] font-bold tracking-widest uppercase border border-[#9A0E1F]/20">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-[#1a1a1a] text-2xl font-bold mb-4">Ads + Creative</h3>
                <p className="text-black/60 text-sm mb-8 leading-relaxed">Complete performance ecosystem. We manage the ad spend AND produce the high-converting video and graphic creatives.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-black/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" /> Everything in Ad Management
                  </li>
                  <li className="flex items-center gap-3 text-black/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" /> Monthly creative production shoots
                  </li>
                  <li className="flex items-center gap-3 text-black/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" /> Continuous creative testing
                  </li>
                </ul>
                <button 
                  onClick={() => openProjectModal()}
                  className="w-full py-4 rounded-xl bg-[#9A0E1F] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-transform duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(154,14,31,0.3)] hover:shadow-[0_12px_40px_rgba(154,14,31,0.5)] transform-gpu will-change-transform"
                >
                  Discuss Your Retainer
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
