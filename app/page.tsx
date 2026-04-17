"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Home Page
   ─────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════════════════ */}
      <section
        data-theme="red"
        className="relative h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
          poster="https://images.pexels.com/photos/8396974/pexels-photo-8396974.jpeg"
        >
          <source src="https://player.vimeo.com/external/554522927.sd.mp4?s=33842cda0dbe2666cc63266986427d11f715ea08&profile_id=164" type="video/mp4" />
          <source src="https://www.pexels.com/download/video/8396974/" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

        {/* Content */}
        <div className="container relative z-10 pt-[18svh] pb-32">
          <div className="flex flex-col items-start gap-6">
            <p className="text-white font-mono tracking-[0.3em] uppercase text-[9px] mb-0.5 anim-fade-up">
              [ Cinmach Productions · Manama ]
            </p>

            <h1
              className="text-white font-black leading-[0.85] mb-4 anim-fade-up anim-delay-1"
              style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)", letterSpacing: "-0.05em" }}
            >
              MOVE<br />THE<br />WORLD.
            </h1>

            <p
              className="text-white/80 max-w-[500px] mb-4 anim-fade-up anim-delay-2"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", lineHeight: 1.45, letterSpacing: "0.01em" }}
            >
              High-end cinematography for brands that refuse to be ignored. Precision assets. Pure impact. Cinematic storytelling at its most refined.
            </p>

            <div className="flex flex-wrap gap-5 anim-fade-up anim-delay-3">
              <Link
                href="/work"
                className="w-56 py-5 bg-[#8B0016] text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-2xl text-center"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="w-56 py-5 bg-white text-black text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500 shadow-2xl text-center"
              >
                [ Let&apos;s Talk ]
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2  PHILOSOPHY — WHITE
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">

            {/* Left — Headline */}
            <Reveal className="lg:w-1/2 shrink-0">
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-6">
                The Collective
              </p>
              <h2
                className="font-black text-black"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                WE DON&apos;T JUST<br />SHOOT. WE<br />INSPIRE ACTION.
              </h2>
            </Reveal>

            {/* Right — Body + CTA */}
            <Reveal delay={0.2} className="lg:w-[460px] lg:border-l lg:border-black/10 lg:pl-12 shrink-0">
              <p
                className="text-black/70 mb-4"
                style={{ fontSize: "clamp(1rem, 1.3vw, 1.2rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}
              >
                Cinmach Productions is a specialized visual powerhouse based in Bahrain. We build cinematic assets that become the heartbeat of your brand strategy.
              </p>
              <p
                className="text-black/50 mb-12"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.7 }}
              >
                No fluff. No filler. Just pure, intentional impact — crafted frame by frame.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-[#8B0016] font-mono text-[10px] tracking-[0.3em] uppercase border-b border-[#8B0016] pb-1 hover:text-black hover:border-black transition-all duration-300"
              >
                Explore Our Approach <span>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §3  WHAT WE DO — BLACK
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-24 md:py-32" style={{ background: "#000" }}>
        <div className="container">

          <Reveal className="mb-20">
            <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-4">Services</p>
            <h2
              className="text-white font-black"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            >
              WHAT WE DO.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-white/10">
            {[
              {
                num: "01",
                title: "Real Estate\nMedia",
                desc: "Cinematic property visuals that sell the lifestyle, not just the space. Aerial, interior, and lifestyle storytelling.",
              },
              {
                num: "02",
                title: "Restaurant\nCinematography",
                desc: "Immersive food and ambiance films that turn menus into must-go experiences.",
              },
              {
                num: "03",
                title: "Brand\nFilms",
                desc: "High-end brand stories that make your audience feel — not just watch.",
              },
            ].map((svc, i) => (
              <Reveal key={svc.num} delay={i * 0.1} className="group px-0 md:px-12 first:pl-0 last:pr-0 py-12 md:py-0 border-t border-white/10 md:border-t-0 first:border-t-0">
                <span className="text-[#8B0016] font-mono text-[10px] tracking-[0.3em] uppercase block mb-8">{svc.num}</span>
                <h3
                  className="text-white font-black mb-6 whitespace-pre-line group-hover:text-white/80 transition-colors duration-300"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  {svc.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{svc.desc}</p>
                <div className="w-8 h-px bg-[#8B0016] group-hover:w-16 transition-all duration-500" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §4  FEATURED WORK — WHITE
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">

          <Reveal className="mb-16">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-4">Portfolio</p>
                <h2
                  className="text-black font-black"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
                >
                  SELECTED<br />WORK.
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden md:inline-flex items-center gap-3 text-black font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#8B0016] hover:border-[#8B0016] transition-all duration-300 self-end mb-2"
              >
                View All Work <span>→</span>
              </Link>
            </div>
          </Reveal>

          {/* Tier 1: Vertical Reels (9:16) */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
            {[
              { id: 1, title: "Automotive Showcase", url: "https://www.pexels.com/download/video/31588827/" },
              { id: 2, title: "Speed & Motion", url: "https://www.pexels.com/download/video/35696639/" },
            ].map((reel, i) => (
              <Reveal key={reel.id} delay={i * 0.1}>
                <div className="group relative aspect-[9/16] bg-neutral-100 rounded-[16px] overflow-hidden cursor-pointer border border-black/5">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={reel.url} type="video/mp4" />
                  </video> 
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.4em] uppercase">Automotive</p>
                    <h4 className="text-white font-bold text-lg md:text-2xl tracking-tight mt-1">{reel.title}</h4>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tier 1.5: Cinematic Films (16:9) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              { label: "01", title: "Lee Heritage",          cat: "Hospitality",               vimeo: "1183128960" },
              { label: "02", title: "Heaven View Villa",     cat: "Hospitality",               vimeo: "1183128507" },
            ].map((video) => (
              <Reveal key={video.label} delay={0.1}>
                <div className="group relative aspect-video overflow-hidden bg-black cursor-pointer rounded-[16px]">
                  <div className="absolute inset-0 pointer-events-none">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeo}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
                      className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase mb-2">{video.cat}</p>
                    <h4 className="text-white font-black text-xl md:text-2xl tracking-tight">{video.title}</h4>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="text-white/30 font-mono text-[10px] tracking-[0.2em]">{video.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tier 2: Image Showcase (Square Boxes) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "03", title: "Harbour Row Dining",    cat: "Hospitality",   driveId: "1LGbCekMBgMNNIyabVbFiTkVO6-brJgAe", bg: "bg-neutral-800" },
              { label: "04", title: "Ebrahim Corp Identity", cat: "Brand Film",    driveId: "1TZB5T-PnWl2-cePCrcC4tdsJAz2PSI3w", bg: "bg-neutral-900" },
              { label: "05", title: "Corporate Assets",      cat: "Hospitality",   driveId: "1-b48lZJ5UFnpe6QG639kJAiB0O6yqGBI", bg: "bg-neutral-700" },
              { label: "06", title: "Brand Vision",          cat: "Hospitality",   driveId: "1Ex9QPsfx6VsIX8GhiDqmSNStOrg76OHp", bg: "bg-neutral-800" },
            ].map((project) => (
              <motion.div
                key={project.label}
                className={`group relative aspect-square overflow-hidden rounded-[16px] ${project.bg} cursor-pointer`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={`https://drive.google.com/thumbnail?sz=w1000&id=${project.driveId}`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase mb-1">{project.cat}</p>
                  <h4 className="text-white font-black text-sm md:text-lg tracking-tight leading-tight">{project.title}</h4>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-white/30 font-mono text-[9px] tracking-[0.2em]">{project.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-12 md:hidden">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 text-black font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#8B0016] hover:border-[#8B0016] transition-all duration-300"
            >
              View All Work →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §5  PROCESS — BLACK
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-24 md:py-32" style={{ background: "#000" }}>
        <div className="container">

          <Reveal className="mb-20">
            <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-4">How We Work</p>
            <h2
              className="text-white font-black"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
            >
              THE PROCESS.
            </h2>
          </Reveal>

          <div className="flex flex-col">
            {[
              { num: "01", title: "Strategy",       desc: "Deep-dive into your brand, audience, and goals. We define what the film needs to say before a single frame is shot." },
              { num: "02", title: "Production",      desc: "On-location cinematic shooting with our crew. Precision lighting, composition, and movement — nothing is left to chance." },
              { num: "03", title: "Post-Production", desc: "Color grading, sound design, and cut — all refined to match a premium visual signature unique to your brand." },
              { num: "04", title: "Delivery",        desc: "Ready-to-publish assets across every format and platform. From social reels to full broadcast spots." },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="border-t border-white/10 py-10 md:py-12 grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr_1fr] items-start gap-6 md:gap-16 group cursor-default">
                  <span
                    className="text-[#8B0016] font-black font-mono"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
                  >{step.num}</span>
                  <h3
                    className="text-white font-black group-hover:text-white/80 transition-colors duration-300"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                  >{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed hidden md:block">{step.desc}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6  ABOUT / POSITIONING — WHITE
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-32" style={{ background: "#FAFAFA" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">

            <Reveal className="lg:w-1/2 shrink-0">
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-6">About Us</p>
              <h2
                className="font-black text-black mb-8"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                CRAFTED IN<br />BAHRAIN.<br />BUILT FOR<br />THE WORLD.
              </h2>
              <p className="text-black/60 max-w-md" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", lineHeight: 1.7 }}>
                We are a boutique cinematic production studio rooted in Bahrain, creating high-end visual content for forward-thinking brands across the Gulf and beyond.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="lg:w-[400px] shrink-0 grid grid-cols-1 gap-12">
              {[
                { stat: "5+",  label: "Years of craft",     desc: "Visual storytelling refined into a precise, repeatable signature system." },
                { stat: "40+", label: "Projects delivered", desc: "From intimate restaurants to large-scale real estate developments." },
                { stat: "BH",  label: "Based in Bahrain",   desc: "Serving the GCC region and international brands with local precision." },
              ].map((item) => (
                <div key={item.stat} className="flex items-start gap-8">
                  <span
                    className="text-black font-black shrink-0"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >{item.stat}</span>
                  <div>
                    <p className="text-black font-black text-sm tracking-tight mb-1">{item.label}</p>
                    <p className="text-black/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §7  FINAL CTA — BLACK
      ══════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="py-32 md:py-48" style={{ background: "#000" }}>
        <div className="container">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[10px] mb-8">
                Next Step
              </p>
              <h2
                className="text-white font-black mb-8"
                style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", letterSpacing: "-0.05em", lineHeight: 0.88 }}
              >
                READY TO<br />ELEVATE?
              </h2>
              <p className="text-white/40 mb-16 max-w-md" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", lineHeight: 1.7 }}>
                Tell us about your brand. Let&apos;s build something cinematic together.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  href="/contact"
                  className="px-12 py-5 bg-white text-black text-[10px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#8B0016] hover:text-white transition-all duration-500"
                >
                  [ Start a Project ]
                </Link>
                <Link
                  href="/work"
                  className="px-12 py-5 border border-white/20 text-white text-[10px] font-mono font-bold tracking-[0.3em] uppercase hover:border-white/60 transition-all duration-500"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
