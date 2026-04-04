import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";

export default function Home() {
  return (
    <main className="w-full relative px-6 md:px-12 lg:px-16 z-10 mx-auto">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[100svh] pt-32 pb-4 flex flex-col justify-end">
        <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl mb-8 bg-[#111]">
          <div className="absolute inset-0 w-full h-full bg-black/40 z-10" />
          <video 
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675"
          >
            <source src="https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=1280&hash=8cb4eb4501a4e10115049a405a2cd0ea7abdf1a5" type="video/mp4" />
          </video>
        </div>

        <div className="z-20 w-full flex flex-col md:flex-row justify-between items-end pb-8">
          <div>
             <AnimatedText 
               text="10 BIT" 
               className="text-[clamp(4rem,14vw,16rem)] leading-[0.8] font-bold tracking-[-0.05em] uppercase text-white" 
             />
             <AnimatedText 
               text="PRODUCTION" 
               className="text-[clamp(3rem,8vw,12rem)] leading-[0.8] font-bold tracking-[-0.05em] uppercase text-gold-500" 
             />
          </div>
          <div className="hidden md:block text-[10px] tracking-[0.2em] leading-normal uppercase font-medium text-white/50 max-w-[200px] text-right mb-6">
            BAHRAIN'S FINEST REAL ESTATE DRONE TOURS AND CINEMATIC UI.
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-start py-32 border-t border-white/10">
        <div className="max-w-5xl">
          <AnimatedText 
            text="Defining modern luxury through high-bitrate architecture." 
            className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.03em] mb-12 uppercase leading-[0.9]"
          />
          <AnimatedText 
            text="We craft immersive 3D drone tours and visually profound digital experiences for Bahrain's most exclusive real estate developments." 
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
               <div className="uppercase tracking-[0.2em] text-[10px] text-gold-500 mb-2 font-bold">Cinematic Tour</div>
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
    </main>
  );
}
