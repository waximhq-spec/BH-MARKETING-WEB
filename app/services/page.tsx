"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal utility
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
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Data: Organized Agency Services
   ─────────────────────────────────────────────────────────── */
const SERVICE_CATEGORIES = [
  {
    title: "Content Production",
    desc: "Cinematic visual assets engineered for impact and retention.",
    services: [
      "Restaurant & Café Shoots",
      "Real Estate & Space Cinematics",
      "Product & Lifestyle Content",
      "Short-form Reels & Ad Creatives"
    ]
  },
  {
    title: "Branding & Identity",
    desc: "Architecting the soul and visual language of your brand.",
    services: [
      "Brand Identity Systems",
      "Creative & Visual Direction",
      "Logo & Design Frameworks",
      "Brand Voice & Strategy"
    ]
  },
  {
    title: "Web Design & Development",
    desc: "Digital experiences built to convert and scale.",
    services: [
      "High-Converting Websites",
      "Strategic Landing Pages",
      "Performance-Focused Builds",
      "UX/UI Architectural Design"
    ]
  },
  {
    title: "Growth & Social Strategy",
    desc: "Converting attention into measurable brand authority.",
    services: [
      "End-to-End Content Strategy",
      "Social Media Ecosystem Management",
      "High-Performance Paid Creatives",
      "Audience Engagement Architecture"
    ]
  }
];

export default function ServicesPage() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen text-black">
      
      {/* ══════════════════════════════════════════════════════
          SECTION 1: HERO (AGENCY POSITIONING)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="relative pt-40 md:pt-64 pb-24 md:pb-40 overflow-hidden bg-white">
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="container relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-10 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">The Creative Partner</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-black text-black leading-[0.85] mb-12" style={{ fontSize: "clamp(2.5rem, 10vw, 8.5rem)", letterSpacing: "-0.05em" }}>
              EVERYTHING YOUR<br />
              <span className="text-black/15">BRAND NEEDS TO</span><br />
              STAND OUT.
            </h1>
          </Reveal>

          <Reveal delay={0.2} className="max-w-2xl border-l border-black/10 pl-8 mt-16">
            <p className="text-black/60 text-lg md:text-2xl font-light leading-relaxed">
              From cinematic content to websites and brand identity — we build, shoot, and grow your presence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: CORE SERVICES (VERTICAL FLOW)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-24 md:py-40 border-t border-white/5 bg-black text-white">
        <div className="container">
          <div className="flex flex-col gap-32 md:gap-48">
            {SERVICE_CATEGORIES.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                  {/* Category Title & Desc */}
                  <div className="lg:col-span-5">
                    <span className="text-[#8B0016] font-mono text-[10px] tracking-[0.4em] uppercase font-bold mb-6 block">0{idx + 1} — Category</span>
                    <h2 className="text-white font-black text-4xl md:text-6xl tracking-tighter leading-none mb-8">{cat.title}</h2>
                    <p className="text-white/40 text-lg font-light leading-relaxed max-w-sm">{cat.desc}</p>
                  </div>

                  {/* Service List */}
                  <div className="lg:col-span-7 pt-2 md:pt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                      {cat.services.map((svc, sIdx) => (
                        <div key={svc} className="group border-b border-white/5 pb-6">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="w-1.5 h-1.5 bg-[#8B0016] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                            <p className="text-white font-bold text-lg md:text-xl tracking-tight group-hover:text-[#8B0016] transition-colors duration-300">{svc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: POSITIONING LINE (THE IMPACT)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-24 md:py-40 bg-white text-black overflow-hidden relative">
        {/* Subtle moving line */}
        <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-black/5 -translate-y-1/2" />
        
        <div className="container relative z-10">
          <Reveal>
            <h2 className="text-center font-black leading-none tracking-[ -0.06em ]" style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}>
              WE DON&apos;T JUST CREATE CONTENT —<br />
              <span className="text-black/10 italic font-serif">WE BUILD BRANDS PEOPLE CHOOSE.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: PROCESS (THE FRAMEWORK)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-24 md:py-48 border-t border-white/5 bg-black text-white">
        <div className="container">
          <Reveal className="mb-24 md:mb-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[9px] font-bold">The Framework</p>
            </div>
            <h2 className="text-white font-black text-4xl md:text-7xl tracking-tighter">OUR PROCESS.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { step: "01", label: "Strategy", desc: "Defining the core narrative and competitive edge before we create a single pixel." },
              { step: "02", label: "Shoot / Design", desc: "Executing high-end production and visual identity with cinematic precision." },
              { step: "03", label: "Build", desc: "Translating visuals into high-performance digital architectures and web systems." },
              { step: "04", label: "Deliver & Grow", desc: "Deploying and managing ecosystems that convert attention into business growth." }
            ].map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.1}>
                <div className="relative group">
                  <span className="text-[#8B0016] font-mono text-[10px] tracking-[0.3em] font-bold block mb-6">STEP {item.step}</span>
                  <h3 className="text-white font-black text-2xl uppercase mb-4 tracking-tight group-hover:text-[#8B0016] transition-colors">{item.label}</h3>
                  <div className="h-px w-12 bg-white/10 mb-6 group-hover:w-full group-hover:bg-[#8B0016] transition-all duration-700" />
                  <p className="text-white/40 text-[15px] font-light leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5: FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-32 md:py-60 bg-[#0A0A0A] border-t border-white/5">
        <div className="container text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-white font-black leading-none mb-12" style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", letterSpacing: "-0.04em" }}>
              READY TO BUILD<br />
              <span className="text-white/20">SOMETHING THAT</span><br />
              STANDS OUT?
            </h2>
          </Reveal>
          
          <Reveal delay={0.15}>
            <button
              onClick={openProjectModal}
              className="px-14 py-7 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl"
            >
              Start a Project
            </button>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
