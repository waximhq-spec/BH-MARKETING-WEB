"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutContent() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen text-black">
      {/* Hero */}
      <section data-theme="light" className="relative pt-36 md:pt-52 pb-20 md:pb-32 bg-white overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Who We Are</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  ABOUT<br />US.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  A production company built on results.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  We are a cinematic content agency based in Bahrain, focused on creating visuals that bring real customers to your business.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="h-[2px] w-full bg-black/10 mt-16" />
        </div>
      </section>

      {/* Story */}
      <section data-theme="dark" className="py-24 md:py-36 bg-[#0a0a0a] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold mb-6 block">OUR STORY</span>
                <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black leading-[0.95] tracking-tighter mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
                  WE STARTED WITH<br />ONE CAMERA.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <Reveal delay={0.1}>
                <p className="text-white/55 text-[15px] md:text-[17px] leading-[1.8] font-light mb-8">
                  Cinmach Productions was founded in Bahrain with a simple idea: restaurants and brands deserve content that actually brings in customers — not just pretty videos.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-white/55 text-[15px] md:text-[17px] leading-[1.8] font-light mb-8">
                  We have since worked with over 40 restaurants, hotels, fitness brands, and luxury businesses across the Gulf. Every project is approached with the same standard — create content that looks cinematic and drives measurable results.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/55 text-[15px] md:text-[17px] leading-[1.8] font-light">
                  Today we are a focused team of cinematographers, editors, and producers. We keep our team small intentionally so every client gets direct access and our best work.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section data-theme="light" className="py-24 md:py-32 bg-white text-black">
        <div className="container">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold">BY THE NUMBERS</span>
              <div className="h-px flex-1 bg-black/8" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "40+", label: "Restaurants Served" },
              { num: "300%", label: "Avg. Engagement Lift" },
              { num: "6", label: "Industries Covered" },
              { num: "24h", label: "Response Time" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="flex flex-col">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#888] font-black text-3xl md:text-5xl tracking-tighter mb-2">{stat.num}</span>
                  <span className="text-black/40 font-mono text-[9px] tracking-[0.2em] uppercase font-bold">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-24 md:py-36 bg-black">
        <div className="container text-center flex flex-col items-center">
          <Reveal>
            <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black leading-[0.95] tracking-tighter mb-10" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}>
              WANT TO WORK<br />WITH US?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <button onClick={() => openProjectModal()} className="group relative px-10 py-5 bg-[#9A0E1F] text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase rounded-full overflow-hidden transition-all duration-400 hover:shadow-[0_8px_30px_rgba(154,14,31,0.45)]">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-3">
                Get a Quote <span className="text-[12px]">→</span>
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
