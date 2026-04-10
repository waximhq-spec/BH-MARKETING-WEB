"use client";

import Navbar from "@/components/Navbar";
import FlipClock from "@/components/FlipClock";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />
      
      {/* Desktop FlipClock - Fixed Right Guage */}
      <div className="hidden md:flex fixed right-4 lg:right-6 top-[60%] -translate-y-1/2 z-30 flex-row items-center gap-2">
        <span 
          className="text-[9px] uppercase tracking-[0.4em] text-[#353535]/50 whitespace-nowrap"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', marginBottom: '20px' }}
        >
          Current Time
        </span>
        <FlipClock />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#181818]">
        
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
          
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/HERO-LOGO.svg?v=6"
              alt="Cinmach Productions"
              className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[650px] lg:max-w-[800px] h-auto object-contain"
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
