"use client";

import { motion } from "framer-motion";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const TEAM = [
  { name: "Hussain Al-Bahrani", role: "Founder & Creative Director", desc: "Leads the creative vision across all productions. 8+ years in cinematic storytelling and brand strategy across the Gulf." },
  { name: "Ahmed Malik", role: "Director of Photography", desc: "Specializes in food, hospitality, and luxury cinematography. Trained in commercial film production." },
  { name: "Sara Yusuf", role: "Post-Production Lead", desc: "Manages editing, color grading, and final delivery. Ensures every frame meets our cinematic standard." },
  { name: "Omar Qasim", role: "Producer & Operations", desc: "Oversees logistics, scheduling, and client coordination. Keeps every shoot running on time and on brief." },
];

export default function TeamPage() {
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
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">The People</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  OUR<br />TEAM.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  Small team. Big results.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  A focused crew of creatives, producers, and strategists who care about making your brand look exceptional.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="h-[2px] w-full bg-black/10 mt-16" />
        </div>
      </section>

      {/* Team Grid */}
      <section data-theme="dark" className="py-24 md:py-36 bg-[#0a0a0a] text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {TEAM.map((member, idx) => (
              <Reveal key={member.name} delay={idx * 0.08}>
                <div className="group relative p-8 md:p-10 border border-white/6 rounded-2xl bg-white/[0.015] hover:border-white/12 transition-all duration-400">
                  {/* Number */}
                  <span className="text-[#9A0E1F] font-mono text-[9px] tracking-[0.3em] font-bold mb-6 block">
                    0{idx + 1}
                  </span>
                  {/* Name */}
                  <h3 className="text-white font-black text-2xl md:text-3xl tracking-tighter leading-tight mb-2">
                    {member.name}
                  </h3>
                  {/* Role */}
                  <p className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-6">
                    {member.role}
                  </p>
                  {/* Divider */}
                  <div className="h-px w-8 bg-white/10 mb-6 group-hover:w-16 group-hover:bg-[#9A0E1F]/40 transition-all duration-500" />
                  {/* Desc */}
                  <p className="text-white/45 text-[14px] leading-[1.7] font-light max-w-sm">
                    {member.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-theme="light" className="py-24 md:py-36 bg-white text-black">
        <div className="container">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold">HOW WE WORK</span>
              <div className="h-px flex-1 bg-black/8" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Quality Over Quantity", desc: "We take fewer projects so every client gets our full attention and best work." },
              { title: "Results First", desc: "Every visual decision is made to drive real business outcomes — not just look good." },
              { title: "Direct Communication", desc: "You work directly with the people making your content. No layers, no delays." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div>
                  <h3 className="font-black text-xl tracking-tight mb-3">{v.title}</h3>
                  <p className="text-black/55 text-[14px] leading-[1.7] font-light">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
