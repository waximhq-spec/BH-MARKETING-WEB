"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal
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
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Services Data — matches homepage, expanded with details
   ─────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Brand Identity",
    tagline: "We build memorable brands that stand out.",
    desc: "A brand is more than just a logo. We craft comprehensive visual identities, strategic positioning, and brand guidelines that resonate with your audience and set you apart in a crowded market.",
    deliverables: [
      "Logo Design & Visual Identity",
      "Brand Strategy & Positioning",
      "Brand Guidelines & Tone of Voice",
      "Marketing Collateral Design",
      "Packaging & Print Design",
    ],
    results: "Brands we build see higher recognition, trust, and long-term customer loyalty.",
  },
  {
    num: "02",
    title: "Content Production",
    tagline: "Cinematic content designed to capture attention.",
    desc: "From restaurants and hotels to luxury real estate and fitness brands, we produce high-end video and photo content. Every frame is meticulously crafted to tell your story and drive engagement across all digital platforms.",
    deliverables: [
      "Food & Hospitality Cinematics",
      "Real Estate & Space Walkthroughs",
      "Gym & Fitness Promo Videos",
      "Hotel & Resort Lifestyle Shoots",
      "Commercials & Drone Coverage",
    ],
    results: "Our cinematic content consistently outperforms standard media in engagement and conversion.",
  },
  {
    num: "03",
    title: "Paid Advertising",
    tagline: "Performance-driven campaigns built for sales.",
    desc: "We don't just make things look good; we make them work. Our performance marketing team runs highly targeted Meta and Google ad campaigns, utilizing our custom creatives to generate high-quality leads and drive direct sales.",
    deliverables: [
      "Meta Ads (Facebook & Instagram)",
      "Ad Creative Strategy & Testing",
      "Retargeting & Audience Scaling",
      "High-Converting Landing Pages",
      "Campaign Analytics & Reporting",
    ],
    results: "Clients utilizing our paid ad strategies see significant improvements in ROAS and cost-per-lead.",
  }
];

