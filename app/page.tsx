import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import ParticleHero from "@/components/ParticleHero";
import DynamicWord from "@/components/DynamicWord";
import WorldClocks from "@/components/WorldClocks";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-[60px] sm:pt-[80px] pb-16 sm:pb-24">
        {/* Interactive Particle Vortex Background */}
        <ParticleHero />

        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
          
          {/* Availability Bar */}
          <div className="mt-8 sm:mt-0 mb-6 sm:mb-10 inline-flex self-start sm:self-center ml-0 sm:ml-0 items-center gap-2 sm:gap-3 px-3 sm:px-6 py-1 sm:py-2 border border-white/10 bg-transparent rounded-none">
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-green-500 relative shrink-0"></span>
            <span className="text-[7px] sm:text-[10px] md:text-xs font-medium tracking-[0.1em] sm:tracking-[0.2em] text-white/60 uppercase">
              AVAILABLE — Q2 2026 <span className="mx-1 sm:mx-2 text-white/20">|</span> LIMITED SLOTS
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-full mb-8 sm:mb-10">
            <AnimatedText 
              text="CINMACH PRODUCTIONS." 
              className="text-[clamp(2.5rem,7vw,8rem)] leading-[0.95] md:leading-[1.1] font-extrabold tracking-[-0.02em] uppercase text-white text-center" 
            />
          </div>
          
          {/* Dynamic Slogan */}
          <div className="mb-6 sm:mb-8 text-lg sm:text-2xl md:text-[2.5rem] font-normal tracking-tight text-white flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span>We make</span>
            <div className="relative">
              <DynamicWord />
            </div>
            <span>stand out.</span>
          </div>
          
          {/* Short Description */}
          <div className="mb-10 sm:mb-14 text-xs sm:text-sm md:text-lg text-white/50 max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-4">
            We strip away everything that doesn't serve your brand. What remains is strategy, clarity, and cinematic design that works.
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            <button className="w-full sm:w-auto min-w-0 sm:min-w-[220px] px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-none hover:bg-white/90 transition-colors flex items-center justify-center gap-2 sm:gap-3 tracking-[0.1em] sm:tracking-[0.15em] text-[9px] sm:text-xs uppercase">
              Get a Quote <span className="text-base sm:text-lg leading-none">→</span>
            </button>
            <button className="w-full sm:w-auto min-w-0 sm:min-w-[220px] px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border border-white/20 text-white font-semibold rounded-none hover:border-white transition-colors flex items-center justify-center gap-2 sm:gap-3 tracking-[0.1em] sm:tracking-[0.15em] text-[9px] sm:text-xs uppercase">
              View Our Work <span className="text-base sm:text-lg leading-none">→</span>
            </button>
          </div>
          
          <WorldClocks />

        </div>
      </section>

    </main>
  );
}
