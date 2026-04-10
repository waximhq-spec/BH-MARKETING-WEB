"use client";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#181818]">
        
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
          
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/HERO-LOGO.svg?v=2"
              alt="Cinmach Productions"
              className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[800px] lg:max-w-[1000px] h-auto object-contain"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
