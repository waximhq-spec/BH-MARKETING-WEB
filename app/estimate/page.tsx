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
    <main data-theme="light" className="bg-white min-h-screen pt-32 pb-24 md:pb-36">
      <div className="container">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <p className="label mb-8 text-[#8B0016]">Contact</p>
            <h1
              className="text-black font-black mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            >
              Let&apos;s make something.
            </h1>
            <p className="text-black/50 font-light text-lg leading-relaxed">
              Tell us what you&apos;re working on. We&apos;ll get back to you within 48 hours.
            </p>
          </Reveal>
        </div>

        {/* Form + Info */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Form */}
          <div className="flex-1">
            {submitted ? (
              <Reveal>
                <div className="py-16">
                  <p className="label-red mb-4 text-[#8B0016]">Message received</p>
                  <p className="text-black text-xl font-light">
                    Thank you. We&apos;ll be in touch soon.
                  </p>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Reveal delay={0.1}>
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-3">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="Your full name" 
                      className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-black placeholder:text-black/20 focus:border-[#8B0016]/20 transition-all outline-none"
                    />
                  </Reveal>
                  <Reveal delay={0.15}>
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-3">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="your@email.com" 
                      className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-black placeholder:text-black/20 focus:border-[#8B0016]/20 transition-all outline-none"
                    />
                  </Reveal>
                </div>

                <Reveal delay={0.2}>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-3">Project Type</label>
                  <select 
                    name="type"
                    className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-black transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" className="text-black">Select…</option>
                    <option value="real-estate" className="text-black">Real Estate Cinematics</option>
                    <option value="fb" className="text-black">Restaurant / F&amp;B</option>
                    <option value="brand-film" className="text-black">Brand Film</option>
                    <option value="photography" className="text-black">Photography</option>
                    <option value="other" className="text-black">Other</option>
                  </select>
                </Reveal>

                <Reveal delay={0.25}>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-3">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project…"
                    className="w-full bg-[#FBFBFB] border border-black/5 p-4 text-black placeholder:text-black/20 focus:border-[#8B0016]/20 transition-all outline-none"
                  />
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex items-center gap-6 pt-4">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-6 px-12 py-5 bg-black text-white text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] transition-all duration-500 shadow-xl"
                    >
                      Send Message <span className="text-lg transition-transform group-hover:translate-x-3">→</span>
                    </button>
                  </div>
                </Reveal>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:w-80 shrink-0 flex flex-col gap-12">
            <Reveal delay={0.4}>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B0016] mb-4">Studio</p>
              <p className="text-black/60 text-sm md:text-base font-light leading-relaxed">
                Cinmach Productions<br />
                Manama, Kingdom of Bahrain
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B0016] mb-4">WhatsApp</p>
              <a
                href="https://wa.me/97300000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 text-sm md:text-base font-light hover:text-[#8B0016] transition-colors flex items-center gap-2"
              >
                +973 0000 0000 <span className="text-xs">→</span>
              </a>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B0016] mb-4">Email</p>
              <a
                href="mailto:contact@cinmachproductions.com"
                className="text-black/80 text-sm md:text-base font-light hover:text-[#8B0016] transition-colors flex items-center gap-2"
              >
                contact@cinmachproductions.com <span className="text-xs">→</span>
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
