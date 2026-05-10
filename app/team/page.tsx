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
  { name: "Suhail Ahmad Goni", role: "CO-FOUNDER & CEO", desc: "Suhail leads the company and makes sure everything runs smoothly. He focuses on growing the business and making sure every client gets the best possible results from our team." },
  { name: "Shayan", role: "Pre-Production Specialist", desc: "Shayan plans and prepares every detail before the cameras even start rolling. He makes sure everything is perfectly organized so that each shoot goes smoothly and captures exactly what you need." },
  { name: "Wasim", role: "Post-Production Specialist", desc: "Wasim takes the raw video and turns it into a finished masterpiece. He handles all the editing, colors, and sound to make sure your final video looks and sounds amazing." },
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
      <section data-theme="light" className="py-24 md:py-36 bg-[#fafafa] text-black border-t border-black/5">
        <div className="container">
          
          {/* Main / CEO Row */}
          <Reveal delay={0}>
            <div className="group relative p-6 md:p-12 lg:p-16 border border-black/5 rounded-3xl bg-white hover:border-black/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.03)] transition-all duration-500 mb-6 md:mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-16">
              
              {/* Image Placeholder */}
              <div className="w-28 h-28 md:w-56 md:h-56 shrink-0 rounded-full bg-[#f0f0f0] flex items-center justify-center overflow-hidden border border-black/5 group-hover:border-[#9A0E1F]/20 transition-colors duration-500">
                <span className="text-black/20 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold">Image</span>
              </div>

              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">
                <span className="text-[#9A0E1F] font-mono text-[9px] tracking-[0.3em] font-bold mb-3 md:mb-4 block">
                  01
                </span>
                <h3 className="text-black font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-tight mb-2 md:mb-3">
                  {TEAM[0].name}
                </h3>
                <p className="text-[#9A0E1F] font-mono text-[9px] md:text-[12px] tracking-[0.2em] uppercase font-bold mb-5 md:mb-6">
                  {TEAM[0].role}
                </p>
                <div className="h-px w-8 bg-black/10 mb-5 md:mb-6 group-hover:w-16 group-hover:bg-[#9A0E1F]/40 transition-all duration-500" />
                <p className="text-black/60 text-[14px] md:text-[17px] leading-[1.7] md:leading-[1.8] font-light max-w-2xl px-2 md:px-0">
                  {TEAM[0].desc}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Working Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {TEAM.slice(1).map((member, idx) => (
              <Reveal key={member.name} delay={(idx + 1) * 0.08}>
                <div className="group relative p-6 md:p-10 border border-black/5 rounded-3xl bg-white hover:border-black/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.03)] transition-all duration-500 h-full flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left gap-6 md:gap-8">
                  
                  {/* Image Placeholder */}
                  <div className="w-24 h-24 md:w-36 md:h-36 shrink-0 rounded-full bg-[#f0f0f0] flex items-center justify-center overflow-hidden border border-black/5 group-hover:border-[#9A0E1F]/20 transition-colors duration-500">
                    <span className="text-black/20 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">Image</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center xl:items-start w-full">
                    <span className="text-[#9A0E1F] font-mono text-[8px] md:text-[9px] tracking-[0.3em] font-bold mb-2 md:mb-3 block">
                      0{idx + 2}
                    </span>
                    <h3 className="text-black font-black text-2xl md:text-3xl tracking-tighter leading-tight mb-1 md:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#9A0E1F] font-mono text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-bold mb-4 md:mb-5">
                      {member.role}
                    </p>
                    <div className="h-px w-8 bg-black/10 mb-4 md:mb-5 group-hover:w-16 group-hover:bg-[#9A0E1F]/40 transition-all duration-500" />
                    <p className="text-black/60 text-[13px] md:text-[15px] leading-[1.7] font-light px-1 md:px-0">
                      {member.desc}
                    </p>
                  </div>
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
