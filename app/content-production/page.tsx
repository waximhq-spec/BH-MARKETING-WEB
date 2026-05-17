"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import Image from "next/image";

// Lazy load components
const EngagementModels = dynamic(() => import("@/components/EngagementModels"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));

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
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContentProductionPage() {
  const { openProjectModal } = useModal();

  const INDUSTRIES = [
    { title: "Restaurants & Cafes", desc: "Mouth-watering food cinematography, viral menu showcases, and atmospheric venue walkthroughs that drive foot traffic.", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop" },
    { title: "Real Estate", desc: "Cinematic property tours, sweeping drone coverage, and high-end architectural photography for premium listings.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" },
    { title: "Gyms & Fitness", desc: "High-energy promo reels, trainer spotlights, and facility showcases designed to drive memberships.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" },
    { title: "Hotels & Resorts", desc: "Immersive lifestyle content and luxury hospitality showcases that increase direct bookings.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" },
    { title: "E-commerce", desc: "Striking product photography and dynamic video ads tailored to maximize conversion rates.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" },
    { title: "Luxury Brands", desc: "Editorial-grade visuals and storytelling designed specifically for high-ticket services and products.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" },
  ];

  return (
    <main className="bg-white min-h-screen text-black">
      <VisualHiddenSEO>
        <h1>Cinematic Content Production Agency in Bahrain</h1>
        <p>Premium video production, photography, and creative campaigns for modern brands. High-end commercials, social reels, and dynamic media.</p>
      </VisualHiddenSEO>

      {/* ── HERO SECTION ── */}
      <section data-theme="light" className="relative pt-36 md:pt-52 pb-20 md:pb-32 bg-white overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Content Production</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  BUILT TO<br />CONVERT.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  Cinematic visual assets.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  From high-end commercials to viral social media reels, we produce premium visual content designed to capture attention and scale your revenue.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="h-[2px] w-full bg-black/10 mt-16" />
        </div>
      </section>

      {/* ── INDUSTRIES GRID ── */}
      <section data-theme="light" className="py-24 md:py-36 bg-[#fafafa] text-black border-t border-black/5 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold">PORTFOLIO & EXPERTISE</span>
                <div className="h-px flex-1 bg-black/8" />
              </div>
              <h2 className="text-[#1a1a1a] font-black text-3xl md:text-5xl uppercase tracking-tighter mb-4">Industries We Serve</h2>
              <p className="text-black/60 text-[15px] md:text-base leading-relaxed font-light max-w-2xl">
                We craft tailored visual strategies and content systems optimized for specific high-growth sectors.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {INDUSTRIES.map((industry, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-[#111] border border-black/10 hover:border-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 transform-gpu will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10" />
                  </div>
                  
                  <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="font-mono text-[#9A0E1F] text-[10px] tracking-[0.3em] font-bold mb-4 block">0{idx + 1}</span>
                    <h3 className="text-white text-2xl font-bold tracking-tight uppercase mb-4">{industry.title}</h3>
                    <p className="text-white/70 text-[14px] md:text-[15px] leading-relaxed font-light">{industry.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <EngagementModels />

      {/* ── FAQ SECTION ── */}
      <FAQSection />
    </main>
  );
}
