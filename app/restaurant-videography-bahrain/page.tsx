"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import SmartVideo from "@/components/SmartVideo";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal utility
   ─────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function RestaurantVideographyPage() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen text-black">
      {/* ── SEO CONTENT LAYER (Invisible but Indexable) ── */}
      <VisualHiddenSEO>
        <h1>Restaurant Videography in Bahrain: Cinematic Food Content Creation</h1>
        <p>Cinmach Productions is the premier video production agency in Bahrain specializing in restaurants, cafés, and hospitality brands. Based in Manama, we provide high-end cinematic videography that elevates your brand and drives customer engagement. Whether you need an atmospheric brand film for a fine-dining establishment in Adliya or fast-paced, high-retention reels for a specialty coffee shop in Seef District, our expert team delivers visuals that convert viewers into reservations.</p>

        
        <h2>Our Specialized Services in Bahrain</h2>
        <ul>
          <li>Cinematic Restaurant Films: High-end production for fine dining and luxury cafés.</li>
          <li>High-Retention Social Media Reels: Short-form content designed for Instagram and TikTok.</li>
          <li>Menu & Food Cinematography: Appetizing visuals that showcase your culinary art.</li>
          <li>Drone & Exterior Coverage: Capturing the architectural beauty of your space in Manama and beyond.</li>
        </ul>

        <h2>Why Your Restaurant Needs a Professional Videographer in Bahrain</h2>
        <p>In the competitive Bahraini hospitality market, standing out requires more than just static photos. Our cinematic content helps you build brand authority, increase footfall, and turn social media viewers into regular customers.</p>
      </VisualHiddenSEO>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black flex items-center">
        <SmartVideo 
          src="https://images.pexels.com/photos/33033789/pexels-photo-33033789.jpeg" // Reusing a placeholder-like static for now, or use a real video URL if available
          autoPlay={true}
          autoPlayViewport={true}
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        
        <div className="container relative z-10 pt-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[#B11226]" />
              <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">Bahrain &middot; Manama</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-black text-white leading-[0.85] mb-12" style={{ fontSize: "clamp(2.5rem, 10vw, 8.5rem)", letterSpacing: "-0.05em" }}>
              RESTAURANT<br />
              VIDEOGRAPHY<br />
              <span className="text-[#B11226]">IN BAHRAIN.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} className="max-w-2xl border-l border-white/10 pl-8">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              We create cinematic visual narratives for the finest restaurants and cafés in the Kingdom. High-retention content built for the digital age.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: THE IMPACT (MESSAGING)
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-black font-black text-4xl md:text-6xl tracking-tighter leading-none mb-10">
                  CONTENT THAT<br />DRIVES FOOTFALL.
                </h2>
                <p className="text-black/60 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl">
                  In a market as vibrant as Bahrain, your visual identity is your first impression. We don&apos;t just shoot food; we capture the vibe, the craftsmanship, and the soul of your space.
                </p>
              </Reveal>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <Reveal delay={0.1}>
                  <h3 className="font-bold text-xl mb-4">Strategic Storytelling</h3>
                  <p className="text-black/50 text-sm leading-relaxed">Every frame is planned to align with your brand voice and marketing goals, ensuring measurable results.</p>
                </Reveal>
                <Reveal delay={0.2}>
                  <h3 className="font-bold text-xl mb-4">Cinematic Precision</h3>
                  <p className="text-black/50 text-sm leading-relaxed">Using industry-leading gear and post-production techniques to deliver a look that is truly world-class.</p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal className="bg-black text-white p-10 md:p-14 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                <h4 className="font-mono text-[#B11226] text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">Local Expertise</h4>
                <p className="text-white font-bold text-2xl mb-6">Based in the heart of Manama, we understand the Bahraini audience.</p>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-10">
                  From traditional Bahraini concepts to modern fusion fine-dining, we know what resonates with the local demographic and global travelers alike.
                </p>
                <div className="h-px w-full bg-white/10 mb-8" />
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3">
                     <span className="w-1.5 h-1.5 bg-[#B11226] rounded-full" />
                     <span className="text-xs uppercase tracking-widest font-bold">Manama</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="w-1.5 h-1.5 bg-[#B11226] rounded-full" />
                     <span className="text-xs uppercase tracking-widest font-bold">Adliya</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="w-1.5 h-1.5 bg-[#B11226] rounded-full" />
                     <span className="text-xs uppercase tracking-widest font-bold">Seef District</span>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2.5: FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAFAFA] text-black">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="font-black text-3xl md:text-5xl mb-12 text-center uppercase tracking-tighter">Frequently Asked Questions</h2>
          </Reveal>
          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <h3 className="font-bold text-xl mb-2">How much does restaurant videography in Bahrain cost?</h3>
              <p className="text-black/60 leading-relaxed">Pricing varies depending on the scale of the shoot, the number of deliverables (like social media reels vs. long-form brand films), and post-production requirements. We offer customized packages tailored to the unique needs of cafes and fine-dining restaurants across Manama and Bahrain.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="font-bold text-xl mb-2">Do you provide food styling for the shoots?</h3>
              <p className="text-black/60 leading-relaxed">While our primary focus is cinematic videography and lighting, we work closely with your culinary team to ensure every dish looks its absolute best. We understand the nuances of food videography, from capturing steam to the perfect pour.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 className="font-bold text-xl mb-2">How long does a typical restaurant video shoot take?</h3>
              <p className="text-black/60 leading-relaxed">A standard social media content shoot usually takes a half-day (4-5 hours), allowing us to capture multiple dishes and the ambiance of your venue. Larger brand commercials may require a full day or multiple days, especially if we are shooting in different locations or requiring actors.</p>
            </Reveal>
            <Reveal delay={0.4}>
              <h3 className="font-bold text-xl mb-2">Can you handle social media distribution?</h3>
              <p className="text-black/60 leading-relaxed">As a comprehensive video production company in Bahrain, we don't just shoot and edit; we also provide strategy. We optimize all content for platforms like Instagram, TikTok, and YouTube, ensuring the aspect ratios and pacing are perfectly tuned for maximum engagement.</p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SECTION 3: CALL TO ACTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-48 bg-[#0A0A0A] text-white border-t border-white/5">
        <div className="container text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-white font-black leading-none mb-12" style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", letterSpacing: "-0.04em" }}>
              ELEVATE YOUR<br />
              <span className="text-white/20">RESTAURANT</span><br />
              TODAY.
            </h2>
          </Reveal>
          
          <Reveal delay={0.15}>
            <button
              onClick={openProjectModal}
              className="px-14 py-7 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#B11226] hover:text-white transition-all duration-500 shadow-2xl"
            >
              Start Your Shoot
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
