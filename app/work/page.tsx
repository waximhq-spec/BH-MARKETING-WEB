"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SmartVideo from "@/components/SmartVideo";

/* ─────────────────────────────────────────────────────────────
   Premium Cinematic Carousel
   ─────────────────────────────────────────────────────────── */
const SLIDES = [
  { id: "01", title: "Lee Heritage",      cat: "Hospitality",    type: "native", vid: "https://www.pexels.com/download/video/3121459/" },
  { id: "02", title: "Heaven View Villa", cat: "Hospitality",    type: "native", vid: "https://www.pexels.com/download/video/8422238/" },
  { id: "03", title: "Drone Master",      cat: "Cinematography", type: "native", vid: "https://www.pexels.com/download/video/34076260/" },
];

function CarouselSlides() {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = SLIDES.length;

  // Autoplay
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    startTimer();
  };
  const prev = () => goTo((active - 1 + total) % total);
  const next = () => goTo((active + 1) % total);

  // Drag / Swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    setIsDragging(false);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart.current !== null && Math.abs(e.clientX - dragStart.current) > 8) {
      setIsDragging(true);
    }
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStart.current !== null) {
      const delta = e.clientX - dragStart.current;
      if (Math.abs(delta) > 50) { delta < 0 ? next() : prev(); }
    }
    dragStart.current = null;
    setTimeout(() => setIsDragging(false), 50);
  };

  const getState = (i: number) => {
    if (i === active) return "center";
    if (i === (active - 1 + total) % total) return "left";
    if (i === (active + 1) % total) return "right";
    return "hidden";
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    // ─── MOBILE: Full-width, edge-to-edge, no peek, no radius ───
    return (
      <div
        className="relative select-none w-screen left-1/2 -translate-x-1/2"
        style={{ touchAction: "pan-y" }} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Full-bleed track */}
        <div className="relative overflow-hidden w-full" style={{ aspectRatio: "16/9" }}>
          {SLIDES.map((slide, i) => {
            const isActive = i === active;
            const offset = i - active;
            return (
              <div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateX(${offset * 100}%)`,
                  transition: isDragging ? "none" : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="w-full h-full bg-black relative overflow-hidden">
                  <SmartVideo
                    src={slide.vid}
                    autoPlayViewport={isActive} // Play only if it is the active slide AND in viewport
                    className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
                  />
                  {/* Meta overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <p className="text-[#8B0016] font-mono text-[8px] tracking-[0.3em] uppercase mb-1">{slide.cat}</p>
                    <h4 className="text-white font-black text-lg tracking-tight leading-tight">{slide.title}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots — shown below video */}
        <div className="flex items-center justify-center gap-3 mt-5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-500"
              style={{
                width: i === active ? "24px" : "7px",
                height: "7px",
                borderRadius: "999px",
                background: i === active ? "#0A0A0A" : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ─── DESKTOP: Premium centered-peek carousel ───
  return (
    <div
      className="relative select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Outer clipping wrapper — allows peeking on edges */}
      <div className="overflow-hidden" style={{ borderRadius: "20px" }}>
        {/* Track: wider than container, centered slide is 76% of track */}
        <div className="relative w-full" style={{ aspectRatio: "16 / 7.4" }}>
          {SLIDES.map((slide, i) => {
            const state = getState(i);
            const isCenter = state === "center";
            const isLeft = state === "left";
            const isRight = state === "right";
            const isHidden = state === "hidden";

            const tx = isCenter ? 0 : isLeft ? -74 : isRight ? 74 : (i < active ? -150 : 150);
            const scale = isCenter ? 1 : 0.88;
            const opacity = isCenter ? 1 : isHidden ? 0 : 0.55;

            return (
              <div
                key={slide.id}
                className="absolute top-[5%] h-[90%] transition-all duration-700"
                style={{
                  width: "76%",
                  left: "12%",
                  transform: `translateX(${tx}%) scale(${scale})`,
                  transformOrigin: isCenter ? "center" : isLeft ? "right center" : "left center",
                  opacity,
                  zIndex: isCenter ? 10 : 2,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: isCenter ? "grab" : "pointer",
                  pointerEvents: isHidden ? "none" : "auto",
                }}
                onClick={() => { if (!isDragging && !isCenter) goTo(i); }}
              >
                <div
                  className="w-full h-full rounded-[20px] overflow-hidden bg-black relative group/card"
                  style={{ boxShadow: isCenter ? "0 20px 60px rgba(0,0,0,0.22)" : "none" }}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <SmartVideo
                      src={slide.vid}
                      autoPlayViewport={isCenter}
                      className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 object-cover"
                    />
                  </div>

                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-500 ${isCenter ? "opacity-0 group-hover/card:opacity-100" : "opacity-100"}`}
                    style={{ background: "rgba(0,0,0,0.45)" }}
                  >
                    <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.3em] uppercase mb-2">{slide.cat}</p>
                    <h4 className="text-white font-black text-xl md:text-2xl tracking-tight leading-tight">{slide.title}</h4>
                  </div>

                  <div className="absolute top-6 left-6">
                    <span className="text-white/30 font-mono text-[10px] tracking-[0.2em]">{slide.id}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-[8%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/10 text-black hover:bg-black hover:text-white transition-all duration-300 text-sm opacity-0 hover:opacity-100 focus:opacity-100"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
      >
        ←
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-[8%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/10 text-black hover:bg-black hover:text-white transition-all duration-300 text-sm opacity-0 hover:opacity-100 focus:opacity-100"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
      >
        →
      </button>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-500"
            style={{
              width: i === active ? "28px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === active ? "#0A0A0A" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

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
   Portfolio Page
   ─────────────────────────────────────────────────────────── */
export default function WorkPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ══════════════════════════════════════════════════════
          HERO SECTION — ELEVATED
      ══════════════════════════════════════════════════════ */}
      <section 
        data-theme="light" 
        className="pt-40 md:pt-56 pb-20 md:pb-32 bg-white" 
      >
        <div className="container">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-[#8B0016]" />
              <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">
                Archive
              </p>
            </div>
            <h1
              className="text-black font-black leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)", letterSpacing: "-0.05em" }}
            >
              SELECTED<br />
              <span className="text-[#8B0016]">WORK.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.1} className="mt-16 sm:mt-20 border-t border-black/10 pt-10">
            <p className="text-black/60 max-w-2xl font-light leading-relaxed text-lg lg:text-xl">
              A curated selection of cinematic assets. We partner with visionaries in luxury hospitality, real estate, and high-end consumer brands to shape global narratives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: CINEMATIC CAROUSEL (16:9)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-20 md:py-28 bg-[#FAFAFA] border-t border-black/5 overflow-hidden">
        <div className="container mb-12">
          <Reveal>
            <h2 className="text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase border-b border-black/10 pb-4 inline-flex">
              Cinematic Films <span className="ml-4 text-black/30">01</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative">
          <CarouselSlides />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: VERTICAL REELS (9:16)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-36 bg-white border-t border-black/5">
        <div className="container">
          <Reveal className="mb-14">
            <h2 className="text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase border-b border-black/10 pb-4 inline-flex">
              Vertical Reels <span className="ml-4 text-black/30">02</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { id: 1, title: "Modern Space", url: "https://player.vimeo.com/external/554522927.sd.mp4?s=33842cda0dbe2666cc63266986427d11f715ea08&profile_id=165" },
              { id: 2, title: "Design Details", url: "https://player.vimeo.com/external/554522927.sd.mp4?s=33842cda0dbe2666cc63266986427d11f715ea08&profile_id=164" },
              { id: 3, title: "Exterior Profile", url: "https://player.vimeo.com/external/554522927.sd.mp4?s=33842cda0dbe2666cc63266986427d11f715ea08&profile_id=165" },
              { id: 4, title: "Lounge Area", url: "https://player.vimeo.com/external/554522927.sd.mp4?s=33842cda0dbe2666cc63266986427d11f715ea08&profile_id=164" },
            ].map((reel, i) => (
              <Reveal key={reel.id} delay={i * 0.1}>
                <div className="group relative aspect-[9/16] bg-neutral-100 overflow-hidden cursor-pointer">
                  <SmartVideo 
                    src={reel.url}
                    hoverPlay={true}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#8B0016] font-mono text-[9px] tracking-[0.4em] uppercase mb-2 drop-shadow-md">Cinematic</p>
                    <h4 className="text-white font-black text-xl md:text-2xl tracking-tight leading-tight">{reel.title}</h4>
                  </div>
                  {/* Subtle Red Frame on Hover */}
                  <div className="absolute inset-0 border-2 border-[#8B0016] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: IMAGE SHOWCASE (SQUARE)
      ══════════════════════════════════════════════════════ */}
      <section data-theme="light" className="py-24 md:py-36 bg-[#FAFAFA] border-t border-black/5">
        <div className="container">
          <Reveal className="mb-14">
            <h2 className="text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase border-b border-black/10 pb-4 inline-flex">
              Visual Narrative <span className="ml-4 text-black/30">03</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "03", title: "Harbour Row Dining",    cat: "Hospitality",   driveId: "1LGbCekMBgMNNIyabVbFiTkVO6-brJgAe", bg: "bg-neutral-200" },
              { label: "04", title: "Ebrahim Corp Identity", cat: "Brand Film",    driveId: "1TZB5T-PnWl2-cePCrcC4tdsJAz2PSI3w", bg: "bg-neutral-300" },
              { label: "05", title: "Corporate Assets",      cat: "Hospitality",   driveId: "1-b48lZJ5UFnpe6QG639kJAiB0O6yqGBI", bg: "bg-neutral-200" },
              { label: "06", title: "Brand Vision",          cat: "Hospitality",   driveId: "1Ex9QPsfx6VsIX8GhiDqmSNStOrg76OHp", bg: "bg-neutral-300" },
            ].map((project, idx) => (
              <Reveal key={project.label} delay={idx * 0.1}>
                <motion.div
                  className={`group relative aspect-square overflow-hidden ${project.bg} cursor-pointer`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={`https://drive.google.com/thumbnail?sz=w1000&id=${project.driveId}`}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.12]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#8B0016] font-mono text-[8px] tracking-[0.3em] uppercase mb-2">{project.cat}</p>
                    <h4 className="text-white font-black text-sm md:text-base tracking-tight leading-snug">{project.title}</h4>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 border-t border-black/10 pt-16 text-center">
            <p className="text-black/30 text-[10px] font-mono tracking-[0.4em] uppercase">
              End of Archive. More Work Loading...
            </p>
          </Reveal>

        </div>
      </section>
    </main>
  );
}
