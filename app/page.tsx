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
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">
          Current Time
        </span>
        <FlipClock />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-start justify-center overflow-hidden">
        {/* Background Image / Texture Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/bg.jpeg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-90 object-center"
          />
          {/* Professional Overlay to maintain cinematic dark mode */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]/20" />
          
          {/* Ambient Rolex Green Wash over the background guy */}
          <div className="absolute inset-0 bg-[#006039]/10 mix-blend-color z-0" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#006039]/20 to-transparent mix-blend-overlay z-0" />
        </div>

        {/* Vignette & Glow Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B0B0B_150%)] transition-all duration-1000 opacity-90 z-10" />
          
          {/* Core Breathing green glow - Optimized for Performance */}
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
            style={{ background: "radial-gradient(circle, rgba(0, 96, 57, 0.4) 0%, transparent 65%)" }}
          />

          {/* Drifting green animation 1 */}
          <motion.div
            animate={{
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.3, 1],
              x: ["-50%", "-30%", "-50%"],
              y: ["-50%", "-60%", "-50%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-[30%] w-[60vw] max-w-[600px] aspect-square rounded-full z-0 translate-x-[-50%] translate-y-[-50%] will-change-transform blur-3xl mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(0, 96, 57, 0.25) 0%, transparent 60%)" }}
          />

          {/* Drifting green animation 2 */}
          <motion.div
            animate={{
              opacity: [0.05, 0.2, 0.05],
              scale: [1, 1.2, 1],
              x: ["0%", "-20%", "0%"],
              y: ["0%", "20%", "0%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-[10%] w-[50vw] max-w-[500px] aspect-square rounded-full z-0 will-change-transform blur-3xl mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(0, 96, 57, 0.2) 0%, transparent 60%)" }}
          />
        </div>
        
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-start justify-center text-left pt-20">
          
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-start justify-center w-full relative max-w-4xl"
          >
            <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] h-auto relative z-10 origin-left scale-110">
              <HeroLogo />
            </div>
            
            {/* Value Line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="mt-8 text-white/80 text-sm sm:text-lg font-light tracking-wide max-w-2xl"
            >
              Building luxury brands step by step. We craft bold, cinematic experiences for modern visionaries.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button className="px-8 py-3 bg-[#006039] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(0, 96, 57,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95">
                Our Work
              </button>
              <button className="px-8 py-3 bg-transparent border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-white hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                Contact Us
              </button>
            </motion.div>
            
            {/* Mobile FlipClock */}
            <div className="mt-12 md:hidden self-start">
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
      <section className="relative w-full py-32 px-6 md:px-16 flex flex-col items-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mb-16 text-left"
        >
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#006039] mb-4 drop-shadow-[0_0_10px_rgba(0, 96, 57,0.5)]">Our Expertise</h2>
          <h3 className="text-2xl md:text-5xl font-light tracking-tight text-white mb-6">Cinematic <span className="font-bold">Services.</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            { title: "Brand Strategy", desc: "Positioning your brand as a market leader with clear, powerful narratives." },
            { title: "Cinematic Visuals", desc: "High-end video and photography that captures the premium essence of your business." },
            { title: "Digital Experiences", desc: "Immersive, modern websites built for conversion and lasting impressions with glassmorphism UI." }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group relative flex flex-col p-8 md:p-10 rounded-[24px] bg-[#011a0d]/40 border border-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_0_40px_rgba(0, 96, 57,0.15)] cursor-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#006039]/0 to-[#006039]/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-full bg-black/50 border border-white/5 flex items-center justify-center mb-16 group-hover:bg-[#006039]/10 group-hover:border-[#006039]/30 transition-all duration-500 group-hover:shadow-[inset_0_0_15px_rgba(0, 96, 57,0.3)]">
                <span className="text-xs font-bold text-white/50 group-hover:text-[#006039] transition-colors">0{i + 1}</span>
              </div>
              <h4 className="text-md sm:text-lg font-black text-white mb-3 relative z-10 tracking-tight">{service.title}</h4>
              <p className="text-xs sm:text-sm font-normal text-white/50 leading-relaxed relative z-10">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK SECTION */}
      <section className="relative w-full py-32 px-6 md:px-16 flex flex-col items-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mb-16 text-left"
        >
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#006039] mb-4 drop-shadow-[0_0_10px_rgba(0, 96, 57,0.5)]">Selected Case Studies</h2>
          <h3 className="text-2xl md:text-5xl font-light tracking-tight text-white mb-6">Our <span className="font-bold">Work.</span></h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl aspect-[4/3] md:aspect-[21/9] rounded-[24px] bg-[#011a0d]/40 border border-white/5 backdrop-blur-md flex items-center justify-center group overflow-hidden relative cursor-none hover:border-white/10 hover:shadow-[0_0_50px_rgba(0, 96, 57,0.1)] transition-all duration-700"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0B0B0B_120%)] z-10 opacity-60 pointer-events-none" />
          <div className="absolute w-full h-full bg-[#181818] transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
          
          <div className="relative z-20 flex flex-col items-center pointer-events-none">
            <span className="text-[#006039] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 drop-shadow-[0_0_10px_rgba(0, 96, 57,0.5)]">View Project</span>
            <h4 className="text-xl sm:text-2xl md:text-5xl font-bold text-white tracking-tight">Luxury Real Estate Campaign</h4>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative w-full py-40 px-6 md:px-16 flex flex-col items-center z-20 bg-gradient-to-b from-transparent to-[#111111]/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-4xl text-center flex flex-col items-center"
        >
          <div className="w-16 h-px bg-[#006039] mb-8 shadow-[0_0_10px_rgba(0, 96, 57,1)]" />
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
            We are an independent <span className="font-bold text-[#006039] drop-shadow-[0_0_15px_rgba(0, 96, 57,0.4)]">creative agency</span> driven by the pursuit of aesthetic perfection and cinematic storytelling.
          </h3>
          <p className="text-sm md:text-base text-white/50 max-w-2xl font-light leading-relaxed">
            Our mission is to elevate luxury brands to their highest potential. Through cutting-edge visuals, sophisticated design systems, and unparalleled strategic positioning, we help our partners transcend the ordinary. Every frame we shoot, every interface we build, is crafted with obsessive attention to detail.
          </p>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative w-full py-32 px-6 pb-48 flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl rounded-[32px] p-12 md:p-16 bg-[#011a0d]/50 border border-white/5 backdrop-blur-2xl relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_80px_rgba(0, 96, 57,0.05)]"
        >
          {/* Internal Glow Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#006039]/20 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#006039]/10 blur-[60px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
          
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#006039] mb-6 relative z-10 drop-shadow-[0_0_10px_rgba(0, 96, 57,0.5)]">Start a Project</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 relative z-10">Ready to Elevate?</h3>
          <p className="text-white/50 mb-10 text-sm max-w-md relative z-10">
            Let's craft something unforgettable. Reach out to our team to discuss your brand's cinematic journey.
          </p>
          <button className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#006039] hover:text-white hover:shadow-[0_0_30px_rgba(0, 96, 57,0.6)] transition-all duration-300 active:scale-95 relative z-10">
            Get in Touch
          </button>
        </motion.div>
      </section>

    </main>
  );
}
