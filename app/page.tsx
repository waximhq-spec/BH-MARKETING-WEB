"use client";

import Navbar from "@/components/Navbar";
import FlipClock from "@/components/FlipClock";
import HeroLogo from "@/components/HeroLogo";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto bg-transparent">
      <Navbar />
      
      {/* Desktop FlipClock - Bottom Right of Hero */}
      <div className="hidden md:flex fixed right-10 lg:right-14 bottom-10 z-30 flex-col items-end gap-2">
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#353535]/40">
          Current Time
        </span>
        <FlipClock />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image / Texture Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/download.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-100"
          />
          {/* Professional Overlay to maintain cinematic dark mode */}
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>

        {/* Vignette & Glow Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_150%)] transition-all duration-1000 opacity-90 z-10" />
          
          {/* Breathing Orange Glow - Optimized for Performance (No CSS blur filter) */}
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full z-0 translate-x-[-50%] translate-y-[-50%] will-change-transform"
            style={{ background: "radial-gradient(circle, rgba(0, 161, 56, 0.3) 0%, transparent 65%)" }}
          />
        </div>
        
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center mt-[-5vh]">
          
          {/* Subtle Floating Motion Wrapper */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center w-full relative"
          >
            {/* Frosted Glass Layer behind text */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120%] h-[150%] rounded-[100%] bg-white/[0.015] backdrop-blur-[15px] pointer-events-none z-[-1]"
              style={{
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
              }}
            />

            <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto relative z-10">
              <HeroLogo />
            </div>
            
            {/* Value Line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="mt-6 sm:mt-10 text-white/60 text-[10px] sm:text-[11px] font-normal tracking-[0.25em] sm:tracking-[0.3em] uppercase pointer-events-none drop-shadow-md"
            >
              We craft cinematic brands for modern businesses.
            </motion.p>
            
            {/* Mobile FlipClock - Centered below logo */}
            <div className="mt-12 md:hidden">
              <FlipClock />
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative w-full py-32 px-6 md:px-16 flex flex-col items-center z-20 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mb-16 text-center md:text-left"
        >
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#00A138] mb-4">Our Expertise</h2>
          <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white">Cinematic <span className="font-bold">Services.</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            { title: "Brand Strategy", desc: "Positioning your brand as a market leader with clear, compelling narratives." },
            { title: "Cinematic Visuals", desc: "High-end video and photography that captures the premium essence of your business." },
            { title: "Digital Experiences", desc: "Immersive, modern websites built for conversion and lasting impressions." }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group relative flex flex-col p-8 md:p-10 rounded-[24px] bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(246,112,17,0.05)] cursor-none"
            >
              {/* Optional Green Accent on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00A138]/0 to-[#00A138]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-16 group-hover:scale-110 transition-transform duration-500">
                <span className="text-xs font-bold text-white/50 group-hover:text-[#00A138] transition-colors">0{i + 1}</span>
              </div>
              <h4 className="text-md sm:text-lg font-black text-white mb-3 relative z-10 tracking-tight">{service.title}</h4>
              <p className="text-xs sm:text-sm font-normal text-white/40 leading-relaxed relative z-10">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK SECTION */}
      <section className="relative w-full py-32 px-6 md:px-16 min-h-screen flex flex-col items-center z-20 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mb-16 text-center md:text-left"
        >
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#00A138] mb-4">Selected Case Studies</h2>
          <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white">Our <span className="font-bold">Work.</span></h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl aspect-[4/3] md:aspect-[21/9] rounded-[24px] bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center justify-center group overflow-hidden relative cursor-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0a_120%)] z-10 opacity-60 pointer-events-none" />
          <div className="absolute w-full h-full bg-[#111111] transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
          
          <div className="relative z-20 flex flex-col items-center pointer-events-none">
            <span className="text-[#00A138] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">View Project</span>
            <h4 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight">Luxury Real Estate Campaign</h4>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
