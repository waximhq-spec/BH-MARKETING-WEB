"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import FlipClock from "@/components/FlipClock";
import HeroLogo from "@/components/HeroLogo";
import HeroTypographyLayer from "@/components/HeroTypographyLayer";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";

// ─── Section label (eyebrow) ─────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="type-label text-[#D91616] mb-5"
      style={{ textShadow: "0 0 18px rgba(217,22,22,0.4)" }}
    >
      {children}
    </p>
  );
}

// ─── Reusable section heading ─────────────────────────────────────────────────
function SectionHeading({
  light,
  bold,
}: {
  light: string;
  bold: string;
}) {
  return (
    <h2 className="type-heading text-2xl md:text-[2.75rem] lg:text-5xl font-light text-white">
      {light} <span className="font-bold">{bold}</span>
    </h2>
  );
}

// ─── Reusable section fade-up wrapper ────────────────────────────────────────
function FadeUp({
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className="group relative flex flex-col p-9 md:p-12 rounded-[24px] bg-[#1a0505]/40 border border-white/5 overflow-hidden"
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D91616]/0 to-[#D91616]/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]" />
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-[24px] border border-white/5 group-hover:border-white/10 group-hover:shadow-[0_0_40px_rgba(217,22,22,0.1)] transition-all duration-500 pointer-events-none" />

      {/* Index badge */}
      <div className="w-10 h-10 rounded-full bg-black/50 border border-white/5 flex items-center justify-center mb-10 group-hover:bg-[#D91616]/10 group-hover:border-[#D91616]/30 transition-all duration-500">
        <span
          className="type-label text-white/40 group-hover:text-[#D91616] transition-colors"
          style={{ letterSpacing: "0" }}
        >
          0{index + 1}
        </span>
      </div>

      {/* Card heading */}
      <h3
        className="text-base md:text-lg font-bold text-white mb-3 relative z-10"
        style={{ letterSpacing: "-0.02em", lineHeight: 1.25 }}
      >
        {title}
      </h3>

      {/* Card body */}
      <p className="type-body-sm text-white/45 relative z-10">{desc}</p>
    </motion.div>
  );
}

