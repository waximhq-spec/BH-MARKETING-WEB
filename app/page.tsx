"use client";

import Navbar from "@/components/Navbar";
import FlipClock from "@/components/FlipClock";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />
      
      {/* Desktop FlipClock - Side Anchor */}
      <div className="hidden md:block fixed left-10 lg:left-14 top-1/2 -translate-y-1/2 z-30">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#353535]/60 vertical-text mb-4">
            Current Time
          </span>
          <FlipClock />
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#181818]">
        
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
          
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/HERO-LOGO.svg?v=4"
              alt="Cinmach Productions"
              className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[800px] lg:max-w-[1000px] h-auto object-contain"
            />
            
            {/* Mobile FlipClock - Centered below logo */}
            <div className="mt-8 md:hidden">
              <FlipClock />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
