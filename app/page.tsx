"use client";

import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import ParticleHero from "@/components/ParticleHero";
import DynamicWord from "@/components/DynamicWord";
import WorldClocks from "@/components/WorldClocks";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-[60px] sm:pt-[80px] pb-16 sm:pb-24">
        {/* Interactive Particle Vortex Background */}
        <ParticleHero />

        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-start sm:items-center justify-center text-left sm:text-center">
          
          {/* Availability Bar */}
          <div className="mt-8 sm:mt-0 mb-6 sm:mb-10 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-1 sm:py-2 border border-white/10 bg-transparent rounded-none">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-green-500 relative shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            ></motion.span>
            <span className="text-[7px] sm:text-[10px] md:text-xs font-medium tracking-[0.1em] sm:tracking-[0.2em] text-white/60 uppercase font-mono">
              AVAILABLE — Q2 2026 <span className="mx-1 sm:mx-2 text-white/20">|</span> LIMITED SLOTS
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-center justify-start sm:justify-center w-full mb-8 sm:mb-10">
            <img
              src="/HERO-LOGO.svg"
              alt="Cinmach Productions"
              className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[800px] lg:max-w-[1000px] h-auto object-contain"
            />
          </div>
          
          {/* Dynamic Slogan - Left on Mobile, Center on PC */}
          <div className="mb-6 sm:mb-8 text-lg sm:text-2xl md:text-[2.5rem] font-bold tracking-tight text-white flex flex-wrap items-center justify-start sm:justify-center gap-1.5 sm:gap-4 font-[var(--font-outfit)]">
            <span className="opacity-90">We make</span>
            <div className="relative">
              <DynamicWord />
            </div>
            <span className="opacity-90">stand out.</span>
          </div>
          
          {/* Short Description - Left on Mobile, Center on PC */}
          <div className="mb-10 sm:mb-14 text-xs sm:text-sm md:text-xl text-white/60 max-w-2xl text-left sm:text-center font-light leading-relaxed tracking-wider font-[var(--font-space-grotesk)] mx-0 sm:mx-auto">
            We strip away everything that doesn't serve your brand. What remains is strategy, clarity, and cinematic design that works.
          </div>

          {/* Buttons - Left on Mobile, Center on PC */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-3 sm:gap-4 w-full px-0">
            <button className="w-full sm:w-auto min-w-0 sm:min-w-[220px] px-6 py-3.5 sm:px-8 sm:py-4 bg-[#f97316] text-black font-semibold rounded-none hover:bg-[#ea6a0a] transition-colors flex items-center justify-center gap-2 sm:gap-3 tracking-[0.1em] sm:tracking-[0.15em] text-[9px] sm:text-xs uppercase">
              Get a Quote <span className="text-base sm:text-lg leading-none">→</span>
            </button>
            <button className="w-full sm:w-auto min-w-0 sm:min-w-[220px] px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border border-white/20 text-white font-semibold rounded-none hover:border-white transition-colors flex items-center justify-center gap-2 sm:gap-3 tracking-[0.1em] sm:tracking-[0.15em] text-[9px] sm:text-xs uppercase">
              View Our Work <span className="text-base sm:text-lg leading-none">→</span>
            </button>
          </div>
          
          {/* World Clocks - Left on Mobile, Center on PC */}
          <div className="w-full flex justify-start sm:justify-center">
            <WorldClocks />
          </div>

        </div>
      </section>

    </main>
  );
}