// ─── CTA Pill Button ──────────────────────────────────────────────────────────
function CTAButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      onClick={onClick}
      className={[
        "px-7 py-3 rounded-md transition-shadow duration-300 w-full",
        "type-label", // consistent size + spacing from token
        variant === "primary"
          ? "bg-[#D91616] text-white hover:shadow-[0_0_28px_rgba(217,22,22,0.45)]"
          : "bg-transparent border border-white/25 text-white/80 hover:border-white/60 hover:text-white hover:bg-white/[0.04]",
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // ── Scroll-based hero parallax ──────────────────────────────────────────
  const { scrollY } = useScroll();
  const rawParallax = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 60]);
  const smoothParallax = useSpring(rawParallax, { stiffness: 80, damping: 30 });

  const services = [
    {
      title: "Brand Strategy",
      desc: "We position your brand with clarity and intent — building narratives that lead markets.",
    },
    {
      title: "Cinematic Visuals",
      desc: "Premium video and photography that translates your brand essence into visual language.",
    },
    {
      title: "Digital Experiences",
      desc: "Precision-crafted websites and interfaces that convert attention into lasting trust.",
    },
  ];

  return (
    <main className="w-full relative z-10 mx-auto bg-transparent">
      <Navbar />

      {/* Desktop FlipClock — fixed bottom-right, above back-to-top */}
      <div className="hidden md:flex fixed right-10 lg:right-14 bottom-24 z-30 flex-col items-end gap-1.5">
        <span className="type-label text-white/25" style={{ letterSpacing: "0.35em" }}>
          Current Time
        </span>
        <FlipClock />
      </div>

      {/* ════════════════════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100svh] flex flex-col items-start justify-center overflow-hidden"
      >
        {/* ── Background image + subtle parallax ─────────── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: smoothParallax }}
        >
          <div className="absolute inset-[-10%] w-[120%] h-[120%]">
            <img
              src="https://i.pinimg.com/1200x/61/84/32/61843271b3d9b48cf8a5e7e9364e9d75.jpg"
              alt="Hero Background"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover opacity-90 object-center grayscale brightness-[0.4] contrast-[1.1]"
              style={{ willChange: "transform" }}
            />
          </div>

          {/* Left-to-right dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]/15" />

          {/* Red ambient wash */}
          <div className="absolute inset-0 bg-[#D91616]/30 mix-blend-color z-0" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#D91616]/40 to-transparent mix-blend-overlay z-0" />
        </motion.div>

        {/* ── Vignette + glows ──────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B0B0B_150%)] opacity-90 z-10" />

          {/* Core breathing glow */}
          <motion.div
            animate={shouldReduceMotion ? {} : { opacity: [0.15, 0.32, 0.15], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full z-0 translate-x-[-50%] translate-y-[-50%] will-change-transform"
            style={{ background: "radial-gradient(circle, rgba(217,22,22,0.38) 0%, transparent 65%)" }}
          />

          {/* Drifting glows — desktop only */}
          <div className="hidden md:block">
            <motion.div
              animate={shouldReduceMotion ? {} : { opacity: [0.07, 0.2, 0.07], scale: [1, 1.25, 1], x: ["-50%", "-32%", "-50%"], y: ["-50%", "-58%", "-50%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-[30%] w-[55vw] max-w-[550px] aspect-square rounded-full z-0 translate-x-[-50%] translate-y-[-50%] will-change-transform blur-3xl mix-blend-screen"
              style={{ background: "radial-gradient(circle, rgba(217,22,22,0.18) 0%, transparent 60%)" }}
            />
            <motion.div
              animate={shouldReduceMotion ? {} : { opacity: [0.04, 0.14, 0.04], scale: [1, 1.18, 1], x: ["0%", "-18%", "0%"], y: ["0%", "18%", "0%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-[10%] w-[44vw] max-w-[440px] aspect-square rounded-full z-0 will-change-transform blur-3xl mix-blend-screen"
              style={{ background: "radial-gradient(circle, rgba(217,22,22,0.14) 0%, transparent 60%)" }}
            />
          </div>
        </div>

        {/* ── Cinematic Typography Layer ────────────────────── */}
        <HeroTypographyLayer />

        {/* ── Hero text content ─────────────────────────────── */}
        <div className="z-20 w-full px-5 sm:px-8 md:px-14 lg:px-20 flex flex-col items-start justify-center text-left pt-24">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-start w-full max-w-3xl"
          >
            {/* Logo / wordmark - Entrance driven internally by HeroLogo */}
            <div className="w-full max-w-[260px] sm:max-w-[380px] md:max-w-[480px] h-auto mb-8 origin-left">
              <HeroLogo />
            </div>

            {/* Tagline — concise, confident */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/85 mb-10 max-w-[520px]"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                lineHeight: 1.65,
                letterSpacing: "0.005em",
                fontWeight: 300,
              }}
            >
              We craft cinematic brand experiences for modern visionaries.
            </motion.p>

            {/* CTAs - Stacked and matching logo width */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 w-full max-w-[260px] sm:max-w-[380px] md:max-w-[480px]"
            >
              <CTAButton variant="primary">Our Work</CTAButton>
              <CTAButton variant="outline">Contact Us</CTAButton>
            </motion.div>

            {/* Mobile FlipClock */}
            <div className="mt-16 md:hidden self-start flex flex-col gap-2">
              <span className="type-label text-white/30" style={{ letterSpacing: "0.3em" }}>
                Current Time
              </span>
              <FlipClock />
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────── */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 7, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="type-label text-white/40" style={{ letterSpacing: "0.35em" }}>
            Scroll
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════ SERVICES */}
      <section className="content-section relative w-full py-32 md:py-48 px-5 sm:px-8 md:px-14 lg:px-20 flex flex-col items-center z-20">
        <FadeUp className="w-full max-w-6xl mb-14">
          <Label>Our Expertise</Label>
          <SectionHeading light="Cinematic" bold="Services." />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl">
          {services.map((service, i) => (
            <ServiceCard key={i} title={service.title} desc={service.desc} index={i} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════ WORK */}
      <section className="content-section relative w-full py-32 md:py-48 px-5 sm:px-8 md:px-14 lg:px-20 flex flex-col items-center z-20">
        <FadeUp className="w-full max-w-6xl mb-14">
          <Label>Selected Case Studies</Label>
          <SectionHeading light="Our" bold="Work." />
        </FadeUp>

        <FadeUp className="w-full max-w-6xl" delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.005, transition: { type: "spring", stiffness: 200, damping: 25 } }}
            className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[20px] bg-[#1a0505]/40 border border-white/5 flex items-center justify-center group overflow-hidden relative hover:border-white/10 hover:shadow-[0_0_50px_rgba(217,22,22,0.08)] transition-all duration-700"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B0B0B_120%)] z-10 opacity-60 pointer-events-none" />
            <motion.div
              className="absolute w-full h-full bg-[#181818] pointer-events-none"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="relative z-20 flex flex-col items-center pointer-events-none gap-2">
              <span className="type-label text-[#D91616] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                View Project
              </span>
              <h3
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-white"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Luxury Real Estate Campaign
              </h3>
            </div>
          </motion.div>
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════════════ ABOUT */}
      <section id="about" className="content-section relative w-full py-40 md:py-60 px-5 sm:px-8 md:px-14 lg:px-20 flex flex-col items-center z-20">
        <FadeUp className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
            
            <div className="flex flex-col items-start lg:w-1/2">
              <Label>About Us</Label>
              <h2
                className="text-white mb-8"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  fontWeight: 300,
                }}
              >
                We are an <span className="font-bold">independent</span> <span className="text-[#D91616]">creative agency</span> driven by aesthetic perfection.
              </h2>
              <div className="w-12 h-px bg-[#D91616] mb-10 shadow-[0_0_12px_rgba(217,22,22,0.8)]" />
              <p
                className="text-white/50 max-w-xl mb-12"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                  fontWeight: 300,
                }}
              >
                Based in Bahrain and serving global visionaries, we operate at the intersection of high-end cinematography and strategic brand building. Every project we take on is treated as a singular work of art — crafted with obsessive attention to detail and a commitment to cinematic excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 lg:w-1/2 pt-4">
              {[
                { label: "Strategy", detail: "Market positioning, visual narrative, and brand identity architecture." },
                { label: "Cinematography", detail: "High-end brand films, product cinematics, and lifestyle visuals." },
                { label: "Design", detail: "Precision digital systems, editorial layouts, and visual direction." },
                { label: "Post-Production", detail: "Cinematic color grading, sound design, and precision editing." }
              ].map((cap, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <span className="text-[#D91616] text-[10px] tracking-[0.3em] font-bold uppercase transition-spacing duration-300 group-hover:tracking-[0.4em]">
                    {cap.label}
                  </span>
                  <p className="text-white/40 text-sm leading-relaxed font-light">
                    {cap.detail}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════════════ CONTACT */}
      <section className="content-section relative w-full py-32 md:py-48 px-5 sm:px-8 pb-56 flex justify-center z-20">
        <FadeUp className="w-full max-w-2xl">
          <motion.div
            whileHover={{ scale: 1.008, transition: { type: "spring", stiffness: 200, damping: 28 } }}
            className="rounded-[28px] p-10 md:p-16 bg-[#1a0505]/50 border border-white/5 mobile-no-blur backdrop-blur-2xl relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_80px_rgba(217,22,22,0.04)]"
          >
            {/* Corner glows */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#D91616]/15 blur-[70px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D91616]/8 blur-[50px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <Label>Start a Project</Label>

            <h2
              className="text-white mb-5 relative z-10"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              Ready to Elevate?
            </h2>

            <p
              className="text-white/45 mb-10 max-w-sm relative z-10"
              style={{
                fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                lineHeight: 1.75,
                letterSpacing: "0.005em",
                fontWeight: 300,
              }}
            >
              Let&apos;s build something that lasts. Tell us about your brand.
            </p>

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="relative z-10"
            >
              <Link
                href="/estimate"
                className="inline-flex items-center px-9 py-3.5 bg-white text-black type-label hover:bg-[#D91616] hover:text-white hover:shadow-[0_0_28px_rgba(217,22,22,0.55)] rounded-full transition-colors duration-300"
                style={{ letterSpacing: "0.14em" }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </FadeUp>
      </section>
    </main>
  );
}
