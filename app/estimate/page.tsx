"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main data-theme="dark" className="relative bg-black min-h-[100svh] pt-32 pb-24 md:pb-36 overflow-hidden">
      {/* Subtle noisy texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,0,22,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 max-w-2xl border-b border-white/10 pb-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">
                Project Initiation
              </p>
            </div>
            <h1
              className="text-white font-black mb-6 leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", letterSpacing: "-0.05em" }}
            >
              LET&apos;S MAKE<br />SOMETHING.
            </h1>
            <p className="text-white/50 font-light text-lg leading-relaxed mt-10">
              Tell us what you&apos;re working on. We only take on a select number of projects per year to guarantee absolute focus. We&apos;ll respond within 48 hours.
            </p>
          </Reveal>
        </div>

        {/* Form + Info */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 md:pt-4">
          {/* Form */}
          <div className="flex-1">
            {submitted ? (
              <Reveal>
                <div className="py-16">
                  <p className="font-mono text-[#8B0016] text-[10px] uppercase tracking-[0.4em] mb-6">Transmission Received</p>
                  <p className="text-white text-2xl font-light">
                    Thank you. The studio will be in touch shortly.
                  </p>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <Reveal delay={0.1}>
                    <div className="relative group">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block mb-4 transition-colors group-hover:text-[#8B0016]">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="John Doe" 
                        className="w-full bg-transparent border-b border-white/10 pb-4 text-white placeholder:text-white/20 focus:border-[#8B0016] transition-all outline-none font-light"
                      />
                    </div>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="relative group">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block mb-4 transition-colors group-hover:text-[#8B0016]">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="john@example.com" 
                        className="w-full bg-transparent border-b border-white/10 pb-4 text-white placeholder:text-white/20 focus:border-[#8B0016] transition-all outline-none font-light"
                      />
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.2}>
                  <div className="relative group">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block mb-4 transition-colors group-hover:text-[#8B0016]">Project Scope</label>
                    <select 
                      name="type"
                      className="w-full bg-transparent border-b border-white/10 pb-4 text-white transition-all outline-none appearance-none cursor-pointer font-light hover:border-[#8B0016]"
                    >
                      <option value="" className="text-black bg-white">Select Scope…</option>
                      <option value="fb" className="text-black bg-white">Food &amp; Hospitality Content</option>
                      <option value="real-estate" className="text-black bg-white">Real Estate Cinematics</option>
                      <option value="brand-film" className="text-black bg-white">Brand Film</option>
                      <option value="photography" className="text-black bg-white">Photography</option>
                      <option value="other" className="text-black bg-white">Other</option>
                    </select>
                    {/* Minimal custom arrow */}
                    <div className="absolute right-0 bottom-5 pointer-events-none text-white/30 group-hover:text-[#8B0016] transition-colors">↓</div>
                  </div>
                </Reveal>

                <Reveal delay={0.25}>
                  <div className="relative group">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block mb-4 transition-colors group-hover:text-[#8B0016]">Transmission Brief</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Outline your vision, timeline, and rough budget…"
                      className="w-full bg-transparent border-b border-white/10 pb-4 text-white placeholder:text-white/20 focus:border-[#8B0016] transition-all outline-none font-light resize-none"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex items-center gap-6 pt-8">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-6 px-12 py-5 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl"
                    >
                      Deploy <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                    </button>
                  </div>
                </Reveal>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:w-80 shrink-0 flex flex-col gap-12 lg:border-l border-white/10 lg:pl-16">
            <Reveal delay={0.35}>
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8B0016] mb-4">Command Center</p>
              <p className="text-white font-black text-xl tracking-tight uppercase">
                Cinmach Productions<br />
                Manama, Bahrain
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8B0016] mb-4">Direct Line</p>
              <a
                href="https://wa.me/97300000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-black text-lg tracking-tight uppercase hover:text-[#8B0016] transition-colors inline-block border-b border-transparent hover:border-[#8B0016]"
              >
                +973 0000 0000
              </a>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8B0016] mb-4">Transmission</p>
              <a
                href="mailto:contact@cinmachproductions.com"
                className="text-white font-black text-lg tracking-tight uppercase hover:text-[#8B0016] transition-colors break-all inline-block border-b border-transparent hover:border-[#8B0016]"
              >
                CONTACT@CINMACH.COM
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
