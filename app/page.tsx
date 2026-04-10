import Navbar from "@/components/Navbar";
import FlipClock from "@/components/FlipClock";
import HeroLogo from "@/components/HeroLogo";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />
      
      {/* Desktop FlipClock - Bottom Right of Hero */}
      <div className="hidden md:flex fixed right-10 lg:right-14 bottom-10 z-30 flex-col items-end gap-2">
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#353535]/40">
          Current Time
        </span>
        <FlipClock />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#181818]">
        
        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
          
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[320px] sm:max-w-[560px] md:max-w-[650px] lg:max-w-[800px] h-auto">
              <HeroLogo />
            </div>
            
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
