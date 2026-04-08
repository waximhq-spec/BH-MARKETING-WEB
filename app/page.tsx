import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import ParticleHero from "@/components/ParticleHero";
import DynamicWord from "@/components/DynamicWord";

export default function Home() {
  return (
    <main className="w-full relative z-10 mx-auto">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Interactive Particle Vortex Background */}
        <ParticleHero />

        <div className="z-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center mt-0">
          
          {/* Availability Bar */}
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 relative">
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.15em] text-white/80 uppercase">Available for new projects — Limited slots</span>
          </div>

          <AnimatedText 
            text="10 BIT" 
            className="text-[clamp(3.5rem,12vw,9rem)] leading-[0.8] font-bold tracking-tighter uppercase text-white justify-center" 
          />
          <AnimatedText 
            text="PRODUCTION" 
            className="text-[clamp(3rem,10vw,8rem)] leading-[0.8] font-bold tracking-tighter uppercase text-white/90 justify-center mt-1 sm:mt-2" 
          />
          
          {/* Dynamic Slogan */}
          <div className="mt-8 sm:mt-10 text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white/90 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span>We make</span>
            <DynamicWord />
            <span>stand out.</span>
          </div>
          
          {/* Short Description */}
          <div className="mt-6 sm:mt-8 text-[13px] sm:text-sm md:text-base text-white/50 max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-4">
            We architect visually profound identities and cinematic narratives that elevate businesses into iconic brands. Specializing in luxury real estate, hospitality, and corporate storytelling.
          </div>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0">
            <button className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 tracking-[0.1em] text-xs sm:text-sm uppercase shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              View Our Work
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 tracking-[0.1em] text-xs sm:text-sm uppercase">
              Get a Quote
            </button>
          </div>

        </div>
      </section>

      {/* PAGE CONTENT CONTAINER */}
      <div className="w-full px-6 md:px-12 lg:px-16">

      {/* INTRODUCTION */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-start py-32">
        <div className="max-w-5xl">
          <AnimatedText 
            text="Crafting immersive brand narratives and visually profound modern identities." 
            className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.03em] mb-12 uppercase leading-[0.9]"
          />
          <AnimatedText 
            text="We elevate global brands through strategic creative direction and cinema-grade visual storytelling for Bahrain's most exclusive developments." 
            className="text-xl md:text-2xl text-[#a0a0a0] font-light max-w-3xl leading-relaxed tracking-wide"
          />
        </div>
      </section>

      {/* BAHRAIN MARKET EDGE */}
      <section className="relative w-full min-h-screen py-32 border-t border-white/10 mt-24" id="portfolio">
        <div className="mb-24 flex lg:justify-end">
          <div className="max-w-5xl text-left lg:text-right">
            <AnimatedText text="THE BAHRAIN EDGE" className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-bold uppercase tracking-[-0.04em] text-gold-500" />
            <p className="mt-8 text-xs tracking-[0.2em] text-white/50 uppercase font-light">Elevating Residential Portfolios in the Gulf</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full mt-16">
          {[
            { title: "Manama Bay Skyline", src: "https://images.unsplash.com/photo-1596404988451-bceebc8531e2?q=80&w=2669&auto=format&fit=crop" },
            { title: "Diyar Al Muharraq Villas", src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2680&auto=format&fit=crop" }
          ].map((item, i) => (
             <div key={i} className={`flex flex-col ${i % 2 !== 0 ? "md:mt-32" : ""}`}>
               <div className="overflow-hidden mb-6 group w-full aspect-[4/5] relative bg-[#111] rounded-2xl shadow-xl">
                 <img 
                   src={item.src} 
                   alt={item.title} 
                   className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                 />
                 <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-700" />
               </div>
               <div className="uppercase tracking-[0.2em] text-[10px] text-gold-500 mb-2 font-bold">Brand Narrative</div>
               <h3 className="text-2xl md:text-4xl font-medium tracking-tight uppercase leading-none">{item.title}</h3>
             </div>
          ))}
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="w-full pt-48 pb-24 flex flex-col justify-center items-center h-[50vh] border-t border-white/10" id="contact">
        <AnimatedText text="READY FOR FLIGHT?" className="text-[clamp(3rem,8vw,10rem)] leading-[0.85] font-bold uppercase mb-8 tracking-[-0.05em] text-center" />
        <a href="mailto:hello@10bit.com" className="text-sm md:text-lg font-medium hover:text-gold-500 transition-colors uppercase tracking-[0.3em] text-[#a0a0a0]">hello@10bit.com</a>
      </footer>
      </div>
    </main>
  );
}