export default function ServicesPage() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen text-black">
      {/* ── SEO Layer ── */}
      <VisualHiddenSEO>
        <h1>Creative Marketing Agency Services in Bahrain</h1>
        <p>Cinmach Productions is a premium creative marketing agency offering Brand Identity, Cinematic Content Production, and Paid Advertising campaigns for modern brands.</p>
        {SERVICES.map((svc) => (
          <div key={svc.num}>
            <h2>{svc.title}</h2>
            <p>{svc.desc}</p>
            <ul>
              {svc.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </VisualHiddenSEO>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="relative pt-36 md:pt-52 pb-20 md:pb-32 bg-white overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-80">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                  <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">What We Do</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1
                  className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase"
                  style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}
                >
                  OUR<br />SERVICES.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#1a1a1a] font-medium text-[13px] md:text-[14px] tracking-tight mb-2 antialiased">
                  Built to turn attention into real customers.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-light antialiased">
                  We create cinematic content across six industries — each service designed to drive demand, bookings, and growth.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="h-[2px] w-full bg-black/10 mt-16" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES — DETAILED VERTICAL FLOW
      ══════════════════════════════════════════════════════ */}
      {SERVICES.map((svc, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={svc.num}
            data-theme={isEven ? "light" : "dark"}
            className={`py-24 md:py-36 ${isEven ? "bg-white text-black" : "bg-[#0a0a0a] text-white"}`}
          >
            <div className="container">
              <Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                  {/* Left Column — Number, Title, Tagline */}
                  <div className="lg:col-span-5">
                    {/* Number + Label */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold">{svc.num}</span>
                      <div className="h-px flex-1 bg-current opacity-10" />
                    </div>

                    <h2
                      className={`font-black leading-[0.95] tracking-tighter mb-5 ${
                        isEven
                          ? "bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#555]"
                          : "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                      }`}
                      style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.03em" }}
                    >
                      {svc.title.toUpperCase()}
                    </h2>

                    <p className={`text-[15px] font-medium tracking-tight mb-6 ${
                      isEven ? "text-[#9A0E1F]" : "text-[#9A0E1F]"
                    }`}>
                      {svc.tagline}
                    </p>

                    <p className={`text-[15px] leading-[1.75] font-light max-w-md ${
                      isEven ? "text-black/65" : "text-white/55"
                    }`}>
                      {svc.desc}
                    </p>

                    {/* Result stat */}
                    <div className={`mt-10 pt-6 border-t ${isEven ? "border-black/8" : "border-white/8"}`}>
                      <p className={`font-mono text-[8px] tracking-[0.3em] uppercase font-bold mb-3 ${
                        isEven ? "text-black/30" : "text-white/30"
                      }`}>
                        Results
                      </p>
                      <p className={`text-[13px] font-light leading-relaxed ${
                        isEven ? "text-black/50" : "text-white/45"
                      }`}>
                        {svc.results}
                      </p>
                    </div>
                  </div>

                  {/* Right Column — Deliverables */}
                  <div className="lg:col-span-7 lg:pt-4">
                    <p className={`font-mono text-[8px] tracking-[0.3em] uppercase font-bold mb-6 ${
                      isEven ? "text-black/30" : "text-white/25"
                    }`}>
                      What You Get
                    </p>

                    <div className="flex flex-col">
                      {svc.deliverables.map((item, dIdx) => (
                        <Reveal key={dIdx} delay={dIdx * 0.04}>
                          <div className={`group flex items-start gap-5 py-5 border-b transition-colors duration-300 ${
                            isEven
                              ? "border-black/6 hover:bg-black/[0.015]"
                              : "border-white/6 hover:bg-white/[0.015]"
                          }`}>
                            {/* Accent dash */}
                            <span className={`mt-[7px] w-4 h-px shrink-0 transition-all duration-300 ${
                              isEven
                                ? "bg-black/15 group-hover:bg-[#9A0E1F] group-hover:w-6"
                                : "bg-white/15 group-hover:bg-[#9A0E1F] group-hover:w-6"
                            }`} />
                            <span className={`text-[15px] md:text-[17px] font-medium tracking-tight leading-snug transition-colors duration-300 ${
                              isEven
                                ? "text-black/75 group-hover:text-black"
                                : "text-white/65 group-hover:text-white"
                            }`}>
                              {item}
                            </span>
                          </div>
                        </Reveal>
                      ))}
                    </div>

                    {/* CTA */}
                    <Reveal delay={0.3}>
                      <div className="mt-10">
                        <button
                          onClick={() => openProjectModal()}
                          className={`inline-flex items-center gap-3 px-7 py-3.5 border font-mono text-[9px] tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${
                            isEven
                              ? "border-black/15 text-black/60 hover:border-[#9A0E1F] hover:text-[#9A0E1F] hover:shadow-[0_0_20px_rgba(154,14,31,0.1)]"
                              : "border-white/15 text-white/50 hover:border-[#9A0E1F] hover:text-[#9A0E1F] hover:shadow-[0_0_20px_rgba(154,14,31,0.15)]"
                          }`}
                        >
                          Get a Quote
                          <span className="text-[11px] transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-32 md:py-48 bg-black border-t border-white/5">
        <div className="container text-center flex flex-col items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-10">
              <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
              <span className="text-white font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Start a Project</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black leading-[0.9] tracking-tighter mb-6"
              style={{ fontSize: "clamp(2rem, 7vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              READY TO GET<br />
              MORE CUSTOMERS?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/35 text-[14px] md:text-base font-light max-w-lg mx-auto mb-12 leading-relaxed">
              Tell us about your brand and we will show you exactly how our content can drive real results.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => openProjectModal()}
              className="group relative px-10 py-5 bg-[#9A0E1F] text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase rounded-full overflow-hidden transition-all duration-400 hover:shadow-[0_8px_30px_rgba(154,14,31,0.45)]"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-3">
                Get a Quote <span className="text-[12px] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
