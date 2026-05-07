"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const CONTACT_INFO = [
  {
    label: "Email",
    value: "contact@cinmachproductions.com",
    href: "mailto:contact@cinmachproductions.com",
    desc: "For project inquiries and general questions.",
  },
  {
    label: "Support",
    value: "team@cinmachproductions.com",
    href: "mailto:team@cinmachproductions.com",
    desc: "For technical support and production team.",
  },
  {
    label: "WhatsApp",
    value: "+973 3XXX XXXX",
    href: "https://wa.me/97330000000",
    desc: "Quick responses. Usually within an hour.",
  },
  {
    label: "Phone",
    value: "+973 3XXX XXXX",
    href: "tel:+97330000000",
    desc: "Available Sunday to Thursday, 9am - 6pm.",
  },
];

const SOCIALS = [
  { label: "Instagram", handle: "@cinmach", href: "https://instagram.com/cinmach" },
  { label: "LinkedIn", handle: "Cinmach Productions", href: "https://linkedin.com/company/cinmach" },
  { label: "TikTok", handle: "@cinmach", href: "https://tiktok.com/@cinmach" },
];

export default function ContactPage() {
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
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Get in Touch</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}>
                  CONTACT<br />US.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  Ready to start a project?
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  Reach out through any channel below. We respond within 24 hours — usually much faster.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="h-[2px] w-full bg-black/10 mt-16" />
        </div>
      </section>

      {/* Contact Details */}
      <section data-theme="dark" className="py-24 md:py-36 bg-[#0a0a0a] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

            {/* Left: Main Contact */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold mb-8 block">REACH US DIRECTLY</span>
              </Reveal>

              <div className="flex flex-col">
                {CONTACT_INFO.map((item, idx) => (
                  <Reveal key={item.label} delay={idx * 0.06}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8 py-8 border-b border-white/6 hover:bg-white/[0.015] transition-all duration-300 px-2 -mx-2"
                    >
                      <div className="flex items-start gap-5 flex-1">
                        <span className="text-white/20 font-mono text-[9px] tracking-[0.3em] pt-1 shrink-0">{item.label.toUpperCase()}</span>
                        <div className="flex flex-col gap-1">
                          <span className="text-white font-bold text-lg md:text-xl tracking-tight group-hover:text-[#9A0E1F] transition-colors duration-300">
                            {item.value}
                          </span>
                          <span className="text-white/35 text-[12px] font-light">{item.desc}</span>
                        </div>
                      </div>
                      <span className="text-white/20 text-[14px] group-hover:text-[#9A0E1F] group-hover:translate-x-1 transition-all duration-300 shrink-0">→</span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: Social & Location */}
            <div className="lg:col-span-5 flex flex-col gap-16">
              {/* Social */}
              <div>
                <Reveal>
                  <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold mb-8 block">FOLLOW US</span>
                </Reveal>
                <div className="flex flex-col gap-4">
                  {SOCIALS.map((s, idx) => (
                    <Reveal key={s.label} delay={idx * 0.05}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-4 border-b border-white/6 hover:bg-white/[0.015] transition-all duration-300 px-2 -mx-2"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-white font-bold text-[15px] tracking-tight group-hover:text-[#9A0E1F] transition-colors duration-300">{s.label}</span>
                          <span className="text-white/30 text-[12px] font-light">{s.handle}</span>
                        </div>
                        <span className="text-white/20 text-[12px] group-hover:text-[#9A0E1F] group-hover:translate-x-1 transition-all duration-300">→</span>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <Reveal>
                  <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold mb-6 block">LOCATION</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="p-6 border border-white/6 rounded-xl bg-white/[0.015]">
                    <p className="text-white font-bold text-[15px] tracking-tight mb-1">Manama, Bahrain</p>
                    <p className="text-white/40 text-[13px] font-light leading-relaxed">
                      We serve clients across all of Bahrain and the wider Gulf region. On-location shoots available anywhere.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Hours */}
              <div>
                <Reveal>
                  <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold mb-6 block">WORKING HOURS</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-white/50 text-[13px] font-light">Sunday - Thursday</span>
                      <span className="text-white text-[13px] font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50 text-[13px] font-light">Friday - Saturday</span>
                      <span className="text-white/40 text-[13px] font-medium">By appointment</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
