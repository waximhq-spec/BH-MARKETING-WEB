"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import FlipClock from "@/components/FlipClock";
import HeroLogo from "@/components/HeroLogo";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";

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
      className="group relative flex flex-col p-8 md:p-10 rounded-[24px] bg-[#1a0505]/40 border border-white/5 overflow-hidden cursor-none"
      style={{ boxShadow: "0 0 0 0 rgba(217,22,22,0)" }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D91616]/0 to-[#D91616]/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]" />
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-[24px] border border-white/5 group-hover:border-white/10 group-hover:shadow-[0_0_40px_rgba(217,22,22,0.12)] transition-all duration-500 pointer-events-none" />

      <div className="w-12 h-12 rounded-full bg-black/50 border border-white/5 flex items-center justify-center mb-16 group-hover:bg-[#D91616]/10 group-hover:border-[#D91616]/30 transition-all duration-500 group-hover:shadow-[inset_0_0_15px_rgba(217,22,22,0.3)]">
        <span className="text-xs font-bold text-white/50 group-hover:text-[#D91616] transition-colors">
          0{index + 1}
        </span>
      </div>
      <h4 className="text-md sm:text-lg font-black text-white mb-3 relative z-10 tracking-tight">
        {title}
      </h4>
      <p className="text-xs sm:text-sm font-normal text-white/50 leading-relaxed relative z-10">
        {desc}
      </p>
    </motion.div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
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
      className={
        variant === "primary"
          ? "px-8 py-3 bg-[#D91616] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_28px_rgba(217,22,22,0.45)] transition-shadow duration-300"
          : "px-8 py-3 bg-transparent border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-white hover:bg-white/5 transition-colors duration-300"
      }
    >
      {children}
    </motion.button>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // ── Scroll-based hero parallax (desktop only, GPU safe) ──────────────────
  const { scrollY } = useScroll();
  const rawParallax = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 60]);
  const smoothParallax = useSpring(rawParallax, { stiffness: 80, damping: 30 });

  const services = [
    {
      title: "Brand Strategy",
      desc: "Positioning your brand as a market leader with clear, powerful narratives.",
    },
    {
      title: "Cinematic Visuals",
      desc: "High-end video and photography that captures the premium essence of your business.",
    },
    {
      title: "Digital Experiences",
      desc: "Immersive, modern websites built for conversion and lasting impressions.",
    },
  ];

  return (
    <main className="w-full relative z-10 mx-auto bg-transparent">
      <Navbar />

      {/* Desktop FlipClock — fixed bottom-right */}
      <div className="hidden md:flex fixed right-10 lg:right-14 bottom-24 z-30 flex-col items-end gap-2">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">
          Current Time
        </span>
        <FlipClock />
      </div>

      {/* ════════════════════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100svh] flex flex-col items-start justify-center overflow-hidden"
      >
        {/* ── Background image with subtle parallax ─────────── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: smoothParallax }}
        >
          {/* Scale up slightly to prevent parallax gap at bottom */}
          <div className="absolute inset-[-10%] w-[120%] h-[120%]">
            <img
              src="https://i.pinimg.com/1200x/61/84/32/61843271b3d9b48cf8a5e7e9364e9d75.jpg"
              alt="Hero Background"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover opacity-90 object-center sepia saturate-200 -hue-rotate-30 brightness-60"
              style={{ willChange: "transform" }}
            />
          </div>

          {/* Cinematic left-to-right dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]/20" />

          {/* Ambient red wash */}
          <div className="absolute inset-0 bg-[#D91616]/30 mix-blend-color z-0" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#D91616]/40 to-transparent mix-blend-overlay z-0" />
        </motion.div>

        {/* ── Vignette + glows ──────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B0B0B_150%)] opacity-90 z-10" />

          {/* Core breathing glow — always visible */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { opacity: [0.15, 0.35, 0.15], scale: [1, 1.1, 1] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full z-0 translate-x-[-50%] translate-y-[-50%] will-change-transform"
            style={{ background: "radial-gradient(circle, rgba(217,22,22,0.4) 0%, transparent 65%)" }}
          />

          {/* Drifting glows — desktop only (heavy on mobile GPUs) */}
          <div className="hidden md:block">
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      opacity: [0.08, 0.22, 0.08],
                      scale: [1, 1.3, 1],
                      x: ["-50%", "-30%", "-50%"],
                      y: ["-50%", "-60%", "-50%"],
                    }
              }
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-[30%] w-[55vw] max-w-[550px] aspect-square rounded-full z-0 translate-x-[-50%] translate-y-[-50%] will-change-transform blur-3xl mix-blend-screen"
              style={{ background: "radial-gradient(circle, rgba(217,22,22,0.2) 0%, transparent 60%)" }}
            />
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      opacity: [0.04, 0.16, 0.04],
                      scale: [1, 1.2, 1],
                      x: ["0%", "-20%", "0%"],
                      y: ["0%", "20%", "0%"],
                    }
              }
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-[10%] w-[44vw] max-w-[440px] aspect-square rounded-full z-0 will-change-transform blur-3xl mix-blend-screen"
              style={{ background: "radial-gradient(circle, rgba(217,22,22,0.15) 0%, transparent 60%)" }}
            />
          </div>
        </div>

        {/* ── Hero content ──────────────────────────────────── */}
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-start justify-center text-left pt-20">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-start justify-center w-full relative max-w-4xl"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] h-auto relative z-10 origin-left scale-110"
            >
              <HeroLogo />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-white/80 text-sm sm:text-lg font-light tracking-wide max-w-2xl"
            >
              Building luxury brands step by step. We craft bold, cinematic experiences
              for modern visionaries.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <CTAButton variant="primary">Our Work</CTAButton>
              <CTAButton variant="outline">Contact Us</CTAButton>
            </motion.div>

            {/* Mobile FlipClock */}
            <div className="mt-12 md:hidden self-start">
              <FlipClock />
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────── */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/60">
            Scroll
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════ SERVICES */}
      <section className="content-section relative w-full py-32 px-6 md:px-16 flex flex-col items-center z-20">
        <FadeUp className="w-full max-w-6xl mb-16 text-left">
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#D91616] mb-4 drop-shadow-[0_0_10px_rgba(217,22,22,0.5)]">
            Our Expertise
          </h2>
          <h3 className="text-2xl md:text-5xl font-light tracking-tight text-white mb-6">
            Cinematic <span className="font-bold">Services.</span>
          </h3>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {services.map((service, i) => (
            <ServiceCard key={i} title={service.title} desc={service.desc} index={i} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════ WORK */}
      <section className="content-section relative w-full py-32 px-6 md:px-16 flex flex-col items-center z-20">
        <FadeUp className="w-full max-w-6xl mb-16 text-left">
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#D91616] mb-4 drop-shadow-[0_0_10px_rgba(217,22,22,0.5)]">
            Selected Case Studies
          </h2>
          <h3 className="text-2xl md:text-5xl font-light tracking-tight text-white mb-6">
            Our <span className="font-bold">Work.</span>
          </h3>
        </FadeUp>

        <FadeUp className="w-full max-w-6xl" delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.005, transition: { type: "spring", stiffness: 200, damping: 25 } }}
            className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[24px] bg-[#1a0505]/40 border border-white/5 flex items-center justify-center group overflow-hidden relative cursor-none hover:border-white/10 hover:shadow-[0_0_50px_rgba(217,22,22,0.1)] transition-all duration-700"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B0B0B_120%)] z-10 opacity-60 pointer-events-none" />
            {/* Background tile with subtle zoom on hover */}
            <motion.div
              className="absolute w-full h-full bg-[#181818] pointer-events-none"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="relative z-20 flex flex-col items-center pointer-events-none">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="text-[#D91616] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_10px_rgba(217,22,22,0.5)]"
              >
                View Project
              </motion.span>
              <h4 className="text-xl sm:text-2xl md:text-5xl font-bold text-white tracking-tight">
                Luxury Real Estate Campaign
              </h4>
            </div>
          </motion.div>
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════════════ ABOUT */}
      <section className="content-section relative w-full py-40 px-6 md:px-16 flex flex-col items-center z-20 bg-gradient-to-b from-transparent to-[#111111]/30">
        <FadeUp className="w-full max-w-4xl text-center flex flex-col items-center">
          <div className="w-16 h-px bg-[#D91616] mb-8 shadow-[0_0_10px_rgba(217,22,22,1)]" />
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
            We are an independent{" "}
            <span className="font-bold text-[#D91616] drop-shadow-[0_0_15px_rgba(217,22,22,0.4)]">
              creative agency
            </span>{" "}
            driven by the pursuit of aesthetic perfection and cinematic storytelling.
          </h3>
          <p className="text-sm md:text-base text-white/50 max-w-2xl font-light leading-relaxed">
            Our mission is to elevate luxury brands to their highest potential. Through
            cutting-edge visuals, sophisticated design systems, and unparalleled strategic
            positioning, we help our partners transcend the ordinary. Every frame we shoot,
            every interface we build, is crafted with obsessive attention to detail.
          </p>
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════════════ CONTACT */}
      <section className="content-section relative w-full py-32 px-6 pb-48 flex justify-center z-20">
        <FadeUp className="w-full max-w-3xl">
          <motion.div
            whileHover={{ scale: 1.008, transition: { type: "spring", stiffness: 200, damping: 28 } }}
            className="rounded-[32px] p-12 md:p-16 bg-[#1a0505]/50 border border-white/5 mobile-no-blur backdrop-blur-2xl relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_80px_rgba(217,22,22,0.05)]"
          >
            {/* Internal corner glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D91616]/20 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D91616]/10 blur-[60px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#D91616] mb-6 relative z-10 drop-shadow-[0_0_10px_rgba(217,22,22,0.5)]">
              Start a Project
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 relative z-10">
              Ready to Elevate?
            </h3>
            <p className="text-white/50 mb-10 text-sm max-w-md relative z-10">
              Let&apos;s craft something unforgettable. Reach out to our team to discuss your
              brand&apos;s cinematic journey.
            </p>

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="relative z-10"
            >
              <Link
                href="/estimate"
                className="inline-flex items-center px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#D91616] hover:text-white hover:shadow-[0_0_30px_rgba(217,22,22,0.6)] transition-colors duration-300"
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
